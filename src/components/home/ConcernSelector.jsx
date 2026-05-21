'use client';
import { useRef } from 'react';
import Link from 'next/link';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const categories = [
  {
    id: 1,
    name: 'Beard Growth Care',
    icon: '🧔',
    link: '/products/beard-growth'
  },
  {
    id: 2,
    name: 'Energy & Vitality Care',
    icon: '⚡',
    link: '/products/energy'
  },
  {
    id: 3,
    name: 'Skin & Hair Care',
    icon: '💆‍♀️',
    link: '/products/skin-hair'
  },
  {
    id: 4,
    name: 'Diabetes & Blood Sugar',
    icon: '🩺',
    link: '/products/diabetes-care'
  },
  {
    id: 5,
    name: 'Weight Management',
    icon: '⚖️',
    link: '/products/weight-management'
  },
  {
    id: 6,
    name: 'Immunity Boost',
    icon: '🛡️',
    link: '/products/immunity'
  },
  {
    id: 7,
    name: 'Joint & Pain Relief',
    icon: '🦴',
    link: '/products/pain-relief'
  },
  {
    id: 8,
    name: 'Heart Health',
    icon: '❤️',
    link: '/products/heart-health'
  }
];

const ConcernSelector = () => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-12 bg-white">
      <div className="container-custom">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8 font-heading">
          Shop By Category
        </h2>

        {/* Scrollable Categories */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors hidden md:block"
            aria-label="Scroll left"
          >
            <FiChevronLeft size={24} className="text-gray-700" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors hidden md:block"
            aria-label="Scroll right"
          >
            <FiChevronRight size={24} className="text-gray-700" />
          </button>

          {/* Categories Container */}
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-hide scroll-smooth px-12 md:px-16"
          >
            <div className="flex gap-4 pb-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={category.link}
                  className="flex-shrink-0 w-72 bg-gray-50 hover:bg-gradient-to-r hover:from-green-600 hover:to-green-700 rounded-xl p-6 transition-all duration-300 group shadow-sm hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Icon */}
                      <div className="text-4xl group-hover:scale-110 transition-transform">
                        {category.icon}
                      </div>
                      {/* Category Name */}
                      <h3 className="font-semibold text-gray-900 group-hover:text-white transition-colors text-lg font-subheading">
                        {category.name}
                      </h3>
                    </div>
                    {/* Arrow */}
                    <FiChevronRight className="text-gray-400 group-hover:text-white transition-colors" size={24} />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {[0, 1, 2].map((dot, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index === 2 ? 'bg-gray-900' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConcernSelector;
