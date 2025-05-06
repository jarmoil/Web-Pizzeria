import {fetchData} from './fetchData';

/**
 * Creates a new order.
 *
 * @param {string} address - The delivery address for the order.
 * @param {Object[]} cartItems - The items in the cart.
 * @param {number} cartItems[].pizza_id - The ID of the pizza.
 * @param {number} cartItems[].quantity - The quantity of the pizza.
 * @param {number} totalPrice - The total price of the order.
 * @param {boolean} isPickup - Indicates whether the order is for pickup or delivery.
 * @param {string} token - The authentication token for the request.
 * @returns {Promise<Object>} A promise that resolves to the response data.
 * @throws {Error} If the request fails.
 */
export const createOrder = async (
  address,
  cartItems,
  totalPrice,
  isPickup,
  token
) => {
  try {
    const orderData = {
      address,
      is_pickup: isPickup,
      items: cartItems.map((item) => ({
        pizza_id: item.pizza_id,
        quantity: item.quantity,
      })),
      total_price: totalPrice,
    };

    const response = await fetchData('api/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });

    return response;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

/**
 * Fetches all orders.
 *
 * @param {string} token - The authentication token for the request.
 * @returns {Promise<Object[]>} A promise that resolves to an array of orders.
 * @throws {Error} If the request fails.
 */
export const getAllOrders = async (token) => {
  try {
    const response = await fetchData('api/v1/orders', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

/**
 * Updates the status of an order.
 *
 * @param {number} orderId - The ID of the order to update.
 * @param {string} status - The new status of the order (e.g., "pending", "completed").
 * @param {string} token - The authentication token for the request.
 * @returns {Promise<Object>} A promise that resolves to the response data.
 * @throws {Error} If the request fails.
 */
export const updateOrderStatus = async (orderId, status, token) => {
  try {
    const response = await fetchData(`api/v1/orders/${orderId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({order_status: status}),
    });
    return response;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};
