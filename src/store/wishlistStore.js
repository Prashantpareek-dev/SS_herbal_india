import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'react-toastify';
import { getWishlist, toggleWishlistApi, removeFromWishlistApi } from '../services/api';

const getToken = () => {
  try {
    return JSON.parse(localStorage.getItem('user-storage') || '{}')?.state?.token || null;
  } catch { return null; }
};

const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [], // { id (productId), wishlistItemId (_id), name, images, price, discountPrice, ... }

      // ─── Fetch from server ───────────────────────────────────────────────

      fetchWishlist: async () => {
        if (!getToken()) return;
        try {
          const res = await getWishlist();
          const raw = res.data?.wishlist || [];
          const items = raw.map(item => {
            const p = item.product || {};
            return {
              id: p._id || item.productId,
              wishlistItemId: item._id,
              name: p.name || '',
              slug: p.slug || '',
              images: (p.images || []).map(img => typeof img === 'string' ? img : img.url),
              price: p.pricing?.mrp ?? 0,
              discountPrice: p.pricing?.sellingPrice ?? 0,
              averageRating: p.metrics?.averageRating ?? 0,
              reviewCount: p.metrics?.reviewCount ?? 0,
              shortDescription: p.shortDescription || '',
            };
          });
          set({ items });
        } catch (err) {
          console.error('fetchWishlist error:', err?.response?.data || err.message);
        }
      },

      // ─── Toggle (add / remove) ───────────────────────────────────────────

      addToWishlist: async (product) => {
        const productId = product.id || product._id;
        const { items } = get();
        const alreadyIn = items.find(i => i.id === productId);
        if (alreadyIn) {
          toast.info('Already in wishlist');
          return;
        }

        // Optimistic add
        const optimisticItem = { ...product, id: productId, wishlistItemId: null };
        set({ items: [...items, optimisticItem] });
        toast.success('Added to wishlist');

        if (getToken()) {
          try {
            const res = await toggleWishlistApi(productId);
            // If server says "added" update wishlistItemId; if "removed" it was already there
            const wishlistItemId = res.data?.wishlistItem?._id || null;
            set(state => ({
              items: state.items.map(i =>
                i.id === productId ? { ...i, wishlistItemId } : i
              ),
            }));
          } catch {
            // Roll back
            set(state => ({ items: state.items.filter(i => i.id !== productId) }));
            toast.error('Could not add to wishlist');
          }
        }
      },

      removeFromWishlist: async (productId) => {
        const { items } = get();
        const item = items.find(i => i.id === productId);
        // Optimistic remove
        set({ items: items.filter(i => i.id !== productId) });
        toast.success('Removed from wishlist');

        if (getToken() && item?.wishlistItemId) {
          try {
            await removeFromWishlistApi(item.wishlistItemId);
          } catch {
            // Roll back
            set(state => ({ items: [...state.items, item] }));
            toast.error('Could not remove from wishlist');
          }
        }
      },

      isInWishlist: (productId) =>
        get().items.some(i => i.id === productId || i.id === productId?.toString()),

      getWishlistCount: () => get().items.length,

      clearWishlist: () => set({ items: [] }),
    }),
    { name: 'wishlist-storage', skipHydration: true }
  )
);

export default useWishlistStore;

