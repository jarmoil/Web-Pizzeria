/**
 * Calculates the average rating from an array of reviews.
 *
 * @param {Object[]} reviews - An array of review objects.
 * @param {number} reviews[].rating - The rating given in each review.
 * @returns {number} The average rating, or 0 if there are no reviews.
 */
const calculateAverageRating = (reviews) => {
  if (reviews.length === 0) return 0;
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return totalRating / reviews.length;
};

export default calculateAverageRating;
