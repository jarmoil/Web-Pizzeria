import {useState} from 'react';
import {createOrder} from '../services/orderService';
import {useCart} from '../context/CartContext';
import {useAuth} from './useAuth';

/**
 * Custom hook for handling the checkout process.
 * Manages order creation, feedback messages, and loading state.
 *
 * @returns {Object} An object containing:
 * - `loading` {boolean}: Indicates whether the checkout process is in progress.
 * - `feedback` {Object}: Feedback message and type.
 *   - `message` {string|null}: The feedback message to display.
 *   - `type` {string|null}: The type of feedback (e.g., "success", "error").
 * - `handleCheckout` {Function}: Function to handle the checkout process.
 */
export const useCheckout = () => {
  const {cart, clearCart} = useCart();
  const {token} = useAuth();
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({message: null, type: null});

  /**
   * Handles the checkout process.
   * Validates the cart, delivery address, and user authentication before creating an order.
   *
   * @param {string} address - The delivery address provided by the user.
   * @param {boolean} isPickup - Indicates whether the order is for pickup or delivery.
   * @returns {Promise<void>}
   */
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

  /**
   * Automatically clears the feedback message after a delay.
   */
  const autoClearFeedback = () => {
    setTimeout(() => setFeedback({message: null, type: null}), 3000);
  };

  return {loading, feedback, handleCheckout};
};
