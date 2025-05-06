import {useState, useEffect, useCallback} from 'react';
import {getAllOrders, updateOrderStatus} from '../services/orderService';

/**
 * Custom hook for managing orders in the application.
 * Provides functionality to fetch all orders and update the status of an order.
 *
 * @param {string} token - The authentication token for API requests.
 * @returns {Object} An object containing:
 * - `orders` {Object[]}: The list of orders.
 *   - `orderId` {number}: The unique ID of the order.
 *   - `status` {string}: The current status of the order (e.g., "pending", "completed").
 *   - `items` {Object[]}: The items in the order.
 *   - `totalPrice` {number}: The total price of the order.
 *   - `customerName` {string}: The name of the customer who placed the order.
 * - `loading` {boolean}: Indicates whether the orders are being loaded.
 * - `error` {string|null}: Error message if fetching or updating orders fails.
 * - `updateOrderStatus` {Function}: Function to update the status of an order.
 */
const useOrderManagement = (token) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetches all orders from the server.
   * Updates the `orders` state with the fetched data.
   *
   * @async
   * @returns {Promise<void>}
   */
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

  /**
   * Updates the status of a specific order.
   * Refreshes the orders list after successfully updating the status.
   *
   * @async
   * @param {number} orderId - The ID of the order to update.
   * @param {string} status - The new status of the order.
   * @returns {Promise<void>}
   */
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
