# 🛍️ Ramitra — Full-Stack Fashion E-Commerce Platform

<p align="center">
  <strong>Modern fashion. Timeless style.</strong>
</p>

<p align="center">
  A complete full-stack fashion e-commerce platform built with React, Node.js, Express, MongoDB and modern web technologies.
</p>

---

## 🌐 Live Demo

### 🛒 Customer Website
🔗 https://ramitra-shopping.onrender.com

### 🔐 Admin Dashboard
🔗 https://ramitra-shopping-admin.onrender.com

### ⚙️ Backend API
🔗 https://ramitra-shopping-backend.onrender.com



---

## 📌 About The Project

**Ramitra** is a modern full-stack fashion e-commerce platform designed to provide a smooth online shopping experience for customers while providing administrators with a dedicated dashboard for managing products and orders.

The project consists of three separate applications:

- 🛒 **Frontend** — Customer-facing shopping website
- 🔐 **Admin** — Product and order management dashboard
- ⚙️ **Backend** — REST API, authentication, database and payment services

The platform supports product browsing, category filtering, product details, cart management, authentication, order placement, payment integration and administrative product/order management.

---

## ✨ Features

### 🛒 Customer Features

- Modern responsive fashion storefront
- Product collection browsing
- Men, Women and Kids categories
- Topwear, Bottomwear and Winterwear filtering
- Product search
- Product sorting by price
- Product detail pages
- Product image gallery
- Product size selection
- Shopping cart
- Quantity management
- User authentication
- User profile
- Order placement
- Order history
- Responsive design for mobile, tablet and desktop
- Toast notifications
- Secure API communication

---

### 🔐 Admin Dashboard

- Secure admin authentication
- Admin dashboard
- Add products
- Upload multiple product images
- Product descriptions
- Product pricing
- Category and subcategory management
- Product size management
- Bestseller product management
- Product listing
- Product deletion
- Order management
- Order status updates
- Responsive admin interface

---

### ⚙️ Backend Features

- RESTful API
- Express.js server
- MongoDB database
- Mongoose ODM
- JWT authentication
- Password hashing with bcrypt
- Product management APIs
- User authentication APIs
- Cart APIs
- Order APIs
- Payment integration
- Cloudinary image management
- CORS configuration
- Environment variable configuration
- Production deployment with Render

---

## 🏗️ Project Architecture

```text
Ramitra-Shopping/
│
├── frontend/                 # Customer-facing React application
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── vercel.json
│
├── admin/                    # Admin dashboard
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── vercel.json
│
├── backend/                  # Node.js / Express API
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md
