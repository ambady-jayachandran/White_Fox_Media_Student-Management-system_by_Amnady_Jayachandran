# White Fox Media Student Management System

A full-stack student management application with a Django REST Framework backend and a React/Vite frontend.

## Features

- Admin authentication with JWT
- Student CRUD operations
- Student search, pagination, sorting, status filter, and gender filter
- Active/inactive student status management
- PostgreSQL support for production
- SQLite support for local development
- Render backend deployment
- Vercel frontend deployment
- Demo seed command for admin credentials and 10 student records

## Tech Stack

**Backend:** Python, Django, Django REST Framework, SimpleJWT, PostgreSQL, Gunicorn, WhiteNoise

**Frontend:** React, Vite, Tailwind CSS, Axios, React Router

## Project Structure

```text
student/
  Backend/
    manage.py
    requirements.txt
    school_management/
    students/
  Frontend/
    package.json
    src/
```

## Local Backend Setup

```bash
cd Backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
python manage.py migrate
python manage.py seed_demo_data
python manage.py runserver
```

Backend local API:

```text
http://127.0.0.1:8000/api
```

## Local Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

Frontend local URL:

```text
http://localhost:5173
```

Create `Frontend/.env` for local development:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

## Demo Login

After running the seed command:

```text
Username: Admin
Password: Admin123
```

Seed command:

```bash
python manage.py seed_demo_data
```

It creates or updates the admin user and 10 demo student records. It is safe to run multiple times.

## Backend Environment Variables

Local SQLite example:

```env
SECRET_KEY=change-me-in-production
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173

DB_ENGINE=sqlite
SQLITE_NAME=db.sqlite3

ACCESS_TOKEN_LIFETIME_MINUTES=60
REFRESH_TOKEN_LIFETIME_DAYS=7
```

Render PostgreSQL example:

```env
SECRET_KEY=your-long-random-secret-key
DEBUG=False
ALLOWED_HOSTS=white-fox-media-student-management.onrender.com
CORS_ALLOWED_ORIGINS=https://white-fox-media-student-management.vercel.app

DB_ENGINE=postgresql
DB_NAME=white_fox
DB_USER=white_fox_user
DB_PASSWORD=your-render-db-password
DB_HOST=dpg-d8kr1au7r5hc739aog2g-a
DB_PORT=5432
```

## Render Backend Deployment

Set the Render service root directory to:

```text
Backend
```

Build command:

```bash
pip install -r requirements.txt && python manage.py collectstatic --noinput
```

Start command for Render free tier:

```bash
python manage.py migrate && python manage.py seed_demo_data && gunicorn school_management.wsgi:application --bind 0.0.0.0:$PORT
```

Backend production API:

```text
https://white-fox-media-student-management.onrender.com/api
```

## Vercel Frontend Deployment

Set this environment variable in Vercel:

```env
VITE_API_BASE_URL=https://white-fox-media-student-management.onrender.com/api
```

After changing Vercel environment variables, redeploy the frontend.

## Useful Backend Commands

```bash
python manage.py migrate
python manage.py seed_demo_data
python manage.py test
python manage.py runserver
```

## API Routes

```text
POST /api/login
POST /api/register
POST /api/logout
POST /api/token/refresh
GET  /api/token/validate
GET  /api/students
POST /api/students
GET  /api/students/{id}
PUT  /api/students/{id}
PATCH /api/students/{id}
DELETE /api/students/{id}
```

## Notes

- Do not use `127.0.0.1` in Vercel production env.
- Use Render's internal PostgreSQL host for the Render backend service.
- Keep real `.env` files and database passwords out of Git.
- If Render logs show `Unknown command: seed_demo_data`, deploy the latest backend commit first.
