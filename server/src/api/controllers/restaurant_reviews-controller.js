import {
  createReview,
  getAllReviews,
  getReviewById,
  deleteReviewById,
} from '../models/restaurant_reviews-model.js';

const getReviews = async (req, res, next) => {
  try {
    const reviews = await getAllReviews();
    res.json(reviews);
  } catch (error) {
    next(error);
  }
};

const getReview = async (req, res, next) => {
  const review_id = req.params.id;
  try {
    const review = await getReviewById(review_id);
    if (!review) {
      const error = new Error('Review not found');
      error.status = 404;
      return next(error);
    }
    res.json(review);
  } catch (error) {
    next(error);
  }
};

const postReview = async (req, res, next) => {
  const {rating, comment} = req.body;
  const user_id = req.user.user_id;

  try {
    const review = await createReview({user_id, rating, comment});
    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
};

const deleteReview = async (req, res, next) => {
  const review_id = req.params.id;
  const user = req.user;
  try {
    const deleted = await deleteReviewById(review_id, user);
    if (!deleted) {
      const error = new Error('Not authorized');
      error.status = 403;
      return next(error);
    }
    res.json({message: 'Review deleted'});
  } catch (error) {
    next(error);
  }
};

export {getReviews, getReview, postReview, deleteReview};
