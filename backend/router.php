<?php
/**
 * MaanWin51 - PHP Router for Local Development
 * Brand: MaanWin51 (https://maanwin51.com/)
 */

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Serve existing static file directly
if ($uri !== '/' && file_exists(__DIR__ . $uri)) {
    return false;
}

// Support requests with or without .php extension
$phpFile = __DIR__ . $uri . '.php';
if (file_exists($phpFile)) {
    require $phpFile;
    return true;
}

// Normalize /api/... to backend/api/...
if (strpos($uri, '/api/') === 0) {
    $relativePath = substr($uri, 5); // remove '/api/'
    $candidate = __DIR__ . '/api/' . $relativePath;
    if (file_exists($candidate)) {
        require $candidate;
        return true;
    }
    if (file_exists($candidate . '.php')) {
        require $candidate . '.php';
        return true;
    }
}

// Default 404 response
http_response_code(404);
header('Content-Type: application/json');
echo json_encode([
    'success' => false,
    'message' => 'Endpoint not found',
]);
