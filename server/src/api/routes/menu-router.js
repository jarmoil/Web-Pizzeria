import express from 'express';
import {
  getAllMenuItems,
  getMenuItemById,
  addMenuItem,
  deleteMenuItem,
  updateMenuItem,
} from '../controllers/menu-controller.js';
import { authenticateToken, requireRole } from '../middleware/auth-middleware.js';

const menuRouter = express.Router();

menuRouter.get('/', getAllMenuItems);
menuRouter.get('/:id', getMenuItemById);
menuRouter.post('/', authenticateToken, requireRole('admin', 'employeee'), addMenuItem); // admin or employee only
menuRouter.put('/:id', authenticateToken, requireRole('admin', 'employee'), updateMenuItem); // admin or employee only
menuRouter.delete('/:id', authenticateToken, requireRole('admin', 'employee'), deleteMenuItem); // admin or employee only

export default menuRouter;
