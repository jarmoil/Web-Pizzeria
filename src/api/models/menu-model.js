import db from '../../db/connection.js';

const getAllItems = async () => {
  const [rows] = await db.execute('SELECT * FROM menu');
  return rows;
};

const getItemById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM menu WHERE pizza_id = ?', [
    id,
  ]);
  return rows[0];
};

const insertItem = async ({name, description, price, image}) => {
  const [result] = await db.execute(
    'INSERT INTO menu (pizza_name, pizza_description, price, image_url) VALUES (?, ?, ?, ?)',
    [name, description, price, image]
  );
  return {
    menu_item_id: result.insertId,
    name,
    description,
    price,
    image,
  };
};

const removeItemById = async (id) => {
  const [result] = await db.execute('DELETE FROM menu WHERE pizza_id = ?', [
    id,
  ]);
  return result;
};

const editMenuItem = async (id, item) => {
  const {name, description, price, image} = item;

  const [result] = await db.query(
    'UPDATE menu SET pizza_name = ?, pizza_description = ?, price = ?, image_url = ? WHERE pizza_id = ?',
    [name, description, price, image, id]
  );

  return result.affectedRows > 0 ? {updated: true} : null;
};

export {getAllItems, getItemById, insertItem, removeItemById, editMenuItem};
