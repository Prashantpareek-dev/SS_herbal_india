import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const ScrollingAnnouncementBar = () => {
  const containerRef = useRef(null);
  const messagesRef = useRef([]);

  const announcements = [
    "GET 200 SS Herbal India COINS",
    "✔ 10 Lakh+ Customers | ✔ GMP Certified | ✔ COD Available",
    "FREE DELIVERY ABOVE ₹499",
    "OUR MISSION EVERYONE WILL BE HEALTHY"
  ];

  useEffect(() => {
    const messages = messagesRef.current.filter(Boolean);
    if (messages.length === 0) return;

    // Create infinite vertical scrolling animation
    const timeline = gsap.timeline({ repeat: -1 });
    
    messages.forEach((message, index) => {
      timeline.fromTo(
        message,
        {
          y: '100%',
          opacity: 0
        },
        {
          y: '0%',
          opacity: 1,
          duration: 0.9 ,
          ease: 'power2.out',
          delay: 0.5
        },
        index * 3 // Each message stays for 3 seconds
      )
      .to(
        message,
        {
          y: '-100%',
          opacity: 0,
          duration: 0,
          ease: 'power2.in',
          delay: 1 // Display time
        },
        index * 3 + 2.5
      );
    });

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <div className="relative bg-gradient-to-l from-blue-600 to-green-600 text-green-100 py-2 overflow-hidden">
      <div className="container-custom">
        <div ref={containerRef} className="relative h-6 flex items-center justify-center">
          {announcements.map((announcement, index) => (
            <div
              key={index}
              ref={(el) => (messagesRef.current[index] = el)}
              className="absolute inset-0 flex items-center justify-center font-semibold text-sm md:text-base whitespace-nowrap"
            >
              {announcement}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollingAnnouncementBar;
