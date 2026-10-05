# MaanWin51 — Authentication API Documentation

**Brand:** MaanWin51  
**Production Domain:** `https://maanwin51.com/`  
**Authentication Standard:** Secure PHP Session with `HttpOnly`, `SameSite=Lax`, and `Secure` cookies.

---

## 1. Global Specifications

### Response Format
All API endpoints return standardized JSON payloads:

#### Success Response
```json
{
  "success": true,
  "message": "Operation completed successfully.",
  "...data": {}
}
```

#### Error Response
```json
{
  "success": false,
  "message": "Error description.",
  "errors": {
    "field_name": "Specific validation failure message."
  }
}
```

### Standard HTTP Status Codes
| Status Code | Meaning |
|---|---|
| `200 OK` | Request succeeded. |
| `201 Created` | New user registered and automatically authenticated. |
| `400 Bad Request` | Invalid parameters or expired token. |
| `401 Unauthorized` | Invalid credentials or unauthenticated session. |
| `403 Forbidden` | Account blocked or inactive. |
| `405 Method Not Allowed` | Incorrect HTTP method. |
| `409 Conflict` | Duplicate phone number or email address. |
| `422 Unprocessable Entity` | Validation error on form fields. |
| `429 Too Many Requests` | Rate limit / brute force protection triggered. |
| `500 Internal Server Error` | Server-side execution issue (internal details masked). |

---

## 2. API Endpoints

### 2.1 User Registration
* **Endpoint:** `POST /api/auth/register.php`
* **Access:** Public
* **Automatic Login:** Yes. Creates account in MySQL, hashes password via `password_hash()`, regenerates session ID, sets `$_SESSION['user_id']`, and returns authenticated user.

#### Request (Phone Method)
```json
{
  "method": "phone",
  "country_code": "+91",
  "phone": "9876543210",
  "password": "Password123!",
  "confirm_password": "Password123!",
  "consent": true,
  "invite_code": "MW8B1C2A3D"
}
```

#### Request (Email Method)
```json
{
  "method": "email",
  "email": "user@example.com",
  "password": "Password123!",
  "confirm_password": "Password123!",
  "consent": true,
  "invite_code": ""
}
```

#### Success Response (`HTTP 201 Created`)
```json
{
  "success": true,
  "message": "Account created successfully.",
  "authenticated": true,
  "user": {
    "id": 1,
    "name": "User 3210",
    "email": null,
    "phone": "9876543210",
    "country_code": "+91",
    "invite_code": "MW51A8D9F2",
    "referred_by": null,
    "status": "active",
    "created_at": "2026-10-05 13:54:20",
    "updated_at": "2026-10-05 13:54:20",
    "last_login_at": "2026-10-05 13:54:20"
  }
}
```

#### Error Responses
* `HTTP 409 Conflict`:
  ```json
  { "success": false, "message": "An account with this phone number already exists." }
  ```
* `HTTP 422 Unprocessable Entity`:
  ```json
  {
    "success": false,
    "message": "Please correct the highlighted errors.",
    "errors": {
      "password": "Password must be at least 8 characters long.",
      "consent": "You must agree to the Privacy Policy and Terms & Conditions."
    }
  }
  ```

---

### 2.2 User Login
* **Endpoint:** `POST /api/auth/login.php`
* **Access:** Public (Protected with IP & Identifier Rate Limiting)
* **Brute-Force Limit:** Max 5 failed attempts per 15 minutes before temporary lock.

#### Request (Phone Method)
```json
{
  "method": "phone",
  "country_code": "+91",
  "phone": "9876543210",
  "password": "Password123!",
  "remember": true
}
```

#### Request (Email Method)
```json
{
  "method": "email",
  "email": "user@example.com",
  "password": "Password123!",
  "remember": false
}
```

#### Success Response (`HTTP 200 OK`)
```json
{
  "success": true,
  "message": "Login successful.",
  "authenticated": true,
  "user": {
    "id": 1,
    "name": "User 3210",
    "email": null,
    "phone": "9876543210",
    "country_code": "+91",
    "invite_code": "MW51A8D9F2",
    "referred_by": null,
    "status": "active",
    "created_at": "2026-10-05 13:54:20",
    "updated_at": "2026-10-05 13:55:00",
    "last_login_at": "2026-10-05 13:55:00"
  }
}
```

#### Error Responses
* `HTTP 401 Unauthorized`:
  ```json
  { "success": false, "message": "Invalid credentials. Please verify your details and try again." }
  ```
* `HTTP 403 Forbidden` (Blocked Account):
  ```json
  { "success": false, "message": "Your account is currently unavailable. Please contact support." }
  ```
* `HTTP 429 Too Many Requests`:
  ```json
  { "success": false, "message": "Too many failed login attempts. Please wait 15 minutes before trying again." }
  ```

---

### 2.3 Current Authenticated User
* **Endpoint:** `GET /api/auth/me.php`
* **Access:** Requires Active Session Cookie (`MAANWIN51_SESS`)

#### Success Response (`HTTP 200 OK`)
```json
{
  "success": true,
  "authenticated": true,
  "user": {
    "id": 1,
    "name": "User 3210",
    "email": null,
    "phone": "9876543210",
    "country_code": "+91",
    "invite_code": "MW51A8D9F2",
    "referred_by": null,
    "status": "active",
    "created_at": "2026-10-05 13:54:20",
    "updated_at": "2026-10-05 13:55:00",
    "last_login_at": "2026-10-05 13:55:00"
  }
}
```

#### Unauthenticated Response (`HTTP 401 Unauthorized`)
```json
{
  "success": false,
  "authenticated": false,
  "message": "Authentication required. Please log in."
}
```

---

### 2.4 Logout
* **Endpoint:** `POST /api/auth/logout.php`
* **Access:** Authenticated or Public
* **Action:** Clears `$_SESSION`, destroys PHP session, and expires `MAANWIN51_SESS` cookie.

#### Success Response (`HTTP 200 OK`)
```json
{
  "success": true,
  "authenticated": false,
  "message": "Logged out successfully."
}
```

---

### 2.5 Request Password Reset
* **Endpoint:** `POST /api/auth/forgot-password.php`
* **Access:** Public
* **Security:** Uniform response to prevent user enumeration. Generates a 64-character SHA-256 token hash stored in `password_resets` with 60-minute expiration.

#### Request
```json
{
  "method": "phone",
  "country_code": "+91",
  "phone": "9876543210"
}
```

#### Success Response (`HTTP 200 OK`)
```json
{
  "success": true,
  "message": "If an account exists with those details, password reset instructions have been sent."
}
```

---

### 2.6 Execute Password Reset
* **Endpoint:** `POST /api/auth/reset-password.php`
* **Access:** Public

#### Request
```json
{
  "token": "d2f1b4a689e4726c510884967396734289472398471209348120934812093481",
  "password": "NewSecurePassword123!",
  "confirm_password": "NewSecurePassword123!"
}
```

#### Success Response (`HTTP 200 OK`)
```json
{
  "success": true,
  "message": "Password has been successfully updated. You can now log in with your new password."
}
```
