'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { FiShoppingCart, FiHeart, FiTruck, FiShield, FiAward, FiGift, FiRefreshCw } from 'react-icons/fi';
import ProductImageGallery from '../components/product/ProductImageGallery';
import ProductTabs from '../components/product/ProductTabs';
import ProductCard from '../components/product/ProductCard';
import FrequentlyBoughtTogether from '../components/product/FrequentlyBoughtTogether';
import ColorVariantSelector from '../components/product/ColorVariantSelector';
import PincodeChecker from '../components/product/PincodeChecker';
import ExitIntentModal from '../components/product/ExitIntentModal';
import Breadcrumb from '../components/common/Breadcrumb';
import StarRating from '../components/common/StarRating';
import useCartStore from '../store/cartStore';
import useWishlistStore from '../store/wishlistStore';
import { toast } from 'react-toastify';
import { fetchProductBySlug, fetchTestimonialsByProduct } from '../services/api';
import { normalizeProduct, normalizeProductList, normalizeReviewList, normalizeTestimonialList } from '../services/normalizers';

/**
 * Strip full-document wrapper tags from backend-generated landing page HTML.
 * Extracts <body> inner content and scopes any embedded <style> body selectors.
 */
function sanitizeLandingHtml(html) {
  if (!html) return '';
  // Extract content between <body> and </body> if a full HTML doc was returned
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const content = bodyMatch ? bodyMatch[1] : html;
  // Scope any `body` selectors inside embedded <style> tags
  return content.replace(
    /(<style[^>]*>)([\s\S]*?)(<\/style>)/gi,
    (_, open, css, close) => open + css.replace(/\bbody\b/g, '.landing-page-content') + close
  );
}

/**
 * Scope `body` selectors in a CSS string to .landing-page-content
 */
function scopeLandingCss(css) {
  if (!css) return '';
  return css.replace(/\bbody\b/g, '.landing-page-content');
}

