'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import useOrderStore from '../store/orderStore';
import { FiPackage, FiTruck, FiCheckCircle, FiClock, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';

const OrderTrackingPage = () => {
  const { trackingId } = useParams();
  const { trackOrder, trackingInfo, isLoading, error } = useOrderStore();
  const [searchTrackingId, setSearchTrackingId] = useState(trackingId || '');
  const [searched, setSearched] = useState(false);

  // Auto-search if trackingId is in URL
  useEffect(() => {
    if (trackingId) {
      trackOrder(trackingId);
      setSearched(true);
    }
  }, [trackingId]);

  const handleSearch = async () => {
    if (!searchTrackingId.trim()) return;
    setSearched(true);
    await trackOrder(searchTrackingId.trim());
  };

  const order = trackingInfo;

  const statusSteps = [
    { key: 'pending', label: 'Order Placed', description: 'We have received your order' },
    { key: 'confirmed', label: 'Confirmed', description: 'Order confirmed and processing' },
    { key: 'processing', label: 'Processing', description: 'Your order is packed and ready' },
    { key: 'shipped', label: 'Shipped', description: 'Order is on the way' },
    { key: 'delivered', label: 'Delivered', description: 'Order has been delivered' }
  ];

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-500',
      confirmed: 'bg-green-500',
      processing: 'bg-blue-500',
      shipped: 'bg-green-700',
      delivered: 'bg-green-600',
      cancelled: 'bg-red-500'
    };
    return colors[status] || 'bg-gray-400';
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: FiClock,
      confirmed: FiCheckCircle,
      processing: FiPackage,
      shipped: FiTruck,
      delivered: FiCheckCircle,
      cancelled: FiCheckCircle
    };
    const Icon = icons[status] || FiClock;
    return <Icon size={20} className="text-white" />;
  };

  const getCurrentStepIndex = (status) => {
    return statusSteps.findIndex(step => step.key === status);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container-custom max-w-5xl">
        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold mb-6 text-center">Track Your Order</h1>
          <div className="max-w-2xl mx-auto">
            <div className="flex gap-4">
              <input
                type="text"
                value={searchTrackingId}
                onChange={(e) => setSearchTrackingId(e.target.value.toUpperCase())}
                placeholder="Enter your tracking ID (e.g., ORD-ABC123)"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
              />
              <button
                onClick={handleSearch}
                disabled={isLoading}
                className="px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Tracking...' : 'Track'}
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-3 text-center">
              You can find your tracking ID in the order confirmation email
            </p>
          </div>
        </div>

        {/* Order Not Found */}
        {searched && !isLoading && !order && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiPackage className="text-green-600" size={40} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h2>
            <p className="text-gray-600 mb-6">
              We couldn't find an order with number: <span className="font-semibold">{searchTrackingId}</span>
            </p>
            <p className="text-sm text-gray-500">
              Please check your order number and try again
            </p>
          </div>
        )}

        {/* Order Tracking Details */}
        {order && (
          <>
            {/* Order Info Header */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Order #{order.orderNumber}</h2>
                  <p className="text-gray-600">
                    Placed on {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric', month: 'long', year: 'numeric'
                    }) : 'N/A'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 mb-1">Order Status</p>
                  <span className={`inline-block px-4 py-2 rounded-full text-white font-semibold capitalize ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Estimated Delivery */}
              {order.status !== 'delivered' && order.status !== 'cancelled' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <FiClock className="text-green-600" size={24} />
                    <div>
                      <p className="font-semibold text-green-900">Estimated Delivery</p>
                      <p className="text-green-700">
                        {new Date(order.deliveryEstimate).toLocaleDateString('en-IN', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Progress Tracker */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h3 className="text-xl font-bold mb-8">Order Progress</h3>
              
              <div className="relative">
                {/* Progress Line */}
                <div className="absolute left-6 top-0 bottom-0 w-1 bg-gray-200"></div>
                <div 
                  className={`absolute left-6 top-0 w-1 ${getStatusColor(order.status)} transition-all duration-500`}
                  style={{ height: `${(getCurrentStepIndex(order.status) / (statusSteps.length - 1)) * 100}%` }}
                ></div>

                {/* Steps */}
                <div className="space-y-8">
                  {statusSteps.map((step, index) => {
                    const isCompleted = getCurrentStepIndex(order.status) >= index;
                    const isCurrent = order.status === step.key;
                    const statusUpdate = order.statusHistory?.find(h => h.status === step.key);

                    return (
                      <div key={step.key} className="relative flex items-start gap-6">
                        {/* Icon */}
                        <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                          isCompleted ? getStatusColor(order.status) : 'bg-gray-200'
                        } ${isCurrent ? 'ring-4 ring-primary-200 scale-110' : ''}`}>
                          {getStatusIcon(step.key)}
                        </div>

                        {/* Content */}
                        <div className="flex-1 pb-8">
                          <h4 className={`font-bold text-lg mb-1 ${isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>
                            {step.label}
                          </h4>
                          <p className={`text-sm mb-2 ${isCompleted ? 'text-gray-600' : 'text-gray-400'}`}>
                            {step.description}
                          </p>
                          {statusUpdate && (
                            <div className="text-sm text-gray-500">
                              <p>{new Date(statusUpdate.timestamp).toLocaleString('en-IN')}</p>
                              {statusUpdate.location && (
                                <p className="flex items-center gap-1 mt-1">
                                  <FiMapPin size={14} />
                                  {statusUpdate.location}
                                </p>
                              )}
                            </div>
                          )}
                          {isCurrent && (
                            <div className="mt-3 inline-block bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm font-semibold">
                              Current Status
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h3 className="text-xl font-bold mb-6">Order Items ({order.items.length})</h3>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg border"
                      loading="lazy"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{item.name}</h4>
                      {item.variant && (
                        <p className="text-sm text-gray-600">Variant: {item.variant}</p>
                      )}
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery & Payment Info */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Delivery Address */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <FiMapPin className="text-primary-600" />
                  Delivery Address
                </h3>
                <p className="font-semibold text-gray-900">{order.shippingAddress.fullName}</p>
                <p className="text-gray-600 mt-2">
                  {order.shippingAddress.addressLine1}
                  {order.shippingAddress.addressLine2 && `, ${order.shippingAddress.addressLine2}`}
                </p>
                <p className="text-gray-600">
                  {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                </p>
                <p className="text-gray-600 mt-2 flex items-center gap-2">
                  <FiPhone size={16} />
                  {order.shippingAddress.phone}
                </p>
              </div>

              {/* Contact & Support */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <FiMail className="text-primary-600" />
                  Need Help?
                </h3>
                <p className="text-gray-600 mb-4">
                  Contact our support team for any queries about your order
                </p>
                <div className="space-y-3">
                  <a
                    href="tel:1800-123-4567"
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <FiPhone className="text-primary-600" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900">Call Us</p>
                      <p className="text-sm text-gray-600">1800-123-4567</p>
                    </div>
                  </a>
                  <a
                    href="mailto:support@example.com"
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <FiMail className="text-primary-600" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900">Email Us</p>
                      <p className="text-sm text-gray-600">support@example.com</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="flex-1 bg-primary-600 text-white px-6 py-4 rounded-lg font-semibold text-center hover:bg-primary-700 transition-colors"
              >
                Continue Shopping
              </Link>
              {order.status !== 'delivered' && order.status !== 'cancelled' && (
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to cancel this order?')) {
                      // Handle cancellation
                    }
                  }}
                  className="flex-1 border-2 border-green-600 text-green-600 px-6 py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors"
                >
                  Cancel Order
                </button>
              )}
            </div>
          </>
        )}

        {/* Recent Orders */}
        {!order && orders.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Your Recent Orders</h2>
            <div className="space-y-4">
              {orders.slice(0, 5).map((recentOrder) => (
                <Link
                  key={recentOrder.id}
                  href={`/order-tracking/${recentOrder.trackingId}`}
                  className="block p-4 border-2 border-gray-200 rounded-lg hover:border-primary-600 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-gray-900">Order #{recentOrder.trackingId}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(recentOrder.orderDate).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-3 py-1 rounded-full text-white text-sm font-semibold capitalize ${getStatusColor(recentOrder.status)}`}>
                        {recentOrder.status}
                      </span>
                      <p className="text-sm text-gray-600 mt-1">
                        ₹{recentOrder.pricing.total.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTrackingPage;
