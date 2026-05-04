import { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const FAQAccordion = ({ faqs, bgColor = 'bg-green-50' }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 }}
          className={`${bgColor} rounded-xl overflow-hidden transition-all duration-300 ${
            openIndex === index ? 'shadow-lg' : 'shadow-sm'
          }`}
        >
          {/* Question */}
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full flex items-center justify-between p-5 text-left hover:bg-opacity-80 transition-colors"
          >
            <span className="font-semibold text-gray-900 pr-4">
              {faq.question}
            </span>
            {openIndex === index ? (
              <FiChevronUp className="text-primary text-xl flex-shrink-0" />
            ) : (
              <FiChevronDown className="text-gray-600 text-xl flex-shrink-0" />
            )}
          </button>

          {/* Answer */}
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5 text-gray-700 leading-relaxed">
                  {faq.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

export default FAQAccordion;
