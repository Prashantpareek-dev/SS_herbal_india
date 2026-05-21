/**
 * Normalizers — convert API response shapes into the field names
 * that existing components already expect, so component changes are minimal.
 */

// ─── Products ─────────────────────────────────────────────────────────────────

export const normalizeProduct = (p) => {
  if (!p) return null;
  return {
    id: p._id,
    name: p.name,
    slug: p.slug,
    sku: p.sku || '',
    shortDescription: p.shortDescription || '',
    longDescription: p.longDescription || '',
    problemsSolved: p.problemsSolved || [],
    howItWorks: p.howItWorks || '',
    howToUse: p.howToUse || '',
    dosage: p.dosage || '',
    warnings: p.warnings || '',

    // Pricing
    price: p.pricing?.mrp ?? 0,
    discountPrice: p.pricing?.sellingPrice ?? 0,
    discountPercentage: p.pricing?.discount ?? 0,

    // Category
    category: p.category?.name || p.category || '',
    categorySlug: p.category?.slug || '',

    // Inventory
    stock: p.inventory?.stock ?? 0,

    // Images — flatten to string array, filter out any undefined/null entries
    images: (p.images || []).map(img => (typeof img === 'string' ? img : img?.url)).filter(Boolean),
    videos: p.videos || [],

    // Metrics
    averageRating: p.metrics?.averageRating ?? 0,
    totalReviews: p.metrics?.totalReviews ?? 0,
    totalSales: p.metrics?.sales ?? 0,

    // Flags
    isFeatured: p.isFeatured || false,
    isBestSeller: p.isBestSeller || false,
    isNewArrival: p.isNew || false,
    isActive: p.isActive !== false,

    // Content arrays
    benefits: p.benefits || [],
    concerns: p.concerns || [],
    tags: p.tags || [],
    certifications: p.certifications || [],

    // Ingredients — API returns string array; local expects objects; support both
    ingredients: (p.ingredients || []).map(ing => {
      if (typeof ing === 'string') {
        // Parse "Ashwagandha root extract 500mg" → { name, quantity, description }
        const match = ing.match(/^(.+?)\s+(\d+\s*\w+)$/);
        if (match) return { name: match[1], quantity: match[2], description: '' };
        return { name: ing, quantity: '', description: '' };
      }
      return ing;
    }),

    // Variants — support API variants or local variants
    variants: (p.variants || []).map(v => ({
      name: v.name || v.label || '',
      price: v.pricing?.mrp ?? v.price ?? 0,
      discountPrice: v.pricing?.sellingPrice ?? v.discountPrice ?? 0,
      stock: v.inventory?.stock ?? v.stock ?? 0,
    })),
    colorVariants: p.colorVariants || [],

    // SEO
    seo: p.seo || {},
    rewardPoints: p.rewardPoints || 0,

    // Related (will be array of normalized products or IDs)
    relatedProducts: [],
    upsellProducts: [],
  };
};

export const normalizeProductList = (products = []) =>
  products.map(normalizeProduct);

// ─── Reviews ─────────────────────────────────────────────────────────────────

export const normalizeReview = (r) => {
  if (!r) return null;
  const firstName = r.user?.firstName || '';
  const lastName = r.user?.lastName || '';
  const displayName = [firstName, lastName].filter(Boolean).join(' ') || r.name || 'Customer';
  return {
    id: r._id || r.id,
    name: displayName,
    rating: r.rating || 0,
    title: r.title || '',
    comment: r.comment || '',
    date: r.createdAt || r.date || '',
    verified: r.verified || false,
    helpful: r.helpfulCount ?? r.helpful ?? 0,
    images: r.images || [],
    adminReply: r.adminReply || null,
  };
};

export const normalizeReviewList = (reviews = []) =>
  reviews.map(normalizeReview);

// ─── Blogs ───────────────────────────────────────────────────────────────────

