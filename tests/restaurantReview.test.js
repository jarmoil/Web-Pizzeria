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
    ['testuser', 'testuser@email.com', 'password', 'customer']
  );
  testUserId = userInsert.insertId;
  userToken = jwt.sign(
    {user_id: testUserId, role: 'customer'},
    process.env.JWT_SECRET
  );

  const [adminInsert] = await db.query(
    'INSERT INTO user_accounts (name, email, password, role) VALUES (?, ?, ?, ?)',
    ['testadmin', 'testadmin@email.com', 'password', 'admin']
  );
  testAdminId = adminInsert.insertId;
  adminToken = jwt.sign(
    {user_id: testAdminId, role: 'admin'},
    process.env.JWT_SECRET
  );
});

// Testauksen jälkeen poistaa kaikki restaurant reviews, testi käyttäjät ja resettaa AUTO_INCREMENTin alkuperäiseen
afterAll(async () => {
  await db.query('DELETE FROM restaurant_reviews');
  await db.query('DELETE FROM user_accounts WHERE name = "testuser"');
  await db.query('DELETE FROM user_accounts WHERE name = "testadmin"');
  await db.end();
});

describe('Restaurant Reviews API', () => {
  test('GET /api/v1/restaurant-reviews should return empty array', async () => {
    const res = await request(app).get('/api/v1/restaurant-reviews');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });

  test('POST /api/v1/restaurant_reviews should fail without token', async () => {
    const res = await request(app)
      .post('/api/v1/restaurant-reviews')
      .send({rating: 5, comment: 'Anonymous test'});

    expect(res.statusCode).toBe(401);
  });

  test('POST /api/v1/restaurant-reviews should fail with invalid rating', async () => {
    const res = await request(app)
      .post('/api/v1/restaurant-reviews')
      .set('Authorization', `Bearer ${userToken}`)
      .send({rating: 0, comment: 'Invalid rating test'});

    expect(res.statusCode).toBe(400);
    expect(res.body.errors[0].msg).toBe('Rating must be between 1 and 5');
  });

  // Test for SQL Injection attempt
  test('POST /api/v1/restaurant-reviews should reject SQL injection in comment', async () => {
    const res = await request(app)
      .post('/api/v1/restaurant-reviews')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        rating: 5,
        comment: "'; DROP TABLE restaurant_reviews; --",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.errors[0].msg).toMatch(/Invalid characters/);
  });

  // Test for XSS attack attempt
  test('POST /api/v1/restaurant-reviews should reject XSS in comment', async () => {
    const res = await request(app)
      .post('/api/v1/restaurant-reviews')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        rating: 5,
        comment: '<script>alert("XSS Attack")</script>',
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.errors[0].msg).toMatch(/Comment is required/);
  });

  test('POST /api/v1/restaurant-reviews should create review', async () => {
    const res = await request(app)
      .post('/api/v1/restaurant-reviews')
      .set('Authorization', `Bearer ${userToken}`)
      .send({rating: 4, comment: 'Integration test review'});

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('restaurant_review_id');
    expect(res.body.comment).toBe('Integration test review');

    reviewId = res.body.restaurant_review_id;
  });

  test('GET /api/v1/restaurant-reviews/:id should return specific review', async () => {
    const res = await request(app).get(
      `/api/v1/restaurant-reviews/${reviewId}`
    );
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('restaurant_review_id', reviewId);
  });

  test('DELETE /api/v1/restaurant-reviews/:id should fail without token', async () => {
    const res = await request(app).delete(
      `/api/v1/restaurant-reviews/${reviewId}`
    );
    expect(res.statusCode).toBe(401);
  });

  test('DELETE /api/v1/restaurant-reviews/:id should fail if wrong user', async () => {
    const wrongUserToken = jwt.sign(
      {user_id: 1, role: 'customer'},
      process.env.JWT_SECRET
    );

    const res = await request(app)
      .delete(`/api/v1/restaurant-reviews/${reviewId}`)
      .set('Authorization', `Bearer ${wrongUserToken}`);

    expect(res.statusCode).toBe(403);
  });

  test('DELETE /api/v1/restaurant-reviews/:id should succeed for admin', async () => {
    const res = await request(app)
      .delete(`/api/v1/restaurant-reviews/${reviewId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Review deleted');
  });
});
