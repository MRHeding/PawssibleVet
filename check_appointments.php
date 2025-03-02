<?php
require_once 'db_connection.php';

// Set timezone to UTC
date_default_timezone_set('UTC');
$today = gmdate('Y-m-d');

echo "Current UTC Date: " . $today . "\n";
echo "Checking appointments...\n\n";

$query = "SELECT 
            petOwner,
            petName,
            DATE_FORMAT(appointmentDate, '%Y-%m-%d') as date,
            TIME_FORMAT(appointmentTime, '%H:%i') as time,
            status
          FROM appointments
          WHERE DATE(appointmentDate) = ?
          ORDER BY appointmentTime";

$stmt = $conn->prepare($query);
$stmt->bind_param("s", $today);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo "Found " . $result->num_rows . " appointments for today:\n";
    echo str_repeat("-", 80) . "\n";
    echo sprintf("%-20s %-15s %-12s %-8s %-10s\n", 
                "Owner", "Pet", "Date", "Time", "Status");
    echo str_repeat("-", 80) . "\n";
    
    while ($row = $result->fetch_assoc()) {
        echo sprintf("%-20s %-15s %-12s %-8s %-10s\n",
                    $row['petOwner'],
                    $row['petName'],
                    $row['date'],
                    $row['time'],
                    $row['status']);
    }
} else {
    echo "No appointments found for today.\n";
}

$stmt->close();
$conn->close();
?>