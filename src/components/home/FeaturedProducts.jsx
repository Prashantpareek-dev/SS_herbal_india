import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { getFeaturedProducts } from '../../data/products';
import ProductCard from '../product/ProductCard';

const FeaturedProducts = () => {
  const featuredProducts = getFeaturedProducts();

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Featured Products</h2>
            <p className="text-gray-600 mt-2">Best-selling Ayurvedic formulations</p>
          </div>
          <Link 
            to="/products" 
            className="hidden md:inline-block text-primary font-semibold hover:text-primary-dark transition-colors"
          >
            View All →
          </Link>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          navigation
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          className="featured-products-swiper"
        >
          {featuredProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="text-center mt-8 md:hidden">
          <Link 
            to="/products" 
            className="inline-block btn-primary"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
