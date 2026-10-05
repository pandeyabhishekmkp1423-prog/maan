<?php
/**
 * MaanWin51 - User Logout API
 * Endpoint: POST /api/auth/logout.php
 * Brand: MaanWin51 (https://maanwin51.com/)
 * 
 * Clears session variables, removes session cookie, and destroys session.
 */

declare(strict_types=1);

define('MAANWIN51_APP', true);

require_once __DIR__ . '/../../config/cors.php';
handleCors();

require_once __DIR__ . '/../../config/session.php';
require_once __DIR__ . '/../../helpers/response.php';

destroySecureSession();

jsonResponse([
    'success'       => true,
    'authenticated' => false,
    'message'       => 'Logged out successfully.',
], 200);
