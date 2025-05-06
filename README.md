# Web-Pizzeria

## What this project does

### The idea of the project

This project is a web page for an imaginery pizzeria called Pápán pizzeria.
Its idea for normal users is to be able to order pizza and view menus. For admins and employees it's all about maintaining and managing the pages.

### Functionalities

Creating accounts and logging in

1. No account:

- Viewing home, menu and location pages
- Adding pizzas from the menu to cart, removing pizzas from cart and adding more quantity if needed
- No ordering, says to log in if you try to order
- Viewing all reviews, even item reviews

2. Customer account:

- Viewing home, menu, location and account management pages
- Posting reviews
- Adding pizzas from the menu to cart, removing pizzas from cart and adding more quantity if needed
- Ordering
- Viewing all reviews
- Editing current account you're signed in with, can't edit other accounts
- Viewing order history
- Order cancellation

3. Employee account:

- Everything above
- Deleting reviews
- Adding and deleting items from menu
- Editing existing pizzas on the menu

4. Admin:

- Everything above
- Altering all existing accounts
- Creating new employee accounts

## Why this project is useful

This web application serves multiple purposes for different types of users and stakeholders:

### For Customers:

- Provides an easy and intuitive way to browse the pizzeria's menu.

- Enables users to build and manage a cart, making the ordering process smooth and convenient.

- Encourages engagement through review posting.

### For Employees:

- Offers a centralized platform for managing the restaurant's offerings without needing technical knowledge.

- Simplifies the process of updating the menu, such as adding new pizzas or editing existing ones.

- Helps with quality control by enabling review moderation.

### For Admins:

- Allows full control over user accounts and employee access, ensuring secure and appropriate permission management.

- Supports scalability by allowing easy onboarding of new staff via employee account creation.

### For the Business:

- Enhances customer experience and brand image through a professional and interactive web presence.

- Enables data collection like popular items and reviews that can inform marketing and menu decisions.

### For the creators:

- Provides a comprehensive full-stack project to demonstrate skills in user authentication, role-based access control, and dynamic content management.

- Serves as a practical portfolio piece showcasing real-world functionality, from front-end user interfaces to back-end admin tools.

- Offers opportunities to implement and practice database design, security best practices, and responsive design principles.

## Documentation

Documentation for api and front-end can be found here:

apiDoc: /docs

front-end: /jsdocs

## Setupping this project to run it on your own PC

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
