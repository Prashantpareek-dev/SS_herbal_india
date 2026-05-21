const features = [
  {
    number: "01",
    title: "Supported By Science, Curated For Perfection",
    description: "At SS Herbal India's, we believe that modern problems need modern solutions. Thus, we infuse Ayurveda with scientific research with the help of leading Ayurvedic practitioners and medicine. All products are tested under a human-cased by the WHO Drug Authority by AYUSH, WHO quality labelling, and supported by experts.",
    image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400",
    bgColor: "bg-green-50"
  },
  {
    number: "02",
    title: "Not Just Ingredients– We Source The Best of Nature for Ayurvedic Potency",
    description: "Our ethos centers on quality and potency derived from nature's best. That's why we source our ingredients from along the Western Ghats, nestled in the hills. Quality matters to us, and it's about safe from the best products. All the products are produced under GMP-certified facilities and are free from any harmful ingredients.",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400",
    bgColor: "bg-pink-50",
    reverse: true
  },
  {
    number: "03",
    title: "Ayurveda is Not Just a Medicine, It's a Way of Living",
    description: "We encourage our customers to follow an Ayurvedic lifestyle that emphasizes holistic wellness and guided wellness practices to enhance the effectiveness of Ayurveda. Ayurveda takes life days to transform your health.",
    image: "https://images.unsplash.com/photo-1616795794687-e3c2e273cd6d?w=400",
    bgColor: "bg-green-50"
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 font-heading">
            SS Herbal India's — Your Trusted Ayurvedic Online Shop For Health & Wellness
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto font-body">
            Discover the ancient wisdom of Ayurveda brought to modern life. We are committed to bringing wellness through nature's best remedies, 
            lovingly sent and delivering the most essential support benefits to your doorstep. Experts at SS Herbal India's work day and night to combine 
            centuries-old Ayurvedic wisdom to make this world a better place, effective, and invest in the current wisdom of traditional medicines.
          </p>
        </div>

        <div className="space-y-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${feature.bgColor} rounded-3xl p-8 md:p-12 relative overflow-hidden`}
            >
              <div className={`grid md:grid-cols-2 gap-8 items-center ${feature.reverse ? 'md:grid-flow-dense' : ''}`}>
                {/* Text Content */}
                <div className={feature.reverse ? 'md:col-start-2' : ''}>
                  <div className="text-6xl md:text-8xl font-bold text-green-600 opacity-20 mb-4">
                    {feature.number}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 font-subheading">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed font-body">
                    {feature.description}
                  </p>
                </div>

                {/* Image */}
                <div className={feature.reverse ? 'md:col-start-1 md:row-start-1' : ''}>
                  <div className="relative">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="rounded-2xl w-full h-64 md:h-80 object-cover shadow-lg"
                      loading="lazy"
                    />
                    <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-green-600 rounded-full opacity-10"></div>
                  </div>
                </div>
              </div>

              {/* Decorative Number */}
              <div className="absolute top-8 right-8 text-9xl font-bold text-green-600 opacity-5">
                {feature.number}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
