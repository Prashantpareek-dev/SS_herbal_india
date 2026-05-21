import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const productTestimonials = [
  {
    id: 1,
    productName: "Ashwagandha Capsules",
    productImage: "/Products/3.png",
    rating: 5,
    review: "Ashwagandha has truly improved my strength and stamina. Within a month, I noticed a boost in energy, confidence, and overall performance. It feels good to rely on a herbal product that actually delivers results.",
    customerName: "Arjun Mehta",
    role: ""
  },
  {
    id: 2,
    productName: "Triphala Tablets",
    productImage: "/Products/2.png",
    rating: 5,
    review: "This Triphala is fresh, high quality, and easy to use. I take it daily and it keeps me active throughout the day. It's been great for boosting immunity and overall energy levels.",
    customerName: "Sunita Rani",
    role: ""
  },
  {
    id: 3,
    productName: "Tulsi Drops",
    productImage: "/Products/1.png",
    rating: 4,
    review: "I've been using Tulsi Drops for the past 6 weeks and I can already feel a difference. My immunity is stronger, and I don't get the sudden energy crashes anymore. It also seems to help with digestion.",
    customerName: "Rajesh Sharma",
    role: ""
  },
  {
    id: 4,
    productName: "Giloy Juice",
    productImage: "/Products/4.png",
    rating: 4,
    review: "Giloy Juice has given me noticeable relief and immunity boost within just a few weeks. The health benefits are clear, and even my digestion feels better. It's definitely an Ayurvedic remedy worth recommending.",
    customerName: "Anil Kumar",
    role: ""
  },
  {
    id: 5,
    productName: "Amla Juice",
    productImage: "/Products/5.png",
    rating: 4,
    review: "This Ayurvedic Amla juice worked wonderfully for my health. It's easy to consume, provides long-lasting benefits, and doesn't have any side effects. I've been using it regularly and it has become a must-have in my home.",
    customerName: "Kavita Joshi",
    role: ""
  },
  {
    id: 6,
    productName: "Shilajit Resin",
    productImage: "/Products/9.png",
    rating: 5,
    review: "Shilajit has made a huge difference in my energy levels. I feel more active, strong, and confident throughout the day. It truly lives up to its promise and is the best product I've found for vitality.",
    customerName: "Manoj Verma",
    role: ""
  },
  {
    id: 7,
    productName: "Brahmi Capsules",
    productImage: "/Products/6.png",
    rating: 4,
    review: "I've been using Brahmi capsules daily and they really work. I feel more focused and less tired overall. It's a simple yet effective way to keep the mind sharp and healthy.",
    customerName: "Priya Nair",
    role: ""
  }
];

const ProductTestimonials = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="fib-section-lg bg-white">
      <div className="container-custom">
        {/* Section Header - Fibonacci Typography */}
        <div className="text-center fib-mb-8">
          <h2 className="fib-text-3xl fib-mb-5 font-bold text-gray-900 font-heading">
            Our Satisfied Customers Testimonial
          </h2>
          <p className="fib-text-md text-gray-600 font-body">Real experiences from our valued customers</p>
        </div>

        {/* Testimonials Slider */}
        <div className="relative px-4 md:px-12">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
            }}
            className="product-testimonials-swiper"
          >
            {productTestimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="testimonial-card relative bg-white fib-rounded-lg fib-shadow-md hover:fib-shadow-xl fib-transition-base overflow-hidden fib-card-md">
                  {/* Product Name */}
                  <div className="bg-gradient-to-r from-green-50 to-green-100 fib-p-5 relative">
                    <h3 className="fib-text-md font-bold text-gray-900 font-subheading uppercase pr-28">
                      {testimonial.productName}
                    </h3>
                    
                    {/* Product Image Circle - Positioned absolutely */}
                    <div className="absolute -top-2 right-4 fib-size-3 rounded-full border-4 border-white bg-green-50 flex items-center justify-center overflow-hidden fib-shadow-lg z-10">
                      <img
                        src={testimonial.productImage}
                        alt={testimonial.productName}
                        className="w-20 h-20 object-contain"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="bg-gradient-to-br from-green-50 to-blue-50 fib-p-6 pt-8">
                    {/* Star Rating */}
                    <div className="flex fib-gap-3 fib-mb-4">
                      {[...Array(5)].map((_, index) => (
                        <span
                          key={index}
                          className={`fib-text-md ${
                            index < testimonial.rating
                              ? 'text-green-500'
                              : 'text-gray-300'
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>

                    {/* Review Text */}
                    <p className="fib-text-xs text-gray-700 fib-mb-5 line-clamp-4 font-body">
                      {testimonial.review}
                    </p>

                    {/* Customer Info */}
                    <div className="border-t border-green-200 fib-p-4 pt-3">
                      <p className="font-bold text-gray-900 font-subheading fib-text-sm">{testimonial.customerName}</p>
                      {testimonial.role && (
                        <p className="fib-text-xs text-gray-600 font-body">{testimonial.role}</p>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Arrows - Fibonacci sizing */}
          <button
            ref={prevRef}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-green-600 text-gray-800 hover:text-white fib-size-2 rounded-full fib-shadow-md flex items-center justify-center fib-transition-fast hover:scale-110"
            aria-label="Previous testimonial"
          >
            <FiChevronLeft size={24} />
          </button>
          <button
            ref={nextRef}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-green-600 text-gray-800 hover:text-white fib-size-2 rounded-full fib-shadow-md flex items-center justify-center fib-transition-fast hover:scale-110"
            aria-label="Next testimonial"
          >
            <FiChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductTestimonials;
