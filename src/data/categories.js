// Category data for SS Herbal India

export const categories = [
  {
    id: 1,
    name: "Immunity Boosters",
    slug: "immunity",
    description: "Strengthen your natural defense system",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500",
    icon: "🛡️",
    productCount: 15
  },
  {
    id: 2,
    name: "Digestive Health",
    slug: "digestive-health",
    description: "Natural solutions for gut wellness",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500",
    icon: "💚",
    productCount: 12
  },
  {
    id: 3,
    name: "Stress & Anxiety",
    slug: "stress-anxiety",
    description: "Calm your mind naturally",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500",
    icon: "🧘",
    productCount: 10
  },
  {
    id: 4,
    name: "Energy & Vitality",
    slug: "energy-vitality",
    description: "Boost your stamina and strength",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500",
    icon: "⚡",
    productCount: 8
  },
  {
    id: 5,
    name: "Hair Care",
    slug: "hair-care",
    description: "Nourish your hair from roots",
    image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=500",
    icon: "💇",
    productCount: 9
  },
  {
    id: 6,
    name: "Skin Care",
    slug: "skin-care",
    description: "Radiant skin the Ayurvedic way",
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=500",
    icon: "✨",
    productCount: 11
  },
  {
    id: 7,
    name: "Brain Health",
    slug: "brain-health",
    description: "Enhance memory and focus",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500",
    icon: "🧠",
    productCount: 7
  },
  {
    id: 8,
    name: "Joint & Bone",
    slug: "joint-bone",
    description: "Support for healthy joints",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500",
    icon: "🦴",
    productCount: 6
  }
];

export const getCategoryBySlug = (slug) => {
  return categories.find(cat => cat.slug === slug);
};
