<?php
/**
 * MaanWin51 - API Response Helper
 * Brand: MaanWin51 (https://maanwin51.com/)
 * 
 * Standardized JSON responses, HTTP status codes,
 * and security response headers.
 */

declare(strict_types=1);

if (!defined('MAANWIN51_APP')) {
    define('MAANWIN51_APP', true);
}

/**
 * Send JSON response and exit
 * 
 * @param array $payload
 * @param int $statusCode
 * @return never
 */
function jsonResponse(array $payload, int $statusCode = 200): void
{
    http_response_code($statusCode);
    header('Content-Type: application/json; charset=UTF-8');
    header('X-Content-Type-Options: nosniff');
    header('X-Frame-Options: DENY');
    header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
    header('Pragma: no-cache');

    echo json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

/**
 * Return standardized success response
 * 
 * @param string $message
 * @param array $data
 * @param int $statusCode
 * @return never
 */
function successResponse(string $message, array $data = [], int $statusCode = 200): void
{
    $response = array_merge([
        'success' => true,
        'message' => $message,
    ], $data);

    jsonResponse($response, $statusCode);
}

/**
 * Return standardized error response
 * 
 * @param string $message
 * @param int $statusCode
 * @param array $errors
 * @return never
 */
function errorResponse(string $message, int $statusCode = 400, array $errors = []): void
{
    $response = [
        'success' => false,
        'message' => $message,
    ];

    if (!empty($errors)) {
        $response['errors'] = $errors;
    }

    jsonResponse($response, $statusCode);
}

/**
 * Return standardized validation error response (HTTP 422)
 * 
 * @param array $errors Field-keyed error messages
 * @param string $message
 * @return never
 */
function validationErrorResponse(array $errors, string $message = 'Validation failed.'): void
{
    errorResponse($message, 422, $errors);
}
