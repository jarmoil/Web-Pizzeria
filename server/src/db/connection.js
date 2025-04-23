import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Vähäsen cursed tapa, mutta en nyt jaksa muokkaa kaikkien tiedostojen modeleita ja muita testauksia varten
// joten nyt vaan tähän => jos testi, yhdistää testi tietokantaan, muuten menee tohon productionii/perus tietokantaan
const isTest = process.env.NODE_ENV === 'test';

// Path eri kun runaa testin ja kun runaa server
dotenv.config(isTest ? undefined : {path: '../.env'});

// Jos testi, käyttää testi tietokantaa ja tunnuksia, muuten perus
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: isTest ? process.env.TEST_DB_USER : process.env.DB_USER,
  password: isTest ? process.env.TEST_DB_PASSWORD : process.env.DB_PASSWORD,
  database: isTest ? process.env.TEST_DB_NAME : process.env.DB_NAME,
  connectionLimit: process.env.DB_CONNECTION_LIMIT
    ? parseInt(process.env.DB_CONNECTION_LIMIT)
    : 10,
  charset: 'utf8mb4',
});

export default db;
