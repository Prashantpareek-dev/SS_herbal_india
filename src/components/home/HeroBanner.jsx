'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchHeroBanners, trackBannerClick } from '../../services/api';
import { normalizeBannerList } from '../../services/normalizers';

const HeroBanner = ({ initialSlides = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  // Start with SSR slides immediately — no black screen
  const [slides, setSlides] = useState(initialSlides);

  // Try API after mount — updates slides if API returns fresher data
  useEffect(() => {
    fetchHeroBanners('homepage_hero')
      .then(res => {
        const list = res?.data?.banners || [];
        if (list.length > 0) {
          const normalized = normalizeBannerList(list).filter(b => b.image);
          if (normalized.length > 0) {
            setSlides(normalized);
            return;
          }
        }
        // API empty — keep initialSlides already in state
        if (slides.length === 0) setSlides(initialSlides);
      })
      .catch(() => {
        if (slides.length === 0) setSlides(initialSlides);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [currentSlide, slides.length]);

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

  const handleBannerCTAClick = (slide) => {
    if (slide.id && String(slide.id).length > 10) {
      // Looks like a MongoDB ObjectId — track the click
      trackBannerClick(slide.id).catch(() => {});
    }
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    })
  };

  if (slides.length === 0) return null;

  return (
    <div className="relative h-[500px] md:h-[600px] overflow-hidden bg-gray-100">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'tween', ease: 'easeInOut', duration: 0.4 },
            opacity: { duration: 0.15 }
          }}
          className="absolute inset-0"
        >
          {/* Responsive banner image — no JS resize listener needed */}
          <picture className="absolute inset-0 w-full h-full">
            {slides[currentSlide].mobileImage && (
              <source
                media="(max-width: 767px)"
                srcSet={slides[currentSlide].mobileImage}
              />
            )}
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title || `Banner ${currentSlide + 1}`}
              className="w-full h-full object-cover"
              loading={currentSlide === 0 ? 'eager' : 'lazy'}
              fetchPriority={currentSlide === 0 ? 'high' : 'auto'}
              decoding="async"
            />
          </picture>
          
          {/* Gradient Overlay — only when a bg style is set */}
          {slides[currentSlide].bg && (
            <div className={`absolute inset-0 bg-gradient-to-r ${slides[currentSlide].bg}`} />
          )}

          {/* Content */}
          <div className="relative h-full container-custom flex items-center">
            <div className="max-w-2xl text-white">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl mb-2 font-medium font-subheading"
              >
                {slides[currentSlide].subtitle}
              </motion.p>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-6xl font-bold mb-4 font-heading"
              >
                {slides[currentSlide].title}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl mb-8 font-body"
              >
                {slides[currentSlide].description}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {slides[currentSlide].cta && slides[currentSlide].link && (
                  <Link
                    href={slides[currentSlide].link}
                    onClick={() => handleBannerCTAClick(slides[currentSlide])}
                    className="inline-block bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
                  >
                    {slides[currentSlide].cta}
                  </Link>
                )}
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
