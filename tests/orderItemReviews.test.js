import dotenv from 'dotenv';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../server/src/app.js';
import db from '../server/src/db/connection.js';

dotenv.config();

let reviewId, userToken, adminToken, testUserId, testAdminId;

// Luo testi adminin ja testi käyttäjän, kirjautuu sisään niillä (Ei testaa hashausta, testi tietokannassa myös voi olla null
// arvoina osoite yms)
beforeAll(async () => {
  const [userInsert] = await db.query(
    'INSERT INTO user_accounts (name, email, password, role) VALUES (?, ?, ?, ?)',
    ['testuser2', 'testuser@email.com', 'password', 'customer']
  );
  testUserId = userInsert.insertId;
  userToken = jwt.sign(
    {user_id: testUserId, role: 'customer'},
    process.env.JWT_SECRET
  );

  const [adminInsert] = await db.query(
    'INSERT INTO user_accounts (name, email, password, role) VALUES (?, ?, ?, ?)',
    ['testadmin2', 'testadmin@email.com', 'password', 'admin']
  );
  testAdminId = adminInsert.insertId;
  adminToken = jwt.sign(
    {user_id: testAdminId, role: 'admin'},
    process.env.JWT_SECRET
  );

  // Luodaan testi pizza myös tässä samalla, joka poistetaan testin lopussa
  await db.query(
    'INSERT INTO menu (pizza_id, pizza_name, pizza_description, price, image_url) VALUES (?, ?, ?, ?, ?)',
    [
      1,
      'Test Pizza',
      'Test Pizza Description',
      10.0,
      'https://images.unsplash.com/photo-1708649360542-db4f0762bd9c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ]
  );
});

afterAll(async () => {
  await db.query('DELETE FROM order_item_reviews');
  await db.query('DELETE FROM user_accounts WHERE name IN (?, ?)', [
    'testUser2',
    'testAdmin2',
  ]);
  await db.query('DELETE FROM menu WHERE pizza_id = ?', [1]);
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
      .send({order_item_id: 1, rating: 5, comment: 'No token test'});
    expect(res.statusCode).toBe(401);
  });

  test('POST /api/v1/order-item-reviews fails with invalid rating', async () => {
    const res = await request(app)
      .post('/api/v1/order-item-reviews')
      .set('Authorization', `Bearer ${userToken}`)
      .send({order_item_id: 1, rating: 10, comment: 'Invalid rating'});
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  test('POST /api/v1/order-item-reviews creates a review', async () => {
    const res = await request(app)
      .post('/api/v1/order-item-reviews')
      .set('Authorization', `Bearer ${userToken}`)
      .send({order_item_id: 1, rating: 4, comment: 'Nice pizza'});

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
