import React from 'react';
import {useCart} from '../context/CartContext';
import CartItem from './CartItem';
import CartTotal from './CartTotal';

const CartButton = ({isVisible, onClose}) => {
  const {cart, increaseQuantity, decreaseQuantity, removeFromCart} = useCart();

  // Calculate total price of all items in the cart
  const totalPrice = cart.reduce(
    (total, pizza) => total + pizza.price * pizza.quantity,
    0
  );

  return (
    isVisible && (
      <div id="cart-dropdown" className="cart-dropdown">
        <div id="cart-box">
          <button id="cart-close" className="close-btn" onClick={onClose}>
            &times;
          </button>
          <h2>Your Cart</h2>
          <ul id="cart-items">
            {cart.length === 0 ? (
              <li>Your cart is empty</li>
            ) : (
              cart.map((pizza) => (
                <CartItem
                  key={pizza.pizza_id}
                  pizza={pizza}
                  increaseQuantity={increaseQuantity}
                  decreaseQuantity={decreaseQuantity}
                  removeFromCart={removeFromCart}
                />
              ))
            )}
          </ul>
          <CartTotal totalPrice={totalPrice} />
          <button id="cart-checkout-btn">Checkout</button>
        </div>
      </div>
    )
  );
};

export default CartButton;
