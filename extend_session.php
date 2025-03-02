<?php
session_start();

// Verify that the user is logged in
if (!isset($_SESSION['admin_id'])) {
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'Not logged in']);
    exit;
}

// Extend the session
$_SESSION['last_activity'] = time();

// Return success response
header('Content-Type: application/json');
echo json_encode(['success' => true]);
?>