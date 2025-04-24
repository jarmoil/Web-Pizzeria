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

const userRouter = express.Router();

// Public routes
userRouter.post('/login', loginUser);
userRouter.post('/register', registerUser);

// Authenticated routes
userRouter.use(authenticateToken);

// Employee routes (only admins can register employees)
userRouter.post('/register-employee', requireRole('admin'), registerEmployee);

// Admin routes (only admins can view all users)
userRouter.get('/', requireRole('admin'), getUsers);

// Routes that require user ownership or admin role
userRouter
  .route('/:id')
  .get(checkOwnershipOrAdmin, getUserById)
  .put(checkOwnershipOrAdmin, putUser);
// You can add delete route if needed
// .delete(requireAdmin, deleteUser);

export default userRouter;
