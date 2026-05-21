// Combo offers and product bundles

export const comboOffers = [
  {
    id: 1,
    name: 'Complete Immunity Booster Pack',
    description: 'Triple power for enhanced immunity and vitality',
    productIds: [1, 3, 4], // Ashwagandha, Giloy, Shilajit
    tagline: 'Save ₹500 on this powerful combo',
    benefits: [
      'Comprehensive immune system support',
      'Enhanced energy and stamina',
      'Stress relief and better sleep',
      '3-month wellness program'
    ],
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800',
    originalPrice: 2497,
    discountedPrice: 1997,
    savings: 500,
    savingsPercentage: 20,
    badge: 'BESTSELLER',
    validUntil: '2026-05-31',
    stock: 50,
    isActive: true
  },
  {
    id: 2,
    name: 'Digestive Wellness Duo',
    description: 'Complete solution for digestive health',
    productIds: [2, 6], // Triphala, Brahmi
    tagline: 'Get healthy digestion + mental clarity',
    benefits: [
      'Improved digestion and metabolism',
      'Better nutrient absorption',
      'Enhanced mental focus',
      'Natural detoxification'
    ],
    image: 'https://images.unsplash.com/photo-1505751104628-0d8b9e241b9f?w=800',
    originalPrice: 1748,
    discountedPrice: 1399,
    savings: 349,
    savingsPercentage: 20,
    badge: 'POPULAR',
    validUntil: '2026-05-31',
    stock: 75,
    isActive: true
  },
  {
    id: 3,
    name: 'Hair & Skin Radiance Kit',
    description: 'Natural beauty from inside out',
    productIds: [5, 7], // Hair Oil, Turmeric Face Pack
    tagline: 'Complete care for hair and skin',
    benefits: [
      'Reduced hair fall',
      'Stronger, shinier hair',
      'Clear, glowing skin',
      'Natural ingredients only'
    ],
    image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800',
    originalPrice: 1148,
    discountedPrice: 899,
    savings: 249,
    savingsPercentage: 22,
    badge: 'LIMITED OFFER',
    validUntil: '2026-05-15',
    stock: 30,
    isActive: true
  },
  {
    id: 4,
    name: 'Senior Care Complete Pack',
    description: 'Comprehensive wellness for seniors',
    productIds: [1, 2, 8], // Ashwagandha, Triphala, Joint Care
    tagline: 'Joint health + Digestion + Immunity',
    benefits: [
      'Joint pain relief',
      'Improved mobility',
      'Better digestion',
      'Enhanced immunity',
      'Overall vitality boost'
    ],
    image: 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=800',
    originalPrice: 2247,
    discountedPrice: 1799,
    savings: 448,
    savingsPercentage: 20,
    badge: 'SENIOR SPECIAL',
    validUntil: '2026-06-30',
    stock: 40,
    isActive: true
  },
  {
    id: 5,
    name: 'Brain Boost Bundle',
    description: 'Enhance memory, focus, and mental clarity',
    productIds: [6, 1], // Brahmi, Ashwagandha
    tagline: 'Perfect for students and professionals',
    benefits: [
      'Improved memory and retention',
      'Better concentration',
      'Reduced mental fatigue',
      'Stress management',
      'Enhanced productivity'
    ],
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800',
    originalPrice: 1748,
    discountedPrice: 1399,
    savings: 349,
    savingsPercentage: 20,
    badge: 'STUDENT SPECIAL',
    validUntil: '2026-05-31',
    stock: 60,
    isActive: true
  },
  {
    id: 6,
    name: 'Energy & Vitality Max Pack',
    description: 'Ultimate energy booster for active lifestyle',
    productIds: [1, 4], // Ashwagandha, Shilajit
    tagline: 'Natural energy without caffeine crash',
    benefits: [
      'Sustained energy throughout the day',
      'Improved stamina',
      'Faster recovery',
      'Better athletic performance',
      'Enhanced vitality'
    ],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
    originalPrice: 1748,
    discountedPrice: 1499,
    savings: 249,
    savingsPercentage: 14,
    badge: 'FITNESS',
    validUntil: '2026-05-31',
    stock: 45,
    isActive: true
  }
];

// Get combo by ID
export const getComboById = (id) => {
  return comboOffers.find(combo => combo.id === id);
};

// Get active combos
export const getActiveCombos = () => {
  const today = new Date();
  return comboOffers.filter(combo => {
    if (!combo.isActive) return false;
    const validUntil = new Date(combo.validUntil);
    return validUntil >= today;
  });
};

// Get combos containing a product
export const getCombosForProduct = (productId) => {
  return comboOffers.filter(combo => 
    combo.productIds.includes(productId) && combo.isActive
  );
};

// Calculate combo savings
export const calculateComboSavings = (comboId) => {
  const combo = getComboById(comboId);
  if (!combo) return 0;
  return combo.savings;
};
