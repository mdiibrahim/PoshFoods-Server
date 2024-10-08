# PoshFoods - Backend Server

This is the backend server for [PoshFoods](https://github.com/mdiibrahim/PoshFoods-Client/), an online grocery platform offering features like user authentication, product management, order processing, and payment integration. Built using Node.js and Express, with MongoDB as the database.

## Live Demo

You can access the live demo of the application: [here](https://posh-foods-server.vercel.app).

## Features

- **User Authentication & Authorization**: Implements JWT-based authentication with role-based access control for admin and regular users.
- **Product Management**: Admins can create, update, delete, and fetch product details, including inventory management and product variants.
- **Order Processing**: Users can create, view, and manage their orders. Admins can manage the status of orders (e.g., pending, delivered, canceled).
- **Cart System**: The frontend allows users to manage their cart, with state persistence using Redux (e.g., Redux Persist).
- **Payment Integration**: Integrated with AamarPay for online payments, supporting both success and failure responses.
- **Error Handling**: Centralized error handling for validation, authentication, and runtime errors, with meaningful error messages.

## Table of Contents

1. [Installation](#installation)
2. [Environment Variables](#environment-variables)
3. [Running the Application](#running-the-application)
4. [API Endpoints](#api-endpoints)
5. [Technologies Used](#technologies-used)
6. [Contributing](#contributing)
7. [License](#license)
8. [Contact](#contact)

## Installation

Follow the steps below to set up and run the backend server locally:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/mdiibrahim/PoshFoods-Server.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd PoshFoods-Server
   ```

3. **Install the required dependencies**:

   ```bash
   npm install
   # or
   yarn install
   ```

4. **Create a `.env` file** in the root directory with the necessary environment variables (see the next section).

## Environment Variables

Ensure that the following environment variables are properly configured in your `.env` file:

```bash
PORT=5000
DATABASE_URL=your-mongodb-url
JWT_ACCESS_SECRET=your-jwt-secret
JWT_ACCESS_EXPIRES_IN=1d
BCRYPT_SALT_ROUNDS=12
CLIENT_URL=your-client-url
```

## Running the Application

To run the server locally, use the following command:

```bash
npm run start:dev
# or
yarn start:dev
```

The server will be available at `http://localhost:5000`.

## API Endpoints

### Auth Endpoints

- **POST** `/api/auth/signup`: Register a new user.
- **POST** `/api/auth/login`: Log in a user.
- **POST** `/api/auth/create-admin`: Create a new admin (Admin only).

### Product Endpoints

- **GET** `/api/product`: Fetch all products.
- **POST** `/api/product`: Create a new product (Admin only).
- **GET** `/api/product/:productId`: Get product details by ID.
- **PUT** `/api/product/:productId`: Update a product (Admin only).
- **DELETE** `/api/product/:productId`: Delete a product (Admin only).

### Order Endpoints

- **GET** `/api/order`: Fetch all orders (Admin only).
- **POST** `/api/order`: Create a new order (User only).
- **GET** `/api/order/user`: Get all orders for a user (User only).
- **PATCH** `/api/order/deliver/:id`: Mark an order as "delivered" (Admin only).
- **DELETE** `/api/order/:id`: Cancel an order (User only).

### Payment Endpoints

- **POST** `/api/payment`: Initiate a payment.
- **POST** `/api/payment/success`: Handle successful payment.
- **POST** `/api/payment/fail`: Handle failed payment.

### Review Endpoints

- **POST** `/api/reviews`: Create a product review (User only).
- **GET** `/api/reviews/:id`: Get reviews for a specific product.
- **GET** `/api/reviews`: Get all product reviews.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express**: Web framework for building REST APIs.
- **MongoDB (Mongoose)**: NoSQL database used for data storage and retrieval.
- **JWT Authentication**: For secure authentication and authorization of users.
- **AamarPay Payment Gateway**: For processing online payments.
- **Zod Validation**: Ensures input validation for APIs.
- **TypeScript**: Adds type safety to JavaScript.
- **Bcrypt**: For hashing and securing user passwords.

## Contributing

We welcome contributions! Follow these steps to contribute:

1. Fork the repository.
2. Create a new feature branch: `git checkout -b feature/your-feature-name`.
3. Commit your changes: `git commit -m "Add some feature"`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.txt) file for details.

## Contact

For any further information or inquiries, please reach out via email: [mdiibrahim549@gmail.com](mailto:mdiibrahim549@gmail.com).

---

**Notes**:

- Replace `https://your-server-url` with the actual server URL where your API is hosted.
- The API functions can be consumed by the frontend to interact with the backend.
- Ensure JWT tokens are correctly handled for protected routes in the frontend.
