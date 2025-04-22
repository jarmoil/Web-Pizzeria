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

import {authenticateToken, requireRole} from '../middleware/auth-middleware.js';

import {checkOwnOrderOrAdmin} from '../middleware/resource-middleware.js';

const ordersRouter = express.Router();

// Hae omat tilaukset
ordersRouter.get('/my', authenticateToken, checkOwnOrderOrAdmin, getOwnOrderC);

// Peruuta oma tilaus
ordersRouter.put(
  '/:id/cancel',
  authenticateToken,
  checkOwnOrderOrAdmin,
  cancelOwnOrderC
);

// Luo tilaus
ordersRouter.post('/', authenticateToken, createOrderC);
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
  getOrderByIdC
);
// Päivitä tilauksen status
ordersRouter.put(
  '/:id/status',
  authenticateToken,
  requireRole('admin', 'employee'),
  updateOrderStatusC
);

export default ordersRouter;
