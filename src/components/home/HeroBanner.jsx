import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    id: 1,
    title: "100% Natural Ayurvedic Solutions",
    subtitle: "Trusted Wellness for Over 5000 Years",
    description: "Experience the power of pure, authentic Ayurvedic products",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1920&h=600&fit=crop",
    cta: "Shop Now",
    link: "/products",
    bg: "from-green-600/90 to-green-800/90"
  },
  {
    id: 2,
    title: "Boost Your Immunity Naturally",
    subtitle: "25% OFF on All Immunity Products",
    description: "Strengthen your defense with our certified herbal formulations",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=1920&h=600&fit=crop",
    cta: "Explore Immunity Range",
    link: "/products/immunity",
    bg: "from-blue-600/90 to-blue-800/90"
  },
  {
    id: 3,
    title: "New Launch: Shilajit Resin",
    subtitle: "Pure Himalayan Shilajit for Energy & Vitality",
    description: "Sourced from 18,000 ft altitude | 60% Fulvic Acid",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=1920&h=600&fit=crop",
    cta: "Buy Now",
    link: "/product/shilajit-resin",
    bg: "from-orange-600/90 to-orange-800/90"
  },
  {
    id: 4,
    title: "GMP & ISO Certified Products",
    subtitle: "Quality You Can Trust",
    description: "All products tested for purity and potency",
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=1920&h=600&fit=crop",
    cta: "Learn More",
    link: "/about",
    bg: "from-teal-600/90 to-teal-800/90"
  },
  {
    id: 5,
    title: "Free Shipping on Orders ₹499+",
    subtitle: "Wellness Delivered to Your Doorstep",
    description: "Pan India delivery | Cash on Delivery Available",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1920&h=600&fit=crop",
    cta: "Start Shopping",
    link: "/products",
    bg: "from-purple-600/90 to-purple-800/90"
  }
];

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [currentSlide]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className="relative h-[500px] md:h-[600px] overflow-hidden bg-gray-900">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          />
          
          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-r ${slides[currentSlide].bg}`} />

          {/* Content */}
          <div className="relative h-full container-custom flex items-center">
            <div className="max-w-2xl text-white">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl mb-2 font-medium"
              >
                {slides[currentSlide].subtitle}
              </motion.p>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-6xl font-bold mb-4"
              >
                {slides[currentSlide].title}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl mb-8"
              >
                {slides[currentSlide].description}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Link
                  to={slides[currentSlide].link}
                  className="inline-block bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
                >
                  {slides[currentSlide].cta}
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors z-10 backdrop-blur-sm"
      >
        <FiChevronLeft size={24} />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors z-10 backdrop-blur-sm"
      >
        <FiChevronRight size={24} />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide 
                ? 'w-8 bg-white' 
                : 'w-2 bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;
