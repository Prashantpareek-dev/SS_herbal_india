import { FiShield, FiTruck, FiAward, FiHeadphones } from 'react-icons/fi';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <FiShield size={40} />,
    title: "100% Natural",
    description: "Certified organic ingredients, no harmful chemicals"
  },
  {
    icon: <FiAward size={40} />,
    title: "GMP & ISO Certified",
    description: "Quality tested and approved by regulatory bodies"
  },
  {
    icon: <FiTruck size={40} />,
    title: "Free Shipping",
    description: "On all orders above ₹499 across India"
  },
  {
    icon: <FiHeadphones size={40} />,
    title: "24/7 Support",
    description: "Expert Ayurvedic consultants available always"
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title">Why Choose SS Herbal India?</h2>
          <p className="section-subtitle">
            Trusted by thousands for authentic Ayurvedic wellness
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 text-center"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 text-primary rounded-full mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
