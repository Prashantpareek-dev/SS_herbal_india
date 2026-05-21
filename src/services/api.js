import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api/v1';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// ─── Helper: read token from persisted userStore ──────────────────────────────
const getStoredToken = () => {
  try {
    return JSON.parse(localStorage.getItem('user-storage') || '{}')?.state?.token || null;
  } catch { return null; }
};

// ─── Request interceptor — auto-attach JWT ────────────────────────────────────
apiClient.interceptors.request.use(
  (config) => {
    const token = getStoredToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response interceptor — silent 401 token refresh ─────────────────────────
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const stored = JSON.parse(localStorage.getItem('user-storage') || '{}');
        const refreshToken = stored?.state?.refreshToken;
        if (refreshToken) {
          const res = await axios.post(`${BASE_URL}/client/auth/refresh-token`, { refreshToken });
          const newToken = res.data?.data?.token;
          if (newToken) {
            stored.state.token = newToken;
            localStorage.setItem('user-storage', JSON.stringify(stored));
            original.headers.Authorization = `Bearer ${newToken}`;
            return apiClient(original);
          }
        }
      } catch {}
    }
    return Promise.reject(error);
  }
);

// ─── Hero Banners ─────────────────────────────────────────────────────────────
export const fetchHeroBanners = (placement = 'homepage_hero') =>
  apiClient.get('/hero-banners', { params: { placement } }).then(r => r.data);
export const trackBannerClick = (id) =>
  apiClient.post(`/hero-banners/${id}/click`).then(r => r.data);

// ─── Products ─────────────────────────────────────────────────────────────────
export const fetchProducts = (params = {}) =>
  apiClient.get('/products', { params }).then(r => r.data);
export const fetchFeaturedProducts = (limit = 12) =>
  apiClient.get('/products/featured', { params: { limit } }).then(r => r.data);
export const fetchNewLaunches = (limit = 12) =>
  apiClient.get('/products/new-launches', { params: { limit } }).then(r => r.data);
export const fetchBestSellers = (limit = 12) =>
  apiClient.get('/products/best-sellers', { params: { limit } }).then(r => r.data);
export const fetchProductsByCategory = (slug, params = {}) =>
  apiClient.get(`/products/by-category/${slug}`, { params }).then(r => r.data);
export const fetchProductBySlug = (slug) =>
  apiClient.get(`/products/${slug}`).then(r => r.data);

// ─── Blogs ────────────────────────────────────────────────────────────────────
export const fetchBlogs = (params = {}) =>
  apiClient.get('/blogs', { params }).then(r => r.data);
export const fetchFeaturedBlogs = (limit = 6) =>
  apiClient.get('/blogs/featured', { params: { limit } }).then(r => r.data);
export const fetchNewLaunchBlogs = (limit = 6) =>
  apiClient.get('/blogs/new-launches', { params: { limit } }).then(r => r.data);
export const fetchBlogBySlug = (slug) =>
  apiClient.get(`/blogs/${slug}`).then(r => r.data);

// ─── Reviews ─────────────────────────────────────────────────────────────────
export const fetchProductReviews = (productId, params = {}) =>
  apiClient.get(`/reviews/product/${productId}`, { params }).then(r => r.data);
export const markReviewHelpful = (reviewId) =>
  apiClient.post(`/reviews/${reviewId}/helpful`).then(r => r.data);
export const submitReview = (body) =>
  apiClient.post('/reviews', body).then(r => r.data);

// ─── Testimonials ─────────────────────────────────────────────────────────────
export const fetchTestimonials = (params = {}) =>
  apiClient.get('/testimonials', { params }).then(r => r.data);
export const fetchVideoTestimonials = (limit = 8) =>
  apiClient.get('/testimonials/videos', { params: { limit } }).then(r => r.data);
export const fetchTestimonialsByProduct = (productId) =>
  apiClient.get(`/testimonials/by-product/${productId}`).then(r => r.data);

// ─── Landing Pages ────────────────────────────────────────────────────────────
export const fetchLandingPageBySlug = (slug) =>
  apiClient.get(`/landing-pages/slug/${slug}`).then(r => r.data);
export const fetchLandingPageByProductId = (productId) =>
  apiClient.get(`/landing-pages/product/${productId}`).then(r => r.data);

// ─── Categories ───────────────────────────────────────────────────────────────
export const fetchCategories = (params = {}) =>
  apiClient.get('/categories', { params }).then(r => r.data);
export const fetchCategoryBySlug = (slug) =>
  apiClient.get(`/categories/${slug}`).then(r => r.data);

// ═════════════════════════════════════════════════════════════════════════════
// CLIENT (Authenticated) APIs
// ═════════════════════════════════════════════════════════════════════════════

// ─── Auth ─────────────────────────────────────────────────────────────────────
export const authRegister = (body) =>
  apiClient.post('/client/auth/register', body).then(r => r.data);
export const authLogin = (email, password) =>
  apiClient.post('/client/auth/login', { email, password }).then(r => r.data);
export const authLogout = () =>
  apiClient.post('/client/auth/logout').then(r => r.data);
export const authRefreshToken = (refreshToken) =>
  apiClient.post('/client/auth/refresh-token', { refreshToken }).then(r => r.data);
export const authForgotPassword = (email) =>
  apiClient.post('/client/auth/forgot-password', { email }).then(r => r.data);
export const authResetPassword = (token, password) =>
  apiClient.post(`/client/auth/reset-password/${token}`, { password }).then(r => r.data);
export const authChangePassword = (currentPassword, newPassword) =>
  apiClient.put('/client/auth/change-password', { currentPassword, newPassword }).then(r => r.data);

// ─── Profile ─────────────────────────────────────────────────────────────────
export const getProfile = () =>
  apiClient.get('/client/profile').then(r => r.data);
export const updateProfile = (body) =>
  apiClient.put('/client/profile', body).then(r => r.data);
export const getRewardPoints = () =>
  apiClient.get('/client/profile/reward-points').then(r => r.data);

// ─── Addresses ───────────────────────────────────────────────────────────────
export const getAddresses = () =>
  apiClient.get('/client/addresses').then(r => r.data);
export const addAddressApi = (body) =>
  apiClient.post('/client/addresses', body).then(r => r.data);
export const updateAddressApi = (id, body) =>
  apiClient.put(`/client/addresses/${id}`, body).then(r => r.data);
export const setDefaultAddressApi = (id) =>
  apiClient.patch(`/client/addresses/${id}/set-default`).then(r => r.data);
export const deleteAddressApi = (id) =>
  apiClient.delete(`/client/addresses/${id}`).then(r => r.data);

// ─── Wishlist ─────────────────────────────────────────────────────────────────
export const getWishlist = () =>
  apiClient.get('/client/wishlist').then(r => r.data);
export const addToWishlistApi = (productId) =>
  apiClient.post('/client/wishlist', { productId }).then(r => r.data);
export const toggleWishlistApi = (productId) =>
  apiClient.post('/client/wishlist/toggle', { productId }).then(r => r.data);
export const checkWishlistApi = (productId) =>
  apiClient.get(`/client/wishlist/check/${productId}`).then(r => r.data);
export const removeFromWishlistApi = (id) =>
  apiClient.delete(`/client/wishlist/${id}`).then(r => r.data);

// ─── Cart ─────────────────────────────────────────────────────────────────────
export const getCart = () =>
  apiClient.get('/client/cart').then(r => r.data);
export const addCartItem = (productId, variantId, quantity = 1) =>
  apiClient.post('/client/cart/items', {
    productId,
    ...(variantId && { variantId }),
    quantity,
  }).then(r => r.data);
export const updateCartItem = (itemId, quantity) =>
  apiClient.put(`/client/cart/items/${itemId}`, { quantity }).then(r => r.data);
export const removeCartItem = (itemId) =>
  apiClient.delete(`/client/cart/items/${itemId}`).then(r => r.data);
export const clearCartApi = () =>
  apiClient.delete('/client/cart').then(r => r.data);
export const applyCouponApi = (code) =>
  apiClient.post('/client/cart/coupon', { code }).then(r => r.data);
export const removeCouponApi = () =>
  apiClient.delete('/client/cart/coupon').then(r => r.data);

// ─── Orders ──────────────────────────────────────────────────────────────────
export const placeOrderApi = (body) =>
  apiClient.post('/client/orders', body).then(r => r.data);
export const verifyPaymentApi = (orderId, body) =>
  apiClient.post(`/client/orders/${orderId}/payment/verify`, body).then(r => r.data);
export const getOrdersApi = (params = {}) =>
  apiClient.get('/client/orders', { params }).then(r => r.data);
export const getOrderByIdApi = (id) =>
  apiClient.get(`/client/orders/${id}`).then(r => r.data);
export const trackOrderApi = (orderNumber) =>
  apiClient.get(`/client/orders/track/${orderNumber}`).then(r => r.data);
export const cancelOrderApi = (id, reason) =>
  apiClient.post(`/client/orders/${id}/cancel`, { reason }).then(r => r.data);

export default apiClient;
