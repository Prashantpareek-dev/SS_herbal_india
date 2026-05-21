import { useState } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar, FaCheckCircle } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { markReviewHelpful, submitReview } from '../../services/api';
import useUserStore from '../../store/userStore';

const ReviewsSection = ({ reviews: initialReviews, averageRating, totalReviews, productId }) => {
  const [reviews, setReviews] = useState(initialReviews || []);
  const [filterRating, setFilterRating] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [helpfulClicked, setHelpfulClicked] = useState(new Set());
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ rating: 5, title: '', comment: '' });
  const [formErrors, setFormErrors] = useState({});

  const { isAuthenticated } = useUserStore();

  // ── Rating distribution ──────────────────────────────────────────────────────
  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(r => {
      distribution[r.rating] = (distribution[r.rating] || 0) + 1;
    });
    return distribution;
  };
  const distribution = getRatingDistribution();

  // ── Filter & sort ────────────────────────────────────────────────────────────
  const getFilteredReviews = () => {
    let filtered = [...reviews];
    if (filterRating !== 'all') {
      filtered = filtered.filter(r => r.rating === parseInt(filterRating));
    }
    if (sortBy === 'recent')      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    else if (sortBy === 'helpful') filtered.sort((a, b) => (b.helpful || 0) - (a.helpful || 0));
    else if (sortBy === 'rating-high') filtered.sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'rating-low')  filtered.sort((a, b) => a.rating - b.rating);
    return filtered;
  };

  // ── Stars helper ─────────────────────────────────────────────────────────────
  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => {
      if (i + 1 <= rating) return <FaStar key={i} className="text-green-500" />;
      if (i + 0.5 === rating) return <FaStarHalfAlt key={i} className="text-green-500" />;
      return <FaRegStar key={i} className="text-gray-300" />;
    });

  const renderInteractiveStars = (selected, onSelect) =>
    Array.from({ length: 5 }, (_, i) => (
      <button key={i} type="button" onClick={() => onSelect(i + 1)}>
        {i < selected
          ? <FaStar className="text-green-500 text-2xl hover:scale-110 transition-transform" />
          : <FaRegStar className="text-gray-300 text-2xl hover:text-green-400 hover:scale-110 transition-all" />}
      </button>
    ));

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });

  // ── Helpful click ─────────────────────────────────────────────────────────────
  const handleHelpful = async (review) => {
    const reviewId = review.id || review._id;
    if (!reviewId || helpfulClicked.has(reviewId)) return;

    // Optimistic update
    setReviews(prev =>
      prev.map(r =>
        (r.id || r._id) === reviewId
          ? { ...r, helpful: (r.helpful || 0) + 1 }
          : r
      )
    );
    setHelpfulClicked(prev => new Set([...prev, reviewId]));

    try {
      await markReviewHelpful(reviewId);
    } catch {
      // Revert on failure
      setReviews(prev =>
        prev.map(r =>
          (r.id || r._id) === reviewId
            ? { ...r, helpful: Math.max(0, (r.helpful || 1) - 1) }
            : r
        )
      );
      setHelpfulClicked(prev => { const s = new Set(prev); s.delete(reviewId); return s; });
    }
  };

  // ── Submit Review ─────────────────────────────────────────────────────────────
  const validateForm = () => {
    const errors = {};
    if (!form.title.trim()) errors.title = 'Title is required';
    if (!form.comment.trim() || form.comment.trim().length < 10)
      errors.comment = 'Review must be at least 10 characters';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (!productId) {
      toast.error('Cannot submit review: product ID missing');
      return;
    }

    setSubmitting(true);
    try {
      await submitReview({ productId, ...form });
      toast.success('Review submitted! It will appear after approval.');
      setShowReviewModal(false);
      setForm({ rating: 5, title: '', comment: '' });
      setFormErrors({});
    } catch (err) {
      const msg = err?.response?.data?.message || 'Failed to submit review. Please try again.';
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const currentTotal = totalReviews || reviews.length;

  return (
    <div className="space-y-8">
      {/* Rating Overview */}
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-center md:text-left">
            <div className="flex items-end justify-center md:justify-start gap-3 mb-2">
              <span className="text-6xl font-bold text-gray-900">
                {(averageRating || 0).toFixed(1)}
              </span>
              <span className="text-2xl text-gray-600 mb-2">/5</span>
            </div>
            <div className="flex justify-center md:justify-start gap-1 mb-3">
              {renderStars(averageRating || 0)}
            </div>
            <p className="text-gray-600 font-medium">Based on {currentTotal} reviews</p>
          </div>

          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map(rating => {
              const count = distribution[rating] || 0;
              const percentage = currentTotal > 0 ? (count / currentTotal) * 100 : 0;
              return (
                <div key={rating} className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-700 w-12">
                    {rating} <FaStar className="inline text-green-500 text-xs" />
                  </span>
                  <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div className="bg-green-500 h-full rounded-full transition-all duration-500" style={{ width: `${percentage}%` }} />
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-wrap items-center gap-4 pb-4 border-b">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Filter:</span>
          <div className="flex gap-2">
            <button
              onClick={() => setFilterRating('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filterRating === 'all' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >All</button>
            {[5, 4, 3].map(rating => (
              <button
                key={rating}
                onClick={() => setFilterRating(rating.toString())}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1 ${filterRating === rating.toString() ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                {rating} <FaStar className="text-xs" />
              </button>
            ))}
          </div>
        </div>

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
        {getFilteredReviews().map((review, index) => {
          const reviewId = review.id || review._id;
          const alreadyHelpful = helpfulClicked.has(reviewId);
          return (
            <motion.div
              key={reviewId || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {(review.name || 'C').charAt(0).toUpperCase()}
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
                    <div className="flex gap-1">{renderStars(review.rating)}</div>
                    <span>•</span>
                    <span>{review.date ? formatDate(review.date) : ''}</span>
                  </div>
                </div>
              </div>

              {review.title && <h5 className="font-semibold text-gray-900 mb-2">{review.title}</h5>}
              <p className="text-gray-700 leading-relaxed mb-3">{review.comment}</p>

              {review.images && review.images.length > 0 && (
                <div className="flex gap-2 mb-3">
                  {review.images.map((img, i) => (
                    <div key={i} className="w-20 h-20 rounded-lg overflow-hidden border border-gray-200">
                      <img src={img} alt={`Review ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  ))}
                </div>
              )}

              {/* Admin Reply */}
              {review.adminReply?.text && (
                <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-xs font-semibold text-green-700 mb-1">SS Herbal Response:</p>
                  <p className="text-sm text-gray-700">{review.adminReply.text}</p>
                </div>
              )}

              <div className="flex items-center gap-4 pt-3 border-t">
                <button
                  onClick={() => handleHelpful(review)}
                  disabled={alreadyHelpful || !reviewId}
                  className={`text-sm font-medium transition-colors flex items-center gap-1 ${alreadyHelpful ? 'text-primary cursor-default' : 'text-gray-600 hover:text-primary'}`}
                >
                  👍 Helpful ({review.helpful || 0})
                  {alreadyHelpful && <span className="text-xs text-green-600 ml-1">✓</span>}
                </button>
              </div>
            </motion.div>
          );
        })}

        {getFilteredReviews().length === 0 && (
          <p className="text-center text-gray-500 py-8">No reviews match your filter.</p>
        )}
      </div>

      {/* Write Review CTA */}
      <div className="text-center pt-6">
        <button
          onClick={() => {
            if (!isAuthenticated) {
              toast.info('Please log in to write a review.');
              return;
            }
            setShowReviewModal(true);
          }}
          className="px-8 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl"
        >
          Write a Review
        </button>
      </div>

      {/* Write Review Modal */}
      <AnimatePresence>
        {showReviewModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
            onClick={(e) => { if (e.target === e.currentTarget) setShowReviewModal(false); }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 relative"
            >
              <button
                onClick={() => setShowReviewModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">Write a Review</h2>

              <form onSubmit={handleSubmitReview} className="space-y-5">
                {/* Star Rating */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your Rating *</label>
                  <div className="flex gap-2">
                    {renderInteractiveStars(form.rating, (r) => setForm(prev => ({ ...prev, rating: r })))}
                    <span className="ml-2 text-sm text-gray-500 self-center">{form.rating}/5</span>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Review Title *</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Sum up your experience"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm ${formErrors.title ? 'border-red-400' : 'border-gray-300'}`}
                  />
                  {formErrors.title && <p className="text-red-500 text-xs mt-1">{formErrors.title}</p>}
                </div>

                {/* Comment */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Your Review *</label>
                  <textarea
                    value={form.comment}
                    onChange={(e) => setForm(prev => ({ ...prev, comment: e.target.value }))}
                    placeholder="Tell others about your experience with this product..."
                    rows={4}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm resize-none ${formErrors.comment ? 'border-red-400' : 'border-gray-300'}`}
                  />
                  {formErrors.comment && <p className="text-red-500 text-xs mt-1">{formErrors.comment}</p>}
                  <p className="text-xs text-gray-400 mt-1">{form.comment.length} characters</p>
                </div>

                <p className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                  Your review will be published after moderation (usually within 24 hours).
                </p>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowReviewModal(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors disabled:opacity-60"
                  >
                    {submitting ? 'Submitting…' : 'Submit Review'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReviewsSection;

