import React from 'react';

/**
 * Renders a single cart item with controls to adjust quantity or remove the item.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.pizza - The pizza object representing the cart item.
 * @param {number} props.pizza.pizza_id - Unique ID of the pizza.
 * @param {string} props.pizza.pizza_name - Name of the pizza.
 * @param {number} props.pizza.quantity - Quantity of the pizza in the cart.
 * @param {number} props.pizza.price - Price of the pizza.
 * @param {Function} props.increaseQuantity - Function to increase the quantity of the pizza.
 * @param {Function} props.decreaseQuantity - Function to decrease the quantity of the pizza.
 * @param {Function} props.removeFromCart - Function to remove the pizza from the cart.
 * @returns {JSX.Element} A list item representing the cart item.
 */
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
        <button
          className="decrease-btn"
          onClick={() => decreaseQuantity(pizza.pizza_id)}
        >
          -
        </button>
        <span>{pizza.quantity}</span>
        <button
          className="increase-btn"
          onClick={() => increaseQuantity(pizza.pizza_id)}
        >
          +
        </button>
      </div>
      <span>€{(pizza.price * pizza.quantity).toFixed(2)}</span>
      <span className="quantity-text">Quantity: {pizza.quantity}</span>
      <button
        className="remove-btn"
        onClick={() => removeFromCart(pizza.pizza_id)}
      >
        Remove
      </button>
    </li>
  );
};

export default CartItem;
