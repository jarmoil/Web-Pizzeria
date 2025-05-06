import React from 'react';
import CartItem from './CartItem';

/**
 * Renders a list of cart items.
 *
 * @param {Object[]} cart - Array of pizza objects in the cart.
 * @param {number} cart[].pizza_id - Unique ID of the pizza.
 * @param {string} cart[].pizza_name - Name of the pizza.
 * @param {number} cart[].quantity - Quantity of the pizza in the cart.
 * @param {number} cart[].price - Price of the pizza.
 * @param {Function} increaseQuantity - Function to increase the quantity of a pizza.
 * @param {Function} decreaseQuantity - Function to decrease the quantity of a pizza.
 * @param {Function} removeFromCart - Function to remove a pizza from the cart.
 * @returns {JSX.Element} A list of cart items or a message if the cart is empty.
 */
const CartItemsList = ({
  cart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
}) => {
  if (cart.length === 0) return <li>Your cart is empty</li>;

  return (
    <>
      {cart.map((pizza) => (
        <CartItem
          key={pizza.pizza_id}
          pizza={pizza}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          removeFromCart={removeFromCart}
        />
      ))}
    </>
  );
};

export default CartItemsList;
