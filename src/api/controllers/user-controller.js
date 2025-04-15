import {
  listAllUsers,
  findUserById,
  addUser,
  updateUser,
  removeUser
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

const deleteUser = async (req, res) => {
  const result = await removeUser(req.params.id);
  res.status(result ? 200 : 404).json(result || { error: 'User not found' });
};

export { getUsers, getUserById, postUser, putUser, deleteUser };
