import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiTruck, FiShield, FiAward } from 'react-icons/fi';
import { getProductBySlug, getRelatedProducts, getUpsellProducts } from '../data/products';
import ProductImageGallery from '../components/product/ProductImageGallery';
import ProductTabs from '../components/product/ProductTabs';
import ProductCard from '../components/product/ProductCard';
import FrequentlyBoughtTogether from '../components/product/FrequentlyBoughtTogether';
import Breadcrumb from '../components/common/Breadcrumb';
import StarRating from '../components/common/StarRating';
import useCartStore from '../store/cartStore';
import useWishlistStore from '../store/wishlistStore';
import { toast } from 'react-toastify';

const ProductDetailPage = () => {
  const { slug } = useParams();
  const product = getProductBySlug(slug);
  const relatedProducts = getRelatedProducts(product?.id);
  const upsellProducts = getUpsellProducts(product?.id);

  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[1] || null);
  
  const addItem = useCartStore(state => state.addItem);
  const { addToWishlist, isInWishlist } = useWishlistStore();

  if (!product) {
    return (
      <div className="container-custom py-12">
        <p className="text-center text-gray-600">Product not found.</p>
        <div className="text-center mt-4">
          <Link to="/products" className="btn-primary">
            Browse All Products
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity, selectedVariant?.name);
  };

  const handleBuyNow = () => {
    addItem(product, quantity, selectedVariant?.name);
    window.location.href = '/cart';
  };

  const currentPrice = selectedVariant?.discountPrice || product.discountPrice;
  const originalPrice = selectedVariant?.price || product.price;
  const savings = originalPrice - currentPrice;
  const savingsPercent = Math.round((savings / originalPrice) * 100);

  return (
    <div>
      <Breadcrumb items={[
        { label: 'Products', link: '/products' },
        { label: product.category, link: `/products/${product.category.toLowerCase()}` },
        { label: product.name }
      ]} />

      <div className="container-custom py-8">
        {/* Product Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Image Gallery */}
          <ProductImageGallery images={product.images} productName={product.name} />

          {/* Product Info */}
          <div>
            <div className="mb-4">
              <span className="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">
                {product.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <StarRating rating={product.averageRating} size={20} />
              <span className="text-gray-600">
                ({product.totalReviews} reviews)
              </span>
              <span className="text-gray-400">|</span>
              <span className="text-green-600 font-medium">
                {product.totalSales}+ sold
              </span>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Price */}
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-4xl font-bold text-primary">
                  ₹{currentPrice}
                </span>
                {savings > 0 && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      ₹{originalPrice}
                    </span>
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {savingsPercent}% OFF
                    </span>
                  </>
                )}
              </div>
              {savings > 0 && (
                <p className="text-green-700 font-medium">
                  You save: ₹{savings}
                </p>
              )}
            </div>

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Select Size:</h3>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((variant, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-4 py-3 rounded-lg border-2 transition-all ${
                        selectedVariant === variant
                          ? 'border-primary bg-primary/10 text-primary font-semibold'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {variant.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Quantity:</h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border-2 border-gray-300 rounded-lg hover:border-primary transition-colors"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 h-10 text-center border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border-2 border-gray-300 rounded-lg hover:border-primary transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={handleAddToCart}
                className="flex-1 btn-primary flex items-center justify-center gap-2"
              >
                <FiShoppingCart size={20} />
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 btn-secondary"
              >
                Buy Now
              </button>
              <button
                onClick={() => addToWishlist(product)}
                className={`p-3 border-2 rounded-lg transition-colors ${
                  isInWishlist(product.id)
                    ? 'border-red-500 bg-red-50 text-red-500'
                    : 'border-gray-300 hover:border-red-500 hover:text-red-500'
                }`}
              >
                <FiHeart size={24} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                <FiTruck className="text-primary" size={24} />
                <div className="text-sm">
                  <div className="font-medium">Free Shipping</div>
                  <div className="text-gray-600">On orders ₹499+</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                <FiShield className="text-primary" size={24} />
                <div className="text-sm">
                  <div className="font-medium">100% Authentic</div>
                  <div className="text-gray-600">Lab tested</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                <FiAward className="text-primary" size={24} />
                <div className="text-sm">
                  <div className="font-medium">Certified Quality</div>
                  <div className="text-gray-600">GMP & ISO</div>
                </div>
              </div>
            </div>

            {/* Stock Status */}
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              {product.stock > 10 ? (
                <p className="text-green-700 font-medium">✓ In Stock - Ready to Ship</p>
              ) : product.stock > 0 ? (
                <p className="text-orange-700 font-medium">⚠ Only {product.stock} left in stock!</p>
              ) : (
                <p className="text-red-700 font-medium">✗ Out of Stock</p>
              )}
            </div>
          </div>
        </div>

        {/* Upsell Products - Replaced with Frequently Bought Together */}
        {upsellProducts.length > 0 && (
          <FrequentlyBoughtTogether
            currentProduct={product}
            suggestedProducts={upsellProducts}
          />
        )}

        {/* Product Tabs */}
        <ProductTabs product={product} />

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
