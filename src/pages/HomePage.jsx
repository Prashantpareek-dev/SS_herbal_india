'use client';
import HeroBanner from '../components/home/HeroBanner';
import CategoryGrid from '../components/home/CategoryGrid';
import FeaturedProducts from '../components/home/FeaturedProducts';
import WhyChooseUs from '../components/home/WhyChooseUs';
import CustomerTestimonials from '../components/home/CustomerTestimonials';
import ProductTestimonials from '../components/home/ProductTestimonials';
import InTheNews from '../components/home/InTheNews';
import ConcernSelector from '../components/home/ConcernSelector';
import InfluencerTestimonials from '../components/home/InfluencerTestimonials';
import DoctorConsultation from '../components/home/DoctorConsultation';
import NewLaunches from '../components/home/NewLaunches';
import ComboOffers from '../components/home/ComboOffers';
import TrustSection from '../components/home/TrustSection';
import BlogArticles from '../components/home/BlogArticles';
import LocationModal from '../components/common/LocationModal';
import EasyShoppingPlatform from '../components/home/EasyShoppingPlatform';
import InstagramFeed from '../components/home/InstagramFeed';

const HomePage = ({ banners = [], featuredProducts = [], newLaunches = [], bestSellers = [] }) => {
  return (
    <div>
      {/* Location Modal - Shows on first visit
      <LocationModal /> */}
      
      {/* Hero Section */}
      <HeroBanner initialSlides={banners} />
      
      {/* Concern-Based Selection */}
      <ConcernSelector />
      
      {/* Categories with Mini Products */}
      <CategoryGrid />
      
      {/* Featured/Bestseller Products */}
      <FeaturedProducts initialProducts={featuredProducts} />
      
      {/* New Product Launches */}
      <NewLaunches initialProducts={newLaunches} />
      
      {/* Doctor Consultation Banner */}
      <DoctorConsultation />

      {/* Combo Offers */}
      <ComboOffers />
      
      {/* Blog & Educational Content */}
      <BlogArticles />

      {/* Easy Shopping Platform */}
      <EasyShoppingPlatform />

      {/* Product-Based Testimonials */}
      <ProductTestimonials />

      {/* Instagram Feed */}
      <InstagramFeed />

      {/* Why Choose Us - Numbered Feature Boxes */}
      <WhyChooseUs />
      
      {/* In The News + Social Media */}
      <InTheNews />
      
      {/* Influencer Video Testimonials */}
      <InfluencerTestimonials />

      {/* Customer Testimonials */}
      <CustomerTestimonials />
      
      {/* Trust Building Section */}
      <TrustSection />
    </div>
  );
};

export default HomePage;
