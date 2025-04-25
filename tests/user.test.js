import dotenv from 'dotenv';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../server/src/app.js';
import db from '../server/src/db/connection.js';

dotenv.config();

let userToken, adminToken, userId, adminId;

// Create test users before all tests (real registration)
beforeAll(async () => {
  // Register a real user
  const userResponse = await request(app).post('/api/v1/users/register').send({
    user_name: 'testuser',
    user_email: 'testuser@email.com',
    user_password: 'password123',
    phone_number: '1234567890',
    user_address: 'Test Address, City',
    profile_picture: 'https://testimage.jpg',
    role: 'customer',
  });
  userId = userResponse.body.user.user_id;
  userToken = userResponse.body.token; // Assuming token is returned upon registration

  // Manually insert an admin user into the database
  const adminInsertQuery = `
 INSERT INTO user_accounts (name, email, password, phone_number, address, profile_picture, role)
 VALUES ('adminuser', 'adminuser@email.com', 'adminpassword123', '0987654321', 'Admin Address, City', 'adminpic.jpg', 'admin');
`;
  await db.query(adminInsertQuery);

  // Retrieve the admin user ID (assuming auto-increment)
  const adminResult = await db.query(
    "SELECT user_id FROM user_accounts WHERE email = 'adminuser@email.com'"
  );
  adminId = adminResult[0].user_id;

  // Generate an admin token manually (or you could modify the JWT generation logic for the test)
  adminToken = jwt.sign(
    {user_id: adminId, role: 'admin'},
    process.env.JWT_SECRET,
    {expiresIn: '2h'}
  );
});

// Cleanup after tests
afterAll(async () => {
  // Clean up by deleting the test users
  await db.query('DELETE FROM user_accounts WHERE name IN (?, ?, ?)', [
    'adminuser',
    'newuser',
    'updateduser',
  ]);
});

describe('POST /api/v1/users/register', () => {
  test('should register a new user successfully', async () => {
    const res = await request(app).post('/api/v1/users/register').send({
      user_name: 'newuser',
      user_email: 'newuser@email.com',
      user_password: 'password',
      phone_number: '1112223333',
      user_address: 'New User Address, City',
      profile_picture: 'newuserpic.jpg',
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', 'User registered successfully.');
    expect(res.body.user).toHaveProperty('user_id');
    expect(res.body.token).toBeDefined();
  });

  test('should fail if missing required fields', async () => {
    const res = await request(app).post('/api/v1/users/register').send({
      user_name: 'newuser',
      user_email: 'newuser@email.com',
      user_password: 'password',
    });

    expect(res.statusCode).toBe(400); // Assuming validation error
  });
});

test('should reject SQL injection or XSS payloads', async () => {
  const res = await request(app).post('/api/v1/users/register').send({
    user_name: "Robert'); DROP TABLE user_accounts;--",
    user_email: 'xss@test.com<script>alert(1)</script>',
    user_password: 'password123',
    phone_number: '+358401234567',
    user_address: '123 Main St<script>alert(1)</script>',
    profile_picture: 'javascript:alert(1)', // not a URL
  });

  expect(res.statusCode).toBe(400); // Fails validation
});

test('should fail validation with bad email and short name', async () => {
  const res = await request(app).post('/api/v1/users/register').send({
    user_name: 'a',
    user_email: 'not-an-email',
    user_password: 'pass',
    phone_number: 'invalid-phone',
    user_address: '',
    profile_picture: 'https://ok.com/image.jpg',
  });

  expect(res.statusCode).toBe(400);
  expect(res.body.errors.length).toBeGreaterThanOrEqual(3); // at least email, name, address
});

describe('POST /api/v1/users/login', () => {
  test('should login successfully with correct credentials', async () => {
    const res = await request(app).post('/api/v1/users/login').send({
      user_email: 'testuser@email.com',
      user_password: 'password123',
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  test('should fail with invalid credentials', async () => {
    const res = await request(app).post('/api/v1/users/login').send({
      user_email: 'wronguser@email.com',
      user_password: 'wrongpassword',
    });

    expect(res.statusCode).toBe(401); // Unauthorized
    expect(res.body).toHaveProperty(
      'error',
      'Invalid credentials (no such user)'
    );
  });
});

describe('GET /api/v1/users', () => {
  test('should get all users for admin', async () => {
    const res = await request(app)
      .get('/api/v1/users')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('should not get users for non-admin', async () => {
    const res = await request(app)
      .get('/api/v1/users')
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toBe(403); // Forbidden
  });
});

describe('GET /api/v1/users/:id', () => {
  test('should return specific user for authenticated user', async () => {
    console.log('userId in test:', userId);
    const decoded = jwt.decode(userToken);
    console.log('user_id in token:', decoded.user_id);
    const res = await request(app)
      .get(`/api/v1/users/${userId}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('user_id', userId);
  });

  test('should return specific user for admin', async () => {
    const res = await request(app)
      .get(`/api/v1/users/${userId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('user_id', userId);
  });

  test('should fail for non-owner/non-admin', async () => {
    const nonOwnerToken = jwt.sign(
      {user_id: 9999, role: 'customer'},
      process.env.JWT_SECRET
    );

    const res = await request(app)
      .get(`/api/v1/users/${userId}`)
      .set('Authorization', `Bearer ${nonOwnerToken}`);

    expect(res.statusCode).toBe(403); // Forbidden
  });
});

describe('PUT /api/v1/users/:id', () => {
  test('should update user info for user', async () => {
    const res = await request(app)
      .put(`/api/v1/users/${userId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        user_name: 'updateduser',
        user_email: 'updateduser@email.com',
        phone_number: '1231231234',
        user_address: 'Updated St, New City',
        profile_picture: 'updated.jpg',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('updated', true);
  });

  test('should fail to update user info for non-owner', async () => {
    const nonOwnerToken = jwt.sign(
      {user_id: 9999, role: 'customer'},
      process.env.JWT_SECRET
    );

    const res = await request(app)
      .put(`/api/v1/users/${userId}`)
      .set('Authorization', `Bearer ${nonOwnerToken}`)
      .send({
        user_name: 'nonowner',
        user_email: 'nonowner@email.com',
      });

    expect(res.statusCode).toBe(403); // Forbidden
  });
});
