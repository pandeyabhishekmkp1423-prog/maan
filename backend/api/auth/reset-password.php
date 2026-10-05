<?php
/**
 * MaanWin51 - Password Reset Verification & Execution API
 * Endpoint: POST /api/auth/reset-password.php
 * Brand: MaanWin51 (https://maanwin51.com/)
 * 
 * Verifies reset token hash against database and updates password.
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

$token = sanitizeString($data['token'] ?? '');
if (empty($token) || strlen($token) !== 64) {
    $errors['token'] = 'Invalid or missing password reset token.';
}

$password = (string)($data['password'] ?? '');
$confirmPassword = (string)($data['confirm_password'] ?? '');

$pwdErrors = validatePassword($password);
if (!empty($pwdErrors)) {
    $errors['password'] = $pwdErrors[0];
}

if ($password !== $confirmPassword) {
    $errors['confirm_password'] = 'Passwords do not match.';
}

if (!empty($errors)) {
    validationErrorResponse($errors, 'Please correct the highlighted errors.');
}

try {
    $pdo = getDbConnection();
    $tokenHash = hash('sha256', $token);

    // Verify token exists and has not expired
    $stmt = $pdo->prepare('
        SELECT id, user_id, expires_at
        FROM `password_resets`
        WHERE token_hash = :hash AND expires_at > NOW()
        LIMIT 1
    ');
    $stmt->execute([':hash' => $tokenHash]);
    $resetRecord = $stmt->fetch();

    if (!$resetRecord) {
        errorResponse('Password reset link is invalid or has expired. Please request a new one.', 400);
    }

    $userId = (int)$resetRecord['user_id'];
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Update password
    $upStmt = $pdo->prepare('
        UPDATE `users`
        SET password = :password, updated_at = NOW()
        WHERE id = :id AND status = "active"
    ');
    $upStmt->execute([
        ':password' => $hashedPassword,
        ':id'       => $userId,
    ]);

    // Invalidate reset tokens for this user
    $delStmt = $pdo->prepare('DELETE FROM `password_resets` WHERE user_id = :user_id');
    $delStmt->execute([':user_id' => $userId]);

    successResponse('Password has been successfully updated. You can now log in with your new password.', [], 200);

} catch (Exception $e) {
    error_log('[Reset Password Error] ' . $e->getMessage());
    errorResponse('Unable to update password. Please try again.', 500);
}
