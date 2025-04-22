import {
  createReview,
  getAllReviews,
  getReviewById,
  deleteReviewById,
} from '../models/restaurant_reviews-model.js';

const getReviews = async (req, res) => {
  const reviews = await getAllReviews();
  res.json(reviews);
};

const getReview = async (req, res) => {
  const review = await getReviewById(req.params.id);
  if (!review) return res.status(404).json({ error: 'Review not found' });
  res.json(review);
};

const postReview = async (req, res) => {
  const { rating, comment } = req.body;
  const user_id = req.user.user_id;

  try {
    const review = await createReview({ user_id, rating, comment });
    res.status(201).json(review);
  } catch (err) {
    console.error('Error while creating review:', err);

    // Match the check constraint failure by message
    if (err.message && err.message.includes('CONSTRAINT') && err.message.includes('rating_range')) {
      res.status(400).json({ error: 'Rating must be between 1 and 5.' });
    } else {
      res.status(500).json({ error: 'Server error while submitting review.' });
    }
  }
};


const deleteReview = async (req, res) => {
  const deleted = await deleteReviewById(req.params.id, req.user);
  if (!deleted) return res.status(403).json({ error: 'Not authorized' });
  res.json({ message: 'Review deleted' });
};

export { getReviews, getReview, postReview, deleteReview };
