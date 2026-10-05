<?php
/**
 * MaanWin51 - Input Validation Helper
 * Brand: MaanWin51 (https://maanwin51.com/)
 * 
 * Validates and normalizes authentication inputs for phone & email.
 */

declare(strict_types=1);

if (!defined('MAANWIN51_APP')) {
    define('MAANWIN51_APP', true);
}

/**
 * Get request data from JSON body or POST form
 * 
 * @return array
 */
function getRequestData(): array
{
    $contentType = $_SERVER['CONTENT_TYPE'] ?? '';

    if (stripos($contentType, 'application/json') !== false) {
        $raw = file_get_contents('php://input');
        if (empty($raw)) {
            return [];
        }
        $data = json_decode($raw, true);
        return is_array($data) ? $data : [];
    }

    return $_POST;
}

/**
 * Normalize and clean phone numbers (keep only digits)
 * 
 * @param string|null $phone
 * @return string
 */
function normalizePhone(?string $phone): string
{
    if ($phone === null) {
        return '';
    }
    return preg_replace('/[^\d]/', '', $phone);
}

/**
 * Validate phone number format
 * 
 * @param string $phone
 * @param string $countryCode
 * @return bool
 */
function isValidPhone(string $phone, string $countryCode = '+91'): bool
{
    $cleanPhone = normalizePhone($phone);
    $len = strlen($cleanPhone);

    // Default India +91 is 10 digits (typically starting with 6-9)
    if ($countryCode === '+91') {
        return $len === 10 && preg_match('/^[6-9]\d{9}$/', $cleanPhone) === 1;
    }

    // General international length: 7 to 15 digits (ITU-T E.164 recommendation)
    return $len >= 7 && $len <= 15;
}

/**
 * Validate country code
 * 
 * @param string $countryCode
 * @return bool
 */
function isValidCountryCode(string $countryCode): bool
{
    return preg_match('/^\+[0-9]{1,4}$/', trim($countryCode)) === 1;
}

/**
 * Validate email address
 * 
 * @param string $email
 * @return bool
 */
function isValidEmail(string $email): bool
{
    $trimmed = trim($email);
    if (strlen($trimmed) < 5 || strlen($trimmed) > 255) {
        return false;
    }
    return filter_var($trimmed, FILTER_VALIDATE_EMAIL) !== false;
}

/**
 * Validate password requirements
 * 
 * @param string $password
 * @return array Array of error strings, or empty if valid
 */
function validatePassword(string $password): array
{
    $errors = [];
    $len = strlen($password);

    if ($len < 8) {
        $errors[] = 'Password must be at least 8 characters long.';
    } elseif ($len > 128) {
        $errors[] = 'Password cannot exceed 128 characters.';
    }

    return $errors;
}

/**
 * Sanitize string safely
 * 
 * @param mixed $value
 * @return string
 */
function sanitizeString($value): string
{
    if (!is_string($value)) {
        return '';
    }
    return trim(strip_tags($value));
}
