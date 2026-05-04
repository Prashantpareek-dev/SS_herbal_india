import { useState } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar, FaCheckCircle, FaImage } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ReviewsSection = ({ reviews, averageRating, totalReviews }) => {
  const [filterRating, setFilterRating] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  // Calculate rating distribution
  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      distribution[review.rating] = (distribution[review.rating] || 0) + 1;
    });
    return distribution;
  };

  const distribution = getRatingDistribution();

  // Filter and sort reviews
  const getFilteredReviews = () => {
    let filtered = [...reviews];

    if (filterRating !== 'all') {
      filtered = filtered.filter(r => r.rating === parseInt(filterRating));
    }

    if (sortBy === 'recent') {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === 'helpful') {
      filtered.sort((a, b) => (b.helpful || 0) - (a.helpful || 0));
    } else if (sortBy === 'rating-high') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'rating-low') {
      filtered.sort((a, b) => a.rating - b.rating);
    }

    return filtered;
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i - 0.5 === rating) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-300" />);
      }
    }
    return stars;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-8">
      {/* Rating Overview */}
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Overall Rating */}
          <div className="text-center md:text-left">
            <div className="flex items-end justify-center md:justify-start gap-3 mb-2">
              <span className="text-6xl font-bold text-gray-900">
                {averageRating.toFixed(1)}
              </span>
              <span className="text-2xl text-gray-600 mb-2">/5</span>
            </div>
            <div className="flex justify-center md:justify-start gap-1 mb-3">
              {renderStars(averageRating)}
            </div>
            <p className="text-gray-600 font-medium">
              Based on {totalReviews} reviews
            </p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map(rating => {
              const count = distribution[rating] || 0;
              const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;

              return (
                <div key={rating} className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-700 w-12">
                    {rating} <FaStar className="inline text-yellow-400 text-xs" />
                  </span>
                  <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-yellow-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-wrap items-center gap-4 pb-4 border-b">
        {/* Filter by Rating */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Filter:</span>
          <div className="flex gap-2">
            <button
              onClick={() => setFilterRating('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filterRating === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {[5, 4, 3].map(rating => (
              <button
                key={rating}
                onClick={() => setFilterRating(rating.toString())}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1 ${
                  filterRating === rating.toString()
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {rating} <FaStar className="text-xs" />
              </button>
            ))}
          </div>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-sm font-medium text-gray-700">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm font-medium focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="recent">Most Recent</option>
            <option value="helpful">Most Helpful</option>
            <option value="rating-high">Highest Rating</option>
            <option value="rating-low">Lowest Rating</option>
          </select>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {getFilteredReviews().map((review, index) => (
          <motion.div
            key={review.id || index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
          >
            {/* Reviewer Info */}
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {review.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-gray-900">{review.name}</h4>
                  {review.verified && (
                    <span className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                      <FaCheckCircle className="text-xs" /> Verified Purchase
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="flex gap-1">
                    {renderStars(review.rating)}
                  </div>
                  <span>•</span>
                  <span>{formatDate(review.date)}</span>
                </div>
              </div>
            </div>

            {/* Review Title */}
            {review.title && (
              <h5 className="font-semibold text-gray-900 mb-2">{review.title}</h5>
            )}

            {/* Review Text */}
            <p className="text-gray-700 leading-relaxed mb-3">{review.comment}</p>

            {/* Review Images */}
            {review.images && review.images.length > 0 && (
              <div className="flex gap-2 mb-3">
                {review.images.map((img, i) => (
                  <div
                    key={i}
                    className="w-20 h-20 rounded-lg overflow-hidden border border-gray-200 hover:border-primary cursor-pointer transition-colors"
                  >
                    <img
                      src={img}
                      alt={`Review ${i + 1}`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Helpful Button */}
            <div className="flex items-center gap-4 pt-3 border-t">
              <button className="text-sm text-gray-600 hover:text-primary font-medium transition-colors">
                👍 Helpful ({review.helpful || 0})
              </button>
              <button className="text-sm text-gray-600 hover:text-primary font-medium transition-colors">
                Report
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Write Review Button */}
      <div className="text-center pt-6">
        <button className="px-8 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl">
          Write a Review
        </button>
      </div>
    </div>
  );
};

export default ReviewsSection;
