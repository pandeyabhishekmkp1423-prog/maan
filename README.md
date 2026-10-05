# MaanWin51 — Production Authentication System

[![Brand](https://img.shields.io/badge/Brand-MaanWin51-E53935.svg)](https://maanwin51.com/)
[![Frontend](https://img.shields.io/badge/Frontend-React%20%2B%20Vite%20%2B%20Tailwind-blue.svg)](frontend/)
[![Backend](https://img.shields.io/badge/Backend-PHP%208%2B%20%28PDO%29-purple.svg)](backend/)
[![Database](https://img.shields.io/badge/Database-MySQL%20%2F%20MariaDB-orange.svg)](backend/database/)

Official, complete, production-ready authentication platform for **MaanWin51** ([maanwin51.com](https://maanwin51.com/)).

Built with a modern, high-conversion **White & Light UI** accented with signature **MaanWin51 Red** (`#E53935`), utilizing secure PHP sessions with `HttpOnly` cookies and real MySQL persistence.

---

## 🚀 Key Features

* **Real Database Persistence:** Real MySQL tables (`users`, `password_resets`, `login_attempts`) using PDO prepared statements. Zero fake/demo users or mock storage.
* **Dual Channel Authentication:** Supports both mobile number (with international country code dropdown, default India `+91`) and email sign-in/registration.
* **Automatic Login After Registration:** Upon successful registration, the backend instantly issues an authenticated session cookie and redirects the user directly to the `/dashboard` without requiring a redundant sign-in step.
* **Cryptographic Security:** Passwords hashed with standard PHP `password_hash(PASSWORD_DEFAULT)` and verified with `password_verify()`. No plain-text or exposed hashes.
* **Brute-Force Rate Limiting:** Automatic throttling after 5 failed login attempts per IP / identifier within a 15-minute sliding window.
* **Session Security:** `HttpOnly`, `SameSite=Lax`, and `Secure` (over HTTPS) cookies with automatic session ID regeneration on login and registration.
* **Light Modern Design:** Clean SaaS / fintech-grade aesthetics on a `#F8FAFC` canvas, rounded cards, accessible focus rings, and zero dark maroon clutter.
* **Account Status Enforcement:** Instant denial for `blocked` or `inactive` accounts with safe, non-revealing error messages.
* **Password Visibility Toggle:** Show / hide password eye toggle button across all credential inputs.
* **Invite / Referral Code:** Optional invite code validation with automatic personal referral code generation upon registration.
* **Terms & Privacy Consent:** Enforced consent checkbox with interactive modal dialogs for legal documents.
* **Protected Dashboard:** Client-side route protection + server-side session authorization guard with profile details, session security status, and sign-out functionality.

---

## 📁 Project Structure

```
maan/
├── .htaccess                      # Production Apache routing & security headers
├── API_DOCUMENTATION.md           # Detailed endpoint specifications & payloads
├── README.md                      # Project manual & deployment guide
├── test_e2e_node.js               # 18-point automated end-to-end test suite
│
├── backend/
│   ├── .htaccess                  # Directory & file protection
│   ├── router.php                 # PHP built-in server router for local dev
│   ├── test_api.php               # Standalone backend PHP test suite
│   ├── config/
│   │   ├── database.php           # PDO connection with environment secrets
│   │   ├── session.php            # Secure cookie session handling
│   │   └── cors.php               # Credentialed CORS configuration
│   ├── database/
│   │   └── schema.sql             # MySQL schema (users, password_resets, attempts)
│   ├── helpers/
│   │   ├── response.php           # Unified JSON response helpers
│   │   ├── validation.php         # Phone, email, password normalization & rules
│   │   └── security.php           # Rate limiting & output sanitization
│   ├── middleware/
│   │   └── auth.php               # Route protection & session verification
│   └── api/
│       └── auth/
│           ├── register.php       # Account registration & auto-login
│           ├── login.php          # Credential verification & session start
│           ├── logout.php         # Session termination & cookie expiry
│           ├── me.php             # Current user profile endpoint
│           ├── forgot-password.php# Password reset request & token creation
│           └── reset-password.php # Password reset verification & update
│
└── frontend/
    ├── .env                       # Development environment variables
    ├── .env.production            # Production environment variables
    ├── package.json               # Frontend dependencies & scripts
    ├── vite.config.js             # Vite configuration with /api proxy
    ├── index.html                 # Main HTML with SEO meta & Google Fonts
    ├── public/
    │   └── favicon.svg            # Custom MaanWin51 red monogram favicon
    └── src/
        ├── index.css              # Design tokens & font declarations
        ├── main.jsx               # React entry point
        ├── App.jsx                # Route definitions
        ├── context/
        │   └── AuthContext.jsx    # Global session & auth provider
        ├── services/
        │   ├── api.js             # Centralized Axios with credentials
        │   └── authService.js     # API communication methods
        ├── utils/
        │   └── validation.js      # Client-side validation helpers
        ├── routes/
        │   └── ProtectedRoute.jsx # Route authentication guard
        ├── components/
        │   ├── common/
        │   │   ├── Button.jsx     # Brand button with loading spinners
        │   │   ├── Input.jsx      # Form input with accessible states
        │   │   ├── Checkbox.jsx   # Styled checkbox with accessible focus
        │   │   ├── Alert.jsx      # Inline notifications
        │   │   └── Loader.jsx     # Component & full-screen loaders
        │   └── auth/
        │       ├── AuthLayout.jsx # Desktop 2-column & mobile 1-column layout
        │       ├── AuthHeader.jsx # Brand logo & navigation
        │       ├── AuthTabs.jsx   # Phone / Email tab switcher
        │       ├── PhoneInput.jsx # Country code selector & phone field
        │       ├── PasswordInput.jsx # Password field with visibility toggle
        │       ├── LoginForm.jsx  # Controlled login form
        │       └── RegisterForm.jsx # Registration form with consent & auto-login
        └── pages/
            ├── Home.jsx           # Public portal landing page
            ├── Login.jsx          # Sign-in page (/login)
            ├── Register.jsx       # Registration page (/register)
            ├── ForgotPassword.jsx # Reset password page (/forgot-password)
            ├── Dashboard.jsx      # Protected user dashboard (/dashboard)
            └── NotFound.jsx       # 404 page
```

---

## 🛠️ Environment Requirements

* **PHP:** PHP 8.0 or higher with `pdo`, `pdo_mysql`, `session`, `json`, `openssl` extensions enabled.
* **Database:** MySQL 8.0+ or MariaDB 10.4+.
* **Node.js:** Node 18+ and npm 9+.
* **Web Server:** Apache (with `mod_rewrite` & `mod_headers`) or Nginx.

---

## ⚙️ Installation & Setup

### 1. Database Setup
1. Open your MySQL client or CLI:
   ```bash
   mysql -u root -p
   ```
2. Import the schema file:
   ```bash
   mysql -u root -p maanwin51_db < backend/database/schema.sql
   ```
   *Or execute `backend/database/schema.sql` inside phpMyAdmin.*

3. Set database credentials via environment variables (recommended) or in `backend/config/database.php`:
   ```bash
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_NAME=maanwin51_db
   DB_USER=root
   DB_PASS=your_password
   ```

### 2. Backend Server (Local Development)
Start the PHP built-in server with the development router:
```bash
cd backend
php -S 127.0.0.1:8000 router.php
```

Run the backend automated test suite to verify configuration:
```bash
php backend/test_api.php
```

### 3. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   npm install
   ```
2. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *Vite runs on `http://127.0.0.1:5173` and automatically proxies all `/api` requests to the PHP server on port 8000.*

---

## 🧪 Automated Testing

An automated end-to-end verification suite is included in `test_e2e_node.js`:

```bash
node test_e2e_node.js
```

### Test Coverage (18 / 18 Passing):
1. **Frontend Home:** Serves HTTP 200 with MaanWin51 title and branding.
2. **Unauthenticated `/me`:** Returns HTTP 401 unauthenticated.
3. **Phone Registration:** Creates MySQL user, hashes password, returns HTTP 201 with session cookie and automatic login.
4. **Session Persistence:** Verifies cookie authenticates `/me.php` and protects passwords from leaking.
5. **Duplicate Phone:** Rejects duplicate phone numbers with HTTP 409 Conflict.
6. **User Logout:** Clears session and expires cookie.
7. **Post-Logout Access:** Ensures expired session cannot access `/me.php`.
8. **Phone Login:** Re-authenticates with phone number and regenerates session ID.
9. **Incorrect Password:** Rejects bad password with HTTP 401.
10. **Email Registration:** Registers email user, validates referral code link, and auto-authenticates.
11. **Duplicate Email:** Rejects duplicate email addresses with HTTP 409 Conflict.
12. **Email Login:** Authenticates using registered email and password.
13. **Missing Consent:** Blocks registration without terms agreement (HTTP 422).
14. **Password Length:** Enforces minimum 8 character passwords (HTTP 422).
15. **Password Confirmation:** Enforces matching confirmation password (HTTP 422).
16. **Forgot Password:** Dispatches secure reset tokens without user enumeration.
17. **Password Reset:** Updates password securely using valid token hash.
18. **New Password Login:** Authenticates using the updated password.
19. **Rate Limiting:** Blocks brute-force attempts after 5 consecutive failures (HTTP 429).
20. **Blocked Account:** Denies login to blocked accounts (HTTP 403).

---

## 🌐 Production Deployment Guide

**Production Domain:** `https://maanwin51.com/`

### Step 1: Build the React Application
In the `frontend/` directory, compile the production bundle:
```bash
npm run build
```
This generates the optimized bundle in `frontend/dist/`.

### Step 2: Upload Files to Web Root
Deploy the following structure to your production web root (`/public_html` or `/var/www/maanwin51.com`):
* Copy contents of `frontend/dist/*` to web root (e.g. `index.html`, `assets/`, `favicon.svg`).
* Copy the `backend/` folder into your web root or adjacent protected directory.
* Ensure `.htaccess` is located in the web root.

### Step 3: Configure Apache / Nginx
For Apache, the included `.htaccess` automatically:
* Enforces HTTPS.
* Blocks access to `.env`, `database.php`, `schema.sql`, and `.git`.
* Routes `/api/*` requests to `backend/api/*.php`.
* Routes all client-side routes (`/login`, `/register`, `/dashboard`, etc.) to `index.html`.

For Nginx, use the following server block configuration:
```nginx
server {
    listen 443 ssl http2;
    server_name maanwin51.com www.maanwin51.com;

    root /var/www/maanwin51.com;
    index index.html index.php;

    # Protect sensitive files
    location ~* /(\.git|\.env|backend/config|backend/database) {
        deny all;
    }

    # API Routing
    location /api/ {
        rewrite ^/api/(.*)$ /backend/api/$1.php last;
    }

    # PHP handler
    location ~ \.php$ {
        include fastcgi_params;
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }

    # React SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Step 4: Verify Production Checklist
- [x] React builds with zero errors (`npm run build`).
- [x] PHP syntax passes on all backend files.
- [x] MySQL database and tables created with proper indexes.
- [x] Real password hashing via `password_hash()` and `password_verify()`.
- [x] Automatic login after registration working seamlessly.
- [x] Protected dashboard requires active PHP session.
- [x] Passwords and credentials never exposed in API responses.
- [x] No localhost URLs in production configurations.
- [x] Mobile & desktop responsive layouts verified.

---

## 🔒 Security Best Practices Implemented

* **PDO Prepared Statements:** Complete protection against SQL injection across all database queries.
* **Secure Cookie Attributes:** Sessions use `HttpOnly: true`, `SameSite: Lax`, and `Secure: true` (on HTTPS), defending against XSS cookie theft and CSRF.
* **Session ID Regeneration:** `session_regenerate_id(true)` executed upon both login and registration to prevent session fixation.
* **Brute-Force Rate Limiting:** Persistent tracking in `login_attempts` prevents dictionary and brute-force attacks.
* **Information Leak Prevention:** Uniform error messages prevent user enumeration on forgot password and authentication failures. Production errors mask internal technical details and stack traces.

---

&copy; 2026 **MaanWin51** ([maanwin51.com](https://maanwin51.com/)). All rights reserved.
#   m a a n  
 