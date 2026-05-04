// Utility helper functions for SS Herbal India

// Format price to Indian currency
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

// Calculate discount percentage
export const calculateDiscount = (originalPrice, discountPrice) => {
  const discount = ((originalPrice - discountPrice) / originalPrice) * 100;
  return Math.round(discount);
};

// Format date
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Truncate text
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Generate random ID
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Validate email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate phone number (Indian)
export const isValidPhone = (phone) => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

// Format phone number
export const formatPhoneNumber = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+91 ${cleaned.substring(0, 5)} ${cleaned.substring(5)}`;
  }
  return phone;
};

// Slugify text
export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};

// Calculate estimated delivery date
export const getEstimatedDelivery = (daysToAdd = 5) => {
  const date = new Date();
  date.setDate(date.getDate() + daysToAdd);
  return formatDate(date);
};

// Check if product is new (released in last 30 days)
export const isNewProduct = (createdDate) => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  return new Date(createdDate) > thirtyDaysAgo;
};

// Get shipping cost
export const getShippingCost = (total, freeShippingThreshold = 499) => {
  return total >= freeShippingThreshold ? 0 : 50;
};

// Calculate cart totals
export const calculateCartTotals = (items) => {
  const subtotal = items.reduce((total, item) => {
    const price = item.discountPrice || item.price;
    return total + (price * item.quantity);
  }, 0);

  const savings = items.reduce((total, item) => {
    if (item.discountPrice) {
      const itemSavings = (item.price - item.discountPrice) * item.quantity;
      return total + itemSavings;
    }
    return total;
  }, 0);

  const shipping = getShippingCost(subtotal);
  const total = subtotal + shipping;

  return {
    subtotal,
    savings,
    shipping,
    total,
  };
};

// Search products
export const searchProducts = (products, query) => {
  const searchTerm = query.toLowerCase();
  return products.filter(product =>
    product.name.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm) ||
    product.benefits.some(benefit => benefit.toLowerCase().includes(searchTerm))
  );
};

// Sort products
export const sortProducts = (products, sortBy) => {
  const sorted = [...products];
  
  switch (sortBy) {
    case 'price-low':
      return sorted.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
    case 'price-high':
      return sorted.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
    case 'rating':
      return sorted.sort((a, b) => b.averageRating - a.averageRating);
    case 'newest':
      return sorted.sort((a, b) => b.id - a.id);
    case 'popular':
      return sorted.sort((a, b) => b.totalSales - a.totalSales);
    default:
      return sorted;
  }
};

// Filter products by price range
export const filterByPriceRange = (products, min, max) => {
  return products.filter(product => {
    const price = product.discountPrice || product.price;
    return price >= min && price <= max;
  });
};

// Filter products by category
export const filterByCategory = (products, category) => {
  if (!category) return products;
  return products.filter(product => product.category === category);
};

// Filter products by rating
export const filterByRating = (products, minRating) => {
  return products.filter(product => product.averageRating >= minRating);
};

// Get products in stock
export const getInStockProducts = (products) => {
  return products.filter(product => product.stock > 0);
};

// Get low stock products
export const getLowStockProducts = (products, threshold = 10) => {
  return products.filter(product => product.stock > 0 && product.stock <= threshold);
};

export default {
  formatPrice,
  calculateDiscount,
  formatDate,
  truncateText,
  generateId,
  isValidEmail,
  isValidPhone,
  formatPhoneNumber,
  slugify,
  getEstimatedDelivery,
  isNewProduct,
  getShippingCost,
  calculateCartTotals,
  searchProducts,
  sortProducts,
  filterByPriceRange,
  filterByCategory,
  filterByRating,
  getInStockProducts,
  getLowStockProducts,
};
