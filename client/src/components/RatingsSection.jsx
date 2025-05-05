import {useState} from 'react';
import useRestaurantReviews from '../hooks/useRestaurantReviews';
import {useAuth} from '../hooks/useAuth';
import StarRating from './StarRating';

const RatingsSection = () => {
  const {user} = useAuth();
  const {reviews, loading, error, postReview} = useRestaurantReviews();
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [sortOrder, setSortOrder] = useState('newest');

  const getSortedReviews = () => {
    return [...reviews].sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postReview({
        comment,
        rating,
        token: user.token,
      });
      setComment('');
      setRating(5);
    } catch (err) {
      console.error('Failed to post review:', err);
    }
  };

  if (loading) return <div>Loading reviews...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section id="homepage-ratings" className="homepage-section">
      <h2>Asiakkaiden arvostelut</h2>

      {user ? (
        <div className="homepage-review-form">
          <h3>Jätä ravintola-arvostelu</h3>
          <form
            className="homepage-review-form-content"
            onSubmit={handleSubmit}
          >
            <StarRating rating={rating} onRatingChange={setRating} />
            <textarea
              maxLength="500"
              rows="4"
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Kirjoita arvostelusi tähän..."
            />
            <button type="submit" className="homepage-review-submit-btn">
              Lähetä arvostelu
            </button>
          </form>
        </div>
      ) : (
        <p>Kirjaudu sisään jättääksesi arvostelun</p>
      )}

      <div className="homepage-ratings-controls">
        <label htmlFor="homepage-ratings-sort">Suodata:</label>
        <select
          id="homepage-ratings-sort"
          name="sort"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="newest">Uusimmat</option>
          <option value="oldest">Vanhimmat</option>
        </select>
      </div>

      <div className="homepage-ratings-scroll">
        {getSortedReviews().map((review) => (
          <div
            key={review.restaurant_review_id}
            className="homepage-rating-card"
          >
            <div className="homepage-rating-stars">
              {'⭐'.repeat(review.rating)}
            </div>
            <p className="homepage-rating-card-text">"{review.comment}"</p>
            <div className="homepage-rating-meta">
              <span className="homepage-rating-user">- {review.username}</span>
              <span className="homepage-rating-date">
                {new Date(review.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RatingsSection;
