import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config({path: '../.env'});

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: process.env.DB_CONNECTION_LIMIT
    ? parseInt(process.env.DB_CONNECTION_LIMIT)
    : 10,
});

export default db;
