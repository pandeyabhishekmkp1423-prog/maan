<?php
/**
 * MaanWin51 - Authentication Middleware
 * Brand: MaanWin51 (https://maanwin51.com/)
 * 
 * Verifies active session, account existence, and status in MySQL.
 */

declare(strict_types=1);

if (!defined('MAANWIN51_APP')) {
    define('MAANWIN51_APP', true);
}

require_once __DIR__ . '/../config/session.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../helpers/response.php';
require_once __DIR__ . '/../helpers/security.php';

/**
 * Require active authenticated user session.
 * Exits with HTTP 401/403 JSON response if unauthenticated or blocked.
 * 
 * @return array Sanitized authenticated user
 */
function requireAuth(): array
{
    startSecureSession();

    $userId = $_SESSION['user_id'] ?? null;

    if (!$userId) {
        jsonResponse([
            'success'       => false,
            'authenticated' => false,
            'message'       => 'Authentication required. Please log in.',
        ], 401);
    }

    try {
        $pdo = getDbConnection();
        $stmt = $pdo->prepare('
            SELECT id, name, email, phone, country_code, invite_code, referred_by, status, created_at, updated_at, last_login_at
            FROM `users`
            WHERE id = :id
            LIMIT 1
        ');
        $stmt->execute([':id' => (int)$userId]);
        $user = $stmt->fetch();

        if (!$user) {
            destroySecureSession();
            jsonResponse([
                'success'       => false,
                'authenticated' => false,
                'message'       => 'User account no longer exists.',
            ], 401);
        }

        if ($user['status'] === 'blocked') {
            destroySecureSession();
            jsonResponse([
                'success'       => false,
                'authenticated' => false,
                'message'       => 'Your account is currently unavailable. Please contact support.',
            ], 403);
        }

        if ($user['status'] === 'inactive') {
            destroySecureSession();
            jsonResponse([
                'success'       => false,
                'authenticated' => false,
                'message'       => 'Your account is inactive. Please contact support.',
            ], 403);
        }

        return sanitizeUserForOutput($user);
    } catch (Exception $e) {
        error_log('[Auth Middleware Error] ' . $e->getMessage());
        jsonResponse([
            'success' => false,
            'message' => 'Internal authentication error.',
        ], 500);
    }
}

/**
 * Get current authenticated user if exists, or null
 * 
 * @return array|null
 */
function getAuthUser(): ?array
{
    startSecureSession();
    $userId = $_SESSION['user_id'] ?? null;

    if (!$userId) {
        return null;
    }

    try {
        $pdo = getDbConnection();
        $stmt = $pdo->prepare('
            SELECT id, name, email, phone, country_code, invite_code, referred_by, status, created_at, updated_at, last_login_at
            FROM `users`
            WHERE id = :id AND status = "active"
            LIMIT 1
        ');
        $stmt->execute([':id' => (int)$userId]);
        $user = $stmt->fetch();

        return $user ? sanitizeUserForOutput($user) : null;
    } catch (Exception $e) {
        error_log('[Get Auth User Error] ' . $e->getMessage());
        return null;
    }
}
