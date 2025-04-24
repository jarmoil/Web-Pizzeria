import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

describe('Database Connection Tests', () => {
  let connection;

  // Setup - create connection before all tests
  // Muokattu käyttämään testi tietokantaa
  beforeAll(async () => {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.TEST_DB_USER,
      password: process.env.TEST_DB_PASSWORD,
      database: process.env.TEST_DB_NAME,
      charset: 'utf8mb4',
    });
  });

  // Cleanup - close connection after all tests
  afterAll(async () => {
    if (connection && connection.end) {
      await connection.end();
    }
  });

  test('should connect to database successfully', async () => {
    expect(connection.threadId).toBeDefined();
  });

  test('should be able to query the database', async () => {
    const [rows] = await connection.execute('SELECT 1');
    expect(rows[0]['1']).toBe(1);
  });

  test('should be able to insert and delete test data', async () => {
    // Test data
    const testPizza = {
      name: 'Testailu Pizza',
      description: 'Test Description',
      price: 10.99,
      image_url: 'test.jpg',
    };

    // Insert test
    const [insertResult] = await connection.execute(
      'INSERT INTO menu (pizza_name, pizza_description, price, image_url) VALUES (?, ?, ?, ?)',
      [
        testPizza.name,
        testPizza.description,
        testPizza.price,
        testPizza.image_url,
      ]
    );
    expect(insertResult.insertId).toBeTruthy();

    // Cleanup - delete test data
    const [deleteResult] = await connection.execute(
      'DELETE FROM menu WHERE pizza_name = ?',
      [testPizza.name]
    );
    expect(deleteResult.affectedRows).toBe(1);
  });
});
