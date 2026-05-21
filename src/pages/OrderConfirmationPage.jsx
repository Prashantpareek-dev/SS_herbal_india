'use client';
import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import useOrderStore from '../store/orderStore';
import { FiCheckCircle, FiDownload, FiPackage, FiTruck } from 'react-icons/fi';
import { toast } from 'react-toastify';

const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const router = useRouter();
  const { currentOrder, fetchOrderById } = useOrderStore();
  
  // Use currentOrder if it matches, otherwise fetch from API
  const order = currentOrder?._id === orderId ? currentOrder : null;

  useEffect(() => {
    if (!order && orderId) {
      fetchOrderById(orderId).then(fetched => {
        if (!fetched) {
          toast.error('Order not found');
          router.push('/');
        }
      });
    }
  }, [orderId]);

  if (!order) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">Loading order details...</p>
    </div>
  );

  const estimatedDelivery = order.estimatedDelivery
    ? new Date(order.estimatedDelivery).toLocaleDateString('en-IN', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
      })
    : 'To be determined';

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container-custom max-w-4xl">
        {/* Success Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiCheckCircle className="text-green-600" size={48} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-600 mb-4">
            Thank you for your order. We've sent a confirmation email to{' '}
            <span className="font-semibold">{order.shippingAddress?.fullName || user?.email || ''}</span>
          </p>
          
          {/* Order Number */}
          <div className="inline-block bg-primary-50 border-2 border-primary-200 rounded-lg px-6 py-3">
            <p className="text-sm text-gray-600 mb-1">Order Number</p>
            <p className="text-2xl font-bold text-primary-600">#{order.orderNumber || order._id || 'N/A'}</p>
          </div>
        </div>

        {/* Order Timeline */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-xl font-bold mb-6">Order Timeline</h2>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            
            {/* Timeline Items */}
            <div className="space-y-8">
              {/* Timeline from API or static fallback */}
              {(order.timeline?.length > 0 ? order.timeline : [
                { status: 'pending', message: 'Order placed', timestamp: order.createdAt },
                { status: 'confirmed', message: 'Order confirmed, preparing', timestamp: null },
                { status: 'shipped', message: 'Will be dispatched soon', timestamp: null },
                { status: 'delivered', message: `Estimated by ${estimatedDelivery}`, timestamp: null },
              ]).map((event, i) => (
                <div key={i} className="relative flex items-start gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                    event.timestamp ? 'bg-green-600' : 'bg-gray-200'
                  }`}>
                    {i === 0 || i === 3 ? (
                      <FiCheckCircle className={event.timestamp ? 'text-white' : 'text-gray-600'} size={16} />
                    ) : i === 2 ? (
                      <FiTruck className={event.timestamp ? 'text-white' : 'text-gray-600'} size={16} />
                    ) : (
                      <FiPackage className={event.timestamp ? 'text-white' : 'text-gray-600'} size={16} />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 capitalize">{event.status}</h3>
                    <p className="text-sm text-gray-600">
                      {event.message || event.description || ''}
                    </p>
                    {event.timestamp && (
                      <p className="text-xs text-gray-400">{new Date(event.timestamp).toLocaleString('en-IN')}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-xl font-bold mb-6">Order Details</h2>
          
          {/* Items */}
          <div className="space-y-4 mb-6 pb-6 border-b">
            {order.items.map((item, index) => (
              <div key={index} className="flex gap-4">
                <img
                  src={item.image || (item.images?.[0]) || '/placeholder.jpg'}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg border"
                  loading="lazy"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  {item.variant && (
                    <p className="text-sm text-gray-600">Variant: {typeof item.variant === 'string' ? item.variant : item.variant?.name}</p>
                  )}
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">₹{(item.subtotal || item.price * item.quantity).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing */}
          <div className="space-y-2 mb-6 pb-6 border-b">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">₹{(order.summary?.subtotal || 0).toLocaleString()}</span>
            </div>
            {(order.summary?.discount || 0) > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Savings</span>
                <span className="font-semibold text-green-600">-₹{(order.summary.discount || 0).toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Delivery</span>
              <span className="font-semibold">
                {(order.summary?.shippingCost || 0) === 0 ? (
                  <span className="text-green-600">FREE</span>
                ) : (
                  `₹${order.summary.shippingCost}`
                )}
              </span>
            </div>
          </div>

          <div className="flex justify-between text-lg font-bold">
            <span>Total Paid</span>
            <span className="text-primary-600">₹{(order.summary?.total || 0).toLocaleString()}</span>
          </div>
        </div>

        {/* Rewards Earned */}
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl shadow-lg p-8 mb-8 border-2 border-green-200">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">🎉 Congratulations!</h2>
            <p className="text-gray-700 mb-4">You've earned rewards on this order</p>
            <div className="bg-white rounded-lg p-6 inline-block">
              <p className="text-4xl font-bold text-green-600 mb-2">
                {order.summary?.rewardPointsEarned || 0} Points
              </p>
              <p className="text-gray-600">
                Worth ₹{Math.floor((order.summary?.rewardPointsEarned || 0) / 10)} on your next order
              </p>
            </div>
          </div>
        </div>

        {/* Delivery & Payment Info */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Delivery Address */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <FiTruck className="text-primary-600" />
              Delivery Address
            </h3>
            <p className="font-semibold">{order.shippingAddress.fullName}</p>
            <p className="text-gray-600 mt-2">
              {order.shippingAddress.addressLine1}
              {order.shippingAddress.addressLine2 && `, ${order.shippingAddress.addressLine2}`}
            </p>
            <p className="text-gray-600">
              {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
            </p>
            <p className="text-gray-600 mt-2">Phone: {order.shippingAddress.phone}</p>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <FiPackage className="text-primary-600" />
              Payment Method
            </h3>
            <p className="text-gray-900 font-semibold capitalize">
              {(order.paymentMethod || 'pending').replace('-', ' ')}
            </p>
            <p className="text-gray-600 mt-2">
              Payment {(order.paymentMethod || 'pending') === 'cod' ? 'on delivery' : 'confirmed'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <Link
            href={`/order-tracking/${order.orderNumber || order._id}`}
            className="flex-1 bg-primary-600 text-white px-6 py-4 rounded-lg font-semibold text-center hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
          >
            <FiTruck size={20} />
            Track Order
          </Link>
          <button
            onClick={() => window.print()}
            className="flex-1 border-2 border-gray-300 px-6 py-4 rounded-lg font-semibold hover:border-gray-400 transition-colors flex items-center justify-center gap-2"
          >
            <FiDownload size={20} />
            Download Invoice
          </button>
          <Link
            href="/products"
            className="flex-1 border-2 border-primary-600 text-primary-600 px-6 py-4 rounded-lg font-semibold text-center hover:bg-primary-50 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Support Info */}
        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <p className="text-gray-700 mb-2">Need help with your order?</p>
          <p className="text-gray-600 text-sm">
            Contact us at <a href="tel:1800-123-4567" className="text-primary-600 font-semibold">1800-123-4567</a> or{' '}
            <a href="mailto:support@example.com" className="text-primary-600 font-semibold">support@example.com</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
