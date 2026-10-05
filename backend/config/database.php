<?php
/**
 * MaanWin51 - Database Configuration
 * Brand: MaanWin51 (https://maanwin51.com/)
 * 
 * Uses PDO with prepared statements, strict error handling,
 * and UTF-8 charset. Secrets are loaded from environment
 * variables with safe local defaults.
 */

declare(strict_types=1);

// Prevent direct script output of sensitive data
if (!defined('MAANWIN51_APP')) {
    define('MAANWIN51_APP', true);
}

/**
 * Get or create a singleton PDO connection
 * 
 * @return PDO
 * @throws PDOException
 */
function getDbConnection(): PDO
{
    static $pdo = null;

    if ($pdo !== null) {
        return $pdo;
    }

    // Load credentials from environment or default to local development setup
    $host = getenv('DB_HOST') ?: '127.0.0.1';
    $port = getenv('DB_PORT') ?: '3306';
    $dbname = getenv('DB_NAME') ?: 'maanwin51_db';
    $user = getenv('DB_USER') ?: 'root';
    $pass = getenv('DB_PASS') ?: '';
    $charset = 'utf8mb4';

    $dsn = "mysql:host={$host};port={$port};dbname={$dbname};charset={$charset}";

    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
        PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES {$charset} COLLATE utf8mb4_unicode_ci",
        PDO::ATTR_TIMEOUT            => 5,
    ];

    try {
        $pdo = new PDO($dsn, $user, $pass, $options);
        return $pdo;
    } catch (PDOException $e) {
        // Log the technical error securely server-side without exposing credentials or paths to client
        error_log('[MaanWin51 Database Error] ' . $e->getMessage());
        throw new RuntimeException('Database service temporarily unavailable.');
    }
}
