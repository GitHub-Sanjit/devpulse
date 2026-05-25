# 🚀 DevPulse – Internal Issue & Feature Tracker

🔗 **Live API:** https://devpulse-tp7y.onrender.com

DevPulse is a collaborative backend system designed for software teams to report bugs, suggest features, and manage issue workflows efficiently. It supports role-based access control and secure JWT authentication.

---

## ✨ Features

- 🔐 JWT-based Authentication & Authorization
- 👥 Role-based access (Contributor & Maintainer)
- 🐞 Create, update, and manage issues (bugs & feature requests)
- 📊 Filter and sort issues (status, type, newest, oldest)
- 🔒 Secure password hashing using bcrypt
- ⚡ Raw SQL with PostgreSQL (no ORM, no JOINs)
- 🧱 Modular architecture with Express & TypeScript
- 🚨 Centralized error handling

---

## 🛠️ Tech Stack

- **Runtime:** Node.js (v24+)
- **Language:** TypeScript
- **Framework:** Express.js
- **Database:** PostgreSQL
- **Database Driver:** pg
- **Authentication:** jsonwebtoken (JWT)
- **Password Hashing:** bcrypt
- **Other Tools:** CORS, Cookie Parser, HTTP Status Codes

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/devpulse.git
cd devpulse
````

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment variables

Create a `.env` file in the root:

```env
PORT=5000
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_secret_key
```

### 4. Run the server

```bash
npm run dev
```

Server will run at:

```
http://localhost:5000
```

---

## 📡 API Endpoints

### 🔹 Auth Routes

#### Register User

```
POST /api/auth/signup
```

#### Login User

```
POST /api/auth/login
```

---

### 🔹 Issue Routes

#### Create Issue (Auth Required)

```
POST /api/issues
```

#### Get All Issues

```
GET /api/issues
```

Query Params:

* `sort=newest | oldest`
* `type=bug | feature_request`
* `status=open | in_progress | resolved`

#### Get Single Issue

```
GET /api/issues/:id
```

#### Update Issue (Auth Required)

```
PATCH /api/issues/:id
```

#### Delete Issue (Maintainer Only)

```
DELETE /api/issues/:id
```

---

## 🗄️ Database Schema Summary

### 🧑 Users Table

| Field      | Description                |
| ---------- | -------------------------- |
| id         | Auto-increment primary key |
| name       | User's full name           |
| email      | Unique email               |
| password   | Hashed password            |
| role       | contributor / maintainer   |
| created_at | Timestamp                  |
| updated_at | Timestamp                  |

---

### 🐞 Issues Table

| Field       | Description                         |
| ----------- | ----------------------------------- |
| id          | Auto-increment primary key          |
| title       | Issue title (max 150 chars)         |
| description | Detailed description (min 20 chars) |
| type        | bug / feature_request               |
| status      | open / in_progress / resolved       |
| reporter_id | ID of the creator                   |
| created_at  | Timestamp                           |
| updated_at  | Timestamp                           |

---

## 🔐 Authentication Flow

1. User logs in with email & password
2. Server validates credentials
3. JWT token is generated
4. Client sends token in headers:

```
Authorization: <JWT_TOKEN>
```

5. Server verifies token before protected routes

---

## 🚨 Error Handling

Standard Error Response:

```json
{
  "success": false,
  "message": "Error description",
  "errors": "Detailed error info"
}
```

---

## ✅ Success Response Format

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

---

## 📌 Notes

* No ORM or query builder used (strictly raw SQL)
* No SQL JOINs used (handled via multiple queries)
* Passwords are never exposed
* Role-based authorization enforced on sensitive routes

---

## 👨‍💻 Author

**Sanjit Sarkar**

---

