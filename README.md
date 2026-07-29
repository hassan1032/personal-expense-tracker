# Personal Expense Tracker (MERN Stack)

A clean, production-ready full-stack Personal Expense Tracker application built using the MERN Stack (MongoDB, Express, React, Node.js). 

This project is structured cleanly with modular ES Modules (`type: module`) backend architecture and a premium single-page dashboard on the frontend.

---

## 🌐 Live Deployment Links
- **Live Frontend Dashboard (Render):** https://expense-tracker-0gvo.onrender.com
- **Live Backend API Gateway (Render):** https://expense-tracker-backend-nvmg.onrender.com

---

## 🚀 Key Features
- **Total Spent Dashboard:** Prominent card showing the total expenses sum dynamically calculated and formatted in Indian Rupees (₹).
- **Add Expense Form:** Intuitive controlled form validation for Amount, Description, Category, and Date.
- **Dynamic Recent Expenses List:** Structured table presenting recent entries with distinct, color-coded tag pills for categories.
- **View Details Modal:** Seamless overlay modal popup to inspect full expense details, timestamps, and metadata.
- **Edit / Update Inline:** Quick-action update option that populates form fields and handles backend inline edits.
- **Delete Sweep Transition:** Elegant CSS keyframe animation that translates, slides out, and collapses rows on removal.
- **Decoupled Request Validation:** Server-side request validation using `express-validator` to guarantee strict schema rules.
- **Ambient UI Motion:** Floating background neon gradient orbs and slide-up fade animations for premium visual feedback.

---

## 🛠️ Project Structure
```bash
Personal_Expance_Tracker1/
├── backend/
│   ├── config/db.js           # Database connector (with auto local-loopback fallback)
│   ├── controllers/           # Clean controllers (no manual request parsing)
│   ├── models/Expense.js      # Simplified schema definitions
│   ├── routes/                # Route mounts piped through validation middleware
│   ├── validators/            # Request schemas and middleware using express-validator
│   ├── .env                   # Configuration file (Cloud Atlas connection string ready)
│   └── server.js              # Server entry point (CORS and routes mounting)
│
└── frontend/
    ├── src/
    │   ├── services/api.js    # Decoupled API service connecting local/live URL
    │   ├── App.jsx            # Core dashboard view controller
    │   ├── index.css          # Styling tokens, custom layouts, and keyframe animations
    │   └── main.jsx
    └── vite.config.js         # Proxy configuration mapping /api to local port 5000
```

---

## 💻 Local Quick Start

### Prerequisites
- Node.js (v18+)
- MongoDB running locally (default) or MongoDB Atlas Account

### Setup Backend
1. Go into the backend directory:
   ```bash
   cd backend
   ```
2. Configuration: Update `.env` with your MongoDB connection string (currently pre-configured with Cloud MongoDB Atlas):
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   NODE_ENV=development
   ```
3. Start the server:
   ```bash
   npm run dev
   ```
   *(Running on http://localhost:5000)*

### Setup Frontend
1. Go into the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Start the Vite React development server:
   ```bash
   npm run dev
   ```
   *(Running on http://localhost:3000)*

---

## 🧪 API Endpoints

- `GET /api/expenses` -> Fetches all expenses sorted by date (newest first).
- `POST /api/expenses` -> Saves a new expense. Expects `{ amount, description, category, date }`.
- `PUT /api/expenses/:id` -> Updates an existing expense.
- `DELETE /api/expenses/:id` -> Deletes expense by database ID.
