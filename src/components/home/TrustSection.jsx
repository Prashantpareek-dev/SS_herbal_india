
const TrustSection = () => {
  const trustFactors = [
    {
      icon: '🏆',
      title: '1M+ Happy Customers',
      description: 'Trusted by over a million satisfied customers across India'
    },
    {
      icon: '✓',
      title: '100% Authentic',
      description: 'All products are certified and quality tested'
    },
    {
      icon: '🔒',
      title: 'Secure Payments',
      description: 'Safe and encrypted payment processing'
    },
    {
      icon: '🚚',
      title: 'Fast Delivery',
      description: 'Doorstep delivery within 1-7 days'
    }
  ];

  const certifications = [
    { name: 'ISO 22000', logo: '../../../Certificate/1.png' },
    { name: 'GMP Certified', logo: '../../../Certificate/2.png' },
    { name: 'FSSAI Approved', logo: '../../../Certificate/3.png' },
    { name: 'Organic Certified', logo: '../../../Certificate/4.png' },
    { name: 'Ayush Approved', logo: '../../../Certificate/5.png' },
    { name: 'Lab Tested', logo: '../../../Certificate/6.png' }
  ];

  const awards = [
    { year: '2026', title: 'Best Ayurvedic Brand' },
    { year: '2025', title: 'Customer Choice Award' },
    { year: '2024', title: 'Quality Excellence' }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-green-50">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Why Trust SS Herbal India?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Your health is our priority. We're committed to delivering pure, effective, and certified Ayurvedic products.
          </p>
        </div>

        {/* Trust Factors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {trustFactors.map((factor, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="text-5xl mb-3">{factor.icon}</div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">{factor.title}</h3>
              <p className="text-sm text-gray-600">{factor.description}</p>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">
            Our Certifications & Approvals
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors"
              >
                <div className="text-4xl mb-2"><img src={cert.logo} alt={cert.name} loading="lazy" /></div>
                <div className="text-xs font-semibold text-center text-gray-700">{cert.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Awards & Numbers Row */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          Awards
          <div className="bg-white rounded-xl shadow-md p-6">
            <h4 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">🏆</span>
              Awards & Recognition
            </h4>
            <div className="space-y-3">
              {awards.map((award, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs font-bold">
                    {award.year}
                  </div>
                  <div className="text-sm text-gray-700">{award.title}</div>
                </div>
              ))}
            </div>
          </div>

          Customer Stats
          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl shadow-md p-6 text-white">
            <h4 className="font-bold text-lg mb-4">By The Numbers</h4>
            <div className="space-y-3">
              <div>
                <div className="text-3xl font-bold">1M+</div>
                <div className="text-sm text-green-100">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl font-bold">4.8★</div>
                <div className="text-sm text-green-100">Average Rating</div>
              </div>
              <div>
                <div className="text-3xl font-bold">50+</div>
                <div className="text-sm text-green-100">Premium Products</div>
              </div>
            </div>
          </div>

          Guarantee
          <div className="bg-white rounded-xl shadow-md p-6">
            <h4 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">💚</span>
              Our Promise
            </h4>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>100% Natural Ingredients</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>No Harmful Chemicals</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>30-Day Money Back Guarantee</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Free Expert Consultation</span>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default TrustSection;
