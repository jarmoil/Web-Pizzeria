import dotenv from 'dotenv';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../server/src/app.js';
import db from '../server/src/db/connection.js';

dotenv.config();

let reviewId, userToken, adminToken, testUserId, testAdminId, testPizzaId;

const createTestUser = async (role) => {
  const [userInsert] = await db.query(
    'INSERT INTO user_accounts (name, email, password, role) VALUES (?, ?, ?, ?)',
    [`test${role}`, `test${role}@email.com`, 'password', role]
  );
  return userInsert.insertId;
};

const createTestPizza = async () => {
  const [pizzaInsert] = await db.query(
    'INSERT INTO menu (pizza_name, pizza_description, price, image_url) VALUES (?, ?, ?, ?)',
    [
      'Test Pizza',
      'Test Pizza Description',
      10.0,
      'https://images.unsplash.com/photo-1708649360542-db4f0762bd9c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ]
  );
  return pizzaInsert.insertId;
};

// Luo testi adminin ja testi käyttäjän, kirjautuu sisään niillä (Ei testaa hashausta, testi tietokannassa myös voi olla null
// arvoina osoite yms)
beforeAll(async () => {
  testUserId = await createTestUser('customer');
  testAdminId = await createTestUser('admin');

  userToken = jwt.sign(
    {user_id: testUserId, role: 'customer'},
    process.env.JWT_SECRET
  );
  adminToken = jwt.sign(
    {user_id: testAdminId, role: 'admin'},
    process.env.JWT_SECRET
  );

  testPizzaId = await createTestPizza();
});

afterAll(async () => {
  await db.query('DELETE FROM order_item_reviews');
  await db.query('DELETE FROM user_accounts WHERE user_id IN (?, ?)', [
    testUserId,
    testAdminId,
  ]);
  await db.query('DELETE FROM menu WHERE pizza_id = ?', [testPizzaId]);
  await db.end();
});

describe('Order Item Reviews API', () => {
  test('GET /api/v1/order-item-reviews returns array', async () => {
    const res = await request(app).get('/api/v1/order-item-reviews');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /api/v1/order-item-reviews fails without token', async () => {
    const res = await request(app)
      .post('/api/v1/order-item-reviews')
      .send({order_item_id: testPizzaId, rating: 5, comment: 'No token test'});
    expect(res.statusCode).toBe(401);
  });

  test('POST /api/v1/order-item-reviews fails with invalid rating', async () => {
    const res = await request(app)
      .post('/api/v1/order-item-reviews')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        order_item_id: testPizzaId,
        rating: 10,
        comment: 'Invalid rating',
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toBeDefined();
    expect(res.body.errors.length).toBeGreaterThan(0);
  });

  test('POST /api/v1/order-item-reviews rejects SQL injection attempt in comment', async () => {
    const maliciousComment = "'; DROP TABLE order_item_reviews; --";

    const res = await request(app)
      .post('/api/v1/order-item-reviews')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        order_item_id: testPizzaId,
        rating: 5,
        comment: maliciousComment,
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toBeDefined();
    expect(res.body.errors[0].msg).toMatch(/Invalid characters/);
  });

  test('POST /api/v1/order-item-reviews rejects XSS attempt in comment', async () => {
    const maliciousComment = '<script>alert("XSS")</script>';

    const res = await request(app)
      .post('/api/v1/order-item-reviews')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        order_item_id: testPizzaId,
        rating: 5,
        comment: maliciousComment,
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toBeDefined();
    expect(res.body.errors[0].msg).toMatch(/Comment is required/);
  });

  test('POST /api/v1/order-item-reviews creates a review', async () => {
    const res = await request(app)
      .post('/api/v1/order-item-reviews')
      .set('Authorization', `Bearer ${userToken}`)
      .send({order_item_id: testPizzaId, rating: 4, comment: 'Nice pizza'});

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('order_item_review_id');
    reviewId = res.body.order_item_review_id;
  });

  test('DELETE /api/v1/order-item-reviews/:id fails without token', async () => {
    const res = await request(app).delete(
      `/api/v1/order-item-reviews/${reviewId}`
    );
    expect(res.statusCode).toBe(401);
  });

  test('DELETE /api/v1/order-item-reviews/:id fails for wrong user', async () => {
    const fakeToken = jwt.sign(
      {user_id: 1, role: 'customer'},
      process.env.JWT_SECRET
    );
    const res = await request(app)
      .delete(`/api/v1/order-item-reviews/${reviewId}`)
      .set('Authorization', `Bearer ${fakeToken}`);
    expect(res.statusCode).toBe(403);
  });

  test('DELETE /api/v1/order-item-reviews/:id succeeds for admin', async () => {
    const res = await request(app)
      .delete(`/api/v1/order-item-reviews/${reviewId}`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Review deleted successfully');
  });
});
