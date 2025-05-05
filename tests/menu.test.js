import dotenv from 'dotenv';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../server/src/app.js';
import db from '../server/src/db/connection.js';

dotenv.config();

let menuId, userToken, adminToken, testUserId, testAdminId;

const createTestUser = async (role) => {
  const [userInsert] = await db.query(
    'INSERT INTO user_accounts (name, email, password, role) VALUES (?, ?, ?, ?)',
    [`test${role}`, `test${role}@email.com`, 'password', role]
  );
  return userInsert.insertId;
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
});

afterAll(async () => {
  console.log(menuId);
  await db.query('DELETE FROM menu WHERE pizza_id = ?', [menuId]);
  await db.query('DELETE FROM user_accounts WHERE user_id IN (?, ?)', [
    testUserId,
    testAdminId,
  ]);
  await db.end();
});

describe('Menu API', () => {
  test('GET /api/v1/menu should return an array of items', async () => {
    const res = await request(app).get('/api/v1/menu');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /api/v1/menu - should reject missing fields', async () => {
    const res = await request(app)
      .post('/api/v1/menu')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        pizza_name: '',
        pizza_description: '',
        price: '-9',
        image_url: '',
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('errors');
    expect(Array.isArray(res.body.errors)).toBe(true);
  });

  test('POST /api/v1/menu should reject SQL injection in name field', async () => {
    const res = await request(app)
      .post('/api/v1/menu')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        pizza_name: "user' OR 1=1 --",
        pizza_description: 'A tasty pizza',
        price: 10.5,
        image_url: 'http://example.com/image.jpg',
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toBeDefined();
    expect(res.body.errors[0].msg).toMatch(/Invalid characters/);
  });

  test('POST /api/v1/menu should reject XSS in description field', async () => {
    const res = await request(app)
      .post('/api/v1/menu')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        pizza_name: 'Safe Name',
        pizza_description: '<script>alert("xss")</script>',
        price: 10.99,
        image_url: 'http://example.com/image.jpg',
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toBeDefined();
    expect(res.body.errors[0].msg).toMatch(/Description is required/);
  });

  test('POST /api/v1/menu - add a new menu item (admin)', async () => {
    const res = await request(app)
      .post('/api/v1/menu')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        pizza_name: 'Test Pizza',
        pizza_description: 'A test pizza item',
        price: 9.99,
        image_url: 'http://example.com/testpizza.png',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.item).toHaveProperty('menu_item_id');
    menuId = res.body.item.menu_item_id;
  });

  test('GET /api/v1/menu/:id - fetch specific menu item', async () => {
    const res = await request(app).get(`/api/v1/menu/${menuId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('pizza_id', menuId);
  });

  // Muutin nimet PUT, jotta täsmää sql sarakkeen nimeä. Saattaa aiheuttaa hämmennystä
  test('PUT /api/v1/menu/:id - update menu item (admin)', async () => {
    const res = await request(app)
      .put(`/api/v1/menu/${menuId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        pizza_name: 'Test Pizza',
        pizza_description: 'A test pizza item',
        price: 9.99,
        image_url: 'http://example.com/testpizza.png',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Menu item updated.');
  });

  test('DELETE /api/v1/menu/:id - delete menu item (admin)', async () => {
    const res = await request(app)
      .delete(`/api/v1/menu/${menuId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Item deleted.');
  });
});