const ProductDetailPage = ({ initialData = null }) => {
  const { slug } = useParams();
  const [product, setProduct] = useState(initialData?.product || null);
  const [relatedProducts, setRelatedProducts] = useState(initialData?.relatedProducts || []);
  const [upsellProducts, setUpsellProducts] = useState(initialData?.relatedProducts?.slice(0, 3) || []);
  const [apiReviews, setApiReviews] = useState(initialData?.reviews || null);
  const [apiTestimonials, setApiTestimonials] = useState(initialData?.testimonials || null);
  const [landingPage] = useState(initialData?.landingPage || null);
  const [pageLoading, setPageLoading] = useState(!initialData);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => { setIsMounted(true); }, []);

  // Load product from API only when no SSR data was provided
  useEffect(() => {
    if (initialData || !slug) return;
    setPageLoading(true);
    fetchProductBySlug(slug)
      .then(res => {
        const data = res?.data;
        if (data?.product) {
          const normalized = normalizeProduct(data.product);
          // Attach raw _id for testimonial/review fetch by productId
          normalized._id = data.product._id;
          setProduct(normalized);

          const related = normalizeProductList(data.relatedProducts || []);
          setRelatedProducts(related);
          setUpsellProducts(related.slice(0, 3));

          if (data.reviews?.length > 0) {
            setApiReviews(normalizeReviewList(data.reviews));
          }
          if (data.testimonials?.length > 0) {
            setApiTestimonials(normalizeTestimonialList(data.testimonials));
          } else if (data.product._id) {
            // Fetch product testimonials separately if not bundled
            fetchTestimonialsByProduct(data.product._id)
              .then(tRes => {
                const list = tRes?.data || tRes || [];
                if (list.length > 0) setApiTestimonials(normalizeTestimonialList(list));
              })
              .catch(() => {});
          }
        } else {
          setProduct(null);
          setRelatedProducts([]);
          setUpsellProducts([]);
        }
      })
      .catch(() => {
        setProduct(null);
        setRelatedProducts([]);
        setUpsellProducts([]);
      })
      .finally(() => setPageLoading(false));
  }, [slug]);

  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedColorVariant, setSelectedColorVariant] = useState(null);
  const [showExitIntent, setShowExitIntent] = useState(false);

  // Set default variant once product loads
  useEffect(() => {
    if (product) {
      setSelectedVariant(product.variants?.[1] || product.variants?.[0] || null);
      setSelectedColorVariant(product.colorVariants?.[0] || null);
    }
  }, [product]);

  const addItem = useCartStore(state => state.addItem);
  const { addToWishlist, isInWishlist } = useWishlistStore();

  // Exit intent detection
  useEffect(() => {
    let exitIntentShown = sessionStorage.getItem('exitIntentShown');
    
    const handleMouseLeave = (e) => {
      if (e.clientY <= 0 && !exitIntentShown) {
        setShowExitIntent(true);
        sessionStorage.setItem('exitIntentShown', 'true');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  if (pageLoading) {
    return (
      <div className="container-custom py-24 flex justify-center">
        <FiRefreshCw size={40} className="animate-spin text-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-custom py-12">
        <p className="text-center text-gray-600">Product not found.</p>
        <div className="text-center mt-4">
          <Link href="/products" className="btn-primary">
            Browse All Products
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    const variantName = selectedColorVariant?.colorName || selectedVariant?.name;
    addItem(product, quantity, variantName);
  };

  const currentPrice = selectedColorVariant?.price || selectedVariant?.discountPrice || product.discountPrice;
  const originalPrice = selectedColorVariant?.originalPrice || selectedVariant?.price || product.price;
  const savings = originalPrice - currentPrice;
  const savingsPercent = Math.round((savings / originalPrice) * 100);

  // Get related health concerns
  const relatedConcerns = product.concerns || [];

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
          <ProductImageGallery 
            images={product.images} 
            productName={product.name}
            selectedVariant={selectedColorVariant}
          />

          {/* Product Info */}
          <div>
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <span className="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">
                {product.category}
              </span>
              {product.rewardPoints && (
                <div className="flex items-center gap-2 bg-green-50 border border-green-200 px-3 py-1 rounded-full">
                  <FiGift className="text-green-600" size={16} />
                  <span className="text-sm font-semibold text-green-700">
                    Earn {product.rewardPoints} Reward Points
                  </span>
                </div>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            {/* Ratings & Social Proof */}
            <div className="flex items-center gap-4 mb-6 flex-wrap">
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

            {/* Related Health Concerns */}
            {relatedConcerns.length > 0 && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm font-semibold text-green-900 mb-2">💊 Good for:</p>
                <div className="flex flex-wrap gap-2">
                  {relatedConcerns.map((concern, i) => (
                    <Link
                      key={concern.id || concern._id || concern.slug || concern.name || i}
                      href={`/products?concern=${concern.id}`}
                      className="text-xs bg-white border border-green-300 text-green-700 px-3 py-1 rounded-full hover:bg-green-100 transition-colors"
                    >
                      {concern.icon} {concern.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

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
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
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
              <p className="text-xs text-gray-600 mt-2">
                Inclusive of all taxes
              </p>
            </div>

            {/* Color Variants */}
            {product.colorVariants && product.colorVariants.length > 0 && (
              <ColorVariantSelector
                variants={product.colorVariants}
                selectedVariant={selectedColorVariant}
                onSelectVariant={setSelectedColorVariant}
              />
            )}

            {/* Size Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Select Size:</h3>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((variant, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-4 py-3 rounded-lg border-2 transition-all ${
                        selectedVariant === variant
                          ? 'border-primary-600 bg-primary-50 text-primary-600 font-semibold ring-2 ring-primary-200'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="text-sm">{variant.name}</div>
                      {variant.discountPrice && (
                        <div className="text-xs text-gray-600 mt-1">
                          ₹{variant.discountPrice}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Quantity:</h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border-2 border-gray-300 rounded-lg hover:border-primary-600 transition-colors font-bold"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 h-10 text-center border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-600 font-semibold"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border-2 border-gray-300 rounded-lg hover:border-primary-600 transition-colors font-bold"
                >
                  +
                </button>
                {quantity > 1 && (
                  <span className="text-sm text-gray-600">
                    Total: ₹{(currentPrice * quantity).toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <FiShoppingCart size={20} />
                Add to Cart
              </button>
              <button
                onClick={() => {
                  addToWishlist(product);
                  toast.success(isInWishlist(product.id) ? 'Already in wishlist' : 'Added to wishlist!');
                }}
                className={`p-4 border-2 rounded-lg transition-all ${
                  isInWishlist(product.id)
                    ? 'border-green-500 bg-green-50 text-green-500'
                    : 'border-gray-300 hover:border-green-500 hover:text-green-500'
                }`}
              >
                <FiHeart size={24} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Pincode Checker */}
            <div className="mb-6">
              <PincodeChecker />
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                <FiTruck className="text-primary-600 flex-shrink-0" size={24} />
                <div className="text-sm">
                  <div className="font-medium">Free Shipping</div>
                  <div className="text-gray-600">On orders ₹499+</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                <FiShield className="text-primary-600 flex-shrink-0" size={24} />
                <div className="text-sm">
                  <div className="font-medium">100% Authentic</div>
                  <div className="text-gray-600">Lab tested</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                <FiAward className="text-primary-600 flex-shrink-0" size={24} />
                <div className="text-sm">
                  <div className="font-medium">Certified Quality</div>
                  <div className="text-gray-600">GMP & ISO</div>
                </div>
              </div>
            </div>

            {/* Stock Status */}
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              {product.stock > 10 ? (
                <p className="text-green-700 font-medium">✓ In Stock - Ready to Ship</p>
              ) : product.stock > 0 ? (
                <p className="text-green-700 font-medium">⚠ Only {product.stock} left in stock - Order soon!</p>
              ) : (
                <p className="text-gray-700 font-medium">✗ Out of Stock</p>
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

           {/* Product-Specific Landing Page Content — full-bleed, no side padding */}
      {landingPage && (
        <div className="border-t border-gray-100 mt-8 -mx-0 w-full overflow-x-hidden">
          {/* Section header */}
          {landingPage.pageSettings?.title && (
            <div className="bg-green-50 py-5 text-center border-b border-green-100">
              <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-1">
                Special Offer
              </p>
              <h2 className="text-2xl font-bold text-gray-900">
                {landingPage.pageSettings.title}
              </h2>
              {landingPage.pageSettings.metaDescription && (
                <p className="text-gray-500 mt-1 text-sm max-w-xl mx-auto">
                  {landingPage.pageSettings.metaDescription}
                </p>
              )}
            </div>
          )}

          {/* Prefer server-generated HTML — injected CSS scoped to this container */}
          {/* Deferred to client-only to avoid hydration mismatch (generatedHtml may contain </script> tags) */}
          {landingPage.generatedHtml ? (
            isMounted ? (
              <>
                {landingPage.generatedCss && (
                  <style
                    dangerouslySetInnerHTML={{ __html: scopeLandingCss(landingPage.generatedCss) }}
                  />
                )}
                <div
                  className="landing-page-content"
                  dangerouslySetInnerHTML={{ __html: sanitizeLandingHtml(landingPage.generatedHtml) }}
                />
              </>
            ) : (
              <div className="landing-page-content min-h-[300px]" />
            )
          ) : (
            /* Fallback: render sections array */
            (landingPage.sections || []).map((sec, i) => {
              // API returns {type, data} — flatten into single object for rendering
              const s = { type: sec.type, ...(sec.data || sec) };
              return (
                <div key={i}>
                  {/* hero */}
                  {s.type === 'hero' && (
                    <div
                      className="relative min-h-[50vh] flex items-center justify-center text-center bg-gradient-to-br from-green-800 to-green-600 text-white overflow-hidden px-6 py-16"
                      style={s.backgroundImage ? { backgroundImage: `url(${s.backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
                    >
                      <div className="absolute inset-0 bg-black/40" />
                      <div className="relative z-10 max-w-2xl mx-auto">
                        {s.badge && <span className="inline-block bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full uppercase mb-4">{s.badge}</span>}
                        {(s.headline || s.heading) && <h2 className="text-4xl md:text-5xl font-bold mb-4">{s.headline || s.heading}</h2>}
                        {s.subheading && <p className="text-xl mb-6 opacity-90">{s.subheading}</p>}
                        {s.ctaText && s.ctaLink && (
                          <Link href={s.ctaLink} className="inline-block bg-white text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-all">
                            {s.ctaText}
                          </Link>
                        )}
                      </div>
                    </div>
                  )}
                  {/* benefits */}
                  {(s.type === 'benefits' || s.type === 'features') && (
                    <div className="py-12 bg-gradient-to-br from-green-50 to-emerald-50">
                      <div className="max-w-4xl mx-auto px-4">
                        {(s.headline || s.heading) && <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">{s.headline || s.heading}</h2>}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {(s.items || s.benefits || []).map((item, j) => (
                            <div key={j} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm">
                              <span className="text-green-500 font-bold text-lg mt-0.5">✓</span>
                              <span className="text-gray-700">{typeof item === 'string' ? item : item.text || item.title || item.description}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  {/* testimonials */}
                  {s.type === 'testimonials' && (
                    <div className="py-12 bg-white">
                      <div className="max-w-5xl mx-auto px-4">
                        {(s.headline || s.heading) && <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">{s.headline || s.heading}</h2>}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {(s.testimonials || []).map((t, j) => (
                            <div key={j} className="bg-green-50 rounded-2xl p-5 shadow-sm">
                              <p className="text-gray-700 italic mb-3">"{t.text || t.testimonialText}"</p>
                              <p className="font-semibold text-gray-900 text-sm">{t.name || t.customerName}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  {/* cta */}
                  {s.type === 'cta' && (
                    <div className="py-12 bg-primary text-white text-center px-4">
                      {(s.headline || s.heading) && <h2 className="text-2xl font-bold mb-3">{s.headline || s.heading}</h2>}
                      {s.subheading && <p className="opacity-90 mb-6">{s.subheading}</p>}
                      {s.ctaText && s.ctaLink && (
                        <Link href={s.ctaLink} className="inline-block bg-white text-primary px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-all">
                          {s.ctaText}
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}

        {/* Product Tabs */}
        <ProductTabs product={product} reviews={apiReviews} testimonials={apiTestimonials} />

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

   

      {/* Exit Intent Modal */}
      {showExitIntent && (
        <ExitIntentModal
          product={product}
          onClose={() => setShowExitIntent(false)}
        />
      )}
    </div>
  );
};

export default ProductDetailPage;
