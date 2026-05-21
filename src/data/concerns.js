// Health concerns mapped to product categories and specific products
// Used for concern-based product discovery and chatbot recommendations

export const healthConcerns = [
  {
    id: 1,
    name: 'Stress & Anxiety',
    icon: '🧘‍♀️',
    description: 'Natural solutions for stress relief and mental calmness',
    keywords: ['stress', 'anxiety', 'tension', 'worried', 'nervous', 'panic', 'overwhelmed'],
    symptoms: [
      'Feeling constantly worried or nervous',
      'Difficulty relaxing or sleeping',
      'Tension headaches',
      'Racing thoughts',
      'Irritability and mood swings'
    ],
    productIds: [1, 6], // Ashwagandha, Brahmi
    categories: ['Stress & Immunity', 'Brain Health']
  },
  {
    id: 2,
    name: 'Digestive Issues',
    icon: '🫃',
    description: 'Relief from bloating, acidity, and irregular digestion',
    keywords: ['digestion', 'bloating', 'acidity', 'gas', 'constipation', 'stomach', 'indigestion'],
    symptoms: [
      'Bloating and gas after meals',
      'Constipation or irregular bowel movements',
      'Acidity and heartburn',
      'Loss of appetite',
      'Abdominal discomfort'
    ],
    productIds: [2], // Triphala
    categories: ['Digestive Health']
  },
  {
    id: 3,
    name: 'Low Energy & Fatigue',
    icon: '⚡',
    description: 'Boost your energy levels naturally throughout the day',
    keywords: ['tired', 'fatigue', 'energy', 'weakness', 'exhausted', 'lethargic', 'sleepy'],
    symptoms: [
      'Constant feeling of tiredness',
      'Lack of motivation or enthusiasm',
      'Physical weakness',
      'Difficulty concentrating',
      'Need for frequent naps'
    ],
    productIds: [1, 4], // Ashwagandha, Shilajit
    categories: ['Energy & Vitality', 'Stress & Immunity']
  },
  {
    id: 4,
    name: 'Weak Immunity',
    icon: '🛡️',
    description: 'Strengthen your immune system against infections',
    keywords: ['immunity', 'sick', 'cold', 'flu', 'fever', 'infection', 'weak'],
    symptoms: [
      'Frequent colds and infections',
      'Slow wound healing',
      'Feeling rundown',
      'Recurring allergies',
      'Prolonged illness recovery'
    ],
    productIds: [1, 3], // Ashwagandha, Giloy
    categories: ['Stress & Immunity']
  },
  {
    id: 5,
    name: 'Hair Fall & Thinning',
    icon: '💇‍♀️',
    description: 'Natural remedies for healthy hair growth',
    keywords: ['hair', 'hairfall', 'baldness', 'thinning', 'dandruff', 'scalp'],
    symptoms: [
      'Excessive hair fall during combing',
      'Thinning hair or receding hairline',
      'Weak and brittle hair',
      'Dandruff or itchy scalp',
      'Slow hair growth'
    ],
    productIds: [5], // Hair Growth Oil
    categories: ['Hair Care']
  },
  {
    id: 6,
    name: 'Skin Problems',
    icon: '✨',
    description: 'Clear, glowing skin with Ayurvedic care',
    keywords: ['skin', 'acne', 'pimples', 'dark spots', 'dull', 'glow', 'complexion'],
    symptoms: [
      'Acne and pimples',
      'Dark spots or pigmentation',
      'Dull and tired-looking skin',
      'Uneven skin tone',
      'Dry or oily skin issues'
    ],
    productIds: [7], // Turmeric Face Pack
    categories: ['Skin Care']
  },
  {
    id: 7,
    name: 'Poor Memory & Focus',
    icon: '🧠',
    description: 'Enhance cognitive function and mental clarity',
    keywords: ['memory', 'focus', 'concentration', 'brain', 'forgetful', 'attention'],
    symptoms: [
      'Difficulty concentrating on tasks',
      'Forgetfulness',
      'Mental fog or confusion',
      'Trouble learning new information',
      'Reduced productivity'
    ],
    productIds: [6], // Brahmi
    categories: ['Brain Health']
  },
  {
    id: 8,
    name: 'Joint & Bone Pain',
    icon: '🦴',
    description: 'Relief from joint stiffness and bone health support',
    keywords: ['joint', 'bone', 'pain', 'arthritis', 'stiffness', 'knee', 'back'],
    symptoms: [
      'Joint pain or stiffness',
      'Difficulty in movement',
      'Swelling in joints',
      'Back or knee pain',
      'Reduced flexibility'
    ],
    productIds: [8], // Joint Care
    categories: ['Joint & Bone']
  },
  {
    id: 9,
    name: 'Sleep Problems',
    icon: '😴',
    description: 'Natural support for better sleep quality',
    keywords: ['sleep', 'insomnia', 'sleepless', 'restless', 'awake', 'sleeping'],
    symptoms: [
      'Difficulty falling asleep',
      'Waking up frequently during night',
      'Early morning awakening',
      'Feeling unrefreshed after sleep',
      'Daytime drowsiness'
    ],
    productIds: [1], // Ashwagandha
    categories: ['Stress & Immunity']
  },
  {
    id: 10,
    name: 'Diabetes Management',
    icon: '🩺',
    description: 'Support healthy blood sugar levels naturally',
    keywords: ['diabetes', 'sugar', 'blood sugar', 'glucose', 'diabetic'],
    symptoms: [
      'High blood sugar levels',
      'Frequent urination',
      'Increased thirst',
      'Unexplained weight changes',
      'Fatigue and weakness'
    ],
    productIds: [2], // Triphala (supports metabolism)
    categories: ['Digestive Health', 'Energy & Vitality']
  },
  {
    id: 11,
    name: 'Weight Management',
    icon: '⚖️',
    description: 'Natural support for healthy weight management',
    keywords: ['weight', 'fat', 'obesity', 'overweight', 'metabolism', 'slim'],
    symptoms: [
      'Difficulty losing weight',
      'Slow metabolism',
      'Excess body fat',
      'Low energy for exercise',
      'Irregular eating patterns'
    ],
    productIds: [2, 4], // Triphala, Shilajit
    categories: ['Digestive Health', 'Energy & Vitality']
  },
  {
    id: 12,
    name: 'Hormonal Imbalance',
    icon: '⚕️',
    description: 'Balance hormones naturally for better health',
    keywords: ['hormones', 'periods', 'menstrual', 'pcos', 'thyroid', 'irregular'],
    symptoms: [
      'Irregular periods',
      'Mood swings',
      'Weight fluctuations',
      'Acne or skin issues',
      'Low energy levels'
    ],
    productIds: [1, 4], // Ashwagandha, Shilajit
    categories: ['Stress & Immunity', 'Energy & Vitality']
  }
];

// Get concern by ID
export const getConcernById = (id) => {
  return healthConcerns.find(concern => concern.id === id);
};

// Get concerns by keyword
export const searchConcernsByKeyword = (keyword) => {
  const lowerKeyword = keyword.toLowerCase();
  return healthConcerns.filter(concern => 
    concern.keywords.some(k => k.includes(lowerKeyword)) ||
    concern.name.toLowerCase().includes(lowerKeyword) ||
    concern.description.toLowerCase().includes(lowerKeyword)
  );
};

// Get product IDs for a concern
export const getProductsForConcern = (concernId) => {
  const concern = getConcernById(concernId);
  return concern ? concern.productIds : [];
};

// Get all concerns for a product
export const getConcernsForProduct = (productId) => {
  return healthConcerns.filter(concern => 
    concern.productIds.includes(productId)
  );
};
