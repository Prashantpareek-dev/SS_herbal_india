'use client';
import Link from 'next/link';
import { FiX, FiShoppingCart, FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import useCartStore from '../../store/cartStore';

const CartDropdown = ({ isVisible, onClose }) => {
  const items = useCartStore(state => state.items);
  const getCartTotal = useCartStore(state => state.getCartTotal);
  const removeItem = useCartStore(state => state.removeItem);
  const updateQuantity = useCartStore(state => state.updateQuantity);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -8, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.97 }}
        transition={{ duration: 0.18 }}
        className="absolute right-0 top-full mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-[520px] flex flex-col"
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-green-50 rounded-t-xl">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <FiShoppingCart className="text-green-600" size={18} />
            Cart <span className="text-sm font-normal text-gray-500">({items.length} item{items.length !== 1 ? 's' : ''})</span>
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <FiX size={18} />
          </button>
        </div>

        {/* Items */}
        {items.length === 0 ? (
          <div className="p-8 text-center flex-1">
            <FiShoppingCart size={44} className="mx-auto text-gray-200 mb-3" />
            <p className="text-gray-400 mb-4 text-sm">Your cart is empty</p>
            <Link
              href="/products"
              onClick={onClose}
              className="inline-block bg-green-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors"
            >
              Shop Now
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.variant?.id || 'default'}`}
                  className="flex gap-3 p-2.5 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
                >
                  {/* Image */}
                  <Link href={`/product/${item.slug || ''}`} onClick={onClose} className="flex-shrink-0">
                    {item.images?.[0] ? (
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-14 h-14 object-cover rounded-lg border border-gray-200"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-lg bg-gray-200 flex items-center justify-center">
                        <span className="text-xl opacity-30">🌿</span>
                      </div>
                    )}
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <Link href={`/product/${item.slug || ''}`} onClick={onClose}>
                      <p className="font-semibold text-xs text-gray-800 line-clamp-2 leading-snug hover:text-green-600 transition-colors">
                        {item.name}
                      </p>
                    </Link>
                    {item.variant?.name && (
                      <p className="text-xs text-gray-400 mt-0.5">{item.variant.name}</p>
                    )}
                    <p className="text-green-600 font-bold text-sm mt-1">
                      ₹{((item.discountPrice || item.price) * item.quantity).toLocaleString()}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1, item.variant)}
                        className="w-6 h-6 rounded-md bg-white border border-gray-300 flex items-center justify-center hover:border-green-500 hover:text-green-600 transition-colors"
                      >
                        <FiMinus size={10} />
                      </button>
                      <span className="w-7 text-center text-xs font-bold text-gray-700">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1, item.variant)}
                        className="w-6 h-6 rounded-md bg-white border border-gray-300 flex items-center justify-center hover:border-green-500 hover:text-green-600 transition-colors"
                      >
                        <FiPlus size={10} />
                      </button>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.id, item.variant)}
                    className="self-start p-1.5 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                    title="Remove"
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-gray-100 bg-gray-50 rounded-b-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-600">Subtotal</span>
                <span className="text-lg font-bold text-green-600">
                  ₹{getCartTotal().toLocaleString()}
                </span>
              </div>
              <div className="flex gap-2">
                <Link
                  href="/cart"
                  onClick={onClose}
                  className="flex-1 bg-white border-2 border-gray-300 text-gray-700 px-3 py-2.5 rounded-lg font-semibold hover:border-gray-400 transition-colors text-center text-sm"
                >
                  View Cart
                </Link>
                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="flex-1 bg-green-600 text-white px-3 py-2.5 rounded-lg font-semibold hover:bg-green-700 transition-colors text-center text-sm"
                >
                  Checkout →
                </Link>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default CartDropdown;

