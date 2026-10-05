<?php
/**
 * MaanWin51 - Current Authenticated User API
 * Endpoint: GET /api/auth/me.php
 * Brand: MaanWin51 (https://maanwin51.com/)
 * 
 * Verifies active session and returns user profile details.
 */

declare(strict_types=1);

define('MAANWIN51_APP', true);

require_once __DIR__ . '/../../config/cors.php';
handleCors();

require_once __DIR__ . '/../../middleware/auth.php';

// requireAuth() enforces active session and status, exiting with 401 if unauthenticated
$user = requireAuth();

jsonResponse([
    'success'       => true,
    'authenticated' => true,
    'user'          => $user,
], 200);
