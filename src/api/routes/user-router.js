import express from 'express';
import {
  getUsers,
  getUserById,
  postUser,
  putUser,
  loginUser,
} from '../controllers/user-controller.js';

import {
  authenticateToken,
  requireAdmin,
  checkOwnershipOrAdmin,
} from '../middleware/auth-middleware.js';

const userRouter = express.Router();

userRouter.post('/login', loginUser);
userRouter.post('/', postUser);

userRouter.use(authenticateToken);

userRouter.get('/', requireAdmin, getUsers);

userRouter
  .route('/:id')
  .get(checkOwnershipOrAdmin, getUserById)
  .put(checkOwnershipOrAdmin, putUser);
  //.delete(requireAdmin deleteUser);


export default userRouter;
