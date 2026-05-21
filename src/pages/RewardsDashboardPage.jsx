import { useState } from 'react';
import useRewardsStore from '../store/rewardsStore';
import { FiGift, FiTrendingUp, FiCopy, FiCheck, FiStar, FiShoppingBag } from 'react-icons/fi';
import { toast } from 'react-toastify';

const RewardsDashboardPage = () => {
  const { 
    totalPoints, 
    tierLevel, 
    pointsHistory, 
    redemptionHistory, 
    referralCode, 
    referrals,
    generateReferralCode
  } = useRewardsStore();
  
  const [copied, setCopied] = useState(false);

  const tierInfo = {
    Bronze: { min: 0, max: 999, color: 'text-green-700', bgColor: 'bg-green-100', borderColor: 'border-green-300', multiplier: '1x' },
    Silver: { min: 1000, max: 4999, color: 'text-gray-700', bgColor: 'bg-gray-100', borderColor: 'border-gray-300', multiplier: '1.5x' },
    Gold: { min: 5000, max: Infinity, color: 'text-green-900', bgColor: 'bg-green-200', borderColor: 'border-green-400', multiplier: '2x' }
  };

  const currentTier = tierInfo[tierLevel];
  const nextTier = tierLevel === 'Bronze' ? 'Silver' : tierLevel === 'Silver' ? 'Gold' : null;
  const pointsToNextTier = nextTier ? tierInfo[nextTier].min - totalPoints : 0;

  const handleCopyReferralCode = () => {
    if (!referralCode) {
      generateReferralCode();
      return;
    }
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    toast.success('Referral code copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const pointsValue = Math.floor(totalPoints / 10);

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container-custom max-w-6xl">
        <h1 className="text-3xl font-bold mb-8">Rewards Dashboard</h1>

        {/* Points Summary */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Total Points */}
          <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-2xl shadow-lg p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <FiGift size={24} />
              </div>
              <div>
                <p className="text-sm opacity-90">Available Points</p>
                <p className="text-3xl font-bold">{totalPoints}</p>
              </div>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <p className="text-sm opacity-90 mb-1">Points Value</p>
              <p className="text-2xl font-bold">₹{pointsValue}</p>
            </div>
          </div>

          {/* Current Tier */}
          <div className={`${currentTier.bgColor} border-2 ${currentTier.borderColor} rounded-2xl shadow-lg p-6`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 bg-white rounded-full flex items-center justify-center`}>
                <FiStar className={currentTier.color} size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Current Tier</p>
                <p className={`text-3xl font-bold ${currentTier.color}`}>{tierLevel}</p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="text-sm text-gray-600 mb-1">Points Multiplier</p>
              <p className={`text-2xl font-bold ${currentTier.color}`}>{currentTier.multiplier}</p>
            </div>
          </div>

          {/* Next Tier Progress */}
          {nextTier && (
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <FiTrendingUp className="text-gray-600" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Next Tier</p>
                  <p className="text-2xl font-bold text-gray-900">{nextTier}</p>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-semibold">{pointsToNextTier} points to go</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-green-700 h-3 rounded-full transition-all"
                    style={{ width: `${Math.min((totalPoints / tierInfo[nextTier].min) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Referral Section */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl shadow-lg p-8 mb-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Refer & Earn</h2>
          <p className="mb-6 opacity-90">
            Share your referral code with friends and earn 500 bonus points for each successful referral!
          </p>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 mb-4">
            <p className="text-sm mb-2 opacity-90">Your Referral Code</p>
            <div className="flex gap-3">
              <div className="flex-1 bg-white text-gray-900 px-4 py-3 rounded-lg font-mono text-xl font-bold">
                {referralCode || 'Click to generate'}
              </div>
              <button
                onClick={handleCopyReferralCode}
                className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                {copied ? <FiCheck size={20} /> : <FiCopy size={20} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          {referrals.length > 0 && (
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <p className="text-sm mb-2">Successful Referrals: <span className="font-bold text-2xl">{referrals.length}</span></p>
              <p className="text-sm opacity-90">You've earned {referrals.length * 500} points from referrals! 🎉</p>
            </div>
          )}
        </div>

        {/* Points History & Redemption */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Points History */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FiGift className="text-green-600" />
              Points History
            </h3>
            {pointsHistory.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No points earned yet</p>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {pointsHistory.slice(0, 10).reverse().map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-900 capitalize">
                        {entry.type.replace('_', ' ')}
                      </p>
                      <p className="text-sm text-gray-600">
                        {new Date(entry.date).toLocaleDateString('en-IN')}
                      </p>
                      {entry.description && (
                        <p className="text-xs text-gray-500 mt-1">{entry.description}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">
                        +{entry.points}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Redemption History */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FiShoppingBag className="text-green-600" />
              Redemption History
            </h3>
            {redemptionHistory.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No redemptions yet</p>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {redemptionHistory.slice(0, 10).reverse().map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-900">
                        Order #{entry.orderId?.slice(0, 8)}
                      </p>
                      <p className="text-sm text-gray-600">
                        {new Date(entry.date).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">
                        -{entry.pointsUsed}
                      </p>
                      <p className="text-sm text-gray-600">
                        Saved ₹{Math.floor(entry.pointsUsed / 10)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* How to Earn Points */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold mb-6">How to Earn More Points</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiShoppingBag className="text-white" size={32} />
              </div>
              <h4 className="font-bold text-lg mb-2">Shop & Earn</h4>
              <p className="text-gray-600 text-sm mb-3">
                Earn 1 point for every ₹10 spent
              </p>
              <p className="text-2xl font-bold text-green-600">1 pt / ₹10</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-200 rounded-lg">
              <div className="w-16 h-16 bg-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiGift className="text-white" size={32} />
              </div>
              <h4 className="font-bold text-lg mb-2">Refer Friends</h4>
              <p className="text-gray-600 text-sm mb-3">
                Get bonus points for each referral
              </p>
              <p className="text-2xl font-bold text-green-700">500 pts</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiStar className="text-white" size={32} />
              </div>
              <h4 className="font-bold text-lg mb-2">Tier Benefits</h4>
              <p className="text-gray-600 text-sm mb-3">
                Higher tiers earn more points
              </p>
              <p className="text-2xl font-bold text-green-600">Up to 2x</p>
            </div>
          </div>
        </div>

        {/* Tier Benefits */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold mb-6">Tier Benefits</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(tierInfo).map(([tier, info]) => (
              <div 
                key={tier}
                className={`p-6 rounded-lg border-2 ${
                  tier === tierLevel ? info.borderColor + ' ' + info.bgColor : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className={`text-2xl font-bold ${info.color}`}>{tier}</h4>
                  {tier === tierLevel && (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                      Current
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  {info.min === 0 ? '0' : info.min.toLocaleString()} - {info.max === Infinity ? '∞' : info.max.toLocaleString()} points
                </p>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center gap-2">
                    <FiCheck className="text-green-600" />
                    <span>{info.multiplier} Points on purchases</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <FiCheck className="text-green-600" />
                    <span>Free shipping on all orders</span>
                  </p>
                  {tier !== 'Bronze' && (
                    <>
                      <p className="flex items-center gap-2">
                        <FiCheck className="text-green-600" />
                        <span>Exclusive early access to sales</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <FiCheck className="text-green-600" />
                        <span>Birthday special discount</span>
                      </p>
                    </>
                  )}
                  {tier === 'Gold' && (
                    <p className="flex items-center gap-2">
                      <FiCheck className="text-green-600" />
                      <span>Dedicated customer support</span>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsDashboardPage;
