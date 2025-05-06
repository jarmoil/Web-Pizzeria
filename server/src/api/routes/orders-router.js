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

/**
 * @api {get} /orders/my Get user's own orders
 * @apiName GetOwnOrders
 * @apiGroup Orders
 *
 * @apiHeader {String} Authorization Bearer token
 *
 * @apiSuccess {Object[]} orders List of user's orders
 * @apiSuccess {Number} orders.order_id Order ID
 * @apiSuccess {Number} orders.user_id User ID
 * @apiSuccess {String} orders.order_status Order status
 * @apiSuccess {Number} orders.total_price Total price
 * @apiSuccess {Date} orders.created_at Order creation date
 * @apiSuccess {String} orders.address Delivery address
 * @apiSuccess {Boolean} orders.is_pickup Pickup status
 * @apiSuccess {String} orders.user_email Customer email
 * @apiSuccess {Object[]} orders.items Order items
 *
 * @apiError {Object} 401 Not authenticated
 * @apiError {Object} 404 No orders found
 */
ordersRouter.get('/my', authenticateToken, checkOwnOrderOrAdmin, getOwnOrderC);

/**
 * @api {put} /orders/:id/cancel Cancel own order
 * @apiName CancelOrder
 * @apiGroup Orders
 *
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {Number} id Order ID
 *
 * @apiSuccess {Object} message Success message
 * @apiError {Object} 401 Not authenticated
 * @apiError {Object} 403 Not authorized
 * @apiError {Object} 404 Order not found
 */
ordersRouter.put(
  '/:id/cancel',
  authenticateToken,
  validateOrderIdParam,
  checkOwnOrderOrAdmin,
  cancelOwnOrderC
);

/**
 * @api {post} /orders Create new order
 * @apiName CreateOrder
 * @apiGroup Orders
 *
 * @apiHeader {String} Authorization Bearer token
 *
 * @apiBody {String} [address] Delivery address (required if not pickup)
 * @apiBody {Boolean} [is_pickup=false] Is order for pickup
 * @apiBody {Object[]} items Order items
 * @apiBody {Number} items.pizza_id Pizza ID
 * @apiBody {Number} items.quantity Quantity
 *
 * @apiSuccess {Object} message Success message
 * @apiSuccess {Number} order_id Created order ID
 *
 * @apiError {Object} 400 Invalid input
 * @apiError {Object} 401 Not authenticated
 */
ordersRouter.post('/', authenticateToken, validateCreateOrder, createOrderC);

/**
 * @api {get} /orders Get all orders
 * @apiName GetAllOrders
 * @apiGroup Orders
 *
 * @apiHeader {String} Authorization Bearer token
 * @apiPermission admin,employee
 *
 * @apiSuccess {Object[]} orders List of all orders
 * @apiSuccess {Number} orders.order_id Order ID
 * @apiSuccess {Number} orders.user_id User ID
 * @apiSuccess {String} orders.order_status Status
 * @apiSuccess {Number} orders.total_price Total price
 * @apiSuccess {Date} orders.created_at Order creation date
 * @apiSuccess {String} orders.address Delivery address
 * @apiSuccess {Boolean} orders.is_pickup Pickup status
 * @apiSuccess {String} orders.user_email Customer email
 * @apiSuccess {Object[]} orders.items Order items
 *
 * @apiError {Object} 401 Not authenticated
 * @apiError {Object} 403 Not authorized
 */
ordersRouter.get(
  '/',
  authenticateToken,
  requireRole('admin', 'employee'),
  getAllOrdersC
);

/**
 * @api {get} /orders/:id Get order by ID
 * @apiName GetOrderById
 * @apiGroup Orders
 *
 * @apiHeader {String} Authorization Bearer token
 * @apiPermission admin,employee
 * @apiParam {Number} id Order ID
 *
 * @apiSuccess {Object} order Order details
 * @apiError {Object} 401 Not authenticated
 * @apiError {Object} 403 Not authorized
 * @apiError {Object} 404 Order not found
 */
ordersRouter.get(
  '/:id',
  authenticateToken,
  requireRole('admin', 'employee'),
  validateOrderIdParam,
  getOrderByIdC
);

/**
 * @api {put} /orders/:id/status Update order status
 * @apiName UpdateOrderStatus
 * @apiGroup Orders
 *
 * @apiHeader {String} Authorization Bearer token
 * @apiPermission admin,employee
 * @apiParam {Number} id Order ID
 *
 * @apiBody {String} order_status New status (pending/processing/completed/cancelled)
 *
 * @apiSuccess {Object} message Status update confirmation
 * @apiError {Object} 401 Not authenticated
 * @apiError {Object} 403 Not authorized
 * @apiError {Object} 404 Order not found
 */
ordersRouter.put(
  '/:id/status',
  authenticateToken,
  requireRole('admin', 'employee'),
  validateOrderIdParam,
  validateUpdateOrderStatus,
  updateOrderStatusC
);

export default ordersRouter;
