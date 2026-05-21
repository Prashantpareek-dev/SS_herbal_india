'use client';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiShoppingCart, FiX } from 'react-icons/fi';
import Link from 'next/link';
import useCartStore from '../../store/cartStore';

// Rendered by ClientLayout only when showNotification && lastAddedProduct are truthy.
// Auto-dismisses after 4 seconds.
const CartNotification = ({ product, onClose }) => {
  const getCartTotal = useCartStore(state => state.getCartTotal);
  const getCartCount = useCartStore(state => state.getCartCount);

  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!product) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 120, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 120, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        className="fixed top-24 right-4 z-50 w-80 bg-white rounded-xl shadow-2xl border border-green-200 overflow-hidden"
      >
        {/* Success Header */}
        <div className="bg-green-500 text-white px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-white text-green-500 rounded-full p-0.5">
              <FiCheck size={16} />
            </div>
            <span className="font-semibold text-sm">Added to Cart!</span>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
            <FiX size={18} />
          </button>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <div className="flex gap-3 mb-4">
            {product.images?.[0] ? (
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-20 h-20 object-cover rounded-lg border border-gray-200 flex-shrink-0"
                loading="eager"
              />
            ) : (
              <div className="w-20 h-20 rounded-lg border border-gray-200 bg-gray-100 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl opacity-30">🌿</span>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm text-gray-800 line-clamp-2 mb-1">
                {product.name}
              </h4>
              <p className="text-green-600 font-bold">
                ₹{product.discountPrice || product.price}
              </p>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="bg-gray-50 rounded-lg p-3 mb-3 flex items-center justify-between text-sm">
            <span className="text-gray-500">{getCartCount()} item(s) in cart</span>
            <span className="font-bold text-gray-800">₹{getCartTotal().toLocaleString()}</span>
          </div>

          {/* Auto-close progress bar */}
          <motion.div
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: 4, ease: 'linear' }}
            className="h-0.5 bg-green-400 rounded origin-left mb-3"
          />

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-sm"
            >
              Continue
            </button>
            <Link
              href="/cart"
              className="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors text-center text-sm flex items-center justify-center gap-1"
            >
              <FiShoppingCart size={14} />
              View Cart
            </Link>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CartNotification;

