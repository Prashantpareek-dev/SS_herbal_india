import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'react-toastify';

const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],

      // Add to wishlist
      addToWishlist: (product) => {
        const { items } = get();
        const exists = items.find(item => item.id === product.id);
        
        if (exists) {
          toast.info('Already in wishlist');
          return;
        }

        set({ items: [...items, { ...product, addedAt: new Date().toISOString() }] });
        toast.success('Added to wishlist!');
      },

      // Remove from wishlist
      removeFromWishlist: (productId) => {
        set(state => ({
          items: state.items.filter(item => item.id !== productId)
        }));
        toast.info('Removed from wishlist');
      },

      // Check if product is in wishlist
      isInWishlist: (productId) => {
        const { items } = get();
        return items.some(item => item.id === productId);
      },

      // Clear wishlist
      clearWishlist: () => {
        set({ items: [] });
        toast.success('Wishlist cleared');
      },

      // Get wishlist count
      getWishlistCount: () => {
        return get().items.length;
      }
    }),
    {
      name: 'wishlist-storage',
    }
  )
);

export default useWishlistStore;
