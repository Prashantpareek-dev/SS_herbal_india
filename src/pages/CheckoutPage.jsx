'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useCartStore from '../store/cartStore';
import useUserStore from '../store/userStore';
import useCheckoutStore from '../store/checkoutStore';
import useRewardsStore from '../store/rewardsStore';
import useOrderStore from '../store/orderStore';
import { validatePinCode, getZoneByPinCode } from '../data/locations';
import { toast } from 'react-toastify';
import { FiCheck, FiTruck, FiCreditCard, FiUser } from 'react-icons/fi';

const CheckoutPage = () => {
  const router = useRouter();
  const { items, getCartTotal, getSavings, clearCart, getTotalRewardPoints } = useCartStore();
  const { user, addresses, isAuthenticated } = useUserStore();
  const { currentStep, goToStep, nextStep, setShippingAddress, setPaymentMethod, startUrgencyTimer } = useCheckoutStore();
  const { totalPoints, redeemPoints, addPoints } = useRewardsStore();
  const orderStore = useOrderStore();

  const [formData, setFormData] = useState({
    // Login/Guest
    email: user?.email || '',
    phone: user?.phone || '',
    name: user?.name || '',
    
    // Address
    address: {
      fullName: '',
      phone: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      pincode: '',
      addressType: 'home'
    },
    
    // Delivery
    deliveryMethod: 'standard',
    
    // Payment
    paymentMethod: 'cod',
    
    // Rewards
    useRewardPoints: false,
    rewardPointsToUse: 0
  });

  const [errors, setErrors] = useState({});
  const [deliveryDate, setDeliveryDate] = useState(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/account');
    }
  }, [isAuthenticated]);

  // Start urgency timer on mount
  useEffect(() => {
    if (items.length > 0) {
      startUrgencyTimer();
    } else {
      router.push('/cart');
    }
  }, []);

  // Calculate totals
  const subtotal = getCartTotal();
  const savings = getSavings();
  const deliveryCost = formData.deliveryMethod === 'express' ? 99 : 0;
  const pointsDiscount = formData.useRewardPoints ? Math.floor(formData.rewardPointsToUse / 10) : 0;
  const total = subtotal + deliveryCost - pointsDiscount;

  // Validation functions
  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.phone || formData.phone.length !== 10) newErrors.phone = 'Valid 10-digit phone required';
      if (!formData.name) newErrors.name = 'Name is required';
    }

    if (step === 2) {
      if (!formData.address.fullName) newErrors.fullName = 'Full name is required';
      if (!formData.address.phone || formData.address.phone.length !== 10) newErrors.phone = 'Valid phone required';
      if (!formData.address.addressLine1) newErrors.addressLine1 = 'Address is required';
      if (!formData.address.city) newErrors.city = 'City is required';
      if (!formData.address.state) newErrors.state = 'State is required';
      if (!formData.address.pincode || !validatePinCode(formData.address.pincode)) {
        newErrors.pincode = 'Valid 6-digit PIN code is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep === 2) {
        // Save address
        setShippingAddress(formData.address);
        const zone = getZoneByPinCode(formData.address.pincode);
        if (zone) {
          const estDate = new Date();
          const daysToAdd = parseInt(zone.days.split('-')[1] || zone.days);
          estDate.setDate(estDate.getDate() + daysToAdd);
          setDeliveryDate(estDate);
        }
      }
      if (currentStep === 4) {
        setPaymentMethod(formData.paymentMethod);
      }
      nextStep();
    }
  };

  const handlePlaceOrder = async () => {
    if (!isAuthenticated) {
      router.push('/account');
      return;
    }

    try {
      const { order, razorpayOrder } = await orderStore.placeOrder({
        paymentMethod: formData.paymentMethod,
        shippingAddress: formData.address,
        useRewardPoints: formData.useRewardPoints,
      });

      if (formData.paymentMethod === 'cod' || !razorpayOrder) {
        await clearCart();
        toast.success('Order placed successfully!');
        router.push(`/order-confirmation/${order._id}`);
      } else {
        // Razorpay online payment
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: razorpayOrder.amount,
          currency: razorpayOrder.currency,
          name: 'SS Herbal',
          description: `Order ${order.orderNumber}`,
          order_id: razorpayOrder.id,
          handler: async (response) => {
            try {
              await orderStore.verifyPayment(order._id, {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              });
              await clearCart();
              toast.success('Payment successful!');
              router.push(`/order-confirmation/${order._id}`);
            } catch {
              toast.error('Payment verification failed. Please contact support.');
            }
          },
          prefill: {
            name: user?.name || '',
            email: user?.email || '',
            contact: user?.phone || '',
          },
          theme: { color: '#16a34a' },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not place order. Please try again.');
    }
  };

  const steps = [
    { number: 1, title: 'Login', icon: FiUser },
    { number: 2, title: 'Address', icon: FiTruck },
    { number: 3, title: 'Delivery', icon: FiTruck },
    { number: 4, title: 'Payment', icon: FiCreditCard },
    { number: 5, title: 'Review', icon: FiCheck }
  ];

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container-custom">
        {/* Progress Steps */}
        <div className="mb-8 bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <button
                    onClick={() => step.number <= currentStep && goToStep(step.number)}
                    disabled={step.number > currentStep}
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                      currentStep >= step.number
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-200 text-gray-400'
                    } ${step.number < currentStep ? 'cursor-pointer hover:bg-primary-700' : ''}`}
                  >
                    {currentStep > step.number ? (
                      <FiCheck size={24} />
                    ) : (
                      <step.icon size={20} />
                    )}
                  </button>
                  <span className={`mt-2 text-sm font-medium ${
                    currentStep >= step.number ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-1 flex-1 mx-2 rounded ${
                    currentStep > step.number ? 'bg-primary-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* Step 1: Login/Guest */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none ${
                          errors.name ? 'border-green-500' : 'border-gray-300'
                        }`}
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="text-green-600 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none ${
                          errors.email ? 'border-green-500' : 'border-gray-300'
                        }`}
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="text-green-600 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none ${
                          errors.phone ? 'border-green-500' : 'border-gray-300'
                        }`}
                        placeholder="9876543210"
                        maxLength={10}
                      />
                      {errors.phone && <p className="text-green-600 text-sm mt-1">{errors.phone}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* Steps 2-5 would continue here with address, delivery, payment, and review */}
              {/* For brevity, showing navigation only */}

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-8">
                {currentStep > 1 && (
                  <button
                    onClick={() => goToStep(currentStep - 1)}
                    className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:border-gray-400 transition-colors"
                  >
                    Back
                  </button>
                )}
                {currentStep < 5 ? (
                  <button
                    onClick={handleNext}
                    className="flex-1 btn-primary py-3"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    onClick={handlePlaceOrder}
                    className="flex-1 bg-green-600 text-white px-6 py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition-colors"
                  >
                    Place Order - ₹{total.toLocaleString()}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-4 pb-4 border-b">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal ({items.length} items)</span>
                  <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Savings</span>
                    <span className="font-semibold text-green-600">-₹{savings.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Charges</span>
                  <span className="font-semibold">
                    {deliveryCost === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `₹${deliveryCost}`
                    )}
                  </span>
                </div>
                {pointsDiscount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Points Discount</span>
                    <span className="font-semibold text-green-600">-₹{pointsDiscount}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between text-lg font-bold mb-4">
                <span>Total Amount</span>
                <span className="text-primary-600">₹{total.toLocaleString()}</span>
              </div>

              {/* Rewards Earned */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm font-semibold text-green-800 mb-1">
                  🎁 Rewards on this order
                </p>
                <p className="text-lg font-bold text-green-900">
                  {getTotalRewardPoints()} Points
                </p>
                <p className="text-xs text-green-700 mt-1">
                  Worth ₹{Math.floor(getTotalRewardPoints() / 10)} on next order
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
