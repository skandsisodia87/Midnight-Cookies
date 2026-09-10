# Midnight Cookies 🍪

Freshly baked cookies delivered to your doorstep.

Midnight Cookies is a full-stack e-commerce application for browsing cookie products, adding items to cart, placing orders, and managing store operations through an admin dashboard.

---

## Project Overview

This project combines:

- A React + Vite frontend for the customer experience
- A Node.js + Express backend with REST APIs
- MongoDB for persistent data storage
- Redis for queue-related background processing
- Socket.IO for real-time chat support
- Razorpay integration for online payments

The platform supports both customer and admin flows, including authentication, catalog browsing, checkout, order management, newsletter subscription, and live chat.

---

## Features

### Customer Features

- Browse cookie catalog and categories
- View individual cookie details and variants
- Add or remove items from cart
- Manage addresses and checkout details
- Place orders with payment integration
- Track order status
- Review products
- Subscribe to newsletter
- Contact the store
- Real-time chat support
- Secure authentication with JWT and refresh tokens

### Admin Features

- Admin-only routes and middleware
- Manage cookies and categories
- View and update customer orders
- Manage inventory and product variants
- Monitor sales and dashboard data
- Handle customer inquiries and chat conversations
- Review newsletter subscriptions

---

## Tech Stack

### Frontend

- React 19
- Vite
- React Router
- Zustand
- TanStack Query
- Tailwind CSS
- Framer Motion
- Recharts
- Socket.IO Client
- Axios

### Backend

- Node.js
- Express.js
- MongoDB + Mongoose
- Redis
- JWT Authentication
- Socket.IO
- Razorpay
- Nodemailer
- Cloudinary
- Multer

---

## Project Structure

```bash
Midnight-Cookies/
├── client/                         # Frontend app
│   ├── public/
│   ├── src/
│   ├── .env
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/                         # Backend API + services
│   ├── src/
│   ├── .env
│   ├── package.json
│   └── public/
│
├── README.md
└── .gitignore
```

---

## Core Backend Modules

The server application is organized into the following domains:

- `auth` — signup, login, password reset, JWT handling
- `cookie` — product catalog and category management
- `cart` — cart operations and persistence
- `address` — user delivery addresses
- `order` — order placement and status updates
- `payment` — Razorpay order creation and signature verification
- `review` — customer ratings and reviews
- `newsletter` — newsletter signup and verification
- `contact` — contact form submissions
- `chat` — real-time messaging support
- `admin` — admin dashboard and management endpoints

---

## Local Setup

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd Midnight-Cookies
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Install backend dependencies

```bash
cd ../server
npm install
```

---

## Environment Variables

Create a `.env` file in the `server` folder with the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=7d
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_app_password
CLIENT_URL=http://localhost:5173
NODE_ENV=develop

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

REDIS_HOST=localhost
REDIS_PORT=6379

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

Create a `.env` file in the `client` folder:

```env
VITE_API_URL=http://localhost:5000
```

> Make sure MongoDB, Redis, and your configured email/payment credentials are available before starting the app.

---

## Run the Project

### Start the backend

```bash
cd server
npm run server
```

### Start the frontend

```bash
cd client
npm run dev
```

### Run both together from the server folder

```bash
cd server
npm run dev
```

This script uses `concurrently` to start the backend, cron worker, and frontend in one command.

---

## Available Scripts

### Client

```bash
cd client
npm run dev      # start Vite dev server
npm run build    # production build
npm run preview  # preview production build
npm run lint     # run ESLint checks
```

### Server

```bash
cd server
npm run server       # start Express server with nodemon
npm run message-cron # run background message worker
npm run client       # start frontend from server folder context
npm run dev          # run server, cron worker, and client concurrently
```

---

## API Overview

The API is served under `/api/v1` and includes endpoints for:

- Authentication
- Cookies and Categories
- Cart
- Orders and Payment
- Reviews
- Addresses
- Contact
- Newsletter
- Admin operations
- Real-time chat routes

Health check endpoint:

```bash
GET /api/health
```

---

## Order Flow

```text
Browse Cookies
   ↓
Add to Cart
   ↓
Add Address and Checkout
   ↓
Pay via Razorpay
   ↓
Place Order
   ↓
Admin Reviews and Updates Status
   ↓
Customer Receives Order
```

---

## Responsive Design

The application is designed to work smoothly across:

- Mobile devices
- Tablets
- Desktops
- Large screens

---

## Future Enhancements

Potential improvements for the project include:

- Coupon and discount system
- Wishlist functionality
- Better analytics dashboard
- Delivery tracking
- SMS notifications
- More admin reporting tools
- Product recommendations

---

## Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push the branch
5. Open a pull request

---

## License

This project is licensed under the MIT License.

---

## Author

Developed by Skand Sisodia.

---

## Support

If you like this project, give it a star on GitHub.
