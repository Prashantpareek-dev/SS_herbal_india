/**
 * ProductJsonLd — injects structured data (JSON-LD) for Google Rich Snippets.
 *
 * Renders a <script type="application/ld+json"> tag in the page <head>.
 * Enables: star ratings, price, availability, and brand in Google search results.
 *
 * Usage (inside a Server Component page or layout):
 *   <ProductJsonLd product={rawApiProduct} />
 *
 * @param {{ product: object }} props  Raw product object from the API.
 */
export default function ProductJsonLd({ product }) {
  if (!product) return null;

  const imageUrl =
    (Array.isArray(product.images) && product.images[0]?.url) ||
    (Array.isArray(product.images) &&
      typeof product.images[0] === 'string' &&
      product.images[0]) ||
    '';

  const price =
    product.pricing?.sellingPrice ?? product.discountPrice ?? product.price ?? 0;

  const availability =
    (product.inventory?.stock ?? product.stock ?? 1) > 0
      ? 'https://schema.org/InStock'
      : 'https://schema.org/OutOfStock';

  const structuredData = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription || product.longDescription || '',
    sku: product.sku || '',
    brand: {
      '@type': 'Brand',
      name: 'SS Herbal India',
    },
    image: imageUrl ? [imageUrl] : [],
    offers: {
      '@type': 'Offer',
      url:
        typeof window === 'undefined'
          ? ''
          : `${window.location.origin}/product/${product.slug}`,
      priceCurrency: 'INR',
      price: price.toString(),
      availability,
      seller: {
        '@type': 'Organization',
        name: 'SS Herbal India',
      },
    },
    ...(product.metrics?.averageRating
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: product.metrics.averageRating.toString(),
            reviewCount: (product.metrics.totalReviews ?? 0).toString(),
            bestRating: '5',
            worstRating: '1',
          },
        }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
