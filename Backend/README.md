# School Management Backend

Django REST Framework backend for the Student Management module.

## Features

- JWT login, logout, refresh, and token validation
- User registration with automatic JWT token issue
- Student CRUD APIs with pagination, search, and ordering
- SQLite local development and PostgreSQL configuration through environment variables
- Swagger and ReDoc API documentation
- CORS support for the Vite frontend
- Model, serializer, and API tests

## Tech Stack

Python 3.12+, Django 5, Django REST Framework, SimpleJWT, PostgreSQL, drf-yasg, django-cors-headers, python-dotenv.

## Installation

```bash
cd Backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

## Environment Variables

See `.env.example`.

```env
SECRET_KEY=change-me-in-production
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
DB_ENGINE=sqlite
SQLITE_NAME=db.sqlite3
```

For PostgreSQL, set:

```env
DB_ENGINE=postgresql
DB_NAME=school_management
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432
```

## API Documentation

- Swagger: `http://localhost:8000/swagger/`
- ReDoc: `http://localhost:8000/redoc/`

## API Endpoints

- `POST /api/login`
- `POST /api/register`
- `POST /api/logout`
- `POST /api/token/refresh`
- `GET /api/token/validate`
- `GET /api/students?search=john&ordering=first_name&page=1`
- `POST /api/students`
- `GET /api/students/{id}`
- `PUT /api/students/{id}`
- `DELETE /api/students/{id}`

## Testing

```bash
python manage.py test
```

## Deployment

This folder includes `render.yaml` and `Procfile` for Render. Set production environment variables in Render, provision PostgreSQL, set `DEBUG=False`, update `ALLOWED_HOSTS`, and set `CORS_ALLOWED_ORIGINS` to the deployed frontend URL.

## Folder Structure

```text
Backend/
  manage.py
  requirements.txt
  school_management/
  students/
  static/
```
