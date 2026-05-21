import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'react-toastify';

const useRewardsStore = create(
  persist(
    (set, get) => ({
      // Rewards state
      totalPoints: 0,
      tierLevel: 'Bronze', // Bronze, Silver, Gold
      pointsHistory: [], // Array of {date, points, reason, orderId}
      redemptionHistory: [], // Array of {date, points, discount, orderId}
      referralCode: null,
      referrals: [], // Array of {date, code, status, pointsEarned}
      
      // Tier thresholds
      tiers: {
        Bronze: { min: 0, max: 999, benefits: ['Earn 1 point per ₹10', 'Birthday bonus: 50 points'] },
        Silver: { min: 1000, max: 4999, benefits: ['Earn 1.5 points per ₹10', 'Early sale access', 'Birthday bonus: 100 points'] },
        Gold: { min: 5000, max: Infinity, benefits: ['Earn 2 points per ₹10', 'Free shipping always', 'Priority support', 'Birthday bonus: 200 points'] }
      },
      
      // Add points (from purchase or other actions)
      addPoints: (points, reason, orderId = null) => {
        const { totalPoints, pointsHistory } = get();
        const newTotal = totalPoints + points;
        const newTier = get().calculateTier(newTotal);
        
        const historyEntry = {
          id: Date.now(),
          date: new Date().toISOString(),
          points,
          reason,
          orderId,
          type: 'earned'
        };
        
        set({
          totalPoints: newTotal,
          tierLevel: newTier,
          pointsHistory: [historyEntry, ...pointsHistory]
        });
        
        toast.success(`🎉 You earned ${points} reward points!`);
        
        // Check for tier upgrade
        const oldTier = get().tierLevel;
        if (newTier !== oldTier) {
          toast.success(`🌟 Congratulations! You've been upgraded to ${newTier} tier!`);
        }
      },
      
      // Redeem points for discount
      redeemPoints: (points, orderId) => {
        const { totalPoints, redemptionHistory } = get();
        
        if (points > totalPoints) {
          toast.error('Insufficient reward points');
          return { success: false, error: 'Insufficient points' };
        }
        
        if (points < 100) {
          toast.error('Minimum 100 points required for redemption');
          return { success: false, error: 'Minimum 100 points required' };
        }
        
        const discount = Math.floor(points / 10); // 100 points = ₹10
        const newTotal = totalPoints - points;
        const newTier = get().calculateTier(newTotal);
        
        const redemptionEntry = {
          id: Date.now(),
          date: new Date().toISOString(),
          points,
          discount,
          orderId,
          type: 'redeemed'
        };
        
        set({
          totalPoints: newTotal,
          tierLevel: newTier,
          redemptionHistory: [redemptionEntry, ...redemptionHistory],
          pointsHistory: [
            { ...redemptionEntry, reason: `Redeemed for ₹${discount} discount`, points: -points },
            ...get().pointsHistory
          ]
        });
        
        toast.success(`Redeemed ${points} points for ₹${discount} discount!`);
        return { success: true, discount };
      },
      
      // Calculate tier based on total points
      calculateTier: (points) => {
        if (points >= 5000) return 'Gold';
        if (points >= 1000) return 'Silver';
        return 'Bronze';
      },
      
      // Generate referral code
      generateReferralCode: (userId) => {
        const code = `SSH${userId.toString().padStart(4, '0')}${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
        set({ referralCode: code });
        return code;
      },
      
      // Add referral
      addReferral: (code, referredUserId) => {
        const { referrals } = get();
        const referral = {
          id: Date.now(),
          date: new Date().toISOString(),
          code,
          referredUserId,
          status: 'pending',
          pointsEarned: 0
        };
        
        set({ referrals: [referral, ...referrals] });
        return referral;
      },
      
      // Complete referral (when referred user makes first purchase)
      completeReferral: (referralId) => {
        const { referrals } = get();
        const updatedReferrals = referrals.map(ref => {
          if (ref.id === referralId && ref.status === 'pending') {
            const points = 200; // Referral bonus
            get().addPoints(points, 'Referral bonus', null);
            return { ...ref, status: 'completed', pointsEarned: points };
          }
          return ref;
        });
        
        set({ referrals: updatedReferrals });
      },
      
      // Get points multiplier based on tier
      getPointsMultiplier: () => {
        const { tierLevel } = get();
        switch (tierLevel) {
          case 'Gold': return 2;
          case 'Silver': return 1.5;
          default: return 1;
        }
      },
      
      // Calculate points for purchase amount
      calculatePointsForPurchase: (amount) => {
        const multiplier = get().getPointsMultiplier();
        const basePoints = Math.floor(amount / 10); // 1 point per ₹10
        return Math.floor(basePoints * multiplier);
      },
      
      // Get redeemable discount amount
      getRedeemableDiscount: () => {
        const { totalPoints } = get();
        if (totalPoints < 100) return 0;
        return Math.floor(totalPoints / 10); // 100 points = ₹10
      },
      
      // Reset rewards (for testing)
      resetRewards: () => {
        set({
          totalPoints: 0,
          tierLevel: 'Bronze',
          pointsHistory: [],
          redemptionHistory: [],
          referrals: []
        });
      }
    }),
    {
      name: 'rewards-storage',
      skipHydration: true,
    }
  )
);

export default useRewardsStore;
