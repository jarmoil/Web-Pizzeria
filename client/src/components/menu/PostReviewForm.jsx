import React, {useState} from 'react';
import {useAuth} from '../../hooks/useAuth';

/**
 * PostReviewForm component for submitting a review.
 * Allows authenticated users to rate and comment on a pizza.
 *
 * @param {Object} props - Component props.
 * @param {Function} props.postReview - Function to handle posting the review.
 * @returns {JSX.Element} The review submission form or a message prompting the user to log in.
 */
const PostReviewForm = ({postReview}) => {
  const {user, token} = useAuth();

  /**
   * Rating value for the review.
   * @type {number}
   */
  const [rating, setRating] = useState(5);

  /**
   * Comment text for the review.
   * @type {string}
   */
  const [comment, setComment] = useState('');

  /**
   * Indicates whether the form is currently submitting.
   * @type {boolean}
   */
  const [submitting, setSubmitting] = useState(false);

  /**
   * Error message for failed submission.
   * @type {string|null}
   */
  const [error, setError] = useState(null);

  /**
   * Handles the form submission to post a review.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
   * @returns {Promise<void>}
   */
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
