/**
 * StarRating component for displaying a star-based rating system.
 * Allows users to select a rating by clicking on a star.
 *
 * @param {Object} props - Component props.
 * @param {number} props.rating - The current rating value (1-5).
 * @param {Function} props.onRatingChange - Callback function to handle rating changes.
 * @returns {JSX.Element} The star rating component.
 */
const StarRating = ({rating, onRatingChange}) => {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`star ${star <= rating ? 'active' : ''}`}
          onClick={() => onRatingChange(star)}
        >
          ⭐
        </button>
      ))}
    </div>
  );
};

export default StarRating;
