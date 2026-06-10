# School Management Frontend

React frontend for the Student Management module.

## Features

- JWT login and registration with persisted auth state
- Protected dashboard and student routes
- Student search, sorting, pagination, create, edit, and delete
- React Hook Form validation and API validation display
- Toast notifications, responsive sidebar, and admin dashboard UI
- Axios interceptors for bearer tokens and refresh-token retry

## Tech Stack

React 19, Vite, React Router, Axios, React Hook Form, Tailwind CSS, React Toastify, Hero Icons, Vitest, Testing Library.

## Installation

```bash
cd Frontend
npm install
copy .env.example .env
npm run dev
```

The app runs at `http://localhost:5173`.

## Environment Variables

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

## Running Frontend

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Testing

```bash
npm test
```

## API Communication

All API calls use `src/services/api.js`, which reads `VITE_API_BASE_URL`, attaches JWT access tokens, refreshes expired access tokens, and redirects to `/login` when authentication cannot be recovered.

## Deployment

Deploy this folder to Vercel. Set `VITE_API_BASE_URL` to the deployed Render backend API URL, for example:

```env
VITE_API_BASE_URL=https://school-management-backend.onrender.com/api
```

`vercel.json` rewrites all routes to `index.html` so React Router works on refresh.

## Folder Structure

```text
Frontend/
  public/
  src/
    components/
    context/
    hooks/
    pages/
    routes/
    services/
    utils/
```
