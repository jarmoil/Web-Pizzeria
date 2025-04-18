import express from 'express';
import userRouter from './routes/user-router.js';
import restaurantReviewRouter from './routes/restaurant_reviews-router.js';

const router = express.Router();

router.use('/users', userRouter);
router.use('/restaurant-reviews', restaurantReviewRouter);

export default router;
