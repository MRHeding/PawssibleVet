<?php
session_start();
require_once 'db_connection.php';

// Check if user is logged in
if (!isset($_SESSION['admin_id'])) {
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit();
}

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['id'])) {
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'Missing appointment ID']);
    exit();
}

try {
    // Prepare and execute delete query
    $stmt = $conn->prepare("DELETE FROM appointments WHERE id = ?");
    $stmt->bind_param("i", $data['id']);
    
    $success = $stmt->execute();
    
    if ($success) {
        $response = ['success' => true, 'message' => 'Appointment deleted successfully'];
    } else {
        $response = ['success' => false, 'message' => 'Failed to delete appointment'];
    }
    
    $stmt->close();
    
} catch (Exception $e) {
    $response = ['success' => false, 'message' => 'Database error'];
}

header('Content-Type: application/json');
echo json_encode($response);