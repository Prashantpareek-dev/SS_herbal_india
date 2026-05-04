import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'react-toastify';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      
      // Add item to cart
      addItem: (product, quantity = 1, variant = null) => {
        const { items } = get();
        const existingItemIndex = items.findIndex(
          item => item.id === product.id && item.variant === variant
        );

        if (existingItemIndex > -1) {
          // Update quantity if item exists
          const updatedItems = [...items];
          updatedItems[existingItemIndex].quantity += quantity;
          set({ items: updatedItems });
          toast.success('Cart updated successfully!');
        } else {
          // Add new item
          const newItem = {
            ...product,
            quantity,
            variant,
            addedAt: new Date().toISOString()
          };
          set({ items: [...items, newItem] });
          toast.success('Added to cart!');
        }
      },

      // Remove item from cart
      removeItem: (productId, variant = null) => {
        set(state => ({
          items: state.items.filter(
            item => !(item.id === productId && item.variant === variant)
          )
        }));
        toast.info('Removed from cart');
      },

      // Update item quantity
      updateQuantity: (productId, quantity, variant = null) => {
        if (quantity <= 0) {
          get().removeItem(productId, variant);
          return;
        }
        
        set(state => ({
          items: state.items.map(item =>
            item.id === productId && item.variant === variant
              ? { ...item, quantity }
              : item
          )
        }));
      },

      // Clear cart
      clearCart: () => {
        set({ items: [] });
        toast.success('Cart cleared');
      },

      // Get cart total
      getCartTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => {
          const price = item.discountPrice || item.price;
          return total + (price * item.quantity);
        }, 0);
      },

      // Get cart count
      getCartCount: () => {
        const { items } = get();
        return items.reduce((count, item) => count + item.quantity, 0);
      },

      // Get savings
      getSavings: () => {
        const { items } = get();
        return items.reduce((savings, item) => {
          if (item.discountPrice) {
            const itemSavings = (item.price - item.discountPrice) * item.quantity;
            return savings + itemSavings;
          }
          return savings;
        }, 0);
      }
    }),
    {
      name: 'cart-storage',
    }
  )
);

export default useCartStore;
