import {
  createOrder,
  createOrderItem,
  getOrderById,
  updateOrderStatus,
  getOrderWithItems,
  getAllOrders,
  getOrdersByUserId,
} from '../models/orders-model.js';

import {getItemById} from '../models/menu-model.js';

// Luo uusi tilaus
const createOrderC = async (req, res) => {
  const user_id = req.user.user_id;
  const {address, items} = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({error: 'No Items provided'});
  }

  try {
    let total_price = 0;

    // Validoi itemit ja laske summa
    for (const item of items) {
      const pizza = await getItemById(item.pizza_id);
      if (!pizza)
        return res
          .status(400)
          .json({error: `Pizza ID ${item.pizza_id} not found`});

      total_price += pizza.price * item.quantity;
    }

    const order_id = await createOrder({user_id, total_price, address});

    for (const item of items) {
      const pizza = await getItemById(item.pizza_id);
      await createOrderItem({
        order_id,
        pizza_id: item.pizza_id,
        quantity: item.quantity,
        price_per_unit: pizza.price,
      });
    }
    res.status(201).json({message: 'Order created', order_id});
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Failed to create order'});
  }
};

// Hae kaikki tilaukset (admin ja employee)
const getAllOrdersC = async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Failed to fetch orders'});
  }
};

// Hae tietty tilaus itemien kanssa (admin ja employee)
const getOrderByIdC = async (req, res) => {
  const order_id = req.params.id;

  try {
    const order = await getOrderWithItems(order_id);
    if (!order) return res.status(404).json({error: 'Order not found'});

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Failed to fetch order'});
  }
};

// Asiakas hakee oman tilauksensa
const getOwnOrderC = async (req, res) => {
  const user_id = req.user.user_id;

  try {
    // Hae kaikki käyttäjän tilaukset
    const orders = await getOrdersByUserId(user_id);

    if (!orders || orders.length === 0) {
      return res.status(404).json({error: 'No orders found for this user'});
    }

    const ordersItems = await Promise.all(
      orders.map((order) => getOrderWithItems(order.order_id))
    );

    res.json(ordersItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Failed to fetch orders'});
  }
};

// Päivitä tilauksen status (admin ja employee)
const updateOrderStatusC = async (req, res) => {
  const order_id = req.params.id;
  const {order_status} = req.body;

  const allowedStatuses = ['pending', 'processing', 'completed', 'cancelled'];

  if (!allowedStatuses.includes(order_status)) {
    return res.status(400).json({error: 'Invalid status value'});
  }

  try {
    const order = await getOrderById(order_id);
    if (!order) return res.status(404).json({error: 'Order not found'});

    await updateOrderStatus(order_id, order_status);
    res.json({message: `Order status updated to ${order_status}`});
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Failed to update order status'});
  }
};

// Asiakas peruu tilauksensa
const cancelOwnOrderC = async (req, res) => {
  const user_id = req.user.user_id;
  const order_id = req.params.id;

  try {
    const order = await getOrderById(order_id);
    if (!order) return res.status(404).json({error: 'Order not found'});

    if (order.user_id !== user_id) {
      return res
        .status(403)
        .json({error: 'Not authorized to cancel this order'});
    }

    if (order.order_status === 'cancelled') {
      return res.status(400).json({error: 'Order is already cancelled'});
    }

    await updateOrderStatus(order_id, 'cancelled');
    res.json({message: 'Order cancelled successfully'});
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Failed to cancel order'});
  }
};

export {
  createOrderC,
  getAllOrdersC,
  getOrderByIdC,
  getOwnOrderC,
  updateOrderStatusC,
  cancelOwnOrderC,
};
