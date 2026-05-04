// Demo product data for SS Herbal India
import { getProductReviews } from './reviews';

export const demoProducts = [
  {
    id: 1,
    name: "Ashwagandha Capsules - Stress Relief & Energy",
    slug: "ashwagandha-capsules",
    sku: "SSH-ASH-500",
    shortDescription: "Pure Ashwagandha extract for stress relief, better sleep & enhanced vitality",
    longDescription: "Premium quality Ashwagandha capsules made from organic Withania Somnifera root extract. Clinically proven to reduce stress, improve sleep quality, and boost energy levels naturally.",
    
    problemsSolved: [
      "Chronic stress and anxiety",
      "Poor sleep quality and insomnia",
      "Low energy and fatigue",
      "Weak immunity",
      "Mental fog and concentration issues"
    ],
    
    howItWorks: "Ashwagandha is an adaptogenic herb that helps your body manage stress by regulating cortisol levels. It supports the adrenal glands, promotes relaxation, and enhances overall vitality. The withanolides in Ashwagandha work on the nervous system to calm the mind while simultaneously boosting physical energy.",
    
    price: 999,
    discountPrice: 749,
    discountPercentage: 25,
    
    category: "Stress & Immunity",
    benefits: ["Stress Relief", "Better Sleep", "Energy Boost", "Immunity"],
    
    ingredients: [
      {
        name: "Ashwagandha Extract",
        quantity: "500mg",
        description: "Standardized to 5% withanolides for maximum potency"
      },
      {
        name: "Black Pepper Extract",
        quantity: "5mg",
        description: "Enhances bioavailability and absorption"
      }
    ],
    
    howToUse: "Take 1-2 capsules daily with water after meals, or as directed by your healthcare practitioner. For best results, use consistently for at least 8-12 weeks.",
    
    dosage: "1-2 capsules daily",
    warnings: "Consult physician if pregnant, nursing, or on medication. Keep out of reach of children.",
    
    images: [
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800",
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=800",
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800",
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800"
    ],
    
    variants: [
      { name: "30 Capsules", price: 499, discountPrice: 399, stock: 50 },
      { name: "60 Capsules", price: 999, discountPrice: 749, stock: 100 },
      { name: "120 Capsules", price: 1899, discountPrice: 1299, stock: 75 }
    ],
    
    stock: 100,
    certifications: ["GMP", "ISO 22000", "FSSAI", "Organic Certified"],
    
    averageRating: 4.5,
    totalReviews: 245,
    totalSales: 1200,
    
    isActive: true,
    isFeatured: true,
    isNewArrival: false,
    
    relatedProducts: [2, 3, 4],
    upsellProducts: [5, 6]
  },
  
  {
    id: 2,
    name: "Triphala Tablets - Digestive Wellness",
    slug: "triphala-tablets",
    sku: "SSH-TRI-600",
    shortDescription: "Ancient Ayurvedic blend for healthy digestion and detoxification",
    longDescription: "Traditional Triphala formulation combining three powerful fruits (Amalaki, Bibhitaki, Haritaki) for complete digestive health, gentle detoxification, and immunity boost.",
    
    problemsSolved: [
      "Digestive issues and constipation",
      "Toxin buildup in the body",
      "Weak digestion and metabolism",
      "Bloating and gas",
      "Irregular bowel movements"
    ],
    
    howItWorks: "Triphala works synergistically to cleanse the digestive tract, eliminate toxins (ama), regulate bowel movements, and strengthen the digestive fire (Agni). The three fruits balance all three doshas (Vata, Pitta, Kapha) and provide powerful antioxidants for overall health.",
    
    price: 599,
    discountPrice: 449,
    discountPercentage: 25,
    
    category: "Digestive Health",
    benefits: ["Digestive Health", "Detox", "Immunity", "Antioxidant"],
    
    ingredients: [
      { name: "Amalaki (Indian Gooseberry)", quantity: "200mg", description: "Rich in Vitamin C and antioxidants" },
      { name: "Bibhitaki", quantity: "200mg", description: "Powerful detoxifying properties" },
      { name: "Haritaki", quantity: "200mg", description: "Supports digestive function" }
    ],
    
    howToUse: "Take 1-2 tablets before bedtime with warm water for best results. Can also be taken in the morning for detoxification.",
    dosage: "1-2 tablets daily",
    warnings: "Not recommended during pregnancy. Consult healthcare provider if on medication.",
    
    images: [
      "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=800",
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800",
      "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=800"
    ],
    
    variants: [
      { name: "60 Tablets", price: 599, discountPrice: 449, stock: 80 },
      { name: "120 Tablets", price: 1099, discountPrice: 799, stock: 60 }
    ],
    
    stock: 80,
    certifications: ["GMP", "ISO 22000", "FSSAI"],
    
    averageRating: 4.7,
    totalReviews: 312,
    totalSales: 980,
    
    isActive: true,
    isFeatured: true,
    isNewArrival: false,
    
    relatedProducts: [1, 3, 7],
    upsellProducts: [4, 5]
  },

  {
    id: 3,
    name: "Tulsi Drops - Immunity Booster",
    slug: "tulsi-drops",
    sku: "SSH-TUL-100",
    shortDescription: "Holy Basil extract for immunity, respiratory health & stress relief",
    longDescription: "Pure Tulsi (Holy Basil) extract drops with powerful immune-boosting and adaptogenic properties. Perfect for daily wellness and respiratory support.",
    
    problemsSolved: [
      "Weak immune system",
      "Frequent colds and cough",
      "Respiratory infections",
      "Stress and anxiety",
      "Seasonal allergies"
    ],
    
    howItWorks: "Tulsi is a powerful immunomodulator that enhances your body's natural defense mechanisms. Its anti-inflammatory, antibacterial, and antiviral properties protect against infections while its adaptogenic nature helps manage stress.",
    
    price: 299,
    discountPrice: 249,
    discountPercentage: 17,
    
    category: "Immunity",
    benefits: ["Immunity Boost", "Respiratory Health", "Stress Relief", "Antioxidant"],
    
    ingredients: [
      { name: "Tulsi (Holy Basil) Extract", quantity: "500mg/ml", description: "Standardized extract from 5 varieties of Tulsi" },
      { name: "Purified Water", quantity: "Base", description: "As a carrier medium" }
    ],
    
    howToUse: "Add 5-10 drops to a glass of water or tea, twice daily. Can also be consumed directly under the tongue.",
    dosage: "5-10 drops twice daily",
    warnings: "Consult healthcare provider if pregnant or nursing. Not for children under 5 years.",
    
    images: [
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800",
      "https://images.unsplash.com/photo-1602147131717-7abb2b99f917?w=800"
    ],
    
    variants: [
      { name: "30ml", price: 299, discountPrice: 249, stock: 120 },
      { name: "50ml", price: 499, discountPrice: 399, stock: 90 }
    ],
    
    stock: 120,
    certifications: ["GMP", "FSSAI", "Organic Certified"],
    
    averageRating: 4.6,
    totalReviews: 189,
    totalSales: 1450,
    
    isActive: true,
    isFeatured: true,
    isNewArrival: false,
    
    relatedProducts: [1, 2, 4],
    upsellProducts: [6, 7]
  },

  {
    id: 4,
    name: "Giloy Juice - Natural Immunity Shield",
    slug: "giloy-juice",
    sku: "SSH-GIL-500",
    shortDescription: "Pure Giloy juice for immunity, fever management & detoxification",
    longDescription: "100% natural Giloy (Guduchi) juice extracted from fresh stems. Known as 'Amrita' in Ayurveda for its life-giving properties and powerful immune support.",
    
    problemsSolved: [
      "Recurrent fever and infections",
      "Low immunity",
      "Chronic fatigue",
      "Toxin accumulation",
      "Allergic conditions"
    ],
    
    howItWorks: "Giloy is a potent immunomodulator that enhances white blood cell function and antibody production. It purifies blood, removes toxins, fights infections, and strengthens overall immunity naturally.",
    
    price: 399,
    discountPrice: 299,
    discountPercentage: 25,
    
    category: "Immunity",
    benefits: ["Immunity Boost", "Fever Management", "Blood Purification", "Detox"],
    
    ingredients: [
      { name: "Giloy (Tinospora Cordifolia)", quantity: "99%", description: "Fresh stem juice extract" },
      { name: "Natural Preservative", quantity: "1%", description: "For freshness" }
    ],
    
    howToUse: "Take 20-30ml mixed with equal quantity of water on an empty stomach daily, or as directed by physician.",
    dosage: "20-30ml daily",
    warnings: "Consult physician if on immunosuppressants. Store in a cool, dry place.",
    
    images: [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800",
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800"
    ],
    
    variants: [
      { name: "500ml", price: 399, discountPrice: 299, stock: 60 },
      { name: "1 Liter", price: 699, discountPrice: 549, stock: 40 }
    ],
    
    stock: 60,
    certifications: ["GMP", "ISO 22000", "FSSAI"],
    
    averageRating: 4.4,
    totalReviews: 156,
    totalSales: 780,
    
    isActive: true,
    isFeatured: false,
    isNewArrival: false,
    
    relatedProducts: [3, 5, 6],
    upsellProducts: [1, 2]
  },

  {
    id: 5,
    name: "Amla Juice - Vitamin C Powerhouse",
    slug: "amla-juice",
    sku: "SSH-AML-500",
    shortDescription: "Pure Indian Gooseberry juice for immunity, skin & hair health",
    longDescription: "Fresh Amla (Indian Gooseberry) juice packed with Vitamin C and antioxidants. Supports immunity, enhances skin radiance, and promotes healthy hair growth.",
    
    problemsSolved: [
      "Vitamin C deficiency",
      "Weak immunity",
      "Hair fall and graying",
      "Dull skin and aging",
      "Poor digestion"
    ],
    
    howItWorks: "Amla is one of the richest natural sources of Vitamin C. It boosts collagen production, strengthens immunity, nourishes hair follicles, and provides powerful antioxidant protection against cellular damage.",
    
    price: 349,
    discountPrice: 279,
    discountPercentage: 20,
    
    category: "Wellness",
    benefits: ["Immunity", "Hair Care", "Skin Health", "Antioxidant"],
    
    ingredients: [
      { name: "Amla (Indian Gooseberry)", quantity: "99%", description: "Fresh fruit juice extract" },
      { name: "Natural Preservative", quantity: "1%", description: "Maintains freshness" }
    ],
    
    howToUse: "Take 20-30ml mixed with equal quantity of water on an empty stomach daily. Can be mixed with honey for taste.",
    dosage: "20-30ml daily",
    warnings: "Refrigerate after opening. Consume within 45 days of opening.",
    
    images: [
      "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=800",
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800"
    ],
    
    variants: [
      { name: "500ml", price: 349, discountPrice: 279, stock: 85 },
      { name: "1 Liter", price: 599, discountPrice: 499, stock: 55 }
    ],
    
    stock: 85,
    certifications: ["GMP", "FSSAI", "Organic Certified"],
    
    averageRating: 4.8,
    totalReviews: 423,
    totalSales: 1650,
    
    isActive: true,
    isFeatured: true,
    isNewArrival: false,
    
    relatedProducts: [4, 6, 7],
    upsellProducts: [1, 3]
  },

  {
    id: 6,
    name: "Shilajit Resin - Energy & Vitality",
    slug: "shilajit-resin",
    sku: "SSH-SHI-050",
    shortDescription: "Himalayan Shilajit for stamina, strength & overall wellness",
    longDescription: "Pure Himalayan Shilajit resin with 85+ minerals and fulvic acid. Revered in Ayurveda as the 'Conqueror of Mountains' for its rejuvenating properties.",
    
    problemsSolved: [
      "Low energy and stamina",
      "Physical weakness",
      "Cognitive decline",
      "Nutrient deficiency",
      "Premature aging"
    ],
    
    howItWorks: "Shilajit contains fulvic acid and 85+ trace minerals that enhance cellular energy production (ATP), improve nutrient absorption, support cognitive function, and provide powerful anti-aging benefits.",
    
    price: 1499,
    discountPrice: 1199,
    discountPercentage: 20,
    
    category: "Energy & Vitality",
    benefits: ["Energy Boost", "Stamina", "Cognitive Support", "Anti-Aging"],
    
    ingredients: [
      { name: "Pure Himalayan Shilajit", quantity: "100%", description: "Standardized to 60% fulvic acid" }
    ],
    
    howToUse: "Dissolve a pea-sized portion (300-500mg) in warm water or milk. Consume once daily on an empty stomach.",
    dosage: "300-500mg daily",
    warnings: "Consult physician if you have high blood pressure or heart conditions. Not for children.",
    
    images: [
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800",
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800"
    ],
    
    variants: [
      { name: "15g", price: 899, discountPrice: 699, stock: 45 },
      { name: "30g", price: 1499, discountPrice: 1199, stock: 30 },
      { name: "50g", price: 2299, discountPrice: 1799, stock: 20 }
    ],
    
    stock: 30,
    certifications: ["GMP", "ISO 22000", "Lab Tested"],
    
    averageRating: 4.9,
    totalReviews: 567,
    totalSales: 890,
    
    isActive: true,
    isFeatured: true,
    isNewArrival: true,
    
    relatedProducts: [1, 5, 8],
    upsellProducts: [2, 4]
  },

  {
    id: 7,
    name: "Brahmi Capsules - Brain Tonic",
    slug: "brahmi-capsules",
    sku: "SSH-BRA-400",
    shortDescription: "Memory enhancer & cognitive support for mental clarity",
    longDescription: "Premium Brahmi (Bacopa Monnieri) capsules for enhanced memory, focus, and cognitive function. Traditional Ayurvedic brain tonic for students and professionals.",
    
    problemsSolved: [
      "Poor memory and concentration",
      "Mental fatigue",
      "Learning difficulties",
      "Stress-induced cognitive decline",
      "Anxiety and restlessness"
    ],
    
    howItWorks: "Brahmi contains bacosides that enhance neurotransmitter activity, improve synaptic communication, and protect brain cells from oxidative stress. It supports memory formation, recall, and overall cognitive performance.",
    
    price: 699,
    discountPrice: 549,
    discountPercentage: 21,
    
    category: "Brain Health",
    benefits: ["Memory", "Focus", "Cognitive Support", "Stress Relief"],
    
    ingredients: [
      { name: "Brahmi Extract", quantity: "400mg", description: "Standardized to 20% bacosides" },
      { name: "Shankhpushpi", quantity: "50mg", description: "Synergistic brain tonic" }
    ],
    
    howToUse: "Take 1-2 capsules daily after meals with water. Best results seen with consistent use for 2-3 months.",
    dosage: "1-2 capsules daily",
    warnings: "Consult physician if pregnant or nursing. May cause mild drowsiness initially.",
    
    images: [
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=800",
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800"
    ],
    
    variants: [
      { name: "60 Capsules", price: 699, discountPrice: 549, stock: 70 },
      { name: "120 Capsules", price: 1299, discountPrice: 999, stock: 50 }
    ],
    
    stock: 70,
    certifications: ["GMP", "ISO 22000", "FSSAI"],
    
    averageRating: 4.5,
    totalReviews: 278,
    totalSales: 1120,
    
    isActive: true,
    isFeatured: false,
    isNewArrival: false,
    
    relatedProducts: [1, 3, 6],
    upsellProducts: [5, 8]
  },

  {
    id: 8,
    name: "Chyawanprash - Complete Immunity Formula",
    slug: "chyawanprash",
    sku: "SSH-CHY-500",
    shortDescription: "Traditional Ayurvedic jam with 40+ herbs for immunity & vitality",
    longDescription: "Classic Chyawanprash recipe with Amla and 40+ potent herbs. Complete wellness solution for immunity, energy, and longevity for the entire family.",
    
    problemsSolved: [
      "Weak immunity in all age groups",
      "Frequent seasonal infections",
      "Low energy and vitality",
      "Nutritional gaps",
      "Weak respiratory system"
    ],
    
    howItWorks: "Chyawanprash is a synergistic blend of 40+ herbs led by Amla (rich in Vitamin C) that work together to strengthen immunity, enhance energy, support respiratory health, and promote overall vitality and longevity.",
    
    price: 499,
    discountPrice: 399,
    discountPercentage: 20,
    
    category: "Family Wellness",
    benefits: ["Immunity", "Energy", "Respiratory Health", "Nutrition"],
    
    ingredients: [
      { name: "Amla (Indian Gooseberry)", quantity: "Primary", description: "Rich source of Vitamin C" },
      { name: "40+ Ayurvedic Herbs", quantity: "Blend", description: "Including Ashwagandha, Giloy, Tulsi, etc." },
      { name: "Honey & Ghee", quantity: "Base", description: "Natural sweetener and carrier" }
    ],
    
    howToUse: "Take 1-2 teaspoons twice daily with warm milk or water. Suitable for all age groups above 3 years.",
    dosage: "1-2 teaspoons twice daily",
    warnings: "Diabetics should consult physician due to sugar content. Store in a cool, dry place.",
    
    images: [
      "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=800",
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800"
    ],
    
    variants: [
      { name: "500g", price: 499, discountPrice: 399, stock: 95 },
      { name: "1 Kg", price: 899, discountPrice: 749, stock: 65 }
    ],
    
    stock: 95,
    certifications: ["GMP", "ISO 22000", "FSSAI"],
    
    averageRating: 4.7,
    totalReviews: 892,
    totalSales: 2340,
    
    isActive: true,
    isFeatured: true,
    isNewArrival: false,
    
    relatedProducts: [3, 4, 5],
    upsellProducts: [1, 6]
  }
];

// Get product by ID
export const getProductById = (id) => {
  return demoProducts.find(product => product.id === parseInt(id));
};

// Get product by slug
export const getProductBySlug = (slug) => {
  const product = demoProducts.find(product => product.slug === slug);
  if (product) {
    return {
      ...product,
      reviews: getProductReviews(product.id)
    };
  }
  return null;
};

// Get featured products
export const getFeaturedProducts = () => {
  return demoProducts.filter(product => product.isFeatured);
};

// Get products by category
export const getProductsByCategory = (category) => {
  return demoProducts.filter(product => product.category === category);
};

// Get related products
export const getRelatedProducts = (productId) => {
  const product = getProductById(productId);
  if (!product) return [];
  return product.relatedProducts.map(id => getProductById(id)).filter(Boolean);
};

// Get upsell products
export const getUpsellProducts = (productId) => {
  const product = getProductById(productId);
  if (!product) return [];
  return product.upsellProducts.map(id => getProductById(id)).filter(Boolean);
};
