import LandingPage from '../../../pages/LandingPage';
import { fetchLandingPageBySlugSSR } from '../../../lib/serverApi';

export async function generateMetadata({ params }) {
  const data = await fetchLandingPageBySlugSSR(params.slug);
  const page = data?.landingPage || data;

  if (!page) {
    return { title: 'SS Herbal India' };
  }

  return {
    title: page.seo?.title || page.title || 'SS Herbal India',
    description:
      page.seo?.description ||
      page.description ||
      'Premium Ayurvedic products by SS Herbal India.',
    openGraph: {
      title: page.seo?.title || page.title || 'SS Herbal India',
      description: page.seo?.description || page.description || '',
    },
  };
}

export default async function Page({ params }) {
  const data = await fetchLandingPageBySlugSSR(params.slug);
  const initialData = data?.landingPage || data || null;
  return <LandingPage initialData={initialData} />;
}
