import HeroBanner from '../components/home/HeroBanner';
import CategoryGrid from '../components/home/CategoryGrid';
import FeaturedProducts from '../components/home/FeaturedProducts';
import WhyChooseUs from '../components/home/WhyChooseUs';
import CustomerTestimonials from '../components/home/CustomerTestimonials';
import InTheNews from '../components/home/InTheNews';

const HomePage = () => {
  return (
    <div>
      <HeroBanner />
      <CategoryGrid />
      <FeaturedProducts />
      <CustomerTestimonials />
      <WhyChooseUs />
      <InTheNews />
    </div>
  );
};

export default HomePage;
