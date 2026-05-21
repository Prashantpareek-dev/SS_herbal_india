// Category data for SS Herbal India

export const categories = [
  {
    id: 1,
    name: "Immunity Boosters",
    slug: "immunity",
    description: "Strengthen your natural defense system",
    image: "/ceteogry/11.png",
    icon: "🛡️",
    productCount: 15
  },
  {
    id: 2,
    name: "Digestive Health",
    slug: "digestive-health",
    description: "Natural solutions for gut wellness",
    image: "/ceteogry/12.png",
    icon: "💚",
    productCount: 12
  },
  {
    id: 3,
    name: "Stress & Anxiety",
    slug: "stress-anxiety",
    description: "Calm your mind naturally",
    image: "/ceteogry/13.png",
    icon: "🧘",
    productCount: 10
  },
  {
    id: 4,
    name: "Energy & Vitality",
    slug: "energy-vitality",
    description: "Boost your stamina and strength",
    image: "/ceteogry/14.png",
    icon: "⚡",
    productCount: 8
  },
  {
    id: 5,
    name: "Hair Care",
    slug: "hair-care",
    description: "Nourish your hair from roots",
    image: "/ceteogry/15.png",
    icon: "💇",
    productCount: 9
  },
  {
    id: 6,
    name: "Skin Care",
    slug: "skin-care",
    description: "Radiant skin the Ayurvedic way",
    image: "/ceteogry/16.png",
    icon: "✨",
    productCount: 11
  },
  {
    id: 7,
    name: "Brain Health",
    slug: "brain-health",
    description: "Enhance memory and focus",
    image: "/ceteogry/17.png",
    icon: "🧠",
    productCount: 7
  },
  {
    id: 8,
    name: "Joint & Bone",
    slug: "joint-bone",
    description: "Support for healthy joints",
    image: "/ceteogry/18.png",
    icon: "🦴",
    productCount: 6
  }
];

export const getCategoryBySlug = (slug) => {
  return categories.find(cat => cat.slug === slug);
};
