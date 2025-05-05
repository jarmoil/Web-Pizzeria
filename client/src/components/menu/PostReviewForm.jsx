import React, {useState} from 'react';
import {useAuth} from '../../hooks/useAuth';

const PostReviewForm = ({postReview}) => {
  const {user, token} = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      setSubmitting(true);
      await postReview({rating, comment, token});
      setComment('');
      setRating(5);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="review-form-disabled">
        <button disabled className="disabled-review-btn">
          Log in to post reviews
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="post-review-form">
      <label>
        Rating:
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </label>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your review..."
        required
      />
      <button type="submit" disabled={submitting}>
        {submitting ? 'Posting...' : 'Post Review'}
      </button>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
};

export default PostReviewForm;
