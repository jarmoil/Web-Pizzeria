import {
  getAllItems,
  getItemById,
  insertItem,
  removeItemById,
  editMenuItem,
} from '../models/menu-model.js';

const getAllMenuItems = async (req, res, next) => {
  try {
    const items = await getAllItems();
    res.json(items);
  } catch (err) {
    next(err);
  }
};

const getMenuItemById = async (req, res, next) => {
  try {
    const item = await getItemById(req.params.id);
    if (item) {
      res.json(item);
    } else {
      const error = new Error('Menu item not found');
      error.status = 404;
      next(error);
    }
  } catch (err) {
    next(err);
  }
};

const addMenuItem = async (req, res, next) => {
  const {name, description, price, image} = req.body;
  if (!name || !description || !price || !image) {
    const error = new Error('Missing required fields.');
    error.status = 400;
    return next(error);
  }
  try {
    const item = await insertItem({name, description, price, image});
    res.status(201).json({message: 'Menu item added.', item});
  } catch (err) {
    next(err);
  }
};

const deleteMenuItem = async (req, res, next) => {
  try {
    const result = await removeItemById(req.params.id);
    if (result.affectedRows > 0) {
      res.json({message: 'Item deleted.'});
    } else {
      const error = new Error('Item not found.');
      error.status = 404;
      next(error);
    }
  } catch (err) {
    next(err);
  }
};

const updateMenuItem = async (req, res, next) => {
  const {id} = req.params;
  const updatedItem = req.body;

  try {
    const result = await editMenuItem(id, updatedItem);
    if (result) {
      res.status(200).json({message: 'Menu item updated.', result});
    } else {
      const error = new Error('Menu item not found.');
      error.status = 404;
      next(error);
    }
  } catch (err) {
    next(err);
  }
};

export {
  getAllMenuItems,
  getMenuItemById,
  addMenuItem,
  deleteMenuItem,
  updateMenuItem,
};
