import {fetchData} from './fetchData';

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
