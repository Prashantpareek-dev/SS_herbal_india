'use client';
import Link from 'next/link';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import { getActiveCombos } from '../../data/combos';
import useCartStore from '../../store/cartStore';
import useWishlistStore from '../../store/wishlistStore';

const ComboOffers = () => {
  const addItem = useCartStore(state => state.addItem);
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlistStore();
  
  const combos = getActiveCombos();

  const handleAddToCart = (e, combo) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: `combo-${combo.id}`,
      name: combo.name,
      images: [combo.image],
      price: combo.originalPrice,
      discountPrice: combo.discountedPrice,
      discountPercentage: combo.savingsPercentage,
      stock: combo.stock,
      slug: `combo-${combo.id}`,
    }, 1);
  };

  const handleWishlist = (e, combo) => {
    e.preventDefault();
    e.stopPropagation();
    // For combos, we'll use the combo id as a special wishlist item
    const comboAsProduct = {
      id: `combo-${combo.id}`,
      name: combo.name,
      images: [combo.image],
      discountPrice: combo.discountedPrice,
      price: combo.originalPrice
    };
    
    if (isInWishlist(comboAsProduct.id)) {
      removeFromWishlist(comboAsProduct.id);
    } else {
      addToWishlist(comboAsProduct);
    }
  };

  if (combos.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-bold mb-4">
            🎁 SPECIAL OFFERS
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 font-heading">
            Combo Deals - Save More!
          </h2>
          <p className="text-gray-600 text-lg font-body">
            Bundle products together and enjoy amazing discounts
          </p>
        </div>

        {/* Combo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {combos.map((combo) => {
            const comboId = `combo-${combo.id}`;
            const inWishlist = isInWishlist(comboId);
            return (
            <div
              key={combo.id}
              className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-all hover:-translate-y-1"
            >
              {/* Badge */}
              <Link href={`/combo/${combo.id}`}>
                <div className="relative">
                  <img
                    src={combo.image}
                    alt={combo.name}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg">
                    Save ₹{combo.savings}
                  </div>
                  {combo.badge && (
                    <div className="absolute top-4 left-4 bg-green-400 text-white px-3 py-1 rounded-full text-xs font-bold">
                      {combo.badge}
                    </div>
                  )}
                  
                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => handleWishlist(e, combo)}
                    className={`absolute bottom-4 right-4 p-2 rounded-full shadow-lg transition-all ${
                      inWishlist ? 'bg-green-500 text-white' : 'bg-white text-gray-700'
                    } hover:scale-110`}
                  >
                    <FiHeart size={18} fill={inWishlist ? 'currentColor' : 'none'} />
                  </button>
                </div>
              </Link>

              <div className="p-6">
                <Link href={`/combo/${combo.id}`}>
                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2 font-subheading">
                    {combo.name}
                  </h3>
                  
                  {/* Tagline */}
                  <p className="text-primary-600 font-medium text-sm mb-3">
                    {combo.tagline}
                  </p>

                {/* Products count in combo */}
                <div className="mb-4">
                  <div className="text-xs text-gray-500 font-semibold mb-2">INCLUDES:</div>
                  <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1 w-fit">
                    <span className="text-xs text-gray-700">{combo.productIds.length} Products</span>
                  </div>
                </div>

                {/* Benefits */}
                <div className="mb-4">
                  <div className="text-xs text-gray-500 font-semibold mb-2">BENEFITS:</div>
                  <ul className="space-y-1">
                    {combo.benefits.slice(0, 3).map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                  {/* Price */}
                  <div className="bg-primary-50 rounded-lg p-4 mb-4">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <div className="text-xs text-gray-600 mb-1">Combo Price</div>
                        <div className="text-3xl font-bold text-primary-600">
                          ₹{combo.discountedPrice}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500 line-through">₹{combo.originalPrice}</div>
                        <div className="text-lg font-bold text-green-600">
                          {combo.savingsPercentage}% OFF
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stock & Expiry */}
                  <div className="flex items-center justify-between mb-4 text-xs text-gray-500">
                    <span>Only {combo.stock} left!</span>
                    <span>Valid till {new Date(combo.validUntil).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                  </div>
                </Link>

                {/* Action Buttons */}
                <div>
                  <button
                    onClick={(e) => handleAddToCart(e, combo)}
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

        {/* View All Link */}
        {combos.length > 3 && (
          <div className="text-center mt-10">
            <Link
              href="/combos"
              className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
            >
              View All Combo Offers
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ComboOffers;
