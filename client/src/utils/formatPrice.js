const formatPrice = (price) => {
  const numericPrice = Number(price);
  if (isNaN(numericPrice)) {
    return 'Invalid price';
  }
  return `${numericPrice.toFixed(2)} €`;
};

export default formatPrice;
