import ProductListingPage from '../../../pages/ProductListingPage';
import { fetchCategoriesSSR, fetchProductsByCategorySSR } from '../../../lib/serverApi';
import { normalizeProductList } from '../../../services/normalizers';

export async function generateMetadata({ params }) {
  const data = await fetchCategoriesSSR();
  const categories = Array.isArray(data) ? data : data?.categories || [];
  const category = categories.find((c) => c.slug === params.category);

  const name =
    category?.name ||
    params.category
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    title: `${name} Products - Buy Online | SS Herbal India`,
    description:
      category?.description ||
      `Shop premium Ayurvedic ${name} products at SS Herbal India. 100% natural, GMP & ISO certified.`,
    openGraph: {
      title: `${name} | SS Herbal India`,
      description:
        category?.description ||
        `Explore ${name} Ayurvedic products at SS Herbal India.`,
    },
  };
}

export default async function Page({ params }) {
  const data = await fetchProductsByCategorySSR(params.category, { page: 1, limit: 20, sortBy: 'createdAt', sortOrder: 'desc' });
  const initialProducts = normalizeProductList(data?.products || []);
  const initialPagination = data?.pagination || { currentPage: 1, totalPages: 1, totalProducts: 0 };
  return <ProductListingPage initialProducts={initialProducts} initialPagination={initialPagination} categorySlug={params.category} />;
}
