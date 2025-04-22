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


userRouter.post('/login', loginUser);
userRouter.post('/register', registerUser);

userRouter.use(authenticateToken);
userRouter.post('/register-employee', authenticateToken, requireRole('admin'), registerEmployee);
userRouter.get('/', requireAdmin, getUsers);

userRouter
  .route('/:id')
  .get(checkOwnershipOrAdmin, getUserById)
  .put(checkOwnershipOrAdmin, putUser);
  //.delete(requireAdmin deleteUser);


export default userRouter;
