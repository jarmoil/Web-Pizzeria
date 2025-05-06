import {useState, useEffect, useCallback} from 'react';
import {getOwnOrders, cancelOrder} from '../services/orderService';

/**
 * Custom hook for managing the current user's orders.
 *
 * @param {string} token - Authentication token
 * @returns {Object} Order management methods and state
 */
const useOwnOrders = (token) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = useCallback(async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await getOwnOrders(token);
      setOrders(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch orders');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const handleCancelOrder = async (orderId) => {
    try {
      await cancelOrder(orderId, token);
      await fetchOrders(); // Refresh orders after cancellation
      return true;
    } catch (err) {
      setError('Failed to cancel order');
      console.error('Error canceling order:', err);
      return false;
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return {
    orders,
    loading,
    error,
    cancelOrder: handleCancelOrder,
    refreshOrders: fetchOrders,
  };
};

export default useOwnOrders;
