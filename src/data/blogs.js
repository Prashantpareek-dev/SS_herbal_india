// Blog articles, news, and educational content

export const blogPosts = [
  {
    id: 1,
    title: '10 Natural Ways to Boost Your Immunity This Winter',
    slug: 'boost-immunity-winter',
    excerpt: 'Discover Ayurvedic secrets to strengthen your immune system and stay healthy during cold season.',
    content: 'Full article content here...',
    author: {
      name: 'Dr. Priya Sharma',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200',
      bio: 'Ayurvedic Physician'
    },
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
    category: 'Immunity',
    tags: ['Immunity', 'Winter', 'Ayurveda', 'Health Tips'],
    readTime: '5 min read',
    publishedDate: '2026-04-15',
    views: 12500,
    likes: 856,
    relatedProducts: [1, 3], // Ashwagandha, Giloy
    featured: true
  },
  {
    id: 2,
    title: 'Ashwagandha vs Stress: Science-Backed Benefits',
    slug: 'ashwagandha-stress-benefits',
    excerpt: 'Learn how this ancient adaptogen can help you manage stress and improve your quality of life.',
    content: 'Full article content here...',
    author: {
      name: 'Dr. Rajesh Kumar',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200',
      bio: 'MD, Internal Medicine'
    },
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800',
    category: 'Stress Management',
    tags: ['Ashwagandha', 'Stress', 'Mental Health', 'Research'],
    readTime: '7 min read',
    publishedDate: '2026-04-10',
    views: 18900,
    likes: 1234,
    relatedProducts: [1],
    featured: true
  },
  {
    id: 3,
    title: 'The Complete Guide to Digestive Health with Triphala',
    slug: 'digestive-health-triphala-guide',
    excerpt: 'Everything you need to know about Triphala and its amazing benefits for your gut health.',
    content: 'Full article content here...',
    author: {
      name: 'Anjali Desai',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200',
      bio: 'Certified Nutritionist'
    },
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800',
    category: 'Digestive Health',
    tags: ['Triphala', 'Digestion', 'Gut Health', 'Ayurveda'],
    readTime: '6 min read',
    publishedDate: '2026-04-05',
    views: 9800,
    likes: 678,
    relatedProducts: [2],
    featured: false
  },
  {
    id: 4,
    title: 'Hair Fall Solutions: Natural Remedies That Actually Work',
    slug: 'hair-fall-natural-remedies',
    excerpt: 'Combat hair fall with these proven Ayurvedic treatments and lifestyle changes.',
    content: 'Full article content here...',
    author: {
      name: 'Neha Kapoor',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200',
      bio: 'Beauty & Wellness Expert'
    },
    image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800',
    category: 'Hair Care',
    tags: ['Hair Care', 'Hair Fall', 'Natural Remedies', 'Beauty'],
    readTime: '8 min read',
    publishedDate: '2026-04-01',
    views: 15600,
    likes: 1089,
    relatedProducts: [5],
    featured: true
  },
  {
    id: 5,
    title: 'Shilajit: The Ancient Superfood for Modern Life',
    slug: 'shilajit-benefits-modern-life',
    excerpt: 'Discover why Shilajit is considered one of the most powerful natural supplements.',
    content: 'Full article content here...',
    author: {
      name: 'Rohan Mehta',
      image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200',
      bio: 'Fitness Coach'
    },
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800',
    category: 'Energy & Vitality',
    tags: ['Shilajit', 'Energy', 'Fitness', 'Performance'],
    readTime: '6 min read',
    publishedDate: '2026-03-28',
    views: 11200,
    likes: 892,
    relatedProducts: [4],
    featured: false
  },
  {
    id: 6,
    title: 'Brahmi for Brain Health: Boost Memory Naturally',
    slug: 'brahmi-brain-health-memory',
    excerpt: 'Learn how Brahmi can enhance cognitive function, memory, and mental clarity.',
    content: 'Full article content here...',
    author: {
      name: 'Dr. Priya Sharma',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200',
      bio: 'Ayurvedic Physician'
    },
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800',
    category: 'Brain Health',
    tags: ['Brahmi', 'Memory', 'Brain Health', 'Nootropics'],
    readTime: '5 min read',
    publishedDate: '2026-03-25',
    views: 8700,
    likes: 567,
    relatedProducts: [6],
    featured: false
  }
];

// News and media mentions
export const newsArticles = [
  {
    id: 1,
    title: 'SS Herbal India wins "Best Ayurvedic Brand 2026"',
    source: 'Ayurveda Times',
    logo: 'https://via.placeholder.com/200x80/4CAF50/white?text=Ayurveda+Times',
    excerpt: 'Recognized for quality and innovation in herbal healthcare products.',
    publishedDate: '2026-04-20',
    url: '#'
  },
  {
    id: 2,
    title: 'The Rise of Natural Wellness: SS Herbal Leading the Way',
    source: 'Health Magazine India',
    logo: 'https://via.placeholder.com/200x80/2196F3/white?text=Health+Magazine',
    excerpt: 'How SS Herbal is transforming traditional Ayurveda for modern consumers.',
    publishedDate: '2026-04-15',
    url: '#'
  },
  {
    id: 3,
    title: 'Certified Excellence: SS Herbal Receives ISO 22000',
    source: 'Business Standard',
    logo: 'https://via.placeholder.com/200x80/FF9800/white?text=Business+Standard',
    excerpt: 'New certification reinforces commitment to quality and safety.',
    publishedDate: '2026-04-10',
    url: '#'
  },
  {
    id: 4,
    title: '1 Million+ Happy Customers Trust SS Herbal',
    source: 'Economic Times',
    logo: 'https://via.placeholder.com/200x80/9C27B0/white?text=Economic+Times',
    excerpt: 'Milestone achievement in customer satisfaction and product quality.',
    publishedDate: '2026-04-05',
    url: '#'
  }
];

// Get blog post by slug
export const getBlogBySlug = (slug) => {
  return blogPosts.find(post => post.slug === slug);
};

// Get featured blogs
export const getFeaturedBlogs = () => {
  return blogPosts.filter(post => post.featured);
};

// Get blogs by category
export const getBlogsByCategory = (category) => {
  return blogPosts.filter(post => post.category === category);
};

// Get blogs for a product
export const getBlogsForProduct = (productId) => {
  return blogPosts.filter(post => 
    post.relatedProducts && post.relatedProducts.includes(productId)
  );
};
