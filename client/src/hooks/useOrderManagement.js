import {useState, useEffect, useCallback} from 'react';
import {getAllOrders, updateOrderStatus} from '../services/orderService';

const useOrderManagement = (token) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const ordersData = await getAllOrders(token);
      setOrders(ordersData);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status, token);
      await fetchOrders();
    } catch (error) {
      console.error('Failed to update order status:', error);
      setError('Failed to update order status.');
      throw error;
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return {orders, loading, error, updateOrderStatus: handleUpdateOrderStatus};
};

export default useOrderManagement;
