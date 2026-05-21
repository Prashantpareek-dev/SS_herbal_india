'use client';
import Link from 'next/link';
import useWishlistStore from '../store/wishlistStore';
import useCartStore from '../store/cartStore';
import { FiHeart, FiShoppingCart, FiX } from 'react-icons/fi';
import StarRating from '../components/common/StarRating';
import { toast } from 'react-toastify';

const WishlistPage = () => {
  const { items, removeFromWishlist, clearWishlist } = useWishlistStore();
  const { addItem } = useCartStore();

  const handleAddToCart = (product) => {
    addItem(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleRemove = (productId) => {
    removeFromWishlist(productId);
    toast.info('Removed from wishlist');
  };

  if (items.length === 0) {
    return (
      <div className="container-custom py-12 min-h-screen flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiHeart className="text-gray-400" size={48} />
          </div>
          <h1 className="text-3xl font-bold mb-4 font-heading">Your Wishlist is Empty</h1>
          <p className="text-gray-600 mb-8 font-body">
            Save your favorite products to your wishlist and shop them later
          </p>
          <Link href="/products" className="inline-block bg-gradient-to-r from-green-500 to-green-700 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-800 transition-all font-heading">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container-custom">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 font-heading">My Wishlist</h1>
            <p className="text-gray-600 font-body">{items.length} {items.length === 1 ? 'item' : 'items'} saved</p>
          </div>
          {items.length > 0 && (
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
                  clearWishlist();
                  toast.info('Wishlist cleared');
                }
              }}
              className="text-green-600 hover:text-green-700 font-semibold font-heading"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow relative group">
              {/* Remove Button */}
              <button
                onClick={() => handleRemove(product.id)}
                className="absolute top-3 right-3 z-10 bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <FiX className="text-gray-600" size={18} />
              </button>

              {/* Product Image */}
              <Link href={`/product/${product.slug}`} className="block relative">
                <img
                  src={product.images?.[0] || '/Products/1.png'}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                  loading="lazy"
                />
                {product.isNewArrival && (
                  <span className="absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-1 rounded font-semibold">
                    NEW
                  </span>
                )}
                {product.discountPercentage > 0 && (
                  <span className="absolute top-3 right-3 bg-green-600 text-white text-xs px-2 py-1 rounded font-semibold">
                    {product.discountPercentage}% OFF
                  </span>
                )}
              </Link>

              {/* Product Info */}
              <div className="p-4">
                <Link href={`/product/${product.slug}`}>
                  <h3 className="font-semibold text-gray-900 mb-2 hover:text-green-600 transition-colors line-clamp-2 font-heading">
                    {product.name}
                  </h3>
                </Link>

                <div className="mb-3">
                  <StarRating rating={product.averageRating || 0} size={16} />
                  <span className="text-xs text-gray-500 ml-2 font-body">
                    ({product.totalReviews || 0})
                  </span>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-green-600 font-heading">
                      ₹{product.discountPrice || product.price}
                    </span>
                    {product.discountPrice && product.price > product.discountPrice && (
                      <>
                        <span className="text-sm text-gray-400 line-through font-body">
                          ₹{product.price}
                        </span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded font-semibold">
                          {product.discountPercentage}% OFF
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white py-2.5 rounded-lg font-semibold hover:from-green-600 hover:to-green-800 transition-all flex items-center justify-center gap-2 font-heading"
                >
                  <FiShoppingCart size={18} />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Shopping */}
        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-block border-2 border-green-600 text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors font-heading"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
