import express from 'express';
import {
  getAllMenuItems,
  getMenuItemById,
  addMenuItem,
  deleteMenuItem,
  updateMenuItem,
} from '../controllers/menu-controller.js';
import {authenticateToken, requireRole} from '../middleware/auth-middleware.js';
import {
  validateMenuIdParam,
  validateMenuItemCreation,
  validateMenuItemUpdate,
} from '../middleware/validation/menu-validator.js';

const menuRouter = express.Router();

menuRouter.get('/', getAllMenuItems);
menuRouter.get('/:id', validateMenuIdParam, getMenuItemById);
menuRouter.post(
  '/',
  authenticateToken,
  requireRole('admin', 'employee'),
  validateMenuItemCreation,
  addMenuItem
); // admin or employee only
menuRouter.put(
  '/:id',
  authenticateToken,
  requireRole('admin', 'employee'),
  validateMenuItemUpdate,
  updateMenuItem
); // admin or employee only
menuRouter.delete(
  '/:id',
  authenticateToken,
  requireRole('admin', 'employee'),
  validateMenuIdParam,
  deleteMenuItem
); // admin or employee only

export default menuRouter;
