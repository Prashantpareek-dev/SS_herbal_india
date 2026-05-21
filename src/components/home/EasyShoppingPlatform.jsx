import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const platforms = [
  {
    name: "Shopping Platform 1",
    logo: "/Images/Shopping/1.png",
    link: "#"
  },
  {
    name: "Shopping Platform 2",
    logo: "/Images/Shopping/2.png",
    link: "#"
  },
  {
    name: "Shopping Platform 3",
    logo: "/Images/Shopping/3.png",
    link: "#"
  },
  {
    name: "Shopping Platform 4",
    logo: "/Images/Shopping/4.png",
    link: "#"
  },
  {
    name: "Shopping Platform 5",
    logo: "/Images/Shopping/5.png",
    link: "#"
  },
  {
    name: "Shopping Platform 6",
    logo: "/Images/Shopping/6.png",
    link: "#"
  },
  {
    name: "Shopping Platform 7",
    logo: "/Images/Shopping/7.png",
    link: "#"
  },
  {
    name: "Shopping Platform 8",
    logo: "/Images/Shopping/8.png",
    link: "#"
  },
  {
    name: "Shopping Platform 9",
    logo: "/Images/Shopping/9.png",
    link: "#"
  },
  {
    name: "Shopping Platform 10",
    logo: "/Images/Shopping/10.png",
    link: "#"
  }
];

const EasyShoppingPlatform = () => {
  const scrollContainerRef = useRef(null);
  const scrollTimelineRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const firstSet = scrollContainer.querySelector('.platform-scroll-first');
    const secondSet = scrollContainer.querySelector('.platform-scroll-second');

    // Calculate the width of one set of logos
    const scrollWidth = firstSet.offsetWidth;

    // Create GSAP timeline for infinite scroll
    scrollTimelineRef.current = gsap.timeline({ repeat: -1 });

    scrollTimelineRef.current.to([firstSet, secondSet], {
      x: -scrollWidth,
      duration: 20,
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
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 font-heading">
            Easy Shopping Platform
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-body">
            Shop our authentic Ayurvedic products on your favorite platforms. 
            We're available everywhere you love to shop!
          </p>
        </div>

        {/* Infinite Scrolling Platform Logos with GSAP */}
        <div className="relative mb-12 overflow-hidden" ref={scrollContainerRef}>
          {/* Gradient Fade Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 via-gray-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 via-gray-50 to-transparent z-10 pointer-events-none"></div>
          
          <div className="flex overflow-hidden py-4">
            {/* First set of logos */}
            <div className="flex gap-8 platform-scroll-first">
              {platforms.map((platform, index) => (
                <div
                  key={`first-${index}`}
                  className={`flex-shrink-0 group transition-all duration-500 hover:scale-110 ${
                    index === platforms.length - 1 ? 'mr-8' : ''
                  }`}
                >
                  <div className="bg-transparent p-2 rounded-xl border-2   hover:shadow-2xl transition-all duration-300 h-48 w-72 flex items-center justify-center transform hover:-translate-y-2 platform-logo-card">
                    <img
                      src={platform.logo}
                      alt={platform.name}
                      className="max-h-32 max-w-full object-contain transition-all duration-300 group-hover:scale-110"
                      title={platform.name}
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
            {/* Duplicate set for seamless infinite scroll */}
            <div className="flex gap-8 platform-scroll-second">
              {platforms.map((platform, index) => (
                <div
                  key={`second-${index}`}
                  className={`flex-shrink-0 group transition-all duration-500 hover:scale-110 ${
                    index === platforms.length - 1 ? 'mr-8' : ''
                  }`}
                >
                  <div className="bg-white p-8 rounded-xl border-2 border-gray-200 hover:border-green-500 hover:shadow-2xl transition-all duration-300 h-48 w-72 flex items-center justify-center transform hover:-translate-y-2 platform-logo-card">
                    <img
                      src={platform.logo}
                      alt={platform.name}
                      className="max-h-32 max-w-full object-contain transition-all duration-300 group-hover:scale-110"
                      title={platform.name}
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col md:flex-row items-center gap-4 bg-green-50 border-2 border-green-200 rounded-2xl p-6 md:p-8">
            <div className="flex-shrink-0 text-5xl">🛒</div>
            <div className="text-left">
              <h3 className="text-xl font-bold text-gray-800 mb-2 font-subheading">
                One-Stop Solution for All Your Ayurvedic Needs
              </h3>
              <p className="text-gray-600 font-body">
                Available on multiple platforms for your convenience. Choose where you shop best!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EasyShoppingPlatform;
