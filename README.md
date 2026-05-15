<div align="center">

# 💰 Finance Tracker Application

### *Your Personal Finance Manager — Secure, Smart & Simple*

![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.5.0-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![Java](https://img.shields.io/badge/Java-17-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Gradle](https://img.shields.io/badge/Gradle-02303A?style=for-the-badge&logo=gradle&logoColor=white)
![Build](https://img.shields.io/badge/Build-Passing-success?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Actively_Developing-2ea44f?style=for-the-badge)

> A full-stack Finance Tracker application built using **Spring Boot**, **React**, **MySQL**, and **JWT Authentication**.
> Helping users securely manage daily financial transactions with role-based access and smart admin controls.

</div>

---

## 📌 Table of Contents
- [✨ Features](#-features)
- [🛡️ Security](#-security-features)
- [🛠️ Tech Stack](#-technologies-used)
- [🔄 Auth Flow](#-authentication-flow)
- [🔁 Deactivation Flow](#-user-deactivation-flow)
- [🗄️ Database](#-database-tables)
- [🌐 API Endpoints](#-api-endpoints)
- [🚀 Getting Started](#-getting-started)
- [🔮 Future Plans](#-future-improvements)

---

## ✨ Features

### 👤 User Features
| Feature | Description |
|---------|-------------|
| 📝 Registration & Login | Secure signup and login with JWT |
| 🔐 JWT Auth | Token-based stateless authentication |
| 💵 Add Transactions | Log income and expense transactions |
| 📊 View Transactions | See only your own personal transactions |
| 🛡️ Secure Data Access | Users can never access other users data |
| 📩 Activation Requests | Send reactivation message to admin |
| 🚪 Logout | Secure session termination |

### 👨‍💼 Admin Features
| Feature | Description |
|---------|-------------|
| 📋 Admin Dashboard | Full control panel for managing users |
| 👥 User Management | View, update, activate, deactivate users |
| 🔔 Notification Bell | See pending user activation request count |
| 📬 Request Management | View, activate, or ignore user requests |
| 🗂️ Category Management | Add, update, delete transaction categories |
| 🔒 Role-Based Access | Strict separation of user and admin routes |

---

## 🛡️ Security Features

| Security | Detail |
|----------|--------|
| 🔐 Spring Security | Full security integration |
| 🎫 JWT Token Auth | Stateless token-based authentication |
| ⚡ No Sessions | Pure token auth, no server sessions |
| 🚫 Protected APIs | All routes protected with role guards |
| 👮 Role Separation | ROLE_USER and ROLE_ADMIN strictly separated |
| 🧯 Exception Handler | Global @RestControllerAdvice |
| ✔️ Input Validation | @Valid, @NotBlank, @Email, @Size |
| 🔑 BCrypt | All passwords BCrypt encoded |
| 🌐 CORS | Configured for frontend origin |

---

## 🛠️ Technologies Used

### ⚙️ Backend
| Technology | Version |
|------------|---------|
| ☕ Java | 17 |
| 🌱 Spring Boot | 3.5.0 |
| 🔐 Spring Security | Latest |
| 🎫 JJWT | 0.12.6 |
| 🗄️ Spring Data JPA | Latest |
| 🐬 MySQL | 8.x |
| 📦 Gradle | 9.4.1 |

### 🎨 Frontend
| Technology | Usage |
|------------|-------|
| ⚛️ React.js | UI Framework |
| 🌐 Axios | HTTP Client |
| 🧭 React Router | Navigation |
| 💾 LocalStorage | JWT Token Storage |

---

## 🔄 Authentication Flow

```
1️⃣  User sends POST /users/login with email & password
        ↓
2️⃣  Backend validates credentials via AuthenticationManager
        ↓
3️⃣  JWT Token generated (userId + email + role, 24h expiry)
        ↓
4️⃣  Frontend stores token in localStorage
        ↓
5️⃣  Every API request sends → Authorization: Bearer <token>
        ↓
6️⃣  JwtAuthenticationFilter validates token on each request
        ↓
7️⃣  userId extracted from token — no URL path variable needed
```

---

## 🔁 User Deactivation Flow

```
👮 Admin deactivates user (active = false)
        ↓
🔓 User can still login (login never blocked)
        ↓
⚠️  Login response returns active: false
        ↓
💬 Frontend shows warning banner to user
        ↓
📩 User sends reactivation request message
        ↓
🔔 Admin sees notification count increase
        ↓
📋 Admin opens requests page
        ↓
✅ Admin activates OR ❌ ignores the request
```

---

## 🗄️ Database Tables

| Table | Description |
|-------|-------------|
| `Qtx-user` | Stores user accounts with roles and active status |
| `User-Transaction` | Stores all income and expense transactions |
| `category` | Stores transaction categories with icons |
| `activation_requests` | Stores user reactivation requests with status |

---

## 🌐 API Endpoints

### 🔓 Public Endpoints
| Method | URL | Description |
|--------|-----|-------------|
| POST | `/users/register` | Register new user |
| POST | `/users/login` | Login and get JWT token |
| POST | `/users/logout` | Logout |
| GET | `/categories` | Get all categories |

### 👤 User Endpoints (ROLE_USER)
| Method | URL | Description |
|--------|-----|-------------|
| GET | `/users/me` | Get current logged in user |
| POST | `/user/transactions` | Add new transaction |
| GET | `/user/transactions` | Get own transactions only |
| POST | `/requests/send` | Send activation request to admin |

### 👨‍💼 Admin Endpoints (ROLE_ADMIN)
| Method | URL | Description |
|--------|-----|-------------|
| GET | `/admin/users` | Get all users |
| GET | `/admin/users/active-count` | Get active user count |
| PUT | `/admin/users/{id}` | Update user details |
| DELETE | `/admin/users/{id}` | Delete user permanently |
| PUT | `/admin/users/{id}/status?active=` | Activate or deactivate user |
| POST | `/admin/categories` | Add new category |
| PUT | `/admin/categories/{id}` | Update category |
| DELETE | `/admin/categories/{id}` | Delete category |
| GET | `/requests/count` | Get pending request count |
| GET | `/requests/all` | Get all activation requests |
| PUT | `/requests/{id}/activate` | Activate user from request |
| PUT | `/requests/{id}/ignore` | Ignore activation request |

---

## 🚀 Getting Started

### Prerequisites
- Java 17
- MySQL 8.x
- Node.js
- Gradle

### Backend Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/finance-tracker.git

# Navigate to backend
cd financeTracker

# Configure database in application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/QtxPractice
spring.datasource.username=root
spring.datasource.password=root

# Run the application
gradlew.bat bootRun
```

### Frontend Setup
```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start the app
npm run dev
```

### Default Ports
| Service | Port |
|---------|------|
| Backend | 8080 |
| Frontend | 5173 |
| MySQL | 3306 |

---

## 🔮 Future Improvements

| Feature | Status |
|---------|--------|
| 📄 Pagination for transactions and users | 🔜 Planned |
| 🔄 Refresh Token Support | 🔜 Planned |
| ✏️ Transaction Update and Delete | 🔜 Planned |
| 🗑️ Soft Delete for users | 🔜 Planned |
| 📈 Dashboard Analytics | 🔜 Planned |
| 🚫 JWT Token Blacklisting on logout | 🔜 Planned |
| 📧 Email Notifications | 🔜 Planned |

---

## 🐛 Bugs Fixed

| Bug | Fix |
|-----|-----|
| `/users/register-admin` was unprotected | Secured to ROLE_ADMIN only |
| `RegisterRequest` had wrong `@Service` annotation | Removed, added validation |
| Login returned plain string response | Replaced with proper JSON LoginResponse |
| No input validation on register | Added `@Valid`, `@NotBlank`, `@Email`, `@Size` |
| No global exception handler | Added `GlobalExceptionHandler` |
| Any user could read others transactions | userId now extracted from JWT token |
| Session-based stateful auth | Replaced with stateless JWT |

---

<div align="center">

## 🙌 Developed With Passion

![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

### ⭐ If you found this project helpful, give it a star!

</div>
