'use client';
import Link from 'next/link';
import { FiHeart, FiShoppingCart, FiEye } from 'react-icons/fi';
import StarRating from '../common/StarRating';
import useCartStore from '../../store/cartStore';
import useWishlistStore from '../../store/wishlistStore';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const addItem = useCartStore(state => state.addItem);
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlistStore();
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addItem(product, 1);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const discountAmount = product.price - product.discountPrice;
  const savings = Math.round((discountAmount / product.price) * 100);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="product-card group relative"
    >
      <Link href={`/product/${product.slug}`}>
        {/* Image Container */}
        <div className="relative overflow-hidden bg-gray-100 h-64">
          {product.images?.[0] ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <span className="text-6xl opacity-30">🌿</span>
            </div>
          )}
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.discountPercentage > 0 && (
              <span className="badge badge-discount">
                {savings}% OFF
              </span>
            )}
            {product.isNewArrival && (
              <span className="badge badge-new">
                NEW
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleWishlist}
              className={`p-2 rounded-full ${inWishlist ? 'bg-green-500 text-white' : 'bg-white text-gray-700'} hover:scale-110 transition-transform shadow-md`}
            >
              <FiHeart size={18} fill={inWishlist ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Out of Stock Overlay */}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="bg-white px-4 py-2 rounded-lg font-semibold text-gray-800">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category */}
          <p className="text-xs text-gray-500 uppercase mb-1">{product.category}</p>
          
          {/* Title */}
          <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 min-h-[3rem]">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="mb-3">
            <StarRating 
              rating={product.averageRating} 
              showCount 
              count={product.totalReviews}
              size={14}
            />
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl font-bold text-primary">
              ₹{product.discountPrice}
            </span>
            {product.discountPercentage > 0 && (
              <>
                <span className="text-sm text-gray-500 line-through">
                  ₹{product.price}
                </span>
                <span className="text-xs text-green-600 font-semibold">
                  Save ₹{discountAmount}
                </span>
              </>
            )}
          </div>

          {/* Benefits */}
          <div className="flex flex-wrap gap-1 mb-3">
            {product.benefits.slice(0, 2).map((benefit, index) => (
              <span key={index} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                {benefit}
              </span>
            ))}
          </div>
        </div>
      </Link>

      {/* Add to Cart Button */}
      <div className="px-4 pb-4">
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:hover:scale-100"
        >
          {product.stock === 0 ? (
            <span>Out of Stock</span>
          ) : (
            <>
              <FiShoppingCart size={18} />
              <span className="uppercase tracking-wide">Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
