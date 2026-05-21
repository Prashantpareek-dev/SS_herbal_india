import ProductDetailPage from '../../../pages/ProductDetailPage';
import { fetchProductBySlugSSR, fetchLandingPageByProductIdSSR } from '../../../lib/serverApi';
import {
  normalizeProduct,
  normalizeProductList,
  normalizeReviewList,
  normalizeTestimonialList,
} from '../../../services/normalizers';

export async function generateMetadata({ params }) {
  const data = await fetchProductBySlugSSR(params.slug);
  const product = data?.product || data;

  if (!product) {
    return { title: 'Product | SS Herbal India' };
  }

  const imageUrl =
    (Array.isArray(product.images) && product.images[0]?.url) ||
    (Array.isArray(product.images) && typeof product.images[0] === 'string' && product.images[0]) ||
    '';

  return {
    title: `${product.name} - Buy Ayurvedic Online | SS Herbal India`,
    description:
      product.shortDescription ||
      `Buy ${product.name} online. 100% natural Ayurvedic product by SS Herbal India.`,
    keywords: [
      product.name,
      product.category?.name || product.category,
      'ayurvedic',
      'herbal supplement',
      'natural wellness',
    ]
      .filter(Boolean)
      .join(', '),
    openGraph: {
      title: product.name,
      description:
        product.shortDescription ||
        `${product.name} — premium Ayurvedic product by SS Herbal India.`,
      images: imageUrl ? [{ url: imageUrl, alt: product.name }] : [],
      type: 'website',
    },
  };
}

export default async function Page({ params }) {
  const data = await fetchProductBySlugSSR(params.slug);

  console.log(`[SSR product/${params.slug}] data received:`, data ? JSON.stringify(data).slice(0, 600) : 'null — API returned no data');

  let initialData = null;
  if (data?.product) {
    const normalized = normalizeProduct(data.product);
    normalized._id = data.product._id;

    console.log(`[SSR product/${params.slug}] normalized product sent to page:`, JSON.stringify(normalized).slice(0, 600));

    // Fetch the product-specific landing page alongside product data
    // API now always returns 200:
    //   { hasLandingPage: true,  landingPage: {...} }
    //   { hasLandingPage: false, product: {...}, reviews: [...] }   ← fallback with richer user data on reviews
    const landingPageData = await fetchLandingPageByProductIdSSR(data.product._id);

    // When no landing page exists the API returns fallback reviews that include
    // the joined User record (firstName, lastName, profileImage). Prefer those.
    const reviews = (() => {
      if (landingPageData?.hasLandingPage === false && landingPageData.reviews?.length) {
        return normalizeReviewList(landingPageData.reviews);
      }
      return data.reviews?.length ? normalizeReviewList(data.reviews) : null;
    })();

    initialData = {
      product: normalized,
      relatedProducts: normalizeProductList(data.relatedProducts || []),
      reviews,
      testimonials: data.testimonials?.length ? normalizeTestimonialList(data.testimonials) : null,
      // landingPageData is already the unwrapped json.data object from apiFetch
      landingPage: landingPageData?.hasLandingPage ? (landingPageData.landingPage || null) : null,
    };
  }
  return <ProductDetailPage initialData={initialData} />;
}
