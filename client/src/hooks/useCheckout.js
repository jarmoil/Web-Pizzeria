import {useState} from 'react';
import {createOrder} from '../services/orderService';
import {useCart} from '../context/CartContext';
import {useAuth} from './useAuth';

export const useCheckout = () => {
  const {cart, clearCart} = useCart();
  const {token} = useAuth();
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({message: null, type: null});

  const handleCheckout = async (address, isPickup) => {
    if (cart.length === 0) {
      setFeedback({
        message: 'Your cart is empty. Add items before checkout.',
        type: 'error',
      });
      autoClearFeedback();
      return;
    }

    if (!isPickup && !address.trim()) {
      setFeedback({
        message: 'Please provide a delivery address.',
        type: 'error',
      });
      autoClearFeedback();
      return;
    }

    if (!token) {
      setFeedback({
        message:
          'You need to be logged in to place an order. Please log in or sign up.',
        type: 'error',
      });
      autoClearFeedback();
      return;
    }

    const totalPrice = cart.reduce(
      (total, pizza) => total + pizza.price * pizza.quantity,
      0
    );

    setLoading(true);
    setFeedback({message: null, type: null});

    try {
      await createOrder(address, cart, totalPrice, isPickup, token);
      setFeedback({
        message: 'Your order has been placed successfully!',
        type: 'success',
      });
      clearCart();
    } catch (err) {
      setFeedback({
        message: 'Failed to create order',
        err,
        type: 'error',
      });
    } finally {
      setLoading(false);
      autoClearFeedback();
    }
  };

  const autoClearFeedback = () => {
    setTimeout(() => setFeedback({message: null, type: null}), 3000);
  };

  return {loading, feedback, handleCheckout};
};
