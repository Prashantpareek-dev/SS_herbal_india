import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    rating: 5,
    text: "Ashwagandha capsules helped me manage stress naturally. Visible results in just 2 weeks!",
    product: "Ashwagandha Capsules",
    verified: true
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    location: "Delhi",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    rating: 5,
    text: "Shilajit Resin boosted my energy levels. Authentic product with amazing quality!",
    product: "Shilajit Resin",
    verified: true
  },
  {
    id: 3,
    name: "Sneha Patel",
    location: "Bangalore",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    rating: 5,
    text: "Triphala tablets improved my digestion significantly. Highly recommend SS Herbal India!",
    product: "Triphala Tablets",
    verified: true
  },
  {
    id: 4,
    name: "Amit Verma",
    location: "Pune",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    rating: 5,
    text: "Giloy Juice strengthened my immunity. No more frequent colds. Thank you SS Herbal!",
    product: "Giloy Juice",
    verified: true
  }
];

const CustomerTestimonials = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-green-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Real People, Real Stories
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 text-lg max-w-2xl mx-auto"
          >
            Hear from our satisfied customers who transformed their health naturally
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              {/* Customer Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {testimonial.verified && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <FaStar className="text-xs" /> Verified
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Rating */}
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-sm" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                  "{testimonial.text}"
                </p>

                {/* Customer Info */}
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                  <p className="text-sm text-primary mt-1 font-medium">
                    Purchased: {testimonial.product}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Reviews Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <button className="px-8 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition-colors shadow-lg hover:shadow-xl">
            View All Reviews
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default CustomerTestimonials;
