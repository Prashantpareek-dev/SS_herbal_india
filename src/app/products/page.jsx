import ProductListingPage from '../../pages/ProductListingPage';
import { fetchProductsSSR } from '../../lib/serverApi';
import { normalizeProductList } from '../../services/normalizers';

export const metadata = {
  title: 'All Ayurvedic Products - Shop Online | SS Herbal India',
  description:
    'Browse our complete range of 100% natural Ayurvedic products. GMP & ISO certified. Immunity boosters, digestive health, hair care, skin care and more.',
  keywords:
    'buy ayurvedic products online, herbal supplements India, natural wellness products, SS Herbal India shop',
  openGraph: {
    title: 'All Products | SS Herbal India',
    description:
      'Shop premium Ayurvedic products online at SS Herbal India.',
  },
};

export default async function Page() {
  const data = await fetchProductsSSR({ page: 1, limit: 20, sortBy: 'createdAt', sortOrder: 'desc' });

  console.log('[SSR /products] response received:', JSON.stringify(data).slice(0, 600));

  const initialProducts = normalizeProductList(data?.products || []);
  const initialPagination = data?.pagination || { currentPage: 1, totalPages: 1, totalProducts: 0 };

  console.log('[SSR /products] normalized data sent to page:', JSON.stringify({ count: initialProducts.length, pagination: initialPagination, first: initialProducts[0] }).slice(0, 600));

  return <ProductListingPage initialProducts={initialProducts} initialPagination={initialPagination} />;
}
