'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiClock, FiEye, FiHeart, FiShare2, FiArrowLeft, FiRefreshCw } from 'react-icons/fi';
import { FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { fetchBlogBySlug } from '../services/api';
import { normalizeBlog, normalizeBlogList, normalizeProduct } from '../services/normalizers';
import ProductCard from '../components/product/ProductCard';

const BlogDetailPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setBlog(null);

    fetchBlogBySlug(slug)
      .then(data => {
        setBlog(normalizeBlog(data.blog || data));
        setRelatedBlogs(normalizeBlogList(data.relatedBlogs || []));
        setRelatedProducts((data.relatedProducts || []).map(normalizeProduct));
      })
      .catch(() => {
        setBlog(null);
        setRelatedBlogs([]);
        setRelatedProducts([]);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  const handleShare = (platform) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(blog?.title || '');
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      whatsapp: `https://api.whatsapp.com/send?text=${title}%20${url}`,
    };
    if (urls[platform]) window.open(urls[platform], '_blank', 'noopener,noreferrer');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() =>
      toast.success('Link copied to clipboard!')
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FiRefreshCw className="animate-spin text-4xl text-primary" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500 text-lg">Blog post not found.</p>
        <Link href="/blogs" className="text-primary hover:underline font-medium">← Back to Blogs</Link>
      </div>
    );
  }

  const publishedDate = blog.publishedDate || blog.publishedAt;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Image */}
      {blog.image && (
        <div className="relative h-64 md:h-96 bg-gray-900 overflow-hidden">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            {blog.category && (
              <span className="inline-block bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
                {blog.category}
              </span>
            )}
            <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight">
              {blog.title}
            </h1>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Back link */}
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary mb-8 transition-colors">
          <FiArrowLeft /> Back to Home
        </Link>

        {/* Title (if no hero image) */}
        {!blog.image && (
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">{blog.title}</h1>
        )}

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8 pb-8 border-b">
          {blog.author && (
            <div className="flex items-center gap-2">
              {blog.author.image && (
                <img src={blog.author.image} alt={blog.author.name} className="w-9 h-9 rounded-full object-cover" />
              )}
              <div>
                <p className="font-semibold text-gray-800 text-sm">{blog.author.name}</p>
                {blog.author.bio && <p className="text-xs text-gray-500">{blog.author.bio}</p>}
              </div>
            </div>
          )}
          <div className="flex items-center gap-4 ml-auto flex-wrap">
            {publishedDate && (
              <span>{new Date(publishedDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            )}
            {blog.readTime && (
              <span className="flex items-center gap-1"><FiClock /> {typeof blog.readTime === 'number' ? `${blog.readTime} min read` : blog.readTime}</span>
            )}
            {blog.views && (
              <span className="flex items-center gap-1"><FiEye /> {blog.views.toLocaleString()} views</span>
            )}
            {blog.likes && (
              <span className="flex items-center gap-1"><FiHeart /> {blog.likes.toLocaleString()}</span>
            )}
          </div>
        </div>

        {/* Excerpt */}
        {blog.excerpt && (
          <p className="text-xl text-gray-600 italic leading-relaxed mb-8 border-l-4 border-primary pl-4">
            {blog.excerpt}
          </p>
        )}

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="prose prose-lg max-w-none text-gray-700 mb-10"
          dangerouslySetInnerHTML={{ __html: blog.content || '<p>Content coming soon…</p>' }}
        />

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {blog.tags.map(tag => (
              <span key={tag} className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Share */}
        <div className="flex items-center gap-3 mb-12 p-4 bg-white rounded-xl shadow-sm border">
          <span className="text-sm font-semibold text-gray-700 flex items-center gap-2"><FiShare2 /> Share:</span>
          <button onClick={() => handleShare('whatsapp')} className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors">
            <FaWhatsapp />
          </button>
          <button onClick={() => handleShare('facebook')} className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors">
            <FaFacebook />
          </button>
          <button onClick={() => handleShare('twitter')} className="p-2 rounded-full bg-sky-500 text-white hover:bg-sky-600 transition-colors">
            <FaTwitter />
          </button>
          <button onClick={copyLink} className="ml-auto text-sm text-primary hover:underline font-medium">
            Copy Link
          </button>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Products Mentioned</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Related Blogs */}
        {relatedBlogs.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBlogs.map(related => (
                <Link
                  key={related.id}
                  href={`/blog/${related.slug}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm border hover:shadow-lg transition-all duration-300"
                >
                  {related.image && (
                    <div className="h-40 overflow-hidden">
                      <img
                        src={related.image}
                        alt={related.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    {related.category && (
                      <span className="text-xs font-semibold text-primary uppercase tracking-wide">{related.category}</span>
                    )}
                    <h3 className="font-semibold text-gray-900 mt-1 group-hover:text-primary transition-colors line-clamp-2">
                      {related.title}
                    </h3>
                    {related.readTime && (
                      <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                        <FiClock /> {typeof related.readTime === 'number' ? `${related.readTime} min` : related.readTime}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default BlogDetailPage;
