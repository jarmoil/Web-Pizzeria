import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {
  listAllUsers,
  findUserById,
  addUser,
  updateUser,
  findUserByEmail,
} from '../models/user-model.js';

const getUsers = async (req, res) => {
  const users = await listAllUsers();
  res.json(users);
};

const getUserById = async (req, res) => {
  const user = await findUserById(req.params.id);
  user ? res.json(user) : res.sendStatus(404);
};

const postUser = async (req, res) => {
  const result = await addUser(req.body);
  result?.user_id
    ? res.status(201).json({ message: 'New user added.', result })
    : res.sendStatus(400);
};

const putUser = async (req, res) => {
  const result = await updateUser(req.params.id, req.body);
  res.status(result ? 200 : 404).json(result || { error: 'User not found' });
};

const loginUser = async (req, res) => {
  const { user_email, user_password } = req.body;
  const user = await findUserByEmail(user_email);

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials (no such user)' });
  }

  const isMatch = await bcrypt.compare(user_password, user.password);

  if (!isMatch) {
    return res.status(401).json({ error: 'Invalid credentials (wrong password)' });
  }

  const token = jwt.sign(
    {
      user_id: user.user_id,
      user_email: user.user_email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );

  res.json({ token });
};

/*const deleteUser = async (req, res) => {
  const result = await removeUser(req.params.id);
  res.status(result ? 200 : 404).json(result || { error: 'User not found' });
};*/

export { getUsers, getUserById, postUser, putUser, loginUser, updateUser };
