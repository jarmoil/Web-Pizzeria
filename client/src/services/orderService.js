import {fetchData} from './fetchData';

export const createOrder = async (address, cartItems, totalPrice, token) => {
  try {
    const orderData = {
      address,
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
