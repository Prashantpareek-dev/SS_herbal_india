'use client';
import Link from 'next/link';
import { FiX, FiHeart, FiShoppingCart, FiTrash2 } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import useWishlistStore from '../../store/wishlistStore';
import useCartStore from '../../store/cartStore';

const WishlistDropdown = ({ isVisible, onClose }) => {
  const items = useWishlistStore(state => state.items);
  const removeFromWishlist = useWishlistStore(state => state.removeFromWishlist);
  const addItem = useCartStore(state => state.addItem);

  if (!isVisible) return null;

  const handleAddToCart = (product) => {
    addItem(product);
  };

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
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-rose-50 rounded-t-xl">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <FiHeart className="text-rose-500" size={18} />
            Wishlist <span className="text-sm font-normal text-gray-500">({items.length} item{items.length !== 1 ? 's' : ''})</span>
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <FiX size={18} />
          </button>
        </div>

        {/* Items */}
        {items.length === 0 ? (
          <div className="p-8 text-center flex-1">
            <FiHeart size={44} className="mx-auto text-gray-200 mb-3" />
            <p className="text-gray-400 mb-4 text-sm">Your wishlist is empty</p>
            <Link
              href="/products"
              onClick={onClose}
              className="inline-block bg-rose-500 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-rose-600 transition-colors"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {items.map((item) => (
                <div
                  key={item.id}
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
                    <div className="flex items-center gap-1.5 mt-1">
                      {item.discountPrice && item.discountPrice < item.price ? (
                        <>
                          <span className="text-green-600 font-bold text-sm">₹{item.discountPrice}</span>
                          <span className="text-gray-400 line-through text-xs">₹{item.price}</span>
                        </>
                      ) : (
                        <span className="text-green-600 font-bold text-sm">₹{item.price}</span>
                      )}
                    </div>
                    {/* Add to Cart button */}
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-white bg-green-600 hover:bg-green-700 px-2.5 py-1 rounded-md transition-colors"
                    >
                      <FiShoppingCart size={11} />
                      Add to Cart
                    </button>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="self-start p-1.5 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                    title="Remove from wishlist"
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-gray-100 bg-gray-50 rounded-b-xl">
              <Link
                href="/wishlist"
                onClick={onClose}
                className="block w-full bg-rose-500 text-white px-3 py-2.5 rounded-lg font-semibold hover:bg-rose-600 transition-colors text-center text-sm"
              >
                View Full Wishlist
              </Link>
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default WishlistDropdown;
