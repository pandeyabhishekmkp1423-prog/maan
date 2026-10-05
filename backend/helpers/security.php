<?php
/**
 * MaanWin51 - Security Helper
 * Brand: MaanWin51 (https://maanwin51.com/)
 * 
 * IP resolution, brute-force rate limiting, and output sanitization.
 */

declare(strict_types=1);

if (!defined('MAANWIN51_APP')) {
    define('MAANWIN51_APP', true);
}

/**
 * Determine client IP address safely
 * 
 * @return string
 */
function getClientIp(): string
{
    $headers = [
        'HTTP_CF_CONNECTING_IP',
        'HTTP_X_FORWARDED_FOR',
        'HTTP_CLIENT_IP',
        'REMOTE_ADDR',
    ];

    foreach ($headers as $header) {
        if (!empty($_SERVER[$header])) {
            $ipList = explode(',', $_SERVER[$header]);
            $ip = trim($ipList[0]);
            if (filter_var($ip, FILTER_VALIDATE_IP)) {
                return $ip;
            }
        }
    }

    return '127.0.0.1';
}

/**
 * Check if the current login attempt exceeds rate limits
 * 
 * @param PDO $pdo
 * @param string $identifier User email or normalized phone
 * @param string $ip
 * @param int $maxAttempts Allowed failed attempts in window
 * @param int $decayMinutes Window in minutes
 * @return bool True if allowed, False if rate limited
 */
function checkRateLimit(PDO $pdo, string $identifier, string $ip, int $maxAttempts = 5, int $decayMinutes = 15): bool
{
    try {
        $stmt = $pdo->prepare('
            SELECT COUNT(*) AS failed_count
            FROM `login_attempts`
            WHERE (ip_address = :ip OR identifier = :identifier)
              AND attempted_at > (NOW() - INTERVAL :minutes MINUTE)
        ');

        $stmt->bindValue(':ip', $ip, PDO::PARAM_STR);
        $stmt->bindValue(':identifier', $identifier, PDO::PARAM_STR);
        $stmt->bindValue(':minutes', $decayMinutes, PDO::PARAM_INT);
        $stmt->execute();

        $result = $stmt->fetch();
        $failedCount = (int)($result['failed_count'] ?? 0);

        return $failedCount < $maxAttempts;
    } catch (Exception $e) {
        error_log('[Rate Limit Check Error] ' . $e->getMessage());
        return true; // Fail open for usability if rate limiting table has issues
    }
}

/**
 * Record a failed login attempt
 * 
 * @param PDO $pdo
 * @param string $identifier
 * @param string $ip
 * @return void
 */
function recordFailedAttempt(PDO $pdo, string $identifier, string $ip): void
{
    try {
        $stmt = $pdo->prepare('
            INSERT INTO `login_attempts` (`ip_address`, `identifier`, `attempted_at`)
            VALUES (:ip, :identifier, NOW())
        ');
        $stmt->execute([
            ':ip'         => substr($ip, 0, 45),
            ':identifier' => substr($identifier, 0, 255),
        ]);
    } catch (Exception $e) {
        error_log('[Record Failed Attempt Error] ' . $e->getMessage());
    }
}

/**
 * Clear failed attempts after successful login
 * 
 * @param PDO $pdo
 * @param string $identifier
 * @param string $ip
 * @return void
 */
function clearFailedAttempts(PDO $pdo, string $identifier, string $ip): void
{
    try {
        $stmt = $pdo->prepare('
            DELETE FROM `login_attempts`
            WHERE ip_address = :ip OR identifier = :identifier
        ');
        $stmt->execute([
            ':ip'         => $ip,
            ':identifier' => $identifier,
        ]);
    } catch (Exception $e) {
        error_log('[Clear Failed Attempts Error] ' . $e->getMessage());
    }
}

/**
 * Format user entity for safe JSON response
 * Strips password hash and private columns.
 * 
 * @param array $user
 * @return array
 */
function sanitizeUserForOutput(array $user): array
{
    return [
        'id'            => (int)$user['id'],
        'name'          => $user['name'] ?? null,
        'email'         => $user['email'] ?? null,
        'phone'         => $user['phone'] ?? null,
        'country_code'  => $user['country_code'] ?? null,
        'invite_code'   => $user['invite_code'] ?? null,
        'referred_by'   => isset($user['referred_by']) ? (int)$user['referred_by'] : null,
        'status'        => $user['status'] ?? 'active',
        'created_at'    => $user['created_at'] ?? null,
        'updated_at'    => $user['updated_at'] ?? null,
        'last_login_at' => $user['last_login_at'] ?? null,
    ];
}
