import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getZoneByPinCode, validatePinCode, getEstimatedDeliveryDate } from '../data/locations';

const useLocationStore = create(
  persist(
    (set, get) => ({
      // Location state
      pinCode: null,
      zone: null,
      city: null,
      deliveryEstimate: null,
      isLocationSet: false,
      showLocationModal: true, // Show on first visit
      
      // Set location by pin code
      setLocation: (pinCode, city = null) => {
        if (!validatePinCode(pinCode)) {
          return { success: false, error: 'Invalid PIN code. Please enter a 6-digit PIN code.' };
        }
        
        const zone = getZoneByPinCode(pinCode);
        const deliveryEstimate = getEstimatedDeliveryDate(pinCode);
        
        set({
          pinCode,
          zone,
          city,
          deliveryEstimate,
          isLocationSet: true,
          showLocationModal: false
        });
        
        return { success: true, zone, deliveryEstimate };
      },
      
      // Clear location
      clearLocation: () => {
        set({
          pinCode: null,
          zone: null,
          city: null,
          deliveryEstimate: null,
          isLocationSet: false,
          showLocationModal: true
        });
      },
      
      // Update location without validation (for pre-validated data)
      updateLocation: (data) => {
        set({ ...data });
      },
      
      // Hide/show location modal
      setShowLocationModal: (show) => {
        set({ showLocationModal: show });
      },
      
      // Get delivery cost based on zone
      getDeliveryCost: () => {
        const { zone } = get();
        return zone ? zone.shippingCost : 100; // Default to Tier-3 cost
      },
      
      // Get delivery days estimate
      getDeliveryDays: () => {
        const { zone } = get();
        if (!zone) return { min: 5, max: 8 };
        return { min: zone.minDays, max: zone.maxDays };
      },
      
      // Check if delivery is available
      isDeliveryAvailable: (pinCode) => {
        return validatePinCode(pinCode); // All valid PIN codes have delivery
      }
    }),
    {
      name: 'location-storage',
      skipHydration: true,
      // Only persist essential data, not modal state
      partialize: (state) => ({
        pinCode: state.pinCode,
        zone: state.zone,
        city: state.city,
        deliveryEstimate: state.deliveryEstimate,
        isLocationSet: state.isLocationSet
      })
    }
  )
);

export default useLocationStore;
