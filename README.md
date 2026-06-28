# Midnight Cookies 🍪

Freshly baked cookies delivered to your doorstep.

---

## 📌 Project Overview

**Midnight Cookies** is a full-stack cookie ordering web application where users can browse different types of cookies, add products to cart, and place orders online.

The platform includes:

- Customer-facing cookie store
- Shopping cart & checkout system
- User authentication
- Order management
- Admin dashboard for managing products and orders

This project is built using **React**, **Node.js**, **Express.js**, and **MongoDB**.

---

# 🚀 Features

## 👤 User Features

- Browse all cookies
- View cookie details
- Add/remove items from cart
- Place orders
- User authentication
- View order history
- Responsive design for mobile and desktop

## 🛠️ Admin Features

- Admin login
- Add/Edit/Delete cookies
- Manage customer orders
- Update order status
- Manage inventory

---

# 🧑‍💻 Tech Stack

## Frontend

- React
- React Router
- Material UI / Tailwind CSS
- Axios

## Backend

- Node.js
- Express.js

## Database

- MongoDB
- Mongoose

## Authentication

- JWT Authentication

## Deployment

- Frontend: Vercel
- Backend: Render / Railway
- Database: MongoDB Atlas

---

# 📂 Project Structure

```bash
Midnight-Cookies/
│
├── client/                 # React Frontend
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/                 # Node.js Backend
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── package.json
│
└── README.md
```

---

# 🗃️ Database Collections

## Cookies

Stores all cookie product information.

```js
{
  (name, description, price, images, category, stock, ingredients, ratings);
}
```

## Users

```js
{
  (name, email, password, phone, role);
}
```

## Orders

```js
{
  (userId, items, totalAmount, paymentStatus, orderStatus, shippingAddress);
}
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/midnight-cookies.git
```

---

## 2️⃣ Install Frontend Dependencies

```bash
cd client
npm install
```

---

## 3️⃣ Install Backend Dependencies

```bash
cd ../server
npm install
```

---

# 🔐 Environment Variables

Create a `.env` file inside the `server` folder.

```env
PORT = 3000
MONGO_URI = your_mongodb_connection_string
ACCESS_TOKEN_SECRET = your_access_token_secret
ACCESS_TOKEN_EXPIRY = 15m
REFRESH_TOKEN_SECRET = your_refresh_token_secret
REFRESH_TOKEN_EXPIRY = 7d
EMAIL_USER = sender_email
EMAIL_PASS = app_password
CLIENT_URL = client_uri
NODE_ENV = develop
```

Create a `.env` file inside the `client` folder.

```env
VITE_API_URL=your_api_endpoint
```

---

# ▶️ Run Project

## Run Backend

```bash
cd server
npm run dev
```

## Run Frontend

```bash
cd client
npm start
```

---

# 📦 API Modules

- Authentication APIs
- Product APIs
- Cart APIs
- Order APIs
- Admin APIs

---

# 🛒 Order Flow

```text
Browse Cookies
   ↓
Add to Cart
   ↓
Checkout
   ↓
Place Order
   ↓
Admin Receives Order
   ↓
Order Delivered
```

---

# 📱 Responsive Design

The application is fully responsive and optimized for:

- Mobile Devices
- Tablets
- Desktop Screens

---

# 🔮 Future Enhancements

- Online Payments (Razorpay/Stripe)
- Coupon System
- Wishlist Feature
- Email Notifications
- SMS Notifications
- Delivery Tracking
- Reviews & Ratings
- Subscription Cookie Boxes

---

# 📸 Screenshots

Add your project screenshots here.

Example:

```md
![Home Page](./screenshots/home.png)
```

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a new branch
3. Commit changes
4. Push to branch
5. Create Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

# 💡 Author

Developed by Skand Sisodia.

---

# ⭐ Support

If you like this project, give it a ⭐ on GitHub.
