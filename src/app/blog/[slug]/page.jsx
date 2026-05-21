import BlogDetailPage from '../../../pages/BlogDetailPage';
import { fetchBlogBySlugSSR } from '../../../lib/serverApi';

export async function generateMetadata({ params }) {
  const data = await fetchBlogBySlugSSR(params.slug);
  const blog = data?.blog || data;

  if (!blog) {
    return { title: 'Blog | SS Herbal India' };
  }

  const imageUrl =
    blog.coverImage?.url ||
    (typeof blog.coverImage === 'string' && blog.coverImage) ||
    blog.image ||
    '';

  return {
    title: `${blog.title} | SS Herbal India Blog`,
    description:
      blog.excerpt ||
      blog.metaDescription ||
      `Read "${blog.title}" on SS Herbal India Blog.`,
    keywords: [
      ...(blog.tags || []),
      blog.category,
      'ayurvedic blog',
      'herbal health tips',
    ]
      .filter(Boolean)
      .join(', '),
    openGraph: {
      title: blog.title,
      description: blog.excerpt || blog.metaDescription || blog.title,
      images: imageUrl ? [{ url: imageUrl, alt: blog.title }] : [],
      type: 'article',
      publishedTime: blog.publishedAt,
    },
  };
}

export default function Page() {
  return <BlogDetailPage />;
}
