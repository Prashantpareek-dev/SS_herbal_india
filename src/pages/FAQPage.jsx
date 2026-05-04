import { useState } from 'react';
import Breadcrumb from '../components/common/Breadcrumb';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const faqs = [
  {
    category: "General",
    questions: [
      {
        q: "Are your products 100% natural?",
        a: "Yes, all our products are made from 100% natural ingredients sourced from certified organic farms. We never use harmful chemicals, artificial colors, or preservatives."
      },
      {
        q: "Are your products GMP certified?",
        a: "Absolutely! All our products are manufactured in GMP, ISO 22000, and FSSAI certified facilities. Each product undergoes rigorous quality testing before reaching you."
      }
    ]
  },
  {
    category: "Orders & Shipping",
    questions: [
      {
        q: "What is the minimum order value for free shipping?",
        a: "We offer free shipping on all orders above ₹499 across India. Orders below this amount have a shipping charge of ₹50."
      },
      {
        q: "How long does delivery take?",
        a: "Delivery typically takes 3-7 business days depending on your location. Metro cities receive orders within 2-4 days."
      },
      {
        q: "Do you offer Cash on Delivery (COD)?",
        a: "Yes, we offer COD on orders up to ₹5000. A nominal COD fee of ₹40 applies."
      }
    ]
  },
  {
    category: "Returns & Refunds",
    questions: [
      {
        q: "What is your return policy?",
        a: "We offer a 7-day return policy for unopened products in original packaging. If you're not satisfied, contact us within 7 days of delivery."
      },
      {
        q: "How long does it take to process refunds?",
        a: "Refunds are processed within 5-7 business days after we receive the returned product. The amount will be credited to your original payment method."
      }
    ]
  },
  {
    category: "Product Usage",
    questions: [
      {
        q: "How long should I use a product to see results?",
        a: "Results vary by individual and product. Generally, we recommend consistent use for at least 8-12 weeks for optimal results. Ayurvedic products work gradually for long-lasting benefits."
      },
      {
        q: "Can I take multiple products together?",
        a: "Yes, most of our products can be taken together. However, we recommend consulting our Ayurvedic experts or your healthcare provider for personalized advice."
      },
      {
        q: "Are there any side effects?",
        a: "Our products are made from natural ingredients and are generally safe. However, if you have any medical conditions or are on medication, please consult your doctor before use."
      }
    ]
  }
];

const FAQPage = () => {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (category, index) => {
    const key = `${category}-${index}`;
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div>
      <Breadcrumb items={[{ label: 'FAQs' }]} />
      
      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-600 text-center mb-12">
            Find answers to common questions about our products and services
          </p>

          <div className="space-y-8">
            {faqs.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <h2 className="text-2xl font-bold mb-4 text-primary">{section.category}</h2>
                <div className="space-y-3">
                  {section.questions.map((item, itemIndex) => {
                    const key = `${section.category}-${itemIndex}`;
                    const isOpen = openItems[key];

                    return (
                      <div key={itemIndex} className="bg-white rounded-lg shadow-card overflow-hidden">
                        <button
                          onClick={() => toggleItem(section.category, itemIndex)}
                          className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-semibold text-gray-800 pr-4">{item.q}</span>
                          {isOpen ? (
                            <FiChevronUp className="flex-shrink-0 text-primary" size={20} />
                          ) : (
                            <FiChevronDown className="flex-shrink-0 text-gray-400" size={20} />
                          )}
                        </button>
                        {isOpen && (
                          <div className="px-5 pb-5 text-gray-700 leading-relaxed">
                            {item.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <h3 className="font-bold text-lg mb-2">Still have questions?</h3>
            <p className="text-gray-700 mb-4">Our customer support team is here to help!</p>
            <a href="/contact" className="btn-primary inline-block">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
