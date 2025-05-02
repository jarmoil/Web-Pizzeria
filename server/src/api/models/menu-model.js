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

const getDailyPizza = async () => {
  const weekday = new Date()
    .toLocaleDateString('en-US', {weekday: 'short'})
    .toLowerCase();
  const [rows] = await db.execute(
    'SELECT * FROM menu WHERE daily_weekday = ? LIMIT 1',
    [weekday]
  );
  return rows[0] || null;
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

// Ei toiminut näköjään, että jos yrittää muuttaa vain yhtä saraketta. Asettaa muut sarakkeet null, mikä ei käy.
// Niin pitää nyt vähän monimutkaistaa tätä funktiota, teen helper funktion tsekkaamaan, että onko se sarake mainittu bodyssa vai ei

const buildUpdateQuery = (item) => {
  const updates = [];
  const values = [];

  Object.keys(item).forEach((key) => {
    if (item[key] !== undefined) {
      updates.push(`${key} = ?`);
      values.push(item[key]);
    }
  });

  return {updates, values};
};

const editMenuItem = async (id, item) => {
  // Jos is_daily on mainittu bodyssa, reset kaikki false eli 0
  if ('daily_weekday' in item) {
    const weekday = item.daily_weekday;
    // Resettaa aikaisempi daily pizza
    await db.query(
      'UPDATE menu SET daily_weekday = NULL WHERE daily_weekday = ?',
      [weekday]
    );
  }

  // Kysely tehdään dynaamisesti annetuistea kentistä
  const {updates, values} = buildUpdateQuery(item);

  if (updates.length === 0) {
    return null; // Ei päivityksiä
  }

  // Lisää pizza_id
  values.push(id);

  // SQL kyselyn rakennus
  const sql = `UPDATE menu SET ${updates.join(', ')} WHERE pizza_id = ?`;

  const [result] = await db.query(sql, values);

  return result.affectedRows > 0 ? {updated: true} : null;
};

export {
  getAllItems,
  getItemById,
  insertItem,
  removeItemById,
  editMenuItem,
  getDailyPizza,
};
