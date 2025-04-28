import React from 'react';

const CartTotal = ({totalPrice}) => {
  return (
    <div className="cart-total">
      <span>Total:</span>
      <span>€{totalPrice.toFixed(2)}</span>
    </div>
  );
};

export default CartTotal;
