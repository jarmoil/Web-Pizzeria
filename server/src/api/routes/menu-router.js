import express from 'express';
import {
  getAllMenuItems,
  getMenuItemById,
  addMenuItem,
  deleteMenuItem,
  updateMenuItem,
  getDailyMenuItem,
} from '../controllers/menu-controller.js';
import {authenticateToken, requireRole} from '../middleware/auth-middleware.js';
import {
  validateMenuIdParam,
  validateMenuItemCreation,
} from '../middleware/validation/menu-validator.js';

const menuRouter = express.Router();

menuRouter.get('/', getAllMenuItems);
menuRouter.get('/daily', getDailyMenuItem);
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
