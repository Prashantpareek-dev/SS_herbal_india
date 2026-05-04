import { FiStar } from 'react-icons/fi';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

const StarRating = ({ rating = 0, maxRating = 5, size = 16, showCount = false, count = 0 }) => {
  const stars = [];
  
  for (let i = 1; i <= maxRating; i++) {
    if (i <= rating) {
      // Full star
      stars.push(
        <FaStar key={i} size={size} className="text-yellow-400" />
      );
    } else if (i - 0.5 <= rating) {
      // Half star
      stars.push(
        <FaStarHalfAlt key={i} size={size} className="text-yellow-400" />
      );
    } else {
      // Empty star
      stars.push(
        <FiStar key={i} size={size} className="text-gray-300" />
      );
    }
  }

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {stars}
      </div>
      {showCount && count > 0 && (
        <span className="text-sm text-gray-600 ml-1">({count})</span>
      )}
    </div>
  );
};

export default StarRating;
