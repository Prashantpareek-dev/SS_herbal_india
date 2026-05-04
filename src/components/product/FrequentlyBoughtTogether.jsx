import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaEquals } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { formatPrice } from '../../utils/helpers';
import useCartStore from '../../store/cartStore';
import { toast } from 'react-toastify';

const FrequentlyBoughtTogether = ({ currentProduct, suggestedProducts }) => {
  const [selectedProducts, setSelectedProducts] = useState([
    currentProduct.id,
    ...suggestedProducts.slice(0, 2).map(p => p.id)
  ]);
  const addItem = useCartStore(state => state.addItem);

  const allProducts = [currentProduct, ...suggestedProducts.slice(0, 2)];

  const toggleProduct = (productId) => {
    if (productId === currentProduct.id) return; // Can't unselect main product

    setSelectedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const calculateTotal = () => {
    return allProducts
      .filter(p => selectedProducts.includes(p.id))
      .reduce((sum, p) => sum + (p.discountPrice || p.price), 0);
  };

  const calculateSavings = () => {
    return allProducts
      .filter(p => selectedProducts.includes(p.id))
      .reduce((sum, p) => {
        if (p.discountPrice) {
          return sum + (p.price - p.discountPrice);
        }
        return sum;
      }, 0);
  };

  const handleAddAllToCart = () => {
    const selectedItems = allProducts.filter(p => selectedProducts.includes(p.id));
    
    selectedItems.forEach(product => {
      addItem({
        ...product,
        quantity: 1,
        selectedVariant: product.variants[0]
      });
    });

    toast.success(`Added ${selectedItems.length} items to cart!`);
  };

  if (!suggestedProducts || suggestedProducts.length === 0) return null;

  return (
    <section className="py-12 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
        >
          {/* Header */}
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            Frequently Bought Together
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Complete your wellness routine with these popular combinations
          </p>

          {/* Products Display */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-8">
            {allProducts.map((product, index) => (
              <div key={product.id} className="flex items-center">
                {/* Product Card */}
                <div
                  className={`relative bg-white border-2 rounded-2xl p-4 transition-all duration-300 ${
                    selectedProducts.includes(product.id)
                      ? 'border-primary shadow-lg scale-105'
                      : 'border-gray-200 opacity-60'
                  }`}
                >
                  {/* Checkbox */}
                  <div className="absolute -top-3 -right-3 z-10">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => toggleProduct(product.id)}
                      disabled={product.id === currentProduct.id}
                      className="w-6 h-6 rounded-full accent-primary cursor-pointer"
                    />
                  </div>

                  {/* This Item Badge */}
                  {product.id === currentProduct.id && (
                    <div className="absolute -top-3 -left-3 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold">
                      This item
                    </div>
                  )}

                  {/* Product Image */}
                  <div className="w-32 h-32 mb-3">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Product Info */}
                  <h3 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-2 text-center">
                    {product.name}
                  </h3>
                  <div className="text-center">
                    {product.discountPrice ? (
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-lg font-bold text-primary">
                          {formatPrice(product.discountPrice)}
                        </span>
                        <span className="text-sm text-gray-400 line-through">
                          {formatPrice(product.price)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-lg font-bold text-gray-900">
                        {formatPrice(product.price)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Plus Icon */}
                {index < allProducts.length - 1 && (
                  <FaPlus className="text-gray-400 text-2xl mx-2 hidden md:block" />
                )}
              </div>
            ))}
          </div>

          {/* Total Section */}
          <div className="border-t pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Price Info */}
              <div className="text-center md:text-left">
                <div className="flex items-baseline gap-3 justify-center md:justify-start mb-2">
                  <span className="text-sm text-gray-600">Total Price:</span>
                  <span className="text-3xl font-bold text-primary">
                    {formatPrice(calculateTotal())}
                  </span>
                </div>
                {calculateSavings() > 0 && (
                  <div className="flex items-center gap-2 text-green-600 justify-center md:justify-start">
                    <FaEquals className="text-sm" />
                    <span className="font-semibold">
                      You Save: {formatPrice(calculateSavings())}
                    </span>
                  </div>
                )}
                <p className="text-sm text-gray-500 mt-1">
                  {selectedProducts.length} {selectedProducts.length === 1 ? 'item' : 'items'} selected
                </p>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddAllToCart}
                disabled={selectedProducts.length === 0}
                className="px-8 py-4 bg-gradient-to-r from-primary to-green-600 text-white font-bold rounded-full text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                Add {selectedProducts.length} to Cart
              </button>
            </div>
          </div>

          {/* Trust Badge */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              ✅ Free Shipping on orders above ₹499 • 🔒 100% Secure Payment • 🎁 Special Bundle Offer
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FrequentlyBoughtTogether;
