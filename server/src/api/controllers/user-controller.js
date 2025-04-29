import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {
  listAllUsers,
  findUserById,
  addUser,
  updateUser,
  findUserByEmail,
} from '../models/user-model.js';

const getUsers = async (req, res, next) => {
  try {
    const users = await listAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await findUserById(req.params.id);
    if (!user) {
      const error = new Error('User not found');
      error.status = 404;
      return next(error);
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const postUser = async (req, res, next) => {
  try {
    const result = await addUser(req.body);
    if (!result || !result.user_id) {
      const error = new Error('Failed to create user');
      error.status = 400;
      return next(error);
    }
    res.status(201).json({message: 'New user added.', result});
  } catch (error) {
    next(error);
  }
};

const registerUser = async (req, res, next) => {
  const {
    user_name,
    user_email,
    user_password,
  } = req.body;

  try {
    const user = await addUser({
      user_name,
      user_email,
      user_password,
      role: 'customer', // regular users are always registered as 'customer'
    });

    const token = jwt.sign(
      {
        user_id: user.user_id,
        user_email: user.user_email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {expiresIn: '2h'}
    );

    res.status(201).json({
      message: 'User registered successfully.',
      user,
      token, // Send the token back with the user data
    });
  } catch (err) {
    next(err); // Pass the error to the next handler
  }
};

const registerEmployee = async (req, res, next) => {
  const {
    user_name,
    user_email,
    user_password,
    phone_number,
    user_address,
    profile_picture,
  } = req.body;

  const role = 'employee'; // admin-only role

  try {
    const user = await addUser({
      user_name,
      user_email,
      user_password,
      phone_number,
      user_address,
      profile_picture,
      role,
    });
    res.status(201).json({message: 'Employee created successfully.', user});
  } catch (err) {
    next(err);
  }
};

const putUser = async (req, res, next) => {
  try {
    const result = await updateUser(req.params.id, req.body);
    if (!result) {
      const error = new Error('User not found');
      error.status = 404;
      return next(error);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  const {user_email, user_password} = req.body;

  try {
    const user = await findUserByEmail(user_email);

    if (!user) {
      const error = new Error('Invalid credentials (no such user)');
      error.status = 401;
      return next(error);
    }

    const isMatch = await bcrypt.compare(user_password, user.password);

    if (!isMatch) {
      const error = new Error('Invalid credentials (wrong password)');
      error.status = 401;
      return next(error);
    }

    const token = jwt.sign(
      {
        user_id: user.user_id,
        user_email: user.user_email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {expiresIn: '2h'}
    );

    res.json({token});
  } catch (error) {
    next(error);
  }
};

export {
  getUsers,
  getUserById,
  postUser,
  putUser,
  loginUser,
  updateUser,
  registerUser,
  registerEmployee,
};
