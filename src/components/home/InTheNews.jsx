import { motion } from 'framer-motion';

const newsLogos = [
  {
    id: 1,
    name: "The Times of India",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/The_Times_of_India_logo.svg/320px-The_Times_of_India_logo.svg.png",
    width: "160px"
  },
  {
    id: 2,
    name: "Hindustan Times",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/nove/Hindustan_Times_logo.svg/320px-Hindustan_Times_logo.svg.png",
    width: "180px"
  },
  {
    id: 3,
    name: "Economic Times",
    text: "Economic Times",
    width: "140px"
  },
  {
    id: 4,
    name: "Your Story",
    text: "YourStory",
    width: "140px"
  },
  {
    id: 5,
    name: "Inc42",
    text: "Inc42",
    width: "100px"
  }
];

const InTheNews = () => {
  return (
    <section className="py-12 bg-white border-y">
      <div className="container mx-auto px-4">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-2xl font-bold text-gray-900 mb-8"
        >
          In The News
        </motion.h3>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
        >
          {newsLogos.map((news, index) => (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
              style={{ width: news.width }}
            >
              {news.logo ? (
                <img
                  src={news.logo}
                  alt={news.name}
                  className="w-full h-auto"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
              ) : null}
              <div
                className="text-gray-700 font-bold text-xl text-center"
                style={{ display: news.logo ? 'none' : 'block' }}
              >
                {news.text || news.name}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-gray-600 mt-6 text-sm"
        >
          Trusted by leading media and wellness experts across India
        </motion.p>
      </div>
    </section>
  );
};

export default InTheNews;
