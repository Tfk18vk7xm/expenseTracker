# Team Expense Tracker - Modern Full-Stack Web Application

A full-stack Team Expense Tracker application built with **React (Vite)** for the frontend, **Node.js with Express** for the backend REST API, and **PostgreSQL** running inside **Docker Compose**.

---

## 🌟 Features

- **Authentication**: JWT-based authentication with encrypted passwords via `bcryptjs`.
- **Financial Dashboard**: Real-time monthly spending summary cards (Total Spent, Current Month Spent, Top Category, Total Items).
- **Expense CRUD**: Create, read, edit, and delete expense items seamlessly.
- **Search & Filter**: Real-time title/notes search bar and category dropdown filter (Travel, Food, Utilities, Software, etc.).
- **Modern UI/UX**: Sleek dark modern design, toast notifications, loading state indicators, glassmorphism headers, and interactive action modals.
- **Zero Local PostgreSQL Installation**: PostgreSQL runs entirely inside Docker with automated database schema creation (`init.sql`).

---

## 🏗️ Project Architecture

```
[ React SPA (Vite) ]  <--- (HTTP REST API / JSON + Bearer JWT) --->  [ Node.js + Express ]
       │                                                                      │
  Port 5173                                                             Port 5000
                                                                              │
                                                                       [ pg Pool Client ]
                                                                              │
                                                                     [ PostgreSQL Docker ]
                                                                           Port 5432
```

### Folder Structure

```
expense-manager/
├── docker-compose.yml       # Docker Compose setup for PostgreSQL & Backend
├── README.md                # Comprehensive documentation & setup guide
│
├── backend/                 # Node.js + Express REST API
│   ├── config/              # Database pool setup (db.js)
│   ├── controllers/         # Express controllers (auth, expenses)
│   ├── middleware/          # JWT auth & centralized error middleware
│   ├── models/              # PostgreSQL SQL query helpers (users, expenses)
│   ├── routes/              # Express API routes (/api/auth, /api/expenses)
│   ├── services/            # Business logic & metrics aggregation
│   ├── utils/               # JWT token utils
│   ├── database/            # Automated init.sql database script
│   ├── app.js               # Express application configuration
│   ├── server.js            # Server entrypoint
│   ├── .env.example         # Backend environment variables template
│   └── package.json
│
└── frontend/                # React (Vite) Single Page Application
    ├── src/
    │   ├── components/      # Navbar, Toast, SummaryCards, ExpenseFilter, ExpenseList, ExpenseModal
    │   ├── context/         # AuthContext for session management
    │   ├── pages/           # LoginPage, RegisterPage, DashboardPage
    │   ├── services/        # Axios API client setup (api.js)
    │   ├── styles/          # Modern CSS tokens & responsive rules (index.css)
    │   ├── App.jsx          # Router & Protected route wrapper
    │   └── main.jsx         # React DOM entrypoint
    ├── index.html
    ├── .env.example         # Frontend environment variables template
    └── package.json
```

---

## 📋 Prerequisites

Before starting, ensure you have the following installed on your machine:
- **Node.js** (v18 or higher) & **npm**
- **Docker Desktop** (or Docker Engine with Docker Compose plugin)

*(Note: PostgreSQL does NOT need to be installed locally on your operating system).*

---

## ⚙️ Environment Configuration

Example environment configuration files are provided in both subdirectories:

### Backend (`backend/.env`)

Copy `backend/.env.example` to `backend/.env`:

```env
PORT=5000
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=expensetracker
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres123
JWT_SECRET=super_secret_jwt_key_expense_tracker_2026
CORS_ORIGIN=http://localhost:5173
```

### Frontend (`frontend/.env`)

Copy `frontend/.env.example` to `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🚀 Step-by-Step Local Setup Guide

Follow these commands to get the entire application running from a clean setup.

### Step 1: Start PostgreSQL via Docker Compose

Run from the root directory:

```bash
docker compose up -d postgres
```

> **Note**: This starts the container `expense_tracker_db` on port `5432` and automatically runs `backend/database/init.sql` to construct the database schema and indexes.

### Step 2: Install & Start Backend API

```bash
cd backend
npm install
npm run dev
```

The backend server will start at `http://localhost:5000`. You can test health status at `http://localhost:5000/api/health`.

### Step 3: Install & Start Frontend Application

In a new terminal window:

```bash
cd frontend
npm install
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.

---

## 🔌 API Endpoints Reference

### Auth Endpoints (`/api/auth`)

| Method | Endpoint | Description | Protected |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user (`name`, `email`, `password`) | No |
| `POST` | `/api/auth/login` | Authenticate user & get JWT token (`email`, `password`) | No |
| `GET` | `/api/auth/me` | Fetch authenticated user profile | **Yes (Bearer JWT)** |

### Expense Endpoints (`/api/expenses`)

| Method | Endpoint | Description | Protected |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/expenses` | List expenses (Optional query: `?category=Travel&search=flight`) | **Yes** |
| `GET` | `/api/expenses/summary` | Get monthly spending & category analytics | **Yes** |
| `POST` | `/api/expenses` | Create new expense item (`title`, `amount`, `category`, `date`, `notes`) | **Yes** |
| `PUT` | `/api/expenses/:id` | Update an existing expense item | **Yes** |
| `DELETE` | `/api/expenses/:id` | Delete an expense item by ID | **Yes** |

---

## 📦 Production Deployment Overview

To deploy this application to production:

1. **Database**: Provision a managed PostgreSQL instance (e.g. AWS RDS, Render Postgres, Supabase, DigitalOcean Managed Database) and set SSL connection parameters.
2. **Backend**:
   - Set environment variables (`NODE_ENV=production`, secure `JWT_SECRET`, database connection parameters).
   - Build container with `docker build -t expense-backend ./backend` or deploy to services like Render, Railway, or AWS ECS/App Runner.
3. **Frontend**:
   - Set `VITE_API_URL` to your production domain (e.g. `https://api.yourdomain.com/api`).
   - Run `npm run build` inside `frontend/` to build optimized static assets.
   - Host static dist assets on Vercel, Netlify, Cloudflare Pages, or AWS S3 + CloudFront.

---

## 🛠️ Code Verification & Quality Checklist

- [x] Complete separation of concerns between frontend and backend.
- [x] Zero hardcoded URLs or database credentials.
- [x] Full PostgreSQL table schema provided in `backend/database/init.sql`.
- [x] Docker Compose configured for data persistence volume and SQL auto-initialization.
- [x] JWT token verification middleware with bcrypt password hashing.
- [x] Responsive React dashboard with modern UI aesthetics, micro-interactions, toast feedback, and skeleton loaders.
