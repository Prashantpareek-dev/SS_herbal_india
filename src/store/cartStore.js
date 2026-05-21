import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'react-toastify';
import {
  getCart, addCartItem, updateCartItem, removeCartItem,
  clearCartApi, applyCouponApi, removeCouponApi,
} from '../services/api';

// ─── Helpers ─────────────────────────────────────────────────────────────────

const getToken = () => {
  try {
    return JSON.parse(localStorage.getItem('user-storage') || '{}')?.state?.token || null;
  } catch { return null; }
};

// Normalize a server cart item to the shape components expect
const normalizeServerItem = (item) => ({
  id: item.productId,
  cartItemId: item._id,           // server-side cart item ID (for update/delete)
  name: item.product?.name || '',
  slug: item.product?.slug || '',
  images: (item.product?.images || []).map(img => typeof img === 'string' ? img : img.url),
  price: item.variant?.price ?? item.price ?? 0,
  discountPrice: item.variant?.price ?? item.price ?? 0,
  quantity: item.quantity,
  variant: item.variantId
    ? { id: item.variantId, name: item.variant?.name || '' }
    : null,
  selectedVariant: item.variant?.name || null,
  stock: item.variant?.stock ?? 999,
  subtotal: item.subtotal ?? 0,
});

const applyServerCart = (cart) => ({
  items: (cart.items || []).map(normalizeServerItem),
  couponCode: cart.coupon?.code || null,
  couponDiscount: cart.coupon?.discount || 0,
  serverSummary: cart.summary || null,
});

// ─── Store ────────────────────────────────────────────────────────────────────

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      lastAddedProduct: null,
      showNotification: false,
      couponCode: null,
      couponDiscount: 0,
      serverSummary: null,

      // ─── Server Sync ──────────────────────────────────────────────────────

      /** Fetch server cart and replace local state */
      fetchCart: async () => {
        if (!getToken()) return;
        try {
          const res = await getCart();
          const cart = res.data?.cart;
          if (cart) set(applyServerCart(cart));
        } catch (err) {
          console.error('fetchCart error:', err?.response?.data || err.message);
        }
      },

      /**
       * After login: push any local items to the server cart, then re-fetch.
       * If local cart is empty, just fetch the server cart.
       */
      syncLocalToServer: async () => {
        if (!getToken()) return;
        const { items } = get();
        for (const item of items) {
          try {
            await addCartItem(item.id, item.variant?.id || null, item.quantity);
          } catch {}
        }
        await get().fetchCart();
      },

      // ─── Cart Operations ──────────────────────────────────────────────────

      addItem: async (product, quantity = 1, variant = null) => {
        if (getToken()) {
          try {
            const res = await addCartItem(
              product.id || product._id,
              variant?.id || null,
              quantity
            );
            const cart = res.data?.cart;
            if (cart) {
              set({
                ...applyServerCart(cart),
                lastAddedProduct: product,
                showNotification: true,
              });
            }
          } catch (err) {
            toast.error(err.response?.data?.message || 'Could not add to cart');
          }
        } else {
          // Local-only (unauthenticated)
          const { items } = get();
          const idx = items.findIndex(
            i => i.id === product.id && (i.variant?.id || null) === (variant?.id || null)
          );
          if (idx > -1) {
            const updated = [...items];
            updated[idx] = { ...updated[idx], quantity: updated[idx].quantity + quantity };
            set({ items: updated, lastAddedProduct: product, showNotification: true });
          } else {
            set({
              items: [...items, { ...product, quantity, variant, addedAt: new Date().toISOString() }],
              lastAddedProduct: product,
              showNotification: true,
            });
          }
        }
      },

      removeItem: async (productId, variant = null) => {
        if (getToken()) {
          const item = get().items.find(
            i => i.id === productId && (i.variant?.id || null) === (variant?.id || null)
          );
          if (item?.cartItemId) {
            try {
              const res = await removeCartItem(item.cartItemId);
              const cart = res.data?.cart;
              if (cart) set(applyServerCart(cart));
            } catch { toast.error('Could not remove item'); }
          }
        } else {
          set(state => ({
            items: state.items.filter(
              i => !(i.id === productId && (i.variant?.id || null) === (variant?.id || null))
            ),
          }));
        }
      },

      updateQuantity: async (productId, quantity, variant = null) => {
        if (quantity <= 0) { get().removeItem(productId, variant); return; }
        if (getToken()) {
          const item = get().items.find(i => i.id === productId);
          if (item?.cartItemId) {
            try {
              const res = await updateCartItem(item.cartItemId, quantity);
              const cart = res.data?.cart;
              if (cart) set(applyServerCart(cart));
            } catch { toast.error('Could not update quantity'); }
          }
        } else {
          set(state => ({
            items: state.items.map(i =>
              i.id === productId && (i.variant?.id || null) === (variant?.id || null)
                ? { ...i, quantity }
                : i
            ),
          }));
        }
      },

      applyCoupon: async (code) => {
        try {
          const res = await applyCouponApi(code);
          const cart = res.data?.cart;
          if (cart) {
            set({ ...applyServerCart(cart) });
            toast.success(res.message || `Coupon "${code}" applied!`);
          }
        } catch (err) {
          toast.error(err.response?.data?.message || 'Invalid or expired coupon');
        }
      },

      removeCoupon: async () => {
        try {
          const res = await removeCouponApi();
          const cart = res.data?.cart;
          if (cart) set({ ...applyServerCart(cart) });
          toast.info('Coupon removed');
        } catch {}
      },

      clearCart: async () => {
        if (getToken()) {
          try { await clearCartApi(); } catch {}
        }
        set({ items: [], couponCode: null, couponDiscount: 0, serverSummary: null });
      },

      hideNotification: () => set({ showNotification: false }),

      // ─── Computed ─────────────────────────────────────────────────────────

      getCartTotal: () => {
        const { serverSummary, items } = get();
        if (serverSummary) return serverSummary.subtotal ?? 0;
        return items.reduce((t, item) => {
          const price = item.discountPrice ?? item.price ?? 0;
          return t + price * item.quantity;
        }, 0);
      },

      getCartCount: () =>
        get().items.reduce((c, item) => c + item.quantity, 0),

      getSavings: () =>
        get().items.reduce((s, item) => {
          if (item.price > (item.discountPrice ?? item.price)) {
            return s + (item.price - item.discountPrice) * item.quantity;
          }
          return s;
        }, 0),

      getTotalRewardPoints: () =>
        get().items.reduce((p, item) => p + (item.rewardPoints || 0) * item.quantity, 0),

      getCartSummary: () => {
        const { items, serverSummary, couponDiscount } = get();
        const subtotal = get().getCartTotal();
        return {
          items: items.length,
          itemCount: get().getCartCount(),
          subtotal,
          couponDiscount,
          shippingCost: serverSummary?.shippingCost ?? 0,
          total: serverSummary?.total ?? subtotal - couponDiscount,
          savings: get().getSavings(),
          isEmpty: items.length === 0,
        };
      },
    }),
    { name: 'cart-storage', skipHydration: true }
  )
);

export default useCartStore;
