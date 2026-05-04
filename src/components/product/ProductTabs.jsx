import { useState } from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import StarRating from '../common/StarRating';
import ReviewsSection from './ReviewsSection';
import FAQAccordion from '../common/FAQAccordion';

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'problems', label: 'What Problems It Solves' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'ingredients', label: 'Ingredients' },
    { id: 'usage', label: 'How to Use' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'faqs', label: 'FAQs' },
    { id: 'reviews', label: `Reviews (${product.totalReviews})` }
  ];

  return (
    <div className="mt-12">
      {/* Tab Headers */}
      <div className="border-b border-gray-200 overflow-x-auto">
        <div className="flex gap-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 px-2 font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="py-8">
        {activeTab === 'overview' && (
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">{product.longDescription}</p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-2">
                  <FiCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'problems' && (
          <div>
            <h3 className="text-2xl font-bold mb-4">What Problems Does It Solve?</h3>
            <ul className="space-y-3">
              {product.problemsSolved.map((problem, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    ✗
                  </div>
                  <span className="text-gray-700">{problem}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'how-it-works' && (
          <div>
            <h3 className="text-2xl font-bold mb-4">How It Works</h3>
            <p className="text-gray-700 leading-relaxed">{product.howItWorks}</p>
          </div>
        )}

        {activeTab === 'ingredients' && (
          <div>
            <h3 className="text-2xl font-bold mb-4">Ingredients</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.ingredients.map((ingredient, index) => (
                <div key={index} className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-gray-800">{ingredient.name}</h4>
                    <span className="text-sm bg-green-200 text-green-800 px-2 py-1 rounded">
                      {ingredient.quantity}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{ingredient.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'usage' && (
          <div>
            <h3 className="text-2xl font-bold mb-4">How to Use</h3>
            <div className="bg-blue-50 p-6 rounded-lg mb-4">
              <p className="text-gray-700 leading-relaxed">{product.howToUse}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border border-gray-200 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Dosage</h4>
                <p className="text-gray-600">{product.dosage}</p>
              </div>
              <div className="bg-white border border-gray-200 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Warnings</h4>
                <p className="text-gray-600">{product.warnings}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'certifications' && (
          <div>
            <h3 className="text-2xl font-bold mb-4">Certifications & Quality</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {product.certifications.map((cert, index) => (
                <div key={index} className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold text-xl">{cert}</span>
                  </div>
                  <p className="text-sm font-medium text-gray-700">{cert} Certified</p>
                </div>
              ))}
            </div>
            <div className="mt-8 bg-green-50 p-6 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-3">Quality Assurance</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="text-green-600" />
                  <span className="text-gray-700">Laboratory tested for purity and potency</span>
                </li>
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="text-green-600" />
                  <span className="text-gray-700">No harmful chemicals or additives</span>
                </li>
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="text-green-600" />
                  <span className="text-gray-700">Manufactured in GMP certified facilities</span>
                </li>
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="text-green-600" />
                  <span className="text-gray-700">Third-party quality verification</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'faqs' && (
          <div>
            <h3 className="text-2xl font-bold mb-6">Frequently Asked Questions</h3>
            <FAQAccordion
              faqs={[
                {
                  question: `Can I take ${product.name} along with my medicines?`,
                  answer: "While our products are made from natural ingredients, we recommend consulting with your healthcare provider before combining them with any prescription medications to avoid potential interactions."
                },
                {
                  question: "Why does the product price vary for different variants?",
                  answer: "Price varies based on the quantity and packaging. Larger packs offer better value per dose. All variants contain the same high-quality formulation."
                },
                {
                  question: "How long does it take to see results?",
                  answer: "Most customers notice visible improvements within 2-4 weeks of consistent use. However, results may vary based on individual body constitution and lifestyle factors."
                },
                {
                  question: "How many days will this bottle last?",
                  answer: `Based on the recommended dosage (${product.dosage}), the bottle typically lasts for the duration mentioned in the product variant description.`
                },
                {
                  question: "Are there any side effects?",
                  answer: "Our products are made from natural Ayurvedic ingredients and are generally safe. However, if you experience any discomfort, discontinue use and consult a healthcare professional."
                },
                {
                  question: "Is this product suitable for pregnant or lactating women?",
                  answer: "We recommend pregnant and lactating women consult with their healthcare provider before starting any new supplement regimen."
                }
              ]}
              bgColor="bg-green-50"
            />
          </div>
        )}

        {activeTab === 'reviews' && (
          <div>
            <ReviewsSection
              reviews={product.reviews || []}
              averageRating={product.averageRating}
              totalReviews={product.totalReviews}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
