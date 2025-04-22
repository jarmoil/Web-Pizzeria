import express from 'express';
import userRouter from './routes/user-router.js';
import restaurantReviewRouter from './routes/restaurant_reviews-router.js';
import menuRouter from './routes/menu-router.js';
import orderitemreviewRouter from './routes/order_item_review-router.js';
import ordersRouter from './routes/orders-router.js';

const router = express.Router();

router.use('/users', userRouter);
router.use('/restaurant-reviews', restaurantReviewRouter);
router.use('/menu', menuRouter);
router.use('/order-item-reviews', orderitemreviewRouter);
router.use('/orders', ordersRouter);

export default router;
