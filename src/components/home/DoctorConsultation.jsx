const DoctorConsultation = () => {
  const handleConsultationClick = () => {
    // Mock WhatsApp link (replace with actual number)
    const whatsappNumber = '919876543210';
    const message = encodeURIComponent('Hi! I would like to book a free health consultation.');
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <section className="py-12 bg-gradient-to-r from-green-600 to-green-700">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left Content */}
          <div className="flex-1 text-white">
            <div className="inline-block bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-medium mb-4 text-white">
              ✨ Free Service
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white font-heading">
              Free Doctor Video Consultation
            </h2>
            <p className="text-lg text-white mb-6 font-body">
              Get personalized health advice from certified Ayurvedic doctors. Discuss your concerns, get product recommendations, and start your wellness journey with expert guidance.
            </p>
            
            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0 text-white">
                  ✓
                </div>
                <div>
                  <h4 className="font-semibold text-white">Certified Experts</h4>
                  <p className="text-sm text-green-100">BAMS qualified doctors</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0 text-white">
                  ✓
                </div>
                <div>
                  <h4 className="font-semibold text-white">Personalized Care</h4>
                  <p className="text-sm text-green-100">Tailored recommendations</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0 text-white">
                  ✓
                </div>
                <div>
                  <h4 className="font-semibold text-white">100% Confidential</h4>
                  <p className="text-sm text-green-100">Secure consultation</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0 text-white">
                  ✓
                </div>
                <div>
                  <h4 className="font-semibold text-white">Convenient Timing</h4>
                  <p className="text-sm text-green-100">7 days a week</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleConsultationClick}
                className="bg-white text-green-700 px-8 py-3 rounded-lg font-bold hover:bg-green-50 transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Book Free Consultation
              </button>
              <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-green-700 transition-colors">
                Chat on WhatsApp
              </button>
            </div>
          </div>

          {/* Right Image/Illustration */}
          <div className="flex-shrink-0 w-full md:w-80 lg:w-96">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600"
                alt="Doctor consultation"
                className="rounded-lg shadow-2xl w-full"
                loading="lazy"
              />
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-xl p-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">5000+</div>
                  <div className="text-sm text-gray-600">Happy Consultations</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorConsultation;
