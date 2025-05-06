import express from 'express';
import {
  getUsers,
  getUserById,
  registerUser,
  putUser,
  loginUser,
  registerEmployee,
} from '../controllers/user-controller.js';

import {
  authenticateToken,
  requireAdmin,
  checkOwnershipOrAdmin,
  requireRole,
} from '../middleware/auth-middleware.js';

import {
  userValidator,
  validateUserIdParam,
  loginValidator,
} from '../middleware/validation/user-validator.js';

const userRouter = express.Router();

/**
 * @api {post} /users/login User login
 * @apiName LoginUser
 * @apiGroup Users
 *
 * @apiBody {String} user_email User's email
 * @apiBody {String} user_password User's password
 *
 * @apiSuccess {String} token JWT authentication token
 * @apiError {Object} 401 Invalid credentials
 */
userRouter.post('/login', loginValidator, loginUser);

/**
 * @api {post} /users/register Register new user
 * @apiName RegisterUser
 * @apiGroup Users
 *
 * @apiBody {String} user_name Username
 * @apiBody {String} user_email Email address
 * @apiBody {String} user_password Password
 *
 * @apiSuccess {Object} user Created user info
 * @apiSuccess {String} token JWT authentication token
 * @apiError {Object} 400 Validation error
 */
userRouter.post('/register', userValidator, registerUser);

// Authenticated routes
userRouter.use(authenticateToken);

/**
 * @api {post} /users/register-employee Register new employee
 * @apiName RegisterEmployee
 * @apiGroup Users
 *
 * @apiHeader {String} Authorization Bearer token
 * @apiPermission admin
 *
 * @apiBody {String} user_name Employee name
 * @apiBody {String} user_email Employee email
 * @apiBody {String} user_password Employee password
 * @apiBody {String} phone_number Phone number
 * @apiBody {String} user_address Address
 * @apiBody {String} profile_picture Profile picture URL
 *
 * @apiSuccess {Object} user Created employee info
 * @apiError {Object} 401 Not authenticated
 * @apiError {Object} 403 Not authorized
 */
userRouter.post(
  '/register-employee',
  requireRole('admin'),
  userValidator,
  registerEmployee
);

/**
 * @api {get} /users Get all users
 * @apiName GetUsers
 * @apiGroup Users
 *
 * @apiHeader {String} Authorization Bearer token
 * @apiPermission admin
 *
 * @apiSuccess {Object[]} users List of users
 * @apiSuccess {Number} users.user_id User ID
 * @apiSuccess {String} users.name Username
 * @apiSuccess {String} users.email Email
 * @apiSuccess {String} users.phone_number Phone number
 * @apiSuccess {String} users.address Address
 * @apiSuccess {String} users.profile_picture Profile picture URL
 * @apiSuccess {String} users.created_at Account creation date
 * @apiSuccess {String} users.updated_at Last update date
 * @apiSuccess {String} users.role User role
 *
 * @apiError {Object} 401 Not authenticated
 * @apiError {Object} 403 Not authorized
 */
userRouter.get('/', requireRole('admin'), getUsers);

/**
 * @api {get} /users/:id Get user by ID
 * @apiName GetUserById
 * @apiGroup Users
 *
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {Number} id User ID
 *
 * @apiSuccess {Object} user User details
 * @apiError {Object} 401 Not authenticated
 * @apiError {Object} 403 Not authorized
 * @apiError {Object} 404 User not found
 */
userRouter
  .route('/:id')
  .get(checkOwnershipOrAdmin, validateUserIdParam, getUserById)

  /**
   * @api {put} /users/:id Update user
   * @apiName UpdateUser
   * @apiGroup Users
   *
   * @apiHeader {String} Authorization Bearer token
   * @apiParam {Number} id User ID
   *
   * @apiBody {String} [user_name] New username
   * @apiBody {String} [user_email] New email
   * @apiBody {String} [user_password] New password
   * @apiBody {String} [phone_number] New phone number
   * @apiBody {String} [user_address] New address
   *
   * @apiSuccess {Object} user Updated user info
   * @apiError {Object} 401 Not authenticated
   * @apiError {Object} 403 Not authorized
   * @apiError {Object} 404 User not found
   */
  .put(checkOwnershipOrAdmin, validateUserIdParam, putUser);

export default userRouter;
