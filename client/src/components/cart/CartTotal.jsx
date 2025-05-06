import React from 'react';

/**
 * Displays the total price of items in the cart.
 *
 * @param {Object} props - Component props.
 * @param {number} props.totalPrice - The total price of all items in the cart.
 * @returns {JSX.Element} A div displaying the total price.
 */
const CartTotal = ({totalPrice}) => {
  return (
    <div className="cart-total">
      <span>Total:</span>
      <span>€{totalPrice.toFixed(2)}</span>
    </div>
  );
};

export default CartTotal;
