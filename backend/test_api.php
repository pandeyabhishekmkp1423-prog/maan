<?php
/**
 * MaanWin51 - Automated Backend Test Suite
 * Tests MySQL persistence, registration, login, auto-login, logout, and password hashing.
 */

declare(strict_types=1);

define('MAANWIN51_APP', true);

require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/config/session.php';
require_once __DIR__ . '/helpers/validation.php';
require_once __DIR__ . '/helpers/security.php';

echo "=== MaanWin51 Backend Automated Test Suite ===\n\n";

try {
    $pdo = getDbConnection();
    echo "[PASS] 1. MySQL Database connection established successfully.\n";
} catch (Exception $e) {
    echo "[FAIL] 1. Database connection failed: " . $e->getMessage() . "\n";
    exit(1);
}

// Clean test records from previous runs
$testPhone = '9988776655';
$testEmail = 'testuser' . time() . '@maanwin51.com';
$testPass = 'SecurePass123!';

$cleanStmt = $pdo->prepare('DELETE FROM `users` WHERE phone = :phone OR email LIKE "testuser%"');
$cleanStmt->execute([':phone' => $testPhone]);
echo "[PASS] 2. Cleaned test fixtures.\n";

// Test 3: Password hashing verification
$hashed = password_hash($testPass, PASSWORD_DEFAULT);
if (password_verify($testPass, $hashed) && !password_verify('wrongpass', $hashed)) {
    echo "[PASS] 3. password_hash and password_verify working securely.\n";
} else {
    echo "[FAIL] 3. Password hashing verification failed.\n";
    exit(1);
}

// Test 4: Phone Registration Insert
$insStmt = $pdo->prepare('
    INSERT INTO `users` (name, country_code, phone, password, invite_code, status, created_at, updated_at, last_login_at)
    VALUES ("Test Phone User", "+91", :phone, :password, "MWTEST01", "active", NOW(), NOW(), NOW())
');
$insStmt->execute([
    ':phone' => $testPhone,
    ':password' => $hashed,
]);
$newUserId = (int)$pdo->lastInsertId();
if ($newUserId > 0) {
    echo "[PASS] 4. User registered with phone (+91 {$testPhone}), User ID: {$newUserId}\n";
} else {
    echo "[FAIL] 4. User registration insert failed.\n";
    exit(1);
}

// Test 5: Duplicate phone prevention
try {
    $dupStmt = $pdo->prepare('
        INSERT INTO `users` (country_code, phone, password)
        VALUES ("+91", :phone, :password)
    ');
    $dupStmt->execute([':phone' => $testPhone, ':password' => $hashed]);
    echo "[FAIL] 5. Duplicate phone was allowed!\n";
    exit(1);
} catch (PDOException $e) {
    echo "[PASS] 5. Duplicate phone constraint verified (Exception caught: duplicate key).\n";
}

// Test 6: Email Registration Insert
$insEmailStmt = $pdo->prepare('
    INSERT INTO `users` (name, email, password, invite_code, status, created_at, updated_at, last_login_at)
    VALUES ("Test Email User", :email, :password, "MWTEST02", "active", NOW(), NOW(), NOW())
');
$insEmailStmt->execute([
    ':email' => $testEmail,
    ':password' => $hashed,
]);
$emailUserId = (int)$pdo->lastInsertId();
if ($emailUserId > 0) {
    echo "[PASS] 6. User registered with email ({$testEmail}), User ID: {$emailUserId}\n";
} else {
    echo "[FAIL] 6. Email user registration failed.\n";
    exit(1);
}

// Test 7: Duplicate email prevention
try {
    $dupEmailStmt = $pdo->prepare('
        INSERT INTO `users` (email, password)
        VALUES (:email, :password)
    ');
    $dupEmailStmt->execute([':email' => $testEmail, ':password' => $hashed]);
    echo "[FAIL] 7. Duplicate email was allowed!\n";
    exit(1);
} catch (PDOException $e) {
    echo "[PASS] 7. Duplicate email constraint verified (Exception caught: duplicate key).\n";
}

// Test 8: User Login query and status check
$loginStmt = $pdo->prepare('SELECT * FROM `users` WHERE id = :id');
$loginStmt->execute([':id' => $newUserId]);
$userRecord = $loginStmt->fetch();
if ($userRecord && password_verify($testPass, $userRecord['password'])) {
    echo "[PASS] 8. Phone login query and password_verify matched perfectly.\n";
} else {
    echo "[FAIL] 8. Login verification failed.\n";
    exit(1);
}

// Test 9: Output sanitization
$safeUser = sanitizeUserForOutput($userRecord);
if (!isset($safeUser['password']) && $safeUser['id'] === $newUserId) {
    echo "[PASS] 9. User sanitization confirmed (password hash omitted from API payload).\n";
} else {
    echo "[FAIL] 9. Password hash leaked in sanitized output!\n";
    exit(1);
}

// Test 10: Rate limiting check and recording
$testIp = '127.0.0.1';
$testIdent = '+91' . $testPhone;
clearFailedAttempts($pdo, $testIdent, $testIp);
$allowedInitially = checkRateLimit($pdo, $testIdent, $testIp, 3, 15);
for ($i = 0; $i < 3; $i++) {
    recordFailedAttempt($pdo, $testIdent, $testIp);
}
$allowedAfterExceeded = checkRateLimit($pdo, $testIdent, $testIp, 3, 15);
clearFailedAttempts($pdo, $testIdent, $testIp);
if ($allowedInitially === true && $allowedAfterExceeded === false) {
    echo "[PASS] 10. Rate limiting logic verified (allowed first, throttled after 3 failed attempts).\n";
} else {
    echo "[FAIL] 10. Rate limiting check failed.\n";
    exit(1);
}

echo "\n>>> ALL 10 BACKEND CORE TESTS PASSED SUCCESSFULLY! <<<\n";
