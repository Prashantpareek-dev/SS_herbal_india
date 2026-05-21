import HomePage from '../pages/HomePage';
import {
  fetchHeroBannersSSR,
  fetchFeaturedProductsSSR,
  fetchNewLaunchesSSR,
  fetchBestSellersSSR,
} from '../lib/serverApi';
import { normalizeBannerList, normalizeProductList } from '../services/normalizers';

const localBanners = [
  { id: 1, image: '/Images/Banner1.png', mobileImage: '/Images/Moblie/Banner1.png' },
  { id: 2, image: '/Images/Banner2.png', mobileImage: '/Images/Moblie/Banner2.png' },
  { id: 3, image: '/Images/Banner3.png', mobileImage: '/Images/Moblie/Banner3.png' },
  { id: 4, image: '/Images/Banner4.png', mobileImage: '/Images/Moblie/Banner4.png' },
  { id: 5, image: '/Images/Banner5.png', mobileImage: '/Images/Moblie/Banner5.png' },
];

export default async function Page() {
  // Fetch all homepage data in parallel
  const [bannersData, featuredData, newLaunchesData, bestSellersData] = await Promise.all([
    fetchHeroBannersSSR('homepage_hero'),
    fetchFeaturedProductsSSR(12),
    fetchNewLaunchesSSR(12),
    fetchBestSellersSSR(12),
  ]);

  const rawBanners = bannersData?.banners || [];
  const apiBanners = normalizeBannerList(rawBanners).filter(b => b.image);
  const banners = apiBanners.length > 0 ? apiBanners : localBanners;

  const featuredProducts = normalizeProductList(featuredData?.products || []);
  const newLaunches = normalizeProductList(newLaunchesData?.products || []);
  const bestSellers = normalizeProductList(bestSellersData?.products || []);

  return (
    <HomePage
      banners={banners}
      featuredProducts={featuredProducts}
      newLaunches={newLaunches}
      bestSellers={bestSellers}
    />
  );
}
