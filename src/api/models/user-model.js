import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

export const listAllUsers = async () => {
  const [rows] = await pool.query('SELECT * FROM user_accounts');
  return rows;
};

export const findUserById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM user_accounts WHERE user_id = ?', [id]);
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
    role
  } = user;
  const [result] = await pool.query(
    'INSERT INTO user_accounts (user_name, user_email, user_password, phone_number, user_address, profile_picture, role, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())',
    [user_name, user_email, user_password, phone_number, user_address, profile_picture, role]
  );
  return { user_id: result.insertId };
};

export const updateUser = async (id, user) => {
  const {
    user_name,
    user_email,
    phone_number,
    user_address,
    profile_picture,
    role
  } = user;
  const [result] = await pool.query(
    'UPDATE user_accounts SET user_name=?, user_email=?, phone_number=?, user_address=?, profile_picture=?, role=?, updated_at=NOW() WHERE user_id=?',
    [user_name, user_email, phone_number, user_address, profile_picture, role, id]
  );
  return result.affectedRows ? { updated: true } : null;
};

export const removeUser = async (id) => {
  const [result] = await pool.query('DELETE FROM user_accounts WHERE user_id = ?', [id]);
  return result.affectedRows ? { deleted: true } : null;
};
