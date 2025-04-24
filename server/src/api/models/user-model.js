import dotenv from 'dotenv';
import db from '../../db/connection.js';
import bcrypt from 'bcrypt';
dotenv.config();

export const listAllUsers = async () => {
  const [rows] = await db.query('SELECT * FROM user_accounts');
  return rows;
};

export const findUserById = async (id) => {
  const [rows] = await db.query(
    'SELECT * FROM user_accounts WHERE user_id = ?',
    [id]
  );
  return rows[0];
};

export const addUser = async (user) => {
  const {
    user_name,
    user_email,
    user_password,
    phone_number,
    user_address,
    profile_picture,
    role = 'customer', // default user
  } = user;

  // checking if role is provided and it's not admin role
  if (role !== 'customer' && role !== 'employee') {
    throw new Error('Invalid role assignment.');
  }

  // hash the password
  const hashedPassword = await bcrypt.hash(user_password, 10);

  const [result] = await db.query(
    'INSERT INTO user_accounts (name, email, password, phone_number, address, profile_picture, role, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())',
    [
      user_name,
      user_email,
      hashedPassword,
      phone_number,
      user_address,
      profile_picture,
      role,
    ]
  );

  return {user_id: result.insertId};
};

export const updateUser = async (id, user) => {
  const {user_name, user_email, phone_number, user_address, profile_picture} =
    user;
  const [result] = await db.query(
    'UPDATE user_accounts SET name=?, email=?, phone_number=?, address=?, profile_picture=?, updated_at=NOW() WHERE user_id=?',
    [user_name, user_email, phone_number, user_address, profile_picture, id]
  );
  return result.affectedRows ? {updated: true} : null;
};

/*export const removeUser = async (id) => {
  const [result] = await pool.query('DELETE FROM user_accounts WHERE user_id = ?', [id]);
  return result.affectedRows ? { deleted: true } : null;
};*/

export const findUserByEmail = async (email) => {
  const [rows] = await db.query('SELECT * FROM user_accounts WHERE email = ?', [
    email,
  ]);
  return rows[0];
};
