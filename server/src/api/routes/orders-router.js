// Orders ja order items yhteen, koska order items on orders taulun "child"
import express from 'express';
import {
  createOrderC,
  getAllOrdersC,
  getOrderByIdC,
  updateOrderStatusC,
  getOwnOrderC,
  cancelOwnOrderC,
} from '../controllers/orders-controller.js';
import {
  validateCreateOrder,
  validateOrderIdParam,
  validateUpdateOrderStatus,
} from '../middleware/validation/orders-validator.js';

import {authenticateToken, requireRole} from '../middleware/auth-middleware.js';
import {checkOwnOrderOrAdmin} from '../middleware/resource-middleware.js';

const ordersRouter = express.Router();

// Hae omat tilaukset
ordersRouter.get('/my', authenticateToken, checkOwnOrderOrAdmin, getOwnOrderC);

// Peruuta oma tilaus
ordersRouter.put(
  '/:id/cancel',
  authenticateToken,
  validateOrderIdParam,
  checkOwnOrderOrAdmin,
  cancelOwnOrderC
);

// Luo tilaus
ordersRouter.post('/', authenticateToken, validateCreateOrder, createOrderC);
// Hae kaikki tilaukset
ordersRouter.get(
  '/',
  authenticateToken,
  requireRole('admin', 'employee'),
  getAllOrdersC
);
// Hae tilaus ID:llä
ordersRouter.get(
  '/:id',
  authenticateToken,
  requireRole('admin', 'employee'),
  validateOrderIdParam,
  getOrderByIdC
);
// Päivitä tilauksen status
ordersRouter.put(
  '/:id/status',
  authenticateToken,
  requireRole('admin', 'employee'),
  validateOrderIdParam,
  validateUpdateOrderStatus,
  updateOrderStatusC
);

export default ordersRouter;
