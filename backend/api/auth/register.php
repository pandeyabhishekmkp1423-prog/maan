<?php
/**
 * MaanWin51 - User Registration API
 * Endpoint: POST /api/auth/register.php
 * Brand: MaanWin51 (https://maanwin51.com/)
 * 
 * Supports Phone and Email registration, duplicate checking,
 * secure password hashing, and automatic session-based login.
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
    $errors['method'] = 'Registration method must be either "phone" or "email".';
}

$countryCode = '+91';
$phone = null;
$email = null;

if ($method === 'phone') {
    $countryCode = sanitizeString($data['country_code'] ?? '+91');
    if (!isValidCountryCode($countryCode)) {
        $errors['country_code'] = 'Please select a valid country code.';
    }

    $rawPhone = $data['phone'] ?? '';
    $phone = normalizePhone((string)$rawPhone);

    if (empty($phone)) {
        $errors['phone'] = 'Phone number is required.';
    } elseif (!isValidPhone($phone, $countryCode)) {
        $errors['phone'] = 'Please enter a valid phone number.';
    }
} else {
    $rawEmail = sanitizeString($data['email'] ?? '');
    $email = strtolower(trim($rawEmail));

    if (empty($email)) {
        $errors['email'] = 'Email address is required.';
    } elseif (!isValidEmail($email)) {
        $errors['email'] = 'Please enter a valid email address.';
    }
}

// Password validation
$password = (string)($data['password'] ?? '');
$confirmPassword = (string)($data['confirm_password'] ?? '');

$pwdErrors = validatePassword($password);
if (!empty($pwdErrors)) {
    $errors['password'] = $pwdErrors[0];
}

if ($password !== $confirmPassword) {
    $errors['confirm_password'] = 'Passwords do not match.';
}

// Consent validation (Mandatory)
$consent = $data['consent'] ?? false;
$isConsentAgreed = ($consent === true || $consent === 'true' || $consent === 1 || $consent === '1');
if (!$isConsentAgreed) {
    $errors['consent'] = 'You must agree to the Privacy Policy and Terms & Conditions.';
}

// Invite code (optional)
$inviteCodeInput = sanitizeString($data['invite_code'] ?? '');

if (!empty($errors)) {
    validationErrorResponse($errors, 'Please correct the highlighted errors.');
}

try {
    $pdo = getDbConnection();

    // Check duplicate account
    if ($method === 'phone') {
        $dupStmt = $pdo->prepare('
            SELECT id FROM `users`
            WHERE country_code = :country_code AND phone = :phone
            LIMIT 1
        ');
        $dupStmt->execute([
            ':country_code' => $countryCode,
            ':phone'        => $phone,
        ]);

        if ($dupStmt->fetch()) {
            errorResponse('An account with this phone number already exists.', 409);
        }
    } else {
        $dupStmt = $pdo->prepare('
            SELECT id FROM `users`
            WHERE email = :email
            LIMIT 1
        ');
        $dupStmt->execute([':email' => $email]);

        if ($dupStmt->fetch()) {
            errorResponse('An account with this email address already exists.', 409);
        }
    }

    // Check referral invite code if provided
    $referredBy = null;
    if (!empty($inviteCodeInput)) {
        $refStmt = $pdo->prepare('
            SELECT id FROM `users`
            WHERE invite_code = :code AND status = "active"
            LIMIT 1
        ');
        $refStmt->execute([':code' => $inviteCodeInput]);
        $referrer = $refStmt->fetch();
        if ($referrer) {
            $referredBy = (int)$referrer['id'];
        }
    }

    // Secure password hashing
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Generate unique personal invite code for the new account
    $newInviteCode = 'MW' . strtoupper(substr(bin2hex(random_bytes(4)), 0, 8));

    // Default friendly display name
    $defaultName = $method === 'phone'
        ? 'User ' . substr($phone, -4)
        : ucfirst(explode('@', $email)[0]);

    // Insert user into MySQL
    $insertStmt = $pdo->prepare('
        INSERT INTO `users` (
            name, email, phone, country_code, password, invite_code, referred_by, status, created_at, updated_at, last_login_at
        ) VALUES (
            :name, :email, :phone, :country_code, :password, :invite_code, :referred_by, "active", NOW(), NOW(), NOW()
        )
    ');

    $insertStmt->execute([
        ':name'         => $defaultName,
        ':email'        => $email,
        ':phone'        => $phone,
        ':country_code' => ($method === 'phone' ? $countryCode : null),
        ':password'     => $hashedPassword,
        ':invite_code'  => $newInviteCode,
        ':referred_by'  => $referredBy,
    ]);

    $newUserId = (int)$pdo->lastInsertId();

    // Fetch created user entity
    $fetchStmt = $pdo->prepare('
        SELECT id, name, email, phone, country_code, invite_code, referred_by, status, created_at, updated_at, last_login_at
        FROM `users`
        WHERE id = :id
        LIMIT 1
    ');
    $fetchStmt->execute([':id' => $newUserId]);
    $createdUser = $fetchStmt->fetch();

    // ------------------------------------------------------------
    // AUTOMATIC LOGIN AFTER REGISTRATION
    // ------------------------------------------------------------
    startSecureSession();
    session_regenerate_id(true);
    $_SESSION['user_id'] = $newUserId;

    successResponse('Account created successfully.', [
        'authenticated' => true,
        'user'          => sanitizeUserForOutput($createdUser),
    ], 201);

} catch (Exception $e) {
    error_log('[Registration Error] ' . $e->getMessage());
    errorResponse('Unable to complete registration. Please try again.', 500);
}
