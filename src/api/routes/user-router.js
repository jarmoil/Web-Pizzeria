import express from 'express';
import {
  getUsers,
  getUserById,
  postUser,
  putUser,
  loginUser,
} from '../controllers/user-controller.js';

const userRouter = express.Router();

userRouter.route('/').get(getUsers).post(postUser);
userRouter.route('/:id').get(getUserById).put(putUser);//.delete(deleteUser);
userRouter.post('/login', loginUser);

export default userRouter;
