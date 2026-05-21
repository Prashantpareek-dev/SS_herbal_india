import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCheckoutStore = create(
  persist(
    (set, get) => ({
      // Checkout steps: 'login', 'address', 'delivery', 'payment', 'review'
      currentStep: 'login',
      completedSteps: [],
      
      // Form data
      guestCheckout: false,
      shippingAddress: {
        fullName: '',
        phone: '',
        email: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        pinCode: '',
        isDefault: false
      },
      billingAddress: null, // null means same as shipping
      deliveryDate: null,
      deliverySlot: null, // 'morning', 'afternoon', 'evening'
      paymentMethod: null, // 'cod', 'upi', 'card', 'netbanking', 'wallet'
      paymentDetails: {},
      
      // Urgency tactics state
      urgencyTimer: 600, // 10 minutes in seconds
      timerActive: false,
      abandonmentOfferShown: false,
      exitIntentOfferShown: false,
      
      // Special offers
      activeOffer: null, // {type, discount, expiresAt}
      
      // Applied discounts and rewards
      appliedCoupon: null,
      appliedRewardsPoints: 0,
      
      // Navigation
      goToStep: (step) => {
        set({ currentStep: step });
      },
      
      nextStep: () => {
        const steps = ['login', 'address', 'delivery', 'payment', 'review'];
        const currentIndex = steps.indexOf(get().currentStep);
        if (currentIndex < steps.length - 1) {
          const nextStep = steps[currentIndex + 1];
          set({ 
            currentStep: nextStep,
            completedSteps: [...new Set([...get().completedSteps, get().currentStep])]
          });
        }
      },
      
      previousStep: () => {
        const steps = ['login', 'address', 'delivery', 'payment', 'review'];
        const currentIndex = steps.indexOf(get().currentStep);
        if (currentIndex > 0) {
          set({ currentStep: steps[currentIndex - 1] });
        }
      },
      
      // Update form data
      setGuestCheckout: (isGuest) => {
        set({ guestCheckout: isGuest });
        if (isGuest) {
          get().nextStep();
        }
      },
      
      setShippingAddress: (address) => {
        set({ shippingAddress: { ...get().shippingAddress, ...address } });
      },
      
      setBillingAddress: (address) => {
        set({ billingAddress: address });
      },
      
      setDeliveryDate: (date) => {
        set({ deliveryDate: date });
      },
      
      setDeliverySlot: (slot) => {
        set({ deliverySlot: slot });
      },
      
      setPaymentMethod: (method) => {
        set({ paymentMethod: method });
      },
      
      setPaymentDetails: (details) => {
        set({ paymentDetails: { ...get().paymentDetails, ...details } });
      },
      
      // Urgency timer
      startUrgencyTimer: () => {
        set({ timerActive: true, urgencyTimer: 600 });
        
        const interval = setInterval(() => {
          const { urgencyTimer, timerActive } = get();
          if (!timerActive) {
            clearInterval(interval);
            return;
          }
          
          if (urgencyTimer > 0) {
            set({ urgencyTimer: urgencyTimer - 1 });
          } else {
            clearInterval(interval);
            set({ timerActive: false });
          }
        }, 1000);
      },
      
      stopUrgencyTimer: () => {
        set({ timerActive: false });
      },
      
      resetUrgencyTimer: () => {
        set({ urgencyTimer: 600, timerActive: false });
      },
      
      // Offers
      showAbandonmentOffer: () => {
        if (!get().abandonmentOfferShown) {
          const offer = {
            type: 'abandonment',
            discount: 5, // 5% extra
            expiresAt: new Date(Date.now() + 5 * 60 * 1000).toISOString() // 5 minutes
          };
          set({ activeOffer: offer, abandonmentOfferShown: true });
          return offer;
        }
        return null;
      },
      
      showExitIntentOffer: () => {
        if (!get().exitIntentOfferShown) {
          const offer = {
            type: 'exit_intent',
            discount: 10, // ₹10 off or 10% (can be configured)
            expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString() // 10 minutes
          };
          set({ activeOffer: offer, exitIntentOfferShown: true });
          return offer;
        }
        return null;
      },
      
      clearOffer: () => {
        set({ activeOffer: null });
      },
      
      // Coupons and rewards
      applyCoupon: (couponCode) => {
        // Mock coupon validation
        const validCoupons = {
          'WELCOME10': { discount: 10, type: 'percentage' },
          'SAVE50': { discount: 50, type: 'fixed' },
          'FIRST100': { discount: 100, type: 'fixed' }
        };
        
        const coupon = validCoupons[couponCode.toUpperCase()];
        if (coupon) {
          set({ appliedCoupon: { code: couponCode.toUpperCase(), ...coupon } });
          return { success: true, coupon };
        }
        return { success: false, error: 'Invalid coupon code' };
      },
      
      removeCoupon: () => {
        set({ appliedCoupon: null });
      },
      
      applyRewardsPoints: (points) => {
        set({ appliedRewardsPoints: points });
      },
      
      removeRewardsPoints: () => {
        set({ appliedRewardsPoints: 0 });
      },
      
      // Validation
      isStepValid: (step) => {
        const state = get();
        switch (step) {
          case 'login':
            return state.guestCheckout || true; // Assume logged in if not guest
          case 'address':
            const addr = state.shippingAddress;
            return addr.fullName && addr.phone && addr.email && 
                   addr.addressLine1 && addr.city && addr.state && addr.pinCode;
          case 'delivery':
            return state.deliveryDate && state.deliverySlot;
          case 'payment':
            return state.paymentMethod !== null;
          default:
            return true;
        }
      },
      
      // Reset checkout
      resetCheckout: () => {
        set({
          currentStep: 'login',
          completedSteps: [],
          guestCheckout: false,
          shippingAddress: {
            fullName: '',
            phone: '',
            email: '',
            addressLine1: '',
            addressLine2: '',
            city: '',
            state: '',
            pinCode: '',
            isDefault: false
          },
          billingAddress: null,
          deliveryDate: null,
          deliverySlot: null,
          paymentMethod: null,
          paymentDetails: {},
          urgencyTimer: 600,
          timerActive: false,
          abandonmentOfferShown: false,
          exitIntentOfferShown: false,
          activeOffer: null,
          appliedCoupon: null,
          appliedRewardsPoints: 0
        });
      }
    }),
    {
      name: 'checkout-storage',
      skipHydration: true,
      // Don't persist timer states and offers
      partialize: (state) => ({
        currentStep: state.currentStep,
        completedSteps: state.completedSteps,
        guestCheckout: state.guestCheckout,
        shippingAddress: state.shippingAddress,
        billingAddress: state.billingAddress,
        deliveryDate: state.deliveryDate,
        deliverySlot: state.deliverySlot,
        paymentMethod: state.paymentMethod,
        appliedCoupon: state.appliedCoupon,
        appliedRewardsPoints: state.appliedRewardsPoints
      })
    }
  )
);

export default useCheckoutStore;
