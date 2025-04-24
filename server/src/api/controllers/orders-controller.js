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
const createOrderC = async (req, res, next) => {
  const user_id = req.user.user_id;
  const {address, items} = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    const err = new Error('No items provided');
    err.status = 400;
    return next(err);
  }

  try {
    let total_price = 0;

    // Validoi itemit ja laske summa
    for (const item of items) {
      const pizza = await getItemById(item.pizza_id);
      if (!pizza) {
        const err = new Error(`Pizza ID ${item.pizza_id} not found`);
        err.status = 400;
        return next(err);
      }

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
    next(error);
  }
};

// Hae kaikki tilaukset (admin ja employee)
const getAllOrdersC = async (req, res, next) => {
  try {
    const orders = await getAllOrders();
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

// Hae tietty tilaus itemien kanssa (admin ja employee)
const getOrderByIdC = async (req, res, next) => {
  const order_id = req.params.id;

  try {
    const order = await getOrderWithItems(order_id);
    if (!order) {
      const err = new Error('Order not found');
      err.status = 404;
      return next(err);
    }

    res.json(order);
  } catch (error) {
    next(error);
  }
};

// Asiakas hakee oman tilauksensa
const getOwnOrderC = async (req, res, next) => {
  const user_id = req.user.user_id;

  try {
    // Hae kaikki käyttäjän tilaukset
    const orders = await getOrdersByUserId(user_id);

    if (!orders || orders.length === 0) {
      const err = new Error('No orders found for this user');
      err.status = 404;
      return next(err);
    }

    const ordersItems = await Promise.all(
      orders.map((order) => getOrderWithItems(order.order_id))
    );

    res.json(ordersItems);
  } catch (error) {
    next(error);
  }
};

// Päivitä tilauksen status (admin ja employee)
const updateOrderStatusC = async (req, res, next) => {
  const order_id = req.params.id;
  const {order_status} = req.body;

  const allowedStatuses = ['pending', 'processing', 'completed', 'cancelled'];

  if (!allowedStatuses.includes(order_status)) {
    const err = new Error('Invalid status value');
    err.status = 400;
    return next(err);
  }

  try {
    const order = await getOrderById(order_id);
    if (!order) {
      const err = new Error('Order not found');
      err.status = 404;
      return next(err);
    }

    await updateOrderStatus(order_id, order_status);
    res.json({message: `Order status updated to ${order_status}`});
  } catch (error) {
    next(error);
  }
};

// Asiakas peruu tilauksensa
const cancelOwnOrderC = async (req, res, next) => {
  const user_id = req.user.user_id;
  const order_id = req.params.id;

  try {
    const order = await getOrderById(order_id);
    if (!order) {
      const err = new Error('Order not found');
      err.status = 404;
      return next(err);
    }

    if (order.user_id !== user_id) {
      const err = new Error('Not authorized to cancel this order');
      err.status = 403;
      return next(err);
    }

    if (order.order_status === 'cancelled') {
      const err = new Error('Order is already cancelled');
      err.status = 400;
      return next(err);
    }

    await updateOrderStatus(order_id, 'cancelled');
    res.json({message: 'Order cancelled successfully'});
  } catch (error) {
    next(error);
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
