/**
 * Server-side API utilities for Next.js Server Components and generateMetadata.
 *
 * Rules:
 *  - Only import this file in Server Components (page.jsx, layout.jsx, generateMetadata).
 *  - Never import Axios, Zustand, or localStorage here — those only work client-side.
 *  - Uses Next.js extended fetch() for ISR caching via { next: { revalidate } }.
 */

const API_BASE =
  process.env.API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  'http://localhost:5000/api/v1';

/**
 * Base fetch helper.
 * Unwraps the standard API envelope: { success: true, data: {...} }
 * Returns the `data` value, or null on any error / non-OK response.
 */
async function apiFetch(path, fetchOptions = {}) {
  const url = `${API_BASE}${path}`;
  console.log(`[SSR → REQUEST ] GET ${url}`);
  try {
    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      ...fetchOptions,
    });
    if (!res.ok) {
      let body = '';
      try { body = await res.text(); } catch {}
      console.error(`[SSR ← RESPONSE] ${res.status} ${res.statusText} — ${url}\n  body: ${body.slice(0, 400)}`);
      return null;
    }
    const json = await res.json();
    const data = json?.success ? json.data : null;
    console.log(`[SSR ← RESPONSE] 200 — ${url}`, JSON.stringify(data).slice(0, 500));
    return data;
  } catch (err) {
    console.error(`[SSR ← RESPONSE] Network error — ${url}\n  ${err.message}`);
    return null;
  }
}

// ─── Products ────────────────────────────────────────────────────────────────

/**
 * Fetch a single product by slug.
 * Cached for 1 hour (ISR). Returns raw API product object or null.
 */
export async function fetchProductBySlugSSR(slug) {
  return apiFetch(`/products/${encodeURIComponent(slug)}`, {
    next: { revalidate: 3600 },
  });
}

/**
 * Fetch featured products. Cached for 10 minutes.
 */
export async function fetchFeaturedProductsSSR(limit = 12) {
  return apiFetch(`/products/featured?limit=${limit}`, {
    next: { revalidate: 600 },
  });
}

/**
 * Fetch new launch products. Cached for 10 minutes.
 */
export async function fetchNewLaunchesSSR(limit = 12) {
  return apiFetch(`/products/new-launches?limit=${limit}`, {
    next: { revalidate: 600 },
  });
}

/**
 * Fetch best seller products. Cached for 10 minutes.
 */
export async function fetchBestSellersSSR(limit = 12) {
  return apiFetch(`/products/best-sellers?limit=${limit}`, {
    next: { revalidate: 600 },
  });
}

/**
 * Fetch paginated product list with optional filters.
 * Cached for 30 minutes.
 * @param {Object} params  e.g. { page: 1, limit: 20, sortBy: 'featured', category: '...' }
 */
export async function fetchProductsSSR(params = {}) {
  const query = new URLSearchParams(params).toString();
  return apiFetch(`/products${query ? `?${query}` : ''}`, {
    next: { revalidate: 1800 },
  });
}

/**
 * Fetch products filtered by category slug.
 * Cached for 30 minutes.
 */
export async function fetchProductsByCategorySSR(categorySlug, params = {}) {
  const query = new URLSearchParams(params).toString();
  return apiFetch(
    `/products/by-category/${encodeURIComponent(categorySlug)}${query ? `?${query}` : ''}`,
    { next: { revalidate: 1800 } }
  );
}

/**
 * Returns an array of all product slugs.
 * Used by generateStaticParams() in product/[slug]/page.jsx.
 * Falls back to [] if API is unavailable (pages will be generated on-demand).
 */
export async function fetchAllProductSlugsSSR() {
  const data = await apiFetch('/products?limit=500&fields=slug', {
    next: { revalidate: 3600 },
  });
  if (!data) return [];
  const items =
    data.products || data.items || (Array.isArray(data) ? data : []);
  return items.map((p) => p.slug).filter(Boolean);
}

// ─── Blogs ───────────────────────────────────────────────────────────────────

/**
 * Fetch a single blog post by slug.
 * Cached for 2 hours.
 */
export async function fetchBlogBySlugSSR(slug) {
  return apiFetch(`/blogs/${encodeURIComponent(slug)}`, {
    next: { revalidate: 7200 },
  });
}

/**
 * Returns an array of all blog slugs.
 * Used by generateStaticParams() in blog/[slug]/page.jsx.
 */
export async function fetchAllBlogSlugsSSR() {
  const data = await apiFetch('/blogs?limit=500&fields=slug', {
    next: { revalidate: 3600 },
  });
  if (!data) return [];
  const items =
    data.blogs || data.items || (Array.isArray(data) ? data : []);
  return items.map((b) => b.slug).filter(Boolean);
}

// ─── Hero Banners ────────────────────────────────────────────────────────────

/**
 * Fetch active hero banners for a placement.
 * Cached for 5 minutes (banners change frequently).
 */
export async function fetchHeroBannersSSR(placement = 'homepage_hero') {
  return apiFetch(
    `/hero-banners?placement=${encodeURIComponent(placement)}`,
    { next: { revalidate: 300 } }
  );
}

// ─── Categories ──────────────────────────────────────────────────────────────

/**
 * Fetch all active categories with optional subcategories.
 * Cached for 2 hours.
 */
export async function fetchCategoriesSSR(withSubs = true) {
  return apiFetch(`/categories${withSubs ? '' : '?withSubs=false'}`, {
    next: { revalidate: 7200 },
  });
}

/**
 * Fetch a single category by slug (includes subcategories + parent).
 * Cached for 2 hours.
 */
export async function fetchCategoryBySlugSSR(slug) {
  return apiFetch(`/categories/${encodeURIComponent(slug)}`, {
    next: { revalidate: 7200 },
  });
}

/**
 * Returns an array of all category slugs.
 * Used by generateStaticParams() in products/[category]/page.jsx.
 */
export async function fetchAllCategorySlugsSSR() {
  const data = await apiFetch('/categories?withSubs=false', { next: { revalidate: 7200 } });
  if (!data) return [];
  const items = Array.isArray(data) ? data : data?.categories || [];
  return items.map((c) => c.slug).filter(Boolean);
}

// ─── Landing Pages ───────────────────────────────────────────────────────────

/**
 * Fetch a landing page by slug.
 * Cached for 1 hour.
 */
export async function fetchLandingPageBySlugSSR(slug) {
  return apiFetch(`/landing-pages/slug/${encodeURIComponent(slug)}`, {
    next: { revalidate: 3600 },
  });
}

/**
 * Fetch the published landing page tied to a specific product.
 * Cached for 1 hour.
 */
export async function fetchLandingPageByProductIdSSR(productId) {
  return apiFetch(`/landing-pages/product/${encodeURIComponent(productId)}`, {
    next: { revalidate: 3600 },
  });
}
