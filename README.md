# Buyno

**Buyno** is a modern full-stack multivendor e-commerce web application with real-time features, robust admin control, and smooth user/seller experiences.

## Technologies Used

- **Frontend:** React JS, Tailwind CSS, Redux Toolkit, React Router DOM, Framer Motion
- **Backend:** Node JS, Express JS, MongoDB
- **Authentication & Security:** JWT (JSON Web Token)
- **Payments:** Stripe, PayPal, Cash on Delivery
- **Media Storage:** Cloudinary
- **Real-time Communication:** Socket.io
- **Email Service:** NodeMailer
- **Deployment:** Vercel (Frontend), Render/VPS (Backend)

---

## Features

### 🛒 User Features

- **Account Management**: Signup/login with profile image upload, update profile & avatar.
- **Browsing**: Home with featured, best-selling products, and time-based events.
- **Cart & Wishlist**: Add/remove products.
- **Checkout**: COD, Stripe, and PayPal payments.
- **Order Tracking**: Real-time status updates, refunds, order history.
- **Reviews**: Add reviews only after purchasing a product.
- **Messaging**: Real-time chat with sellers (text/image).

### 🧑‍💼 Seller Features

- **Onboarding**: Complete info-based signup/login.
- **Product/Event Management**: Add/edit/delete products and events with image uploads.
- **Dashboard**: See stats, latest orders, earnings, and product info.
- **Chat**: Real-time messaging with users.
- **Withdrawals**: Setup withdraw methods and request earnings.
- **Order Management**: View and update order status.

### 🛠️ Admin Features

- **Dashboard**: See overall stats, recent orders, earnings.
- **Management**: Manage all sellers, users, products, orders.
- **Withdrawals**: Approve/reject seller withdrawal requests.
- **Admin Chat**: Chat with any user/seller.

---

## Getting Started

### Prerequisites

- Node.js and npm installed
- VS Code or any other code editor
- Git (optional, for cloning the repository)

### File Structures

```plaintext
client/
├── public/
│   └── index.html                     # Main HTML entry point
├── src/
│   ├── assets/                        # Images
│   ├── static/                        # Constants, static resources
│   ├── redux/                         # Redux Toolkit slices & store
│   ├── routes/                        # Route definitions
│   ├── pages/                         # Application pages (user, seller, admin)
│   ├── components/                    # Reusable UI components
│   ├── App.js                         # Main app with routes
│   └── index.js                       # React root entry


api/
├── controllers/                       # Core backend logic (auth, products, orders, etc.)
├── models/                            # Mongoose schemas
├── routes/                            # Express routes
├── db/                                # MongoDB connection
├── middleware/                        # Custom middleware (auth, validation, etc.)
├── utils/                             # Utility functions & error handlers
├── .env                               # Environment variables
└── index.js                           # Entry point for the server


socket/
├── index.js                           # Socket.io server
├── package.json
└── .env
```

### 1. Clone the Repository

```bash
git clone https://github.com/ahadalireach/buyno.git
cd buyno
```

`Unzip the File`

---

2. **Open with VS Code**

   Open the project directory with VS Code or your preferred code editor.

---

3. **Install Dependencies**

```
cd api
npm install
cp .env.example .env # or manually create the .env file
npm run dev
```

---

### 3. Setup & Run Frontend

```bash
cd client
npm install
cp .env.example .env # or manually create the .env file
npm start
```

---

### 4. Setup & Run Socket Server

```bash
cd socket
npm install
cp .env.example .env # or manually create the .env file
node index.js
```

---

## Live Demo (Optional)

- 🌐 Website: [buyno.vercel.app](https://buyno.vercel.app)
- 📹 Live Demo Video: Coming Soon
- ⭐ GitHub: [github.com/ahadalireach/buyno](https://github.com/ahadalireach/buyno)

---

## Contact

For any questions, feedback, or collaboration opportunities, reach out at [ahadali.reach@gmail.com](mailto:ahadali.reach@gmail.com)

---

> Built with 💻, ☕, and ❤️ by Ahad Ali
