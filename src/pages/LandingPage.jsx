'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiRefreshCw, FiArrowRight } from 'react-icons/fi';
import { fetchLandingPageBySlug } from '../services/api';
import { normalizeProduct, normalizeProductList } from '../services/normalizers';
import ProductCard from '../components/product/ProductCard';

// ─── Section Renderers ─────────────────────────────────────────────────────────

const HeroSection = ({ section }) => (
  <div
    className="relative min-h-[60vh] flex items-center justify-center text-center bg-gradient-to-br from-green-800 to-green-600 text-white overflow-hidden"
    style={section.backgroundImage ? { backgroundImage: `url(${section.backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
  >
    <div className="absolute inset-0 bg-black/40" />
    <div className="relative z-10 max-w-3xl mx-auto px-6 py-16">
      {section.badge && (
        <span className="inline-block bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full uppercase mb-4">
          {section.badge}
        </span>
      )}
      {section.heading && <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">{section.heading}</h1>}
      {section.subheading && <p className="text-xl md:text-2xl mb-8 opacity-90">{section.subheading}</p>}
      {section.ctaText && section.ctaLink && (
        <Link
          to={section.ctaLink}
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-xl hover:shadow-2xl"
        >
          {section.ctaText} <FiArrowRight />
        </Link>
      )}
    </div>
  </div>
);

const FeaturesSection = ({ section }) => (
  <div className="py-16 bg-white">
    <div className="max-w-6xl mx-auto px-4">
      {section.heading && <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">{section.heading}</h2>}
      {section.subheading && <p className="text-center text-gray-500 mb-12">{section.subheading}</p>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {(section.items || []).map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center p-6 rounded-2xl bg-green-50 hover:shadow-lg transition-shadow"
          >
            {item.icon && <div className="text-4xl mb-4">{item.icon}</div>}
            {item.image && <img src={item.image} alt={item.title || ''} className="w-16 h-16 object-cover rounded-full mx-auto mb-4" />}
            {item.title && <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>}
            {item.description && <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>}
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

const ProductsSection = ({ section }) => {
  const products = (section.products || []).map(p =>
    typeof p === 'object' && p.pricing ? normalizeProduct(p) : p
  );
  if (!products.length) return null;
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {section.heading && <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">{section.heading}</h2>}
        {section.subheading && <p className="text-center text-gray-500 mb-12">{section.subheading}</p>}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id || product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

const TestimonialsSection = ({ section }) => (
  <div className="py-16 bg-white">
    <div className="max-w-6xl mx-auto px-4">
      {section.heading && <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{section.heading}</h2>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(section.testimonials || []).map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-green-50 rounded-2xl p-6 shadow-sm"
          >
            <p className="text-gray-700 italic mb-4">"{t.text || t.testimonialText}"</p>
            <div className="flex items-center gap-3">
              {t.image && <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover" />}
              <div>
                <p className="font-semibold text-gray-900 text-sm">{t.name || t.customerName}</p>
                {(t.location || t.customerLocation) && (
                  <p className="text-xs text-gray-500">{t.location || t.customerLocation}</p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

const BenefitsSection = ({ section }) => (
  <div className="py-16 bg-gradient-to-br from-green-50 to-emerald-50">
    <div className="max-w-4xl mx-auto px-4">
      {section.heading && <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">{section.heading}</h2>}
      {section.subheading && <p className="text-center text-gray-500 mb-10">{section.subheading}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(section.items || section.benefits || []).map((item, i) => (
          <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm">
            <span className="text-green-500 font-bold text-xl mt-0.5">✓</span>
            <span className="text-gray-700">{typeof item === 'string' ? item : item.text || item.title}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const TextSection = ({ section }) => (
  <div className="py-12 bg-white">
    <div className="max-w-3xl mx-auto px-4">
      {section.heading && <h2 className="text-3xl font-bold text-gray-900 mb-4">{section.heading}</h2>}
      {section.content && (
        <div
          className="prose prose-lg text-gray-700"
          dangerouslySetInnerHTML={{ __html: section.content }}
        />
      )}
    </div>
  </div>
);

const ImageTextSection = ({ section }) => (
  <div className={`py-16 bg-white flex flex-col md:flex-row items-center gap-10 max-w-6xl mx-auto px-4 ${section.imageRight ? 'md:flex-row-reverse' : ''}`}>
    {section.image && (
      <div className="flex-1">
        <img src={section.image} alt={section.heading || ''} className="rounded-2xl shadow-lg w-full object-cover max-h-96" />
      </div>
    )}
    <div className="flex-1">
      {section.badge && <span className="inline-block text-xs font-bold text-primary uppercase tracking-widest mb-3">{section.badge}</span>}
      {section.heading && <h2 className="text-3xl font-bold text-gray-900 mb-4">{section.heading}</h2>}
      {section.subheading && <p className="text-gray-600 mb-6 text-lg">{section.subheading}</p>}
      {section.content && <div className="prose text-gray-700" dangerouslySetInnerHTML={{ __html: section.content }} />}
      {section.ctaText && section.ctaLink && (
        <Link to={section.ctaLink} className="inline-flex items-center gap-2 mt-6 bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-dark transition-all">
          {section.ctaText} <FiArrowRight />
        </Link>
      )}
    </div>
  </div>
);

const CtaSection = ({ section }) => (
  <div className="py-16 bg-primary text-white text-center">
    <div className="max-w-2xl mx-auto px-4">
      {section.heading && <h2 className="text-3xl font-bold mb-4">{section.heading}</h2>}
      {section.subheading && <p className="text-lg opacity-90 mb-8">{section.subheading}</p>}
      {section.ctaText && section.ctaLink && (
        <Link
          to={section.ctaLink}
          className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-lg"
        >
          {section.ctaText} <FiArrowRight />
        </Link>
      )}
    </div>
  </div>
);

const SECTION_RENDERERS = {
  hero: HeroSection,
  features: FeaturesSection,
  products: ProductsSection,
  testimonials: TestimonialsSection,
  benefits: BenefitsSection,
  text: TextSection,
  'image-text': ImageTextSection,
  imageText: ImageTextSection,
  cta: CtaSection,
};

// ─── Main Page ────────────────────────────────────────────────────────────────

const LandingPage = ({ initialData = null }) => {
  const { slug } = useParams();
  const [page, setPage] = useState(initialData);
  const [loading, setLoading] = useState(initialData === null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    // Skip client fetch when SSR data was provided
    if (initialData !== null) return;
    if (!slug) return;
    setLoading(true);
    setNotFound(false);

    fetchLandingPageBySlug(slug)
      .then(data => {
        setPage(data.landingPage || data);
      })
      .catch(() => {
        setNotFound(true);
      })
      .finally(() => setLoading(false));
  }, [slug]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FiRefreshCw className="animate-spin text-4xl text-primary" />
      </div>
    );
  }

  if (notFound || !page) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500 text-lg">Page not found.</p>
        <Link href="/" className="text-primary hover:underline font-medium">← Back to Home</Link>
      </div>
    );
  }

  const sections = page.sections || [];

  return (
    <div className="min-h-screen">
      {/* SEO meta (best effort via dynamic title) */}
      {page.seo?.title && (document.title = page.seo.title)}

      {sections.length === 0 ? (
        /* Fallback: show basic page info if no sections defined */
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{page.title}</h1>
          {page.description && <p className="text-gray-600 text-lg">{page.description}</p>}
        </div>
      ) : (
        sections.map((section, i) => {
          const Renderer = SECTION_RENDERERS[section.type] || TextSection;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Renderer section={section} />
            </motion.div>
          );
        })
      )}
    </div>
  );
};

export default LandingPage;
