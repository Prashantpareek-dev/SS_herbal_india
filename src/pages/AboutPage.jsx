import Breadcrumb from '../components/common/Breadcrumb';

const AboutPage = () => {
  return (
    <div>
      <Breadcrumb items={[{ label: 'About Us' }]} />
      
      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-6">About SS Herbal India</h1>
          <p className="text-xl text-gray-600 text-center mb-12">
            Your Trusted Partner in Ayurvedic Wellness
          </p>

          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              Welcome to SS Herbal India, where ancient Ayurvedic wisdom meets modern scientific validation. 
              Since our inception, we have been committed to bringing you the finest quality herbal and Ayurvedic 
              products that promote holistic wellness and natural healing.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              To make authentic Ayurvedic nutrition accessible to everyone, helping people achieve optimal health 
              through the power of nature's finest ingredients, combined with traditional wisdom and modern quality standards.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Why Choose Us?</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li>100% Natural & Organic Ingredients</li>
              <li>GMP, ISO 22000, and FSSAI Certified Manufacturing</li>
              <li>Laboratory Tested for Purity & Potency</li>
              <li>Traditional Formulations with Modern Standards</li>
              <li>Transparent Ingredient Sourcing</li>
              <li>Expert Ayurvedic Consultation Available</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-2">Quality First</h3>
                <p className="text-gray-700">Every product undergoes rigorous quality testing to ensure maximum efficacy.</p>
              </div>
              <div className="bg-green-100 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-2">Customer Trust</h3>
                <p className="text-gray-700">We build lasting relationships based on transparency and authenticity.</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-2">Sustainability</h3>
                <p className="text-gray-700">Committed to eco-friendly practices and ethical sourcing.</p>
              </div>
              <div className="bg-green-100 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-2">Innovation</h3>
                <p className="text-gray-700">Blending ancient wisdom with modern scientific research.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
