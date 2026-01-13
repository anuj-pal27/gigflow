# GigFlow

Bubblegum neo‑brutal **freelance marketplace** with:
- **Secure auth** (JWT + HttpOnly cookies)
- **MongoDB + Mongoose**
- **Gigs + Bids + Hiring**
- **Race‑condition safe hiring**
- **Realtime notifications** via Socket.io (freelancer gets “You have been hired for …” instantly)

---

## Tech Stack

- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT, Socket.io
- **Frontend**: React (Vite), Axios, Socket.io-client, Tailwind

---

## Monorepo Structure

- `backend/` – Express API + MongoDB + Socket.io server
- `frontend/gigflow/` – React UI (bubblegum neo‑brutal)

---

## Prerequisites

- **Node.js**: 20+
- **MongoDB**: local MongoDB or MongoDB Atlas
  - **Recommended for transactions**: Replica set / Atlas cluster (required for true MongoDB transactions)

---

## Backend Setup

### 1) Install dependencies

```bash
cd backend
npm install
```

### 2) Create `backend/.env`

This repo includes an example env file at `backend/env.example`.

Create a `.env` file inside `backend/`:

```env
PORT=8080
MONGODB_URI=mongodb://localhost:27017/gigflow

JWT_SECRET=change-this-secret
JWT_EXPIRE=7d

CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### 3) Run the backend

```bash
cd backend
npm run dev
```

API will be available at `http://localhost:8080`.

---

## Frontend Setup

### 1) Install dependencies

```bash
cd frontend/gigflow
npm install
```

### 2) (Optional) Set API URL

By default the frontend calls `http://localhost:8080/api`.
If you want to override it, use `frontend/gigflow/env.example` as reference and create `frontend/gigflow/.env`:

```env
VITE_API_URL=http://localhost:8080/api
VITE_SOCKET_URL=http://localhost:8080
```

### 3) Run the frontend

```bash
cd frontend/gigflow
npm run dev
```

Open the Vite URL shown in the terminal (usually `http://localhost:5173`).

---

## Auth (HttpOnly Cookie)

- Login/Register sets a **HttpOnly cookie** named `token`
- Axios is configured with `withCredentials: true`
- Socket.io authenticates using the same cookie

---

## Core API Endpoints

### Auth

- **POST** `/api/auth/register`
- **POST** `/api/auth/login`
- **POST** `/api/auth/logout`
- **GET** `/api/auth/me`

### Gigs

- **GET** `/api/gigs`  
  - Fetch all open gigs  
  - Supports search by title: `?search=react`
- **POST** `/api/gigs` (private)  
  - Create a new job post `{ title, description, budget }`

### Bids

- **POST** `/api/bids` (private)  
  - Submit a bid `{ gigId, message, price }`
- **GET** `/api/bids/:gigId` (private, owner only)  
  - Get all bids for a specific gig

### Hiring (Race‑safe)

- **PATCH** `/api/bids/:bidId/hire` (private, owner only)
  - **Gig** `open → assigned`
  - Selected **Bid** `pending → hired`
  - Other bids for that gig `pending → rejected`
  - Emits Socket.io event `"hired"` to the freelancer

---

## Race‑Condition Safe Hiring (Bonus 1)

The hire endpoint uses:
- **MongoDB transaction** when supported (replica set / Atlas)
- **Safe fallback** when transactions aren’t available:
  - Uses a conditional “claim” update on the gig (`status: open → assigned`) so only one hire wins

If two users click **Hire** at the same time, **only one request succeeds**; the other gets a `409`.

---

## Realtime Notifications (Bonus 2)

When a client hires a freelancer, backend emits:

- Event: `"hired"`
- Payload: `{ gigId, gigTitle, bidId }`

Frontend listens on freelancer dashboard and shows an instant toast:
> “You have been hired for [Project Name]!”

---

## Common Issues

- **Cookies not working**:
  - Ensure backend `CLIENT_URL` matches your frontend origin
  - Ensure Axios uses `withCredentials: true`
- **Transactions failing**:
  - Local Mongo must be a **replica set** to support transactions, or use MongoDB Atlas

---

## License

MIT (or update as you prefer)


