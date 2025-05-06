# Web-Pizzeria

## Setup

Run npm install to get dependencies

### Database Setup

1. Production database: web-pizzeriadb
2. Test database: test-pizzeriadb
   - To refresh test database:
     1. Export production database from phpMyAdmin
     2. Drop all tables from test database
     3. Import the SQL file to test database

### Running the Application

- Launch back-end: npm run server
- Launch front-end: npm run client

### Testing

- Launch integration tests: npm test
- Launch e2e tests: npm run e2e
  - Might need to install playwright and browsers before running e2e tests
  - npx playwright install
