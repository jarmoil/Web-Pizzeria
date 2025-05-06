/**
 * Formats a given price as a string with two decimal places and a euro symbol.
 *
 * @param {number|string} price - The price to format. Can be a number or a string representation of a number.
 * @returns {string} The formatted price with two decimal places followed by "€", or "Invalid price" if the input is not a valid number.
 */
const formatPrice = (price) => {
  const numericPrice = Number(price);
  if (isNaN(numericPrice)) {
    return 'Invalid price';
  }
  return `${numericPrice.toFixed(2)} €`;
};

export default formatPrice;
