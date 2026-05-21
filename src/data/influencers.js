// Influencer and expert testimonials for trust building

export const influencers = [
  {
    id: 1,
    name: 'Dr. Priya Sharma',
    credentials: 'BAMS, Ayurvedic Physician',
    specialty: 'Holistic Wellness',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400',
    bio: '15+ years of experience in Ayurvedic medicine and wellness consulting',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Mock URL
    videoThumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
    testimonial: 'Ashwagandha is one of the most powerful adaptogens in Ayurveda. I recommend it to all my patients dealing with stress and fatigue. The quality of SS Herbal products is exceptional.',
    productRecommendations: [1, 6], // Ashwagandha, Brahmi
    rating: 5,
    verified: true,
    socialMedia: {
      instagram: '@dr.priyasharma',
      youtube: 'Dr Priya Wellness',
      followers: '125K'
    }
  },
  {
    id: 2,
    name: 'Rohan Mehta',
    credentials: 'Certified Fitness Coach',
    specialty: 'Sports Nutrition & Recovery',
    image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400',
    bio: 'National level athlete and fitness influencer helping people achieve optimal health',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Mock URL
    videoThumbnail: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800',
    testimonial: 'As an athlete, recovery is crucial. Shilajit has significantly improved my energy levels and muscle recovery. I\'ve been using SS Herbal products for over 2 years now.',
    productRecommendations: [4, 8], // Shilajit, Joint Care
    rating: 5,
    verified: true,
    socialMedia: {
      instagram: '@rohanfitness',
      youtube: 'Rohan Fitness',
      followers: '450K'
    }
  },
  {
    id: 3,
    name: 'Anjali Desai',
    credentials: 'Certified Nutritionist, MSc',
    specialty: 'Digestive Health & Nutrition',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
    bio: 'Helping people transform their health through proper nutrition and natural supplements',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Mock URL
    videoThumbnail: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800',
    testimonial: 'Triphala is a game-changer for digestive health. I\'ve seen remarkable improvements in my clients who use SS Herbal\'s Triphala regularly. It\'s pure and effective.',
    productRecommendations: [2], // Triphala
    rating: 5,
    verified: true,
    socialMedia: {
      instagram: '@anjalinutrition',
      youtube: 'Anjali Wellness',
      followers: '280K'
    }
  },
  {
    id: 4,
    name: 'Dr. Rajesh Kumar',
    credentials: 'MD, Internal Medicine',
    specialty: 'Preventive Healthcare',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400',
    bio: 'Integrative medicine practitioner combining modern and traditional healing',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Mock URL
    videoThumbnail: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800',
    testimonial: 'Giloy is excellent for boosting immunity. I often recommend SS Herbal\'s Giloy to my patients, especially during seasonal changes. The results speak for themselves.',
    productRecommendations: [3], // Giloy
    rating: 5,
    verified: true,
    socialMedia: {
      instagram: '@dr.rajeshkumar',
      youtube: 'Dr Rajesh Health',
      followers: '190K'
    }
  },
  {
    id: 5,
    name: 'Neha Kapoor',
    credentials: 'Beauty & Wellness Influencer',
    specialty: 'Skin & Hair Care',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
    bio: 'Passionate about natural beauty solutions and holistic skincare',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Mock URL
    videoThumbnail: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800',
    testimonial: 'The Hair Growth Oil is incredible! My hair fall reduced by 70% in just 2 months. Plus, my hair is so much shinier and healthier. Highly recommended!',
    productRecommendations: [5, 7], // Hair Oil, Turmeric Face Pack
    rating: 5,
    verified: true,
    socialMedia: {
      instagram: '@nehabeauty',
      youtube: 'Neha Beauty Secrets',
      followers: '620K'
    }
  },
  {
    id: 6,
    name: 'Arjun Singh',
    credentials: 'Yoga Instructor & Life Coach',
    specialty: 'Stress Management & Mindfulness',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    bio: 'Combining ancient yoga wisdom with modern wellness practices',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Mock URL
    videoThumbnail: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=800',
    testimonial: 'Brahmi capsules complement my yoga practice perfectly. My students who use it report better focus during meditation and improved mental clarity.',
    productRecommendations: [6, 1], // Brahmi, Ashwagandha
    rating: 5,
    verified: true,
    socialMedia: {
      instagram: '@arjunyoga',
      youtube: 'Arjun Yoga',
      followers: '340K'
    }
  }
];

// Get influencer by ID
export const getInfluencerById = (id) => {
  return influencers.find(influencer => influencer.id === id);
};

// Get influencers recommending a product
export const getInfluencersForProduct = (productId) => {
  return influencers.filter(influencer => 
    influencer.productRecommendations.includes(productId)
  );
};

// Get all influencer testimonials
export const getAllTestimonials = () => {
  return influencers.map(inf => ({
    id: inf.id,
    name: inf.name,
    credentials: inf.credentials,
    image: inf.image,
    testimonial: inf.testimonial,
    rating: inf.rating,
    verified: inf.verified
  }));
};
