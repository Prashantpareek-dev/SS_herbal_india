import {
  fetchAllProductSlugsSSR,
  fetchAllBlogSlugsSSR,
  fetchAllCategorySlugsSSR,
} from '../lib/serverApi';

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://ssherbalindia.com';

export default async function sitemap() {
  // ── Static routes ────────────────────────────────────────────────────────
  const staticRoutes = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // ── Dynamic product routes ────────────────────────────────────────────────
  const productSlugs = await fetchAllProductSlugsSSR();
  const productRoutes = productSlugs.map((slug) => ({
    url: `${BASE_URL}/product/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // ── Dynamic category routes ───────────────────────────────────────────────
  const categorySlugs = await fetchAllCategorySlugsSSR();
  const categoryRoutes = categorySlugs.map((slug) => ({
    url: `${BASE_URL}/products/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.75,
  }));

  // ── Dynamic blog routes ───────────────────────────────────────────────────
  const blogSlugs = await fetchAllBlogSlugsSSR();
  const blogRoutes = blogSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes, ...categoryRoutes, ...blogRoutes];
}
