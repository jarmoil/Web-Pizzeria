import db from '../../db/connection.js';

// Luo tilaus, haetaan user_id requestista, kokonaishinta lasketaan ja käyttäjältä tulee osoite
// total_price = items { pizza.price * item.quantity}
const createOrder = async ({
  user_id,
  total_price,
  address,
  is_pickup = false,
}) => {
  const finalAddress = is_pickup ? null : address;

  const [result] = await db.execute(
    `INSERT INTO orders (user_id, total_price, address, is_pickup) VALUES (?, ?, ?, ?)`,
    [user_id, total_price, finalAddress, is_pickup]
  );
  return result.insertId;
};

// Luo tilauksen item tilauksen yhteydessä, tilaus => tuotteet jota tilataan ja näiden kokonaishinta lasketaan => tilaus tauluun
const createOrderItem = async ({
  order_id,
  pizza_id,
  quantity,
  price_per_unit,
}) => {
  await db.execute(
    `INSERT INTO order_items (order_id, pizza_id, quantity, price_per_unit) VALUES (?, ?, ?, ?)`,
    [order_id, pizza_id, quantity, price_per_unit]
  );
};

// Hae tilauksia tilauksen id:n perusteella
const getOrderById = async (order_id) => {
  const [rows] = await db.execute(`SELECT * FROM orders WHERE order_id = ?`, [
    order_id,
  ]);
  return rows[0];
};

// Päivitä tilauksen status, ei tarvitse poistaa tilausta, riittää peruutus
const updateOrderStatus = async (order_id, newStatus) => {
  console.log(`Updating order ${order_id} to status: '${newStatus}'`);

  const [result] = await db.execute(
    `UPDATE orders SET order_status = ? WHERE order_id = ?`,
    [newStatus, order_id]
  );
  console.log('Rows affected:', result.affectedRows);
};

// Hae tilauksen tuotteet niiden nimillä, hinnoilla yms
const getOrderWithItems = async (order_id) => {
  const [orderRows] = await db.execute(
    `SELECT o.*, u.email as user_email
     FROM orders o
     JOIN user_accounts u ON o.user_id = u.user_id
     WHERE o.order_id = ?`,
    [order_id]
  );
  const order = orderRows[0];
  if (!order) return null;

  const [itemRows] = await db.execute(
    `SELECT oi.order_item_id, oi.pizza_id, m.pizza_name, oi.quantity, oi.price_per_unit
     FROM order_items oi
     JOIN menu m ON oi.pizza_id = m.pizza_id
     WHERE oi.order_id = ?`,
    [order_id]
  );

  return {...order, items: itemRows};
};

// Hae kaikki tilaukset adminia ja työntekijää varten
const getAllOrders = async () => {
  const [orders] = await db.execute(
    `SELECT o.*, u.email as user_email
     FROM orders o
     JOIN user_accounts u ON o.user_id = u.user_id
     ORDER BY o.created_at DESC`
  );

  const ordersWithItems = await Promise.all(
    orders.map(async (order) => {
      const [itemRows] = await db.execute(
        `SELECT oi.order_item_id, oi.pizza_id, m.pizza_name, oi.quantity, oi.price_per_unit
         FROM order_items oi
         JOIN menu m ON oi.pizza_id = m.pizza_id
         WHERE oi.order_id = ?`,
        [order.order_id]
      );
      return {...order, items: itemRows};
    })
  );

  return ordersWithItems;
};

// Hae käyttäjän kaikki tilaukset
const getOrdersByUserId = async (user_id) => {
  const [orders] = await db.execute(`SELECT * FROM orders WHERE user_id = ?`, [
    user_id,
  ]);
  return orders;
};

export {
  createOrder,
  createOrderItem,
  getOrderById,
  updateOrderStatus,
  getOrderWithItems,
  getAllOrders,
  getOrdersByUserId,
};
