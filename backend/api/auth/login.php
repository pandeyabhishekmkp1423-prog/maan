<?php
/**
 * MaanWin51 - User Login API
 * Endpoint: POST /api/auth/login.php
 * Brand: MaanWin51 (https://maanwin51.com/)
 * 
 * Supports Phone and Email login with rate limiting,
 * secure password verification, and session regeneration.
 */

declare(strict_types=1);

define('MAANWIN51_APP', true);

require_once __DIR__ . '/../../config/cors.php';
handleCors();

require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../config/session.php';
require_once __DIR__ . '/../../helpers/response.php';
require_once __DIR__ . '/../../helpers/validation.php';
require_once __DIR__ . '/../../helpers/security.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    errorResponse('Method Not Allowed. Use POST.', 405);
}

$data = getRequestData();
$errors = [];

$method = sanitizeString($data['method'] ?? 'phone');
if (!in_array($method, ['phone', 'email'], true)) {
    $errors['method'] = 'Login method must be either "phone" or "email".';
}

$countryCode = '+91';
$phone = null;
$email = null;
$identifier = '';

if ($method === 'phone') {
    $countryCode = sanitizeString($data['country_code'] ?? '+91');
    $rawPhone = $data['phone'] ?? '';
    $phone = normalizePhone((string)$rawPhone);

    if (empty($phone)) {
        $errors['phone'] = 'Phone number is required.';
    } elseif (!isValidPhone($phone, $countryCode)) {
        $errors['phone'] = 'Please enter a valid phone number.';
    }
    $identifier = $countryCode . $phone;
} else {
    $rawEmail = sanitizeString($data['email'] ?? '');
    $email = strtolower(trim($rawEmail));

    if (empty($email)) {
        $errors['email'] = 'Email address is required.';
    } elseif (!isValidEmail($email)) {
        $errors['email'] = 'Please enter a valid email address.';
    }
    $identifier = $email;
}

$password = (string)($data['password'] ?? '');
if (empty($password)) {
    $errors['password'] = 'Password is required.';
}

$remember = !empty($data['remember']);

if (!empty($errors)) {
    validationErrorResponse($errors, 'Please correct the highlighted errors.');
}

$clientIp = getClientIp();

try {
    $pdo = getDbConnection();

    // Check brute force rate limits (Max 5 failed attempts per 15 minutes)
    if (!checkRateLimit($pdo, $identifier, $clientIp, 5, 15)) {
        errorResponse('Too many failed login attempts. Please wait 15 minutes before trying again.', 429);
    }

    // Query user by phone or email
    if ($method === 'phone') {
        $stmt = $pdo->prepare('
            SELECT id, name, email, phone, country_code, password, invite_code, referred_by, status, created_at, updated_at, last_login_at
            FROM `users`
            WHERE country_code = :country_code AND phone = :phone
            LIMIT 1
        ');
        $stmt->execute([
            ':country_code' => $countryCode,
            ':phone'        => $phone,
        ]);
    } else {
        $stmt = $pdo->prepare('
            SELECT id, name, email, phone, country_code, password, invite_code, referred_by, status, created_at, updated_at, last_login_at
            FROM `users`
            WHERE email = :email
            LIMIT 1
        ');
        $stmt->execute([':email' => $email]);
    }

    $user = $stmt->fetch();

    if (!$user) {
        recordFailedAttempt($pdo, $identifier, $clientIp);
        errorResponse('Invalid credentials. Please verify your details and try again.', 401);
    }

    // Check account status
    if ($user['status'] === 'blocked') {
        errorResponse('Your account is currently unavailable. Please contact support.', 403);
    }

    if ($user['status'] === 'inactive') {
        errorResponse('Your account is inactive. Please contact support.', 403);
    }

    // Verify password hash
    if (!password_verify($password, $user['password'])) {
        recordFailedAttempt($pdo, $identifier, $clientIp);
        errorResponse('Invalid credentials. Please verify your details and try again.', 401);
    }

    // Login successful: clear any recorded failed attempts
    clearFailedAttempts($pdo, $identifier, $clientIp);

    // Update last_login_at timestamp
    $updateStmt = $pdo->prepare('UPDATE `users` SET last_login_at = NOW() WHERE id = :id');
    $updateStmt->execute([':id' => $user['id']]);

    // Refresh last_login_at in entity
    $user['last_login_at'] = date('Y-m-d H:i:s');

    // Start session with custom lifetime if remember-me is checked
    $sessionLifetime = $remember ? (60 * 60 * 24 * 30) : (60 * 60 * 24 * 7);
    startSecureSession($sessionLifetime);

    // Regenerate session ID to prevent session fixation attacks
    session_regenerate_id(true);

    $_SESSION['user_id'] = (int)$user['id'];

    successResponse('Login successful.', [
        'authenticated' => true,
        'user'          => sanitizeUserForOutput($user),
    ], 200);

} catch (Exception $e) {
    error_log('[Login Error] ' . $e->getMessage());
    errorResponse('Unable to log in. Please try again.', 500);
}
