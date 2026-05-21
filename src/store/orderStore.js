import { create } from 'zustand';
import { toast } from 'react-toastify';
import {
  placeOrderApi, verifyPaymentApi, getOrdersApi,
  getOrderByIdApi, trackOrderApi, cancelOrderApi,
} from '../services/api';

const useOrderStore = create((set, get) => ({
  orders: [],
  currentOrder: null,
  trackingInfo: null,
  pagination: null,
  isLoading: false,
  error: null,

  // ─── Place Order ─────────────────────────────────────────────────────────

  placeOrder: async ({ paymentMethod, shippingAddress, shippingAddressId, useRewardPoints = false, notes } = {}) => {
    set({ isLoading: true, error: null });
    try {
      const body = {
        paymentMethod,
        useRewardPoints,
        ...(notes && { notes }),
        ...(shippingAddressId
          ? { shippingAddressId }
          : { shippingAddress }),
      };
      const res = await placeOrderApi(body);
      const { order, razorpayOrder } = res.data || {};
      set({ currentOrder: order, isLoading: false });
      return { order, razorpayOrder };
    } catch (err) {
      const msg = err.response?.data?.message || 'Could not place order';
      set({ isLoading: false, error: msg });
      throw err;
    }
  },

  // ─── Verify Payment (Razorpay) ────────────────────────────────────────────

  verifyPayment: async (orderId, paymentData) => {
    const res = await verifyPaymentApi(orderId, paymentData);
    const order = res.data?.order;
    if (order) set({ currentOrder: order });
    return order;
  },

  // ─── Fetch Orders ─────────────────────────────────────────────────────────

  fetchOrders: async (params = {}) => {
    set({ isLoading: true });
    try {
      const res = await getOrdersApi(params);
      set({
        orders: res.data?.orders || [],
        pagination: res.data?.pagination || null,
        isLoading: false,
      });
    } catch (err) {
      set({ isLoading: false, error: err.response?.data?.message || 'Could not fetch orders' });
    }
  },

  fetchOrderById: async (id) => {
    set({ isLoading: true });
    try {
      const res = await getOrderByIdApi(id);
      const order = res.data?.order;
      set({ currentOrder: order, isLoading: false });
      return order;
    } catch (err) {
      set({ isLoading: false, error: err.response?.data?.message || 'Order not found' });
      return null;
    }
  },

  // ─── Track Order ──────────────────────────────────────────────────────────

  trackOrder: async (orderNumber) => {
    set({ isLoading: true, trackingInfo: null, error: null });
    try {
      const res = await trackOrderApi(orderNumber);
      const info = res.data?.order || res.data;
      set({ trackingInfo: info, isLoading: false });
      return info;
    } catch (err) {
      const msg = err.response?.data?.message || 'Order not found';
      set({ isLoading: false, error: msg });
      toast.error(msg);
      return null;
    }
  },

  // ─── Cancel Order ─────────────────────────────────────────────────────────

  cancelOrder: async (orderId, reason = '') => {
    try {
      const res = await cancelOrderApi(orderId, reason);
      const updated = res.data?.order;
      if (updated) {
        set(state => ({
          orders: state.orders.map(o => o._id === orderId ? updated : o),
          currentOrder: state.currentOrder?._id === orderId ? updated : state.currentOrder,
        }));
      }
      toast.success('Order cancelled successfully');
      return updated;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not cancel order');
      throw err;
    }
  },

  // ─── Helpers ─────────────────────────────────────────────────────────────

  setCurrentOrder: (order) => set({ currentOrder: order }),
  clearCurrentOrder: () => set({ currentOrder: null }),
  clearTrackingInfo: () => set({ trackingInfo: null }),

  // Kept for backward compat (used in OrderConfirmationPage before full migration)
  getOrderById: (id) => get().orders.find(o => o._id === id || o.id === id),
  getOrderByTrackingId: (trackingId) =>
    get().orders.find(o => o.orderNumber === trackingId || o.trackingId === trackingId),
}));

