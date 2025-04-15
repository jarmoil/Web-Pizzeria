require('dotenv').config();
const mysql = require('mysql2/promise');

describe('Database Connection Tests', () => {
  let connection;

  // Setup - create connection before all tests
  beforeAll(async () => {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
  });

  // Cleanup - close connection after all tests
  afterAll(async () => {
    if (connection) {
      await connection.end();
    }
  });

  test('should connect to database successfully', async () => {
    await expect(connection.connect()).resolves.not.toThrow();
    expect(connection.threadId).toBeDefined();
  });

  test('should be able to query the database', async () => {
    const [rows] = await connection.execute('SELECT 1');
    expect(rows[0]['1']).toBe(1);
  });

  test('should be able to insert and delete test data', async () => {
    // Test data
    const testPizza = {
      name: 'Test Pizza',
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
