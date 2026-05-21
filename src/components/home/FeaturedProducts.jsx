'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import ProductCard from '../product/ProductCard';
import { fetchFeaturedProducts } from '../../services/api';
import { normalizeProductList } from '../../services/normalizers';

const FeaturedProducts = ({ initialProducts = [] }) => {
  const [products, setProducts] = useState(initialProducts);

  useEffect(() => {
    // Always log what the component received (SSR or client fetch)
    if (initialProducts.length > 0) {
      console.log('[FeaturedProducts] using SSR data — count:', initialProducts.length, '| first:', JSON.stringify(initialProducts));
      return;
    }
    fetchFeaturedProducts(12)
      .then(res => {
        console.log('[FeaturedProducts] response received:', JSON.stringify(res?.data).slice(0, 600));
        const normalized = normalizeProductList(res?.data?.products || []);
        console.log("features:", normalized);
        console.log('[FeaturedProducts] normalized data sent to component:', JSON.stringify({ count: normalized.length, first: normalized[0] }).slice(0, 600));
        if (normalized.length > 0) setProducts(normalized);
      })
      .catch((err) => { console.error('[FeaturedProducts] request failed:', err?.message); });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (products.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 font-heading">Featured Products</h2>
            <p className="text-gray-600 mt-2 font-body">Best-selling Ayurvedic formulations</p>
          </div>
          <Link 
            href="/products" 
            className="hidden md:inline-block text-primary font-semibold hover:text-primary-dark transition-colors"
          >
            View All →
          </Link>
        </div>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          className="featured-products-swiper"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="text-center mt-8 md:hidden">
          <Link 
            href="/products" 
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
