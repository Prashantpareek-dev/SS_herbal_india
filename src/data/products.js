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
      "/Products/3.png",
      "/Products/3.png",
      "/Products/3.png"
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
    upsellProducts: [5, 6],
    
    // New fields for enhanced e-commerce
    colorVariants: [], // Capsules don't have color variants
    concerns: [1, 3, 4, 9], // Stress & Anxiety, Low Energy, Weak Immunity, Sleep Problems
    rewardPoints: 75, // Points earned on purchase (10% of discount price)
    influencerEndorsements: [1, 6], // Dr. Priya, Arjun
    comboOffers: [1, 4, 5, 6] // Part of multiple combos
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
      "/Products/2.png",
      "/Products/2.png",
      "/Products/2.png"
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
    upsellProducts: [4, 5],
    
    // New fields for enhanced e-commerce
    colorVariants: [], // Tablets don't have color variants
    concerns: [2, 10, 11], // Digestive Issues, Diabetes Management, Weight Management
    rewardPoints: 45, // Points earned on purchase
    influencerEndorsements: [3], // Anjali Desai
    comboOffers: [2, 4] // Part of Digestive Wellness Duo, Senior Care Pack
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
      "/Products/1.png",
      "/Products/1.png",
      "/Products/1.png"
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
    upsellProducts: [6, 7],
    
    // New fields for enhanced e-commerce
    colorVariants: [], // Drops don't have color variants
    concerns: [4, 1], // Weak Immunity, Stress & Anxiety
    rewardPoints: 25, // Points earned on purchase
    influencerEndorsements: [4], // Dr. Rajesh Kumar
    comboOffers: [1] // Part of Complete Immunity Booster Pack
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
      "/Products/4.png",
      "/Products/4.png",
      "/Products/4.png"
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
    isFeatured: true,
    isNewArrival: false,
    
    relatedProducts: [3, 5, 6],
    upsellProducts: [1, 2],
    
    // New fields for enhanced e-commerce
    colorVariants: [], // Juice doesn't have color variants
    concerns: [4], // Weak Immunity
    rewardPoints: 30, // Points earned on purchase
    influencerEndorsements: [4], // Dr. Rajesh Kumar  
    comboOffers: [1] // Part of Complete Immunity Booster Pack
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
      "/Products/5.png",
      "/Products/5.png",
      "/Products/5.png"
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
    upsellProducts: [1, 3],
    
    // New fields for enhanced e-commerce
    colorVariants: [], // Juice doesn't have color variants
    concerns: [4, 6], // Weak Immunity, Skin Problems
    rewardPoints: 28, // Points earned on purchase
    influencerEndorsements: [5], // Neha Kapoor
    comboOffers: [3] // Part of Hair & Skin Radiance Kit
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
      "/Products/9.png",
      "/Products/9.png",
      "/Products/9.png"
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
    isFeatured: false,
    isNewArrival: false,
    
    relatedProducts: [1, 5, 8],
    upsellProducts: [2, 4],
    
    // New fields for enhanced e-commerce
    colorVariants: [], // Resin doesn't have color variants
    concerns: [3, 12, 11], // Low Energy & Fatigue, Hormonal Imbalance, Weight Management
    rewardPoints: 120, // Points earned on purchase
    influencerEndorsements: [2], // Rohan Mehta
    comboOffers: [1, 6] // Part of Complete Immunity Booster Pack, Energy & Vitality Max Pack
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
      "/Products/6.png",
      "/Products/6.png",
      "/Products/6.png"
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
    upsellProducts: [5, 8],
    
    // New fields for enhanced e-commerce
    colorVariants: [], // Capsules don't have color variants
    concerns: [7, 1], // Poor Memory & Focus, Stress & Anxiety
    rewardPoints: 55, // Points earned on purchase
    influencerEndorsements: [1, 6], // Dr. Priya Sharma, Arjun Singh
    comboOffers: [2, 5] // Part of Digestive Wellness Duo, Brain Boost Bundle
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
      "/Products/8.png",
      "/Products/8.png",
      "/Products/8.png"
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
    isFeatured: false,
    isNewArrival: true,
    
    relatedProducts: [3, 4, 5],
    upsellProducts: [1, 6],
    
    // New fields for enhanced e-commerce
    colorVariants: [], // Jam doesn't have color variants
    concerns: [4, 3, 8], // Weak Immunity, Low Energy, Joint & Bone Pain
    rewardPoints: 40, // Points earned on purchase
    influencerEndorsements: [1, 4], // Dr. Priya Sharma, Dr. Rajesh Kumar
    comboOffers: [4] // Part of Senior Care Complete Pack
  },

  {
    id: 9,
    name: "Noni Juice - Antioxidant Powerhouse",
    slug: "noni-juice",
    sku: "SSH-NON-500",
    shortDescription: "Premium Noni fruit juice with Garcinia & Ashwagandha for wellness",
    longDescription: "100% natural Noni juice enriched with Garcinia and Ashwagandha. Rich in antioxidants, biotin, and Vitamin C for complete health support.",
    
    problemsSolved: [
      "Free radical damage",
      "Low immunity",
      "Poor metabolism",
      "Stress and fatigue",
      "Nutritional deficiency"
    ],
    
    howItWorks: "Noni juice contains powerful antioxidants, biotin, and vitamins that protect cells from oxidative stress, boost immunity, enhance metabolism, and provide essential nutrition for overall wellness.",
    
    price: 549,
    discountPrice: 449,
    discountPercentage: 18,
    
    category: "Wellness",
    benefits: ["Antioxidant", "Immunity", "Metabolism", "Stress Relief"],
    
    ingredients: [
      { name: "Noni Fruit Extract", quantity: "60%", description: "Rich in antioxidants and nutrients" },
      { name: "Garcinia Extract", quantity: "20%", description: "Supports metabolism" },
      { name: "Ashwagandha Extract", quantity: "15%", description: "Adaptogenic support" },
      { name: "Natural Preservatives", quantity: "5%", description: "For freshness" }
    ],
    
    howToUse: "Take 30ml mixed with equal water, twice daily before meals for best results.",
    dosage: "30ml twice daily",
    warnings: "Refrigerate after opening. Consult physician if pregnant or on medication.",
    
    images: [
      "/Products/7.png",
      "/Products/7.png",
      "/Products/7.png"
    ],
    
    variants: [
      { name: "500ml", price: 549, discountPrice: 449, stock: 55 },
      { name: "1 Liter", price: 999, discountPrice: 799, stock: 35 }
    ],
    
    stock: 55,
    certifications: ["GMP", "FSSAI", "Organic Certified"],
    
    averageRating: 4.6,
    totalReviews: 167,
    totalSales: 420,
    
    isActive: true,
    isFeatured: false,
    isNewArrival: true,
    
    relatedProducts: [5, 4, 3],
    upsellProducts: [1, 6],
    
    colorVariants: [],
    concerns: [4, 3, 11],
    rewardPoints: 45,
    influencerEndorsements: [5],
    comboOffers: []
  },

  {
    id: 10,
    name: "Heart Care Juice - Cardiovascular Support",
    slug: "heart-care-juice",
    sku: "SSH-HRT-500",
    shortDescription: "Ayurvedic juice blend for heart health and cholesterol management",
    longDescription: "Specially formulated heart care juice with Arjuna, Amla, and other heart-healthy herbs. Supports cardiovascular function, manages cholesterol, and promotes healthy blood pressure.",
    
    problemsSolved: [
      "High cholesterol levels",
      "Blood pressure fluctuations",
      "Weak cardiovascular system",
      "Poor blood circulation",
      "Arterial blockages"
    ],
    
    howItWorks: "This Ayurvedic blend contains Arjuna bark (proven cardio-protective), Amla (cholesterol reducer), and synergistic herbs that strengthen heart muscles, improve circulation, and maintain healthy cholesterol and blood pressure levels.",
    
    price: 599,
    discountPrice: 499,
    discountPercentage: 17,
    
    category: "Heart Health",
    benefits: ["Heart Health", "Cholesterol Control", "Blood Pressure", "Circulation"],
    
    ingredients: [
      { name: "Arjuna Bark Extract", quantity: "40%", description: "Cardio-protective herb" },
      { name: "Amla", quantity: "30%", description: "Cholesterol management" },
      { name: "Punarnava", quantity: "15%", description: "Supports circulation" },
      { name: "Giloy", quantity: "10%", description: "Immunity and detox" },
      { name: "Natural Preservatives", quantity: "5%", description: "Maintains freshness" }
    ],
    
    howToUse: "Take 20-30ml twice daily before meals with water. Best taken on empty stomach for maximum absorption.",
    dosage: "20-30ml twice daily",
    warnings: "Consult cardiologist if on heart medication. Not a substitute for prescribed medicines. Monitor blood pressure regularly.",
    
    images: [
      "/Products/10.png",
      "/Products/10.png",
      "/Products/10.png"
    ],
    
    variants: [
      { name: "500ml", price: 599, discountPrice: 499, stock: 40 },
      { name: "1 Liter", price: 1099, discountPrice: 899, stock: 25 }
    ],
    
    stock: 40,
    certifications: ["GMP", "ISO 22000", "FSSAI", "Lab Tested"],
    
    averageRating: 4.8,
    totalReviews: 234,
    totalSales: 510,
    
    isActive: true,
    isFeatured: false,
    isNewArrival: true,
    
    relatedProducts: [8, 5, 4],
    upsellProducts: [1, 2],
    
    colorVariants: [],
    concerns: [13, 8],
    rewardPoints: 50,
    influencerEndorsements: [4],
    comboOffers: [4]
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

// Get new arrival products
export const getNewArrivals = () => {
  return demoProducts.filter(product => product.isNewArrival);
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
