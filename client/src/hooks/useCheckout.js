import {useState} from 'react';
import {createOrder} from '../services/orderService';
import {useCart} from '../context/CartContext';

export const useCheckout = () => {
  const {cart, clearCart} = useCart();
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({message: null, type: null});

  const token = localStorage.getItem('authToken');

  const handleCheckout = async (address) => {
    if (cart.length === 0) {
      setFeedback({
        message: 'Your cart is empty. Add items before checkout.',
        type: 'error',
      });
      autoClearFeedback();
      return;
    }

    if (!address.trim()) {
      setFeedback({
        message: 'Please provide a delivery address.',
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
      await createOrder(address, cart, totalPrice, token);
      setFeedback({
        message: 'Your order has been placed successfully!',
        type: 'success',
      });
      clearCart();
    } catch (err) {
      console.error(err);
      setFeedback({
        message: 'Order creation failed: ' + err.message,
        type: 'error',
      });
    } finally {
      setLoading(false);
      autoClearFeedback();
    }
  };

  const autoClearFeedback = () => {
    setTimeout(() => {
      setFeedback({message: null, type: null});
    }, 3000);
  };

  return {
    loading,
    feedback,
    handleCheckout,
  };
};
