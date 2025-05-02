import React, {useState} from 'react';
import {useCart} from '../context/CartContext';
import CartItemsList from './CartItemsList';
import CartTotal from './CartTotal';
import AddressInput from './AddressInput';
import FeedbackMessage from './FeedbackMessage';
import {useCheckout} from '../hooks/useCheckout';

const CartButton = ({isVisible, onClose}) => {
  const {cart, increaseQuantity, decreaseQuantity, removeFromCart} = useCart();
  const [address, setAddress] = useState('');
  const [isPickup, setIsPickup] = useState(false);
  const {handleCheckout, feedback, loading} = useCheckout();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (!isVisible) return null;

  return (
    <div id="cart-dropdown" className="cart-dropdown">
      <div id="cart-box">
        <button id="cart-close" className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h2>Your Cart</h2>
        <ul id="cart-items">
          <CartItemsList
            cart={cart}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            removeFromCart={removeFromCart}
          />
        </ul>
        <CartTotal totalPrice={totalPrice} />

        <div className="pickup-option">
          <label>
            <input
              type="checkbox"
              checked={isPickup}
              onChange={(e) => setIsPickup(e.target.checked)}
            />
            Pick up from restaurant (no delivery)
          </label>
        </div>

        <AddressInput
          address={address}
          setAddress={setAddress}
          disabled={isPickup}
        />

        <button
          id="cart-checkout-btn"
          onClick={() => handleCheckout(address, isPickup)}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Checkout'}
        </button>
        <FeedbackMessage message={feedback.message} type={feedback.type} />
      </div>
    </div>
  );
};

export default CartButton;
