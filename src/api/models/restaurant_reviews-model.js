import db from '../../db/connection.js';

const getAllReviews = async () => {
  const [rows] = await db.query('SELECT * FROM restaurant_reviews');
  return rows;
};

const getReviewById = async (id) => {
  const [rows] = await db.query('SELECT * FROM restaurant_reviews WHERE restaurant_review_id = ?', [id]);
  return rows[0];
};

const createReview = async ({ user_id, rating, comment }) => {
  const [result] = await db.query(
    'INSERT INTO restaurant_reviews (user_id, rating, comment, created_at) VALUES (?, ?, ?, NOW())',
    [user_id, rating, comment]
  );
  return { restaurant_review_id: result.insertId, user_id, rating, comment };
};

const deleteReviewById = async (id, user) => {
  const [rows] = await db.query('SELECT user_id FROM restaurant_reviews WHERE restaurant_review_id = ?', [id]);
  const review = rows[0];

  if (!review || (review.user_id !== user.user_id && user.role !== 'admin')) return false;

  await db.query('DELETE FROM restaurant_reviews WHERE restaurant_review_id = ?', [id]);
  return true;
};

export { getAllReviews, getReviewById, createReview, deleteReviewById };
