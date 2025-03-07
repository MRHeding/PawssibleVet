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

if (!isset($data['id']) || !isset($data['date']) || !isset($data['time']) || !isset($data['status'])) {
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit();
}

try {
    // Prepare and execute update query
    $stmt = $conn->prepare("
        UPDATE appointments 
        SET appointmentDate = ?, 
            appointmentTime = ?, 
            status = ?, 
            notes = ?,
            updated_at = NOW()
        WHERE id = ?
    ");
    
    $stmt->bind_param(
        "ssssi",
        $data['date'],
        $data['time'],
        $data['status'],
        $data['notes'],
        $data['id']
    );
    
    $success = $stmt->execute();
    
    if ($success) {
        $response = ['success' => true, 'message' => 'Appointment updated successfully'];
    } else {
        $response = ['success' => false, 'message' => 'Failed to update appointment'];
    }
    
    $stmt->close();
    
} catch (Exception $e) {
    $response = ['success' => false, 'message' => 'Database error'];
}

header('Content-Type: application/json');
echo json_encode($response);