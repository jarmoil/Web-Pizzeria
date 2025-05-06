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

/**
 * @api {get} /menu Get all menu items
 * @apiName GetAllMenuItems
 * @apiGroup Menu
 *
 * @apiSuccess {Object[]} menu List of menu items
 * @apiSuccess {Number} menu.pizza_id Pizza ID
 * @apiSuccess {String} menu.pizza_name Pizza name
 * @apiSuccess {String} menu.pizza_description Description of the pizza
 * @apiSuccess {Number} menu.price Price of the pizza
 * @apiSuccess {String} menu.image_url URL of the pizza image
 * @apiSuccess {String} menu.daily_weekday Weekday enum (mon, tue, wed, thu, fri, sat, sun)
 */
menuRouter.get('/', getAllMenuItems);

/**
 * @api {get} /menu/daily Get daily special
 * @apiName GetDailyMenuItem
 * @apiGroup Menu
 *
 * @apiSuccess {Object} menu Daily special menu item
 * @apiSuccess {Number} menu.pizza_id Pizza ID
 * @apiSuccess {String} menu.pizza_name Pizza name
 * @apiSuccess {String} menu.pizza_description Description of the pizza
 * @apiSuccess {Number} menu.price Special price
 * @apiSuccess {String} menu.image_url URL of the pizza image
 * @apiSuccess {String} menu.daily_weekday Weekday enum (mon, tue, wed, thu, fri, sat, sun)
 */
menuRouter.get('/daily', getDailyMenuItem);

/**
 * @api {get} /menu/:id Get menu item by ID
 * @apiName GetMenuItemById
 * @apiGroup Menu
 *
 * @apiParam {Number} id Menu item ID
 *
 * @apiSuccess {Object} menu Menu item details
 * @apiError {Object} 404 Menu item not found
 */
menuRouter.get('/:id', validateMenuIdParam, getMenuItemById);

/**
 * @api {post} /menu Create new menu item
 * @apiName AddMenuItem
 * @apiGroup Menu
 *
 * @apiHeader {String} Authorization Bearer token
 * @apiPermission admin,employee
 *
 * @apiBody {String} pizza_name Name of the pizza
 * @apiBody {String} pizza_description Description of the pizza
 * @apiBody {Number} price Price of the pizza
 * @apiBody {String} image_url URL of the pizza image
 *
 * @apiSuccess {Object} menu Created menu item
 * @apiError {Object} 401 Unauthorized
 * @apiError {Object} 403 Forbidden
 */
menuRouter.post(
  '/',
  authenticateToken,
  requireRole('admin', 'employee'),
  validateMenuItemCreation,
  addMenuItem
); // admin or employee only

/**
 * @api {put} /menu/:id Update menu item
 * @apiName UpdateMenuItem
 * @apiGroup Menu
 *
 * @apiHeader {String} Authorization Bearer token
 * @apiPermission admin,employee
 *
 * @apiParam {Number} id Menu item ID
 * @apiBody {String} [pizza_name] Name of the pizza
 * @apiBody {String} [pizza_description] Description of the pizza
 * @apiBody {Number} [price] Price of the pizza
 * @apiBody {String} [image_url] URL of the pizza image
 * @apiBody {String} [daily_weekday] Daily weekday enum (mon, tue, wed, thu, fri, sat, sun)
 *
 * @apiSuccess {Object} menu Updated menu item
 * @apiError {Object} 401 Unauthorized
 * @apiError {Object} 403 Forbidden
 * @apiError {Object} 404 Menu item not found
 */
menuRouter.put(
  '/:id',
  authenticateToken,
  requireRole('admin', 'employee'),
  updateMenuItem
); // admin or employee only

/**
 * @api {delete} /menu/:id Delete menu item
 * @apiName DeleteMenuItem
 * @apiGroup Menu
 *
 * @apiHeader {String} Authorization Bearer token
 * @apiPermission admin,employee
 *
 * @apiParam {Number} id Menu item ID
 *
 * @apiSuccess {Object} message Success message
 * @apiError {Object} 401 Unauthorized
 * @apiError {Object} 403 Forbidden
 * @apiError {Object} 404 Menu item not found
 */
menuRouter.delete(
  '/:id',
  authenticateToken,
  requireRole('admin', 'employee'),
  validateMenuIdParam,
  deleteMenuItem
); // admin or employee only

export default menuRouter;
