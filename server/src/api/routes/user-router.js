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

// Public routes
userRouter.post('/login', loginValidator, loginUser);
userRouter.post('/register', userValidator, registerUser);

// Authenticated routes
userRouter.use(authenticateToken);

// Employee routes (only admins can register employees)
userRouter.post(
  '/register-employee',
  requireRole('admin'),
  userValidator,
  registerEmployee
);

// Admin routes (only admins can view all users)
userRouter.get('/', requireRole('admin'), getUsers);

// Routes that require user ownership or admin role
userRouter
  .route('/:id')
  .get(checkOwnershipOrAdmin, validateUserIdParam, getUserById)
  .put(checkOwnershipOrAdmin, validateUserIdParam, putUser);

export default userRouter;
