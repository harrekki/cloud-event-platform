# Cloud Event Platform

A full stack event management platform built with React, Node.js, Express, PostgreSQL, and Docker.

---

## Features

- User registration and login
- JWT authentication
- Role-based admin access
- Event CRUD
- Event registration system
- My Events dashboard
- PostgreSQL database
- Dockerized local development

---

## Tech Stack

### Frontend

- React
- React Router
- Bootstrap
- Axios
- Vite

### Backend

- Node.js
- Express
- PostgreSQL
- JWT
- bcrypt

### Dev Tools

- Docker
- Git
- GitHub

---

## Local Setup

### Clone Repository

```bash
git clone "https://github.com/harrekki/cloud-event-platform.git"
cd cloud-event-platform
```

### Start PostgreSQL

```bash
docker compose up -d
```

### Start Backend

```bash
cd server
npm install
npm run dev
```

### Start Frontend

```bash
cd client
npm install
npm run dev
```

---

## Environment Variables

Create:

```text
server/.env
```

Add:

```env
PORT=5001
DB_USER=postgres
DB_HOST=localhost
DB_NAME=event_platform
DB_PASSWORD=postgres
DB_PORT=5432
JWT_SECRET=your_secret_here
```

---

## Demo Accounts

### Admin
Email: admin@example.com
Password: TestAdmin123

### User
Email: user@example.com
Password: TestUser123

---

## API Routes

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Events

- `GET /api/events`
- `GET /api/events/:id`
- `POST /api/events`
- `PUT /api/events/:id`
- `DELETE /api/events/:id`

### Registrations

- `POST /api/registrations`
- `GET /api/registrations/my`
- `GET /api/registrations/event/:eventId`
- `DELETE /api/registrations/:id`

---

## Roadmap

- AWS EC2 deployment
- AWS RDS
- AWS S3 uploads
- CloudFront CDN
- Auto scaling
- Stripe integration