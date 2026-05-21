'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import useCartStore from '../../store/cartStore';
import useWishlistStore from '../../store/wishlistStore';
import { fetchNewLaunches } from '../../services/api';
import { normalizeProductList } from '../../services/normalizers';

const NewLaunches = ({ initialProducts = [] }) => {
  const addItem = useCartStore(state => state.addItem);
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlistStore();

  const [newProducts, setNewProducts] = useState(initialProducts);

  useEffect(() => {
    // Skip client fetch if SSR data was already provided
    if (initialProducts.length > 0) return;
    fetchNewLaunches(12)
      .then(res => {
        console.log('[NewLaunches] response received:', JSON.stringify(res?.data).slice(0, 600));
        const normalized = normalizeProductList(res?.data?.products || []);
        console.log('[NewLaunches] normalized data sent to component:', JSON.stringify({ count: normalized.length, first: normalized[0] }).slice(0, 600));
        if (normalized.length > 0) setNewProducts(normalized);
      })
      .catch((err) => { console.error('[NewLaunches] request failed:', err?.message); });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };

  const handleWishlist = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  if (newProducts.length === 0) {
    // Show featured products if no new arrivals
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-bold mb-4">
            ✨ NEW ARRIVALS
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 font-heading">
            Just Launched
          </h2>
          <p className="text-gray-600 text-lg font-body">
            Discover our latest wellness innovations
          </p>
        </div>

        {/* Products Horizontal Scroll */}
        <div className="relative">
          <div className="overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex gap-6 min-w-max px-4 md:px-0">
              {newProducts.map((product) => {
                const inWishlist = isInWishlist(product.id);
                return (
                <div
                  key={product.id}
                  className="w-80 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 flex-shrink-0 group"
                >
                  {/* Image */}
                  <Link href={`/product/${product.slug}`}>
                    <div className="relative h-64 bg-gray-100 overflow-hidden">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    {/* NEW badge */}
                    <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                      NEW
                    </div>
                      {/* Discount badge */}
                      {product.discountPercentage > 0 && (
                        <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                          {product.discountPercentage}% OFF
                        </div>
                      )}
                      
                      {/* Wishlist Button */}
                      <button
                        onClick={(e) => handleWishlist(e, product)}
                        className={`absolute bottom-4 right-4 p-2 rounded-full shadow-lg transition-all ${
                          inWishlist ? 'bg-green-500 text-white' : 'bg-white text-gray-700'
                        } hover:scale-110`}
                      >
                        <FiHeart size={18} fill={inWishlist ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="p-5">
                    <Link href={`/product/${product.slug}`}>
                      {/* Category */}
                      <div className="text-xs text-primary-600 font-semibold mb-2">
                        {product.category}
                      </div>

                      {/* Name */}
                      <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                        {product.name}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {product.shortDescription}
                      </p>

                      {/* Features */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {product.benefits.slice(0, 3).map((benefit, index) => (
                          <span
                            key={index}
                            className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded"
                          >
                            {benefit}
                          </span>
                        ))}
                      </div>

                      {/* Price */}
                      <div className="pt-4 border-t border-gray-100">
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-gray-900">
                            ₹{product.discountPrice}
                          </span>
                          <span className="text-sm text-gray-400 line-through">
                            ₹{product.price}
                          </span>
                        </div>
                        <div className="text-xs text-green-600 font-medium mb-3">
                          Earn {product.rewardPoints} points
                        </div>
                      </div>
                    </Link>
                    
                    {/* Action Buttons */}
                    <div className="mt-4">
                      <button
                        onClick={(e) => handleAddToCart(e, product)}
                        className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <FiShoppingCart size={16} />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              );})}
            </div>
          </div>

          {/* Gradient fade on edges */}
          <div className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-amber-50 to-transparent pointer-events-none md:hidden"></div>
          <div className="absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-amber-50 to-transparent pointer-events-none md:hidden"></div>
        </div>

        {/* View All Link */}
        <div className="text-center mt-8">
          <Link
            href="/products?filter=new"
            className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
          >
            View All New Launches
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewLaunches;
