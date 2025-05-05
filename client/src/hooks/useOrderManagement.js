import {useState, useEffect, useCallback} from 'react';
import {getAllOrders, updateOrderStatus} from '../services/orderService';

const useOrderManagement = (token) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const ordersData = await getAllOrders(token);
      setOrders(ordersData);
      setError(null);
    } catch {
      setError('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  }, [token]);

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status, token);
      await fetchOrders();
    } catch {
      setError('Failed to update order status');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return {
    orders,
    loading,
    error,
    updateOrderStatus: handleUpdateOrderStatus,
  };
};

export default useOrderManagement;
