<?php
/**
 * MaanWin51 - Forgot Password API
 * Endpoint: POST /api/auth/forgot-password.php
 * Brand: MaanWin51 (https://maanwin51.com/)
 * 
 * Secure token generation for password reset requests without user enumeration.
 */

declare(strict_types=1);

define('MAANWIN51_APP', true);

require_once __DIR__ . '/../../config/cors.php';
handleCors();

require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../helpers/response.php';
require_once __DIR__ . '/../../helpers/validation.php';
require_once __DIR__ . '/../../helpers/security.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    errorResponse('Method Not Allowed. Use POST.', 405);
}

$data = getRequestData();
$errors = [];

$method = sanitizeString($data['method'] ?? 'phone');
$countryCode = '+91';
$phone = null;
$email = null;

if ($method === 'phone') {
    $countryCode = sanitizeString($data['country_code'] ?? '+91');
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

if (!empty($errors)) {
    validationErrorResponse($errors, 'Please correct the highlighted errors.');
}

try {
    $pdo = getDbConnection();

    if ($method === 'phone') {
        $stmt = $pdo->prepare('
            SELECT id, name, phone, email, status FROM `users`
            WHERE country_code = :country_code AND phone = :phone
            LIMIT 1
        ');
        $stmt->execute([
            ':country_code' => $countryCode,
            ':phone'        => $phone,
        ]);
    } else {
        $stmt = $pdo->prepare('
            SELECT id, name, phone, email, status FROM `users`
            WHERE email = :email
            LIMIT 1
        ');
        $stmt->execute([':email' => $email]);
    }

    $user = $stmt->fetch();

    $resetToken = null;

    if ($user && $user['status'] === 'active') {
        // Generate cryptographically secure token
        $rawToken = bin2hex(random_bytes(32));
        $tokenHash = hash('sha256', $rawToken);

        // Delete any existing unexpired tokens for this user
        $delStmt = $pdo->prepare('DELETE FROM `password_resets` WHERE user_id = :user_id');
        $delStmt->execute([':user_id' => $user['id']]);

        // Insert new token valid for 60 minutes
        $insStmt = $pdo->prepare('
            INSERT INTO `password_resets` (user_id, token_hash, expires_at, created_at)
            VALUES (:user_id, :token_hash, DATE_ADD(NOW(), INTERVAL 60 MINUTE), NOW())
        ');
        $insStmt->execute([
            ':user_id'    => $user['id'],
            ':token_hash' => $tokenHash,
        ]);

        $resetToken = $rawToken;

        // Isolate notification delivery provider (SMS / SMTP Mailer)
        // In local development, we safely log this token for developer testing
        error_log("[MaanWin51 Password Reset] User ID {$user['id']} requested reset. Token: {$rawToken}");
    }

    // Always return uniform message to prevent user enumeration
    $response = [
        'message' => 'If an account exists with those details, password reset instructions have been sent.',
    ];

    // Expose reset_token in development only for easy UI testing flow
    $isDev = (
        ($_SERVER['SERVER_NAME'] ?? '') === 'localhost' ||
        ($_SERVER['HTTP_HOST'] ?? '') === 'localhost' ||
        strpos($_SERVER['HTTP_HOST'] ?? '', '127.0.0.1') !== false
    );
    if ($isDev && $resetToken) {
        $response['dev_reset_token'] = $resetToken;
    }

    successResponse($response['message'], $response, 200);

} catch (Exception $e) {
    error_log('[Forgot Password Error] ' . $e->getMessage());
    errorResponse('Unable to process password reset request. Please try again.', 500);
}
