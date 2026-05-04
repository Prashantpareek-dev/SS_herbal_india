import { Link } from 'react-router-dom';
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag } from 'react-icons/fi';
import useCartStore from '../store/cartStore';
import Breadcrumb from '../components/common/Breadcrumb';

const CartPage = () => {
  const { items, removeItem, updateQuantity, getCartTotal, getSavings } = useCartStore();

  const subtotal = getCartTotal();
  const savings = getSavings();
  const shipping = subtotal >= 499 ? 0 : 50;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div>
        <Breadcrumb items={[{ label: 'Shopping Cart' }]} />
        <div className="container-custom py-12">
          <div className="text-center">
            <FiShoppingBag className="mx-auto text-gray-400 mb-4" size={80} />
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some products to get started!</p>
            <Link to="/products" className="btn-primary inline-block">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Breadcrumb items={[{ label: 'Shopping Cart' }]} />
      
      <div className="container-custom py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart ({items.length} items)</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-card overflow-hidden">
              {items.map((item, index) => (
                <div 
                  key={`${item.id}-${item.variant}`} 
                  className={`p-6 flex gap-4 ${index !== items.length - 1 ? 'border-b' : ''}`}
                >
                  {/* Product Image */}
                  <Link to={`/product/${item.slug}`} className="flex-shrink-0">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  </Link>

                  {/* Product Details */}
                  <div className="flex-1">
                    <Link to={`/product/${item.slug}`}>
                      <h3 className="font-semibold text-gray-800 hover:text-primary mb-2">
                        {item.name}
                      </h3>
                    </Link>
                    {item.variant && (
                      <p className="text-sm text-gray-600 mb-2">Size: {item.variant}</p>
                    )}
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-primary">
                        ₹{item.discountPrice || item.price}
                      </span>
                      {item.discountPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ₹{item.price}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity & Actions */}
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeItem(item.id, item.variant)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <FiTrash2 size={20} />
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1, item.variant)}
                        className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-100"
                      >
                        <FiMinus size={14} />
                      </button>
                      <span className="w-12 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1, item.variant)}
                        className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-100"
                      >
                        <FiPlus size={14} />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-gray-600">Subtotal</p>
                      <p className="font-bold text-gray-900">
                        ₹{(item.discountPrice || item.price) * item.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Link 
              to="/products" 
              className="inline-block mt-4 text-primary font-medium hover:underline"
            >
              ← Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-card p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-3 mb-4 pb-4 border-b">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal:</span>
                  <span>₹{subtotal}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Savings:</span>
                    <span>-₹{savings}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-700">
                  <span>Shipping:</span>
                  <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                </div>
              </div>

              {shipping > 0 && (
                <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg mb-4">
                  <p className="text-sm text-blue-800">
                    Add ₹{499 - subtotal} more to get FREE shipping!
                  </p>
                </div>
              )}

              <div className="flex justify-between text-lg font-bold mb-6">
                <span>Total:</span>
                <span className="text-primary">₹{total}</span>
              </div>

              <Link to="/checkout" className="btn-primary w-full block text-center mb-3">
                Proceed to Checkout
              </Link>

              <div className="text-xs text-gray-600 text-center">
                Secure checkout powered by Razorpay
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="text-green-600">✓</span>
                  <span>100% Secure Payment</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="text-green-600">✓</span>
                  <span>Easy Returns & Refunds</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="text-green-600">✓</span>
                  <span>Cash on Delivery Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