export default useOrderStore;

        
        const order = {
          id: orderId,
          trackingId,
          orderNumber: `#${orderId.substring(3)}`,
          status: 'placed',
          statusHistory: [
            {
              status: 'placed',
              date: new Date().toISOString(),
              message: 'Order placed successfully'
            }
          ],
          items: orderData.items,
          customer: orderData.customer,
          shippingAddress: orderData.shippingAddress,
          billingAddress: orderData.billingAddress || orderData.shippingAddress,
          paymentMethod: orderData.paymentMethod,
          paymentStatus: orderData.paymentStatus || 'pending',
          transactionId: orderData.transactionId || null,
          subtotal: orderData.subtotal,
          discount: orderData.discount || 0,
          rewardsDiscount: orderData.rewardsDiscount || 0,
          shippingCost: orderData.shippingCost || 0,
          total: orderData.total,
          rewardPointsEarned: orderData.rewardPointsEarned || 0,
          deliveryEstimate: orderData.deliveryEstimate,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          notes: orderData.notes || null
        };
        
        set({
          orders: [order, ...get().orders],
          currentOrder: order
        });
        
        toast.success('Order placed successfully!');
        return order;
      },
      
      // Update order status
      updateOrderStatus: (orderId, newStatus, message = null) => {
        const { orders } = get();
        const updatedOrders = orders.map(order => {
          if (order.id === orderId) {
            const statusEntry = {
              status: newStatus,
              date: new Date().toISOString(),
              message: message || `Order ${newStatus}`
            };
            
            return {
              ...order,
              status: newStatus,
              statusHistory: [...order.statusHistory, statusEntry],
              updatedAt: new Date().toISOString()
            };
          }
          return order;
        });
        
        set({ orders: updatedOrders });
        
        // Update currentOrder if it's the one being updated
        if (get().currentOrder?.id === orderId) {
          const updatedOrder = updatedOrders.find(o => o.id === orderId);
          set({ currentOrder: updatedOrder });
        }
        
        return updatedOrders.find(o => o.id === orderId);
      },
      
      // Get order by ID
      getOrderById: (orderId) => {
        return get().orders.find(order => order.id === orderId);
      },
      
      // Get order by tracking ID
      getOrderByTrackingId: (trackingId) => {
        return get().orders.find(order => order.trackingId === trackingId);
      },
      
      // Get order by order number
      getOrderByNumber: (orderNumber) => {
        return get().orders.find(order => order.orderNumber === orderNumber);
      },
      
      // Get orders by status
      getOrdersByStatus: (status) => {
        return get().orders.filter(order => order.status === status);
      },
      
      // Get recent orders
      getRecentOrders: (limit = 5) => {
        return get().orders.slice(0, limit);
      },
      
      // Cancel order
      cancelOrder: (orderId, reason = null) => {
        const { orders } = get();
        const order = orders.find(o => o.id === orderId);
        
        if (!order) {
          toast.error('Order not found');
          return { success: false, error: 'Order not found' };
        }
        
        if (['shipped', 'delivered', 'cancelled'].includes(order.status)) {
          toast.error('Cannot cancel order at this stage');
          return { success: false, error: 'Cannot cancel order at this stage' };
        }
        
        const updatedOrders = orders.map(o => {
          if (o.id === orderId) {
            return {
              ...o,
              status: 'cancelled',
              statusHistory: [
                ...o.statusHistory,
                {
                  status: 'cancelled',
                  date: new Date().toISOString(),
                  message: reason || 'Order cancelled by customer'
                }
              ],
              updatedAt: new Date().toISOString()
            };
          }
          return o;
        });
        
        set({ orders: updatedOrders });
        toast.success('Order cancelled successfully');
        return { success: true };
      },
      
      // Reorder (create new order from existing order)
      reorder: (orderId) => {
        const order = get().getOrderById(orderId);
        if (!order) {
          toast.error('Order not found');
          return null;
        }
        
        // Return order items for adding to cart
        return order.items;
      },
      
      // Simulate order progress (for demo purposes)
      simulateOrderProgress: (orderId) => {
        const { orderStatuses } = get();
        let currentStatusIndex = 0;
        
        const interval = setInterval(() => {
          if (currentStatusIndex < orderStatuses.length) {
            get().updateOrderStatus(orderId, orderStatuses[currentStatusIndex]);
            currentStatusIndex++;
          } else {
            clearInterval(interval);
          }
        }, 5000); // Update status every 5 seconds (for demo)
        
        return interval;
      },
      
      // Get order statistics
      getOrderStats: () => {
        const { orders } = get();
        return {
          total: orders.length,
          pending: orders.filter(o => o.status === 'placed').length,
          shipped: orders.filter(o => o.status === 'shipped').length,
          delivered: orders.filter(o => o.status === 'delivered').length,
          cancelled: orders.filter(o => o.status === 'cancelled').length,
          totalSpent: orders.reduce((sum, o) => sum + o.total, 0)
        };
      },
      
      // Clear all orders (for testing)
      clearOrders: () => {
        set({ orders: [], currentOrder: null });
      }
    }),
    {
      name: 'order-storage'
    }
  )
);

export default useOrderStore;