export const normalizeBlog = (b) => {
  if (!b) return null;
  return {
    id: b._id || b.id,
    title: b.title || '',
    slug: b.slug || '',
    excerpt: b.excerpt || '',
    content: b.content || '',
    author: {
      name: b.author?.name || '',
      image: b.author?.avatar || b.author?.image || '',
      bio: b.author?.bio || '',
    },
    image: b.coverImage?.url || b.image || '',
    category: b.category || '',
    tags: b.tags || [],
    readTime: b.metrics?.readTime ? `${b.metrics.readTime} min read` : (b.readTime || '5 min read'),
    publishedDate: b.publishedAt || b.publishedDate || '',
    views: b.metrics?.views ?? b.views ?? 0,
    likes: b.metrics?.likes ?? b.likes ?? 0,
    featured: b.isFeatured ?? b.featured ?? false,
    isNewLaunch: b.isNewLaunch || false,
    relatedProducts: b.relatedProducts || [],
  };
};

export const normalizeBlogList = (blogs = []) =>
  blogs.map(normalizeBlog);

// ─── Testimonials ─────────────────────────────────────────────────────────────

export const normalizeTestimonial = (t) => {
  if (!t) return null;
  return {
    id: t._id || t.id,
    name: t.customerName || t.name || '',
    location: t.customerLocation || t.location || '',
    image: t.customerAvatar || t.image || '',
    rating: t.rating || 5,
    text: t.testimonialText || t.text || '',
    product: t.products?.[0]?.name || t.product || '',
    verified: true,
    // For influencer / video testimonials
    credentials: t.customerTitle || t.credentials || '',
    specialty: t.specialty || '',
    testimonial: t.testimonialText || t.testimonial || '',
    videoUrl: t.video?.url || t.videoUrl || '',
    videoThumbnail: t.video?.thumbnail || t.videoThumbnail || '',
    isFeatured: t.isFeatured || false,
  };
};

export const normalizeTestimonialList = (testimonials = []) =>
  testimonials.map(normalizeTestimonial);

// ─── Banners ──────────────────────────────────────────────────────────────────

export const normalizeBanner = (b) => {
  if (!b) return null;
  return {
    id: b._id || b.id,
    title: b.title || '',
    subtitle: b.subtitle || '',
    description: b.description || '',
    image: (typeof b.desktopImage === 'string' ? b.desktopImage : b.desktopImage?.url) || b.image || '',
    mobileImage: (typeof b.mobileImage === 'string' ? b.mobileImage : b.mobileImage?.url) || '',
    cta: b.primaryCta?.label || b.cta || '',
    link: b.primaryCta?.url || b.link || '',
    secondaryCta: b.secondaryCta || null,
    bg: b.overlayStyle?.overlayColor
      ? `from-[${b.overlayStyle.overlayColor}]/90 to-[${b.overlayStyle.overlayColor}]/90`
      : '',
    overlayStyle: b.overlayStyle || {},
  };
};

export const normalizeBannerList = (banners = []) =>
  banners.map(normalizeBanner);

// ─── Rating Summary ──────────────────────────────────────────────────────────

export const normalizeRatingSummary = (summary) => {
  if (!summary) return null;
  return {
    averageRating: summary.averageRating ?? 0,
    totalReviews: summary.totalReviews ?? 0,
    distribution: summary.ratingDistribution || summary.distribution || {},
  };
};

// ─── Categories ───────────────────────────────────────────────────────────────

export const normalizeCategory = (c) => {
  if (!c) return null;
  // API provides both `image` and `imageUrl` as aliases; prefer whichever is set
  const image = c.imageUrl || c.image || '';
  return {
    id: c._id || c.id,
    name: c.name || '',
    slug: c.slug || '',
    description: c.description || '',
    image,
    imageUrl: image,
    icon: c.icon || '',
    productCount: c.productCount ?? 0,
    displayOrder: c.displayOrder ?? 0,
    parent: c.parent ? normalizeCategory(c.parent) : null,
    subcategories: (c.subcategories || []).map(normalizeCategory),
  };
};

export const normalizeCategoryList = (categories = []) =>
  categories.map(normalizeCategory);
