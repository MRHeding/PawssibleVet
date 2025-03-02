<?php
header('Content-Type: application/json');

try {
    require_once 'db_connection.php';

    if (!$conn) {
        throw new Exception("Database connection failed");
    }

    // Get today's appointments count
    $today = date('Y-m-d');
    $appointments_query = "SELECT COUNT(*) as appointment_count FROM appointments WHERE DATE(appointmentDate) = ?";
    $stmt = $conn->prepare($appointments_query);
    
    if (!$stmt) {
        throw new Exception("Failed to prepare appointments query");
    }

    $stmt->bind_param("s", $today);
    
    if (!$stmt->execute()) {
        throw new Exception("Failed to execute appointments query");
    }

    $appointments_result = $stmt->get_result();
    $appointments_count = $appointments_result->fetch_assoc()['appointment_count'];

    // Get unread messages count
    $messages_query = "SELECT COUNT(*) as message_count FROM contact_messages WHERE read_status = 0";
    $messages_result = $conn->query($messages_query);
    
    if (!$messages_result) {
        throw new Exception("Failed to execute messages query");
    }

    $messages_count = $messages_result->fetch_assoc()['message_count'];

    // Return counts as JSON
    echo json_encode([
        'success' => true,
        'appointments' => (int)$appointments_count,
        'messages' => (int)$messages_count
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'An error occurred while fetching dashboard statistics',
        'debug_message' => $e->getMessage()
    ]);
}

// Close connections if they exist
if (isset($stmt)) {
    $stmt->close();
}
if (isset($conn)) {
    $conn->close();
}
?>