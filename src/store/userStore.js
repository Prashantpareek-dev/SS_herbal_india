import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      // Login
      login: (userData) => {
        set({ user: userData, isAuthenticated: true });
      },

      // Logout
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      // Update user
      updateUser: (userData) => {
        set(state => ({
          user: { ...state.user, ...userData }
        }));
      }
    }),
    {
      name: 'user-storage',
    }
  )
);

export default useUserStore;
