import { useState } from 'react';
import { fetchVideoTestimonials } from '../../services/api';
import { normalizeTestimonialList } from '../../services/normalizers';
import useApi from '../../hooks/useApi';

const InfluencerTestimonials = () => {
  const [selectedInfluencer, setSelectedInfluencer] = useState(null);

  const { data: influencers } = useApi(
    async () => {
      const res = await fetchVideoTestimonials(8);
      const list = res?.data?.testimonials || [];
      return normalizeTestimonialList(list).map(t => ({
        ...t,
        specialty: t.specialty || '',
        socialMedia: t.socialMedia || null,
      }));
    },
    []
  );

  const openVideo = (influencer) => {
    setSelectedInfluencer(influencer);
  };

  const closeVideo = () => {
    setSelectedInfluencer(null);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 font-heading">
            Trusted by Experts & Influencers
          </h2>
          <p className="text-gray-600 text-lg font-body">
            Hear from health professionals and wellness experts who recommend our products
          </p>
        </div>

        {/* Influencer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {influencers.map((influencer) => (
            <div
              key={influencer.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Video Thumbnail */}
              <div className="relative aspect-video bg-gray-200 group cursor-pointer" onClick={() => openVideo(influencer)}>
                <img
                  src={influencer.videoThumbnail}
                  alt={influencer.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Play overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center group-hover:bg-opacity-40 transition-all">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-primary-600 ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                </div>
                {/* Verified badge */}
                {influencer.verified && (
                  <div className="absolute top-3 right-3 bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Verified
                  </div>
                )}
              </div>

              {/* Influencer Info */}
              <div className="p-5">
                <div className="flex items-start gap-3 mb-3">
                  <img
                    src={influencer.image}
                    alt={influencer.name}
                    className="w-12 h-12 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{influencer.name}</h3>
                    <p className="text-sm text-primary-600 font-medium">{influencer.credentials}</p>
                    <p className="text-xs text-gray-500">{influencer.specialty}</p>
                  </div>
                </div>

                {/* Testimonial */}
                <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                  "{influencer.testimonial}"
                </p>

                {/* Social Stats */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                      <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                    </svg>
                    {influencer.socialMedia?.followers}
                  </div>
                  <div className="flex gap-1">
                    {[...Array(influencer.rating)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Modal */}
        {selectedInfluencer && (
          <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4" onClick={closeVideo}>
            <div className="bg-white rounded-lg max-w-4xl w-full overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <div className="relative">
                {/* Close button */}
                <button
                  onClick={closeVideo}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900 shadow-lg"
                >
                  ×
                </button>
                
                {/* Video iframe (mock) */}
                <div className="aspect-video bg-gray-900">
                  <iframe
                    src={selectedInfluencer.videoUrl}
                    title={selectedInfluencer.name}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1 font-subheading">{selectedInfluencer.name}</h3>
                  <p className="text-primary-600 font-medium mb-2">{selectedInfluencer.credentials}</p>
                  <p className="text-gray-600">{selectedInfluencer.testimonial}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default InfluencerTestimonials;
