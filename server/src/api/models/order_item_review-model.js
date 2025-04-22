import db from '../../db/connection.js';

export const createOrderItemReview = async ({ user_id, order_item_id, rating, comment }) => {
  const [result] = await db.query(
    `INSERT INTO order_item_reviews (user_id, pizza_id, rating, comment)
     VALUES (?, ?, ?, ?)`,
    [user_id, order_item_id, rating, comment]
  );
  return { order_item_review_id: result.insertId };
};

export const getOrderItemReviews = async () => {
  const [rows] = await db.query('SELECT * FROM order_item_reviews');
  return rows;
};

export const findOrderItemReviewById = async (id) => {
  const [rows] = await db.query('SELECT * FROM order_item_reviews WHERE item_review_id = ?', [id]);
  return rows[0];
};

export const deleteOrderItemReview = async (id) => {
  await db.query('DELETE FROM order_item_reviews WHERE item_review_id = ?', [id]);
};
