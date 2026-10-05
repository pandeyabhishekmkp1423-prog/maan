<?php
/**
 * MaanWin51 - Session Configuration
 * Brand: MaanWin51 (https://maanwin51.com/)
 * 
 * Provides secure session initiation, cookie parameters,
 * and session lifecycle helpers.
 */

declare(strict_types=1);

if (!defined('MAANWIN51_APP')) {
    define('MAANWIN51_APP', true);
}

/**
 * Configure and start secure PHP session
 * 
 * @param int|null $customLifetime Optional lifetime in seconds (e.g. for remember me)
 * @return void
 */
function startSecureSession(?int $customLifetime = null): void
{
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }

    // Default lifetime: 7 days (604800s); Remember-me lifetime: 30 days (2592000s)
    $lifetime = $customLifetime ?? (60 * 60 * 24 * 7);

    // Detect if connection is HTTPS (direct or via reverse proxy)
    $isHttps = (
        (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ||
        (!empty($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https') ||
        (!empty($_SERVER['SERVER_PORT']) && (int)$_SERVER['SERVER_PORT'] === 443)
    );

    // Production domain cookie scope or local
    $cookieDomain = '';
    $host = $_SERVER['HTTP_HOST'] ?? '';
    if (strpos($host, 'maanwin51.com') !== false) {
        $cookieDomain = '.maanwin51.com';
    }

    // Session security directives
    ini_set('session.use_strict_mode', '1');
    ini_set('session.use_only_cookies', '1');
    ini_set('session.gc_maxlifetime', (string)$lifetime);

    session_name('MAANWIN51_SESS');

    session_set_cookie_params([
        'lifetime' => $lifetime,
        'path'     => '/',
        'domain'   => $cookieDomain,
        'secure'   => $isHttps,
        'httponly' => true,
        'samesite' => 'Lax',
    ]);

    session_start();
}

/**
 * Destroy current session and remove cookie
 * 
 * @return void
 */
function destroySecureSession(): void
{
    if (session_status() !== PHP_SESSION_ACTIVE) {
        startSecureSession();
    }

    $_SESSION = [];

    if (ini_get('session.use_cookies')) {
        $params = session_get_cookie_params();
        setcookie(
            session_name(),
            '',
            time() - 42000,
            $params['path'],
            $params['domain'],
            $params['secure'],
            $params['httponly']
        );
    }

    session_destroy();
}
