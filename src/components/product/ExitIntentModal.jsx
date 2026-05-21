import { useState, useEffect } from 'react';
import useCartStore from '../../store/cartStore';
import { toast } from 'react-toastify';

const ExitIntentModal = ({ product, onClose }) => {
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const addItem = useCartStore((state) => state.addItem);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleClose();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleClaim = () => {
    // Add to cart with special exit offer discount
    const discountedProduct = {
      ...product,
      price: Math.round(product.price * 0.85), // 15% extra discount
      exitOffer: true
    };
    
    addItem(discountedProduct);
    toast.success('🎉 Special offer added to cart!');
    handleClose();
  };

  const handleClose = () => {
    setShowModal(false);
    setTimeout(() => onClose(), 300);
  };

  if (!showModal) return null;

  const extraDiscount = 15;
  const offerPrice = Math.round(product.price * 0.85);
  const totalSavings = product.originalPrice - offerPrice;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 animate-slideUp">
        {/* Header with Timer */}
        <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-6 rounded-t-2xl relative overflow-hidden">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">⏰ Wait! Don't Miss This!</h2>
            <p className="text-sm opacity-90">Exclusive exit offer just for you</p>
            
            {/* Countdown Timer */}
            <div className="mt-4 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-3 inline-block">
              <p className="text-xs mb-1">Offer expires in</p>
              <div className="text-4xl font-bold tracking-wider">
                {formatTime(timeLeft)}
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white opacity-10 rounded-full"></div>
        </div>

        {/* Product Info */}
        <div className="p-6">
          <div className="flex gap-4 mb-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-24 h-24 object-cover rounded-lg border-2 border-gray-100"
              loading="lazy"
            />
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-1">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{product.category}</p>
              
              {/* Price Display */}
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-primary-600">₹{offerPrice}</span>
                <span className="text-lg text-gray-400 line-through">₹{product.originalPrice}</span>
              </div>
            </div>
          </div>

          {/* Offer Highlights */}
          <div className="bg-green-50 border-2 border-green-400 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🎁</span>
              <h4 className="font-bold text-gray-900">Special Exit Offer</h4>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span><strong>Extra {extraDiscount}% OFF</strong> - Just for you!</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Total savings: <strong className="text-green-600">₹{totalSavings}</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>FREE shipping on this order</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Double reward points</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleClaim}
              className="w-full bg-gradient-to-r from-primary-600 to-green-600 text-white py-4 rounded-lg font-bold text-lg hover:from-primary-700 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg"
            >
              🎉 Claim This Offer Now!
            </button>
            
            <button
              onClick={handleClose}
              className="w-full text-gray-500 py-2 rounded-lg hover:text-gray-700 transition-colors text-sm"
            >
              No thanks, I'll pay full price
            </button>
          </div>

          {/* Social Proof */}
          <div className="mt-4 text-center text-sm text-gray-500">
            <p>🔥 <strong>127 people</strong> claimed this offer in the last 24 hours</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExitIntentModal;
