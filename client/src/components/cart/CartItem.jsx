import React from 'react';

const CartItem = ({
  pizza,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
}) => {
  return (
    <li className="cart-item">
      <span>{pizza.pizza_name}</span>
      <div className="quantity-controls">
        <button class="decrease-btn" onClick={() => decreaseQuantity(pizza.pizza_id)}>-</button>
        <span>{pizza.quantity}</span>
        <button class="increase-btn" onClick={() => increaseQuantity(pizza.pizza_id)}>+</button>
      </div>
      <span>€{(pizza.price * pizza.quantity).toFixed(2)}</span>
      <span class="quantity-text">Quantity: {pizza.quantity}</span>
      <button class="remove-btn" onClick={() => removeFromCart(pizza.pizza_id)}>Remove</button>
    </li>
  );
};

export default CartItem;
