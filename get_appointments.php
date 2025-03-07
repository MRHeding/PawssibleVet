<?php
session_start();
require_once 'db_connection.php';

// Check if admin is logged in
if (!isset($_SESSION['admin_id'])) {
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Unauthorized']);
    exit();
}

// Get filter parameters from POST request
$data = json_decode(file_get_contents('php://input'), true);
$dateFilter = isset($data['date']) ? $data['date'] : '';
$statusFilter = isset($data['status']) ? $data['status'] : '';

// Build the query
$query = "SELECT 
            a.id,
            a.appointmentDate,
            a.appointmentTime,
            a.petOwner,
            a.petName,
            a.petType,
            a.reason as service,
            a.status,
            a.email,
            a.phone
          FROM appointments a
          WHERE 1=1";

if ($dateFilter) {
    $query .= " AND DATE(appointmentDate) = ?";
}

if ($statusFilter) {
    $query .= " AND status = ?";
}

$query .= " ORDER BY appointmentDate DESC, appointmentTime DESC";

try {
    $stmt = $conn->prepare($query);
    
    // Bind parameters if they exist
    if ($dateFilter && $statusFilter) {
        $stmt->bind_param("ss", $dateFilter, $statusFilter);
    } else if ($dateFilter) {
        $stmt->bind_param("s", $dateFilter);
    } else if ($statusFilter) {
        $stmt->bind_param("s", $statusFilter);
    }
    
    $stmt->execute();
    $result = $stmt->get_result();
    
    $appointments = [];
    while ($row = $result->fetch_assoc()) {
        // Format the datetime
        $datetime = date('M d, Y h:i A', strtotime($row['appointmentDate'] . ' ' . $row['appointmentTime']));
        
        $appointments[] = [
            'id' => $row['id'],
            'datetime' => $datetime,
            'petOwner' => htmlspecialchars($row['petOwner']),
            'petName' => htmlspecialchars($row['petName']),
            'petType' => htmlspecialchars($row['petType']),
            'service' => htmlspecialchars($row['service']),
            'status' => $row['status'],
            'email' => htmlspecialchars($row['email']),
            'phone' => htmlspecialchars($row['phone'])
        ];
    }
    
    header('Content-Type: application/json');
    echo json_encode($appointments);
    
} catch (Exception $e) {
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Failed to fetch appointments']);
}

$stmt->close();
$conn->close();
?>