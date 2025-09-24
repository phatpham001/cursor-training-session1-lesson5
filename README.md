# Mini Blog

Full‑stack demo: Node.js + Express + TypeScript + MongoDB + Vue 3 + Vite + Tailwind.

## 1) Requirements
- Node.js 18+
- MongoDB (local or Atlas connection string)

## 2) Backend (API)
1. Create `backend/.env` (example):
```
PORT=4000
MONGO_URI=mongodb://127.0.0.1:27017/blog_dev
JWT_SECRET=your_secret
JWT_EXPIRES_IN=7d
```
2. Install & run:
```
cd backend
npm install
npm run dev
```
3. Seed demo data (optional):
```
npm run seed
```
- Demo account: `demo@example.com` / `password123`
- API base: `http://localhost:4000/api`

## 3) Frontend (Web)
1. Create `frontend/.env`:
```
VITE_API_URL=http://localhost:4000/api
```
2. Install & run:
```
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173`.

## 4) Deploy (Render + Vercel)
- Render (backend):
  - Uses `render.yaml`.
  - Push repo to GitHub, then in Render click New > Blueprint, select repo.
  - Set env vars: `MONGO_URI`, `JWT_SECRET` (and optionally `JWT_EXPIRES_IN`).
- Vercel (frontend):
  - In Vercel, import the repo and select `frontend` as root.
  - Build command: `npm run build`, Output: `dist` (already in `vercel.json`).
  - Set env var `VITE_API_URL` to your Render API URL, e.g. `https://<service>.onrender.com/api`.

## Notes
- Token is stored in `localStorage` by Pinia store.
- This is a basic demo; do not use the demo JWT secret in production.
