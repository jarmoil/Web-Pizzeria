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
