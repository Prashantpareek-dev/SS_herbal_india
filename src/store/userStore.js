import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'react-toastify';
import {
  authLogin, authRegister, authLogout, authChangePassword,
  getProfile, updateProfile, getRewardPoints,
  getAddresses, addAddressApi, updateAddressApi,
  deleteAddressApi, setDefaultAddressApi,
} from '../services/api';

const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      addresses: [],
      rewardPoints: 0,
      tierLevel: 'Bronze',

      // ─── Auth ───────────────────────────────────────────────────────────────

      login: async (email, password) => {
        const res = await authLogin(email, password);
        const { user, token, refreshToken } = res.data;
        set({
          user: { ...user, name: user.fullName },
          token,
          refreshToken,
          isAuthenticated: true,
          rewardPoints: user.rewardPoints || 0,
          tierLevel: user.tierLevel || 'Bronze',
        });
        toast.success(`Welcome back, ${user.firstName}!`);
        return res;
      },

      register: async (userData) => {
        const nameParts = (userData.name || '').trim().split(' ');
        const payload = {
          firstName: userData.firstName || nameParts[0] || '',
          lastName: userData.lastName || nameParts.slice(1).join(' ') || '',
          email: userData.email,
          phone: userData.phone,
          password: userData.password,
          ...(userData.referralCode && { referralCode: userData.referralCode }),
        };
        const res = await authRegister(payload);
        const { user, token, refreshToken } = res.data;
        set({
          user: { ...user, name: user.fullName },
          token,
          refreshToken,
          isAuthenticated: true,
          rewardPoints: 0,
          tierLevel: 'Bronze',
        });
        toast.success(`Welcome to SS Herbal, ${user.firstName}!`);
        return res;
      },

      logout: async () => {
        try { await authLogout(); } catch {}
        set({
          user: null, token: null, refreshToken: null,
          isAuthenticated: false, addresses: [],
        });
        toast.info('Logged out successfully');
      },

      fetchProfile: async () => {
        const res = await getProfile();
        const user = res.data?.user;
        if (user) {
          set(state => ({
            user: { ...state.user, ...user, name: user.fullName },
            rewardPoints: user.rewardPoints || 0,
            tierLevel: user.tierLevel || 'Bronze',
          }));
        }
        return user;
      },

      updateUser: async (userData) => {
        const res = await updateProfile(userData);
        const updated = res.data?.user;
        if (updated) {
          set(state => ({
            user: { ...state.user, ...updated, name: updated.fullName },
          }));
        }
        toast.success('Profile updated successfully');
        return updated;
      },

      changePassword: async (currentPassword, newPassword) => {
        await authChangePassword(currentPassword, newPassword);
        toast.success('Password changed successfully');
      },

      fetchRewardPoints: async () => {
        const res = await getRewardPoints();
        const { rewardPoints, tierLevel } = res.data || {};
        set({
          rewardPoints: rewardPoints || 0,
          tierLevel: tierLevel || 'Bronze',
        });
        return res.data;
      },

      // ─── Addresses ─────────────────────────────────────────────────────────

      fetchAddresses: async () => {
        const res = await getAddresses();
        const addresses = res.data?.addresses || [];
        set({ addresses });
        return addresses;
      },

      addAddress: async (address) => {
        const res = await addAddressApi(address);
        const newAddr = res.data?.address;
        if (newAddr) set(state => ({ addresses: [...state.addresses, newAddr] }));
        toast.success('Address added successfully');
        return newAddr;
      },

      updateAddress: async (addressId, updatedData) => {
        const res = await updateAddressApi(addressId, updatedData);
        const updated = res.data?.address;
        if (updated) {
          set(state => ({
            addresses: state.addresses.map(a => a._id === addressId ? updated : a),
          }));
        }
        toast.success('Address updated successfully');
        return updated;
      },

      deleteAddress: async (addressId) => {
        await deleteAddressApi(addressId);
        set(state => ({
          addresses: state.addresses.filter(a => a._id !== addressId),
        }));
        toast.success('Address deleted successfully');
      },

      setDefaultAddress: async (addressId) => {
        await setDefaultAddressApi(addressId);
        set(state => ({
          addresses: state.addresses.map(a => ({
            ...a,
            isDefault: a._id === addressId,
          })),
        }));
      },

      getDefaultAddress: () => {
        return get().addresses.find(a => a.isDefault) || get().addresses[0] || null;
      },

      getAddressById: (addressId) => {
        return get().addresses.find(a => a._id === addressId || a.id === addressId);
      },

      // ─── Helpers ────────────────────────────────────────────────────────────

      getUserInitials: () => {
        const { user } = get();
        if (!user) return 'U';
        const name = user.fullName || user.name || '';
        const parts = name.trim().split(' ').filter(Boolean);
        if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
        return (parts[0]?.[0] || 'U').toUpperCase();
      },

      // Kept for backward compat — components that call login(userData) directly
      // will still work (they'll just need to use the async version)
      preferences: {
        emailNotifications: true,
        smsNotifications: true,
        whatsappNotifications: false,
        language: 'en',
        currency: 'INR',
      },

      updatePreferences: (prefs) => {
        set(state => ({
          preferences: { ...state.preferences, ...prefs },
        }));
      },
    }),
    { name: 'user-storage', skipHydration: true }
  )
);

export default useUserStore;
