import React from 'react';
import CartItem from './CartItem';

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
