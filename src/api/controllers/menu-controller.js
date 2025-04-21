import {
  getAllItems,
  getItemById,
  insertItem,
  removeItemById,
  editMenuItem,
} from '../models/menu-model.js';

const getAllMenuItems = async (req, res) => {
  const items = await getAllItems();
  res.json(items);
};

const getMenuItemById = async (req, res) => {
  const item = await getItemById(req.params.id);
  item ? res.json(item) : res.sendStatus(404);
};

const addMenuItem = async (req, res) => {
  const { name, description, price, image } = req.body;
  if (!name || !description || !price || !image) {
    console.log(req.body)
    return res.status(400).json({ error: 'Missing required fields.' });
  }
  try {
    const item = await insertItem({ name, description, price, image });
    res.status(201).json({ message: 'Menu item added.', item });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error adding item.' });
  }
};

const deleteMenuItem = async (req, res) => {
  const result = await removeItemById(req.params.id);
  if (result.affectedRows > 0) {
    res.json({ message: 'Item deleted.' });
  } else {
    res.status(404).json({ error: 'Item not found.' });
  }
};


const updateMenuItem = async (req, res) => {
  const { id } = req.params;
  const updatedItem = req.body;

  try {
    const result = await editMenuItem(id, updatedItem);
    if (result) {
      res.status(200).json({ message: 'Menu item updated.', result });
    } else {
      res.status(404).json({ error: 'Menu item not found.' });
    }
  } catch (err) {
    console.error('Error updating menu item:', err);
    res.status(500).json({ error: 'Server error while updating menu item.' });
  }
};

export { getAllMenuItems, getMenuItemById, addMenuItem, deleteMenuItem, updateMenuItem };
