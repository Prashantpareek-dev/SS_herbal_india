const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://ssherbalindia.com';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/checkout',
          '/account',
          '/wishlist',
          '/rewards',
          '/order-confirmation/',
          '/order-tracking/',
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
