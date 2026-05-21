import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const newsLogos = [
  { name: "Business Standard", logo: "/News/1.png" },
  { name: "Times of India", logo: "/News/2.png" },
  { name: "APN News", logo: "/News/3.png" },
  { name: "IBC24", logo: "/News/4.png" },
  { name: "Content Media Solution", logo: "/News/5.png" },
  { name: "Hindustan Times", logo: "/News/6.png" },
  { name: "ABP News", logo: "/News/7.png" },
  { name: "NBT", logo: "/News/8.png" },
  { name: "Economic Times", logo: "/News/9.png" },
  { name: "Sports Mint", logo: "/News/10.png" }
];

const InTheNews = () => {
  const scrollContainerRef = useRef(null);
  const scrollTimelineRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const firstSet = scrollContainer.querySelector('.news-scroll-first');
    const secondSet = scrollContainer.querySelector('.news-scroll-second');

    // Calculate the width of one set of logos
    const scrollWidth = firstSet.offsetWidth;

    // Create GSAP timeline for infinite scroll
    scrollTimelineRef.current = gsap.timeline({ repeat: -1 });

    scrollTimelineRef.current.to([firstSet, secondSet], {
      x: -scrollWidth,
      duration: 15,
      ease: 'none',
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % scrollWidth)
      }
    });

    // Pause on hover
    const handleMouseEnter = () => {
      scrollTimelineRef.current?.pause();
    };

    const handleMouseLeave = () => {
      scrollTimelineRef.current?.play();
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      scrollTimelineRef.current?.kill();
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container-custom">
        {/* Spotlight Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 font-heading">
            Spotlight on the News
          </h2>
          <p className="text-gray-600 font-body">Featured in leading media publications</p>
        </div>

        {/* Infinite Scrolling Media Logos with GSAP */}
        <div className="relative mb-16 overflow-hidden" ref={scrollContainerRef}>
          {/* Gradient Fade Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white to-transparent z-10 pointer-events-none"></div>
          
          <div className="flex overflow-hidden py-4">
            {/* First set of logos */}
            <div className="flex gap-12 news-scroll-first">
              {newsLogos.map((media, index) => (
                <div
                  key={`first-${index}`}
                  className={`flex-shrink-0 group transition-all duration-500 hover:scale-110 ${
                    index === newsLogos.length - 1 ? 'mr-12' : ''
                  }`}
                >
                  <div className="bg-white p-6 rounded-xl border-2 border-gray-200 hover:border-green-500 hover:shadow-2xl transition-all duration-300 h-28 w-52 flex items-center justify-center transform hover:-translate-y-2 news-logo-card">
                    <img
                      src={media.logo}
                      alt={media.name}
                      className="max-h-20 max-w-full object-contain grayscale-[70%] group-hover:grayscale-0 transition-all duration-300 group-hover:scale-110"
                      title={media.name}
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
            {/* Duplicate set for seamless infinite scroll */}
            <div className="flex gap-12 news-scroll-second">
              {newsLogos.map((media, index) => (
                <div
                  key={`second-${index}`}
                  className={`flex-shrink-0 group transition-all duration-500 hover:scale-110 ${
                    index === newsLogos.length - 1 ? 'mr-12' : ''
                  }`}
                >
                  <div className="bg-white p-6 rounded-xl border-2 border-gray-200 hover:border-green-500 hover:shadow-2xl transition-all duration-300 h-28 w-52 flex items-center justify-center transform hover:-translate-y-2 news-logo-card">
                    <img
                      src={media.logo}
                      alt={media.name}
                      className="max-h-20 max-w-full object-contain grayscale-[70%] group-hover:grayscale-0 transition-all duration-300 group-hover:scale-110"
                      title={media.name}
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 font-heading">
              Follow Us on Social Media
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join our community and stay updated with the latest Ayurvedic wellness tips, 
              product launches, and health insights.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white hover:bg-green-600 text-gray-800 hover:text-white px-6 py-3 rounded-full font-semibold transition-all shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white hover:bg-green-600 text-gray-800 hover:text-white px-6 py-3 rounded-full font-semibold transition-all shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Instagram
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white hover:bg-green-700 text-gray-800 hover:text-white px-6 py-3 rounded-full font-semibold transition-all shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              YouTube
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white hover:bg-green-500 text-gray-800 hover:text-white px-6 py-3 rounded-full font-semibold transition-all shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
              Twitter
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InTheNews;
