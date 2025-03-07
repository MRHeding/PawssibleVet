<?php
// Include the database connection file
include 'db_connection.php';

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $petOwner = $_POST["petOwner"];
    $petName = $_POST["petName"];
    $petType = $_POST["petType"];
    $email = $_POST["email"];
    $phone = $_POST["phone"];
    $appointmentDate = $_POST["appointmentDate"];
    $appointmentTime = $_POST["appointmentTime"];
    $reason = $_POST["reason"];

    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO appointments (petOwner, petName, petType, email, phone, appointmentDate, appointmentTime, reason) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssssss", $petOwner, $petName, $petType, $email, $phone, $appointmentDate, $appointmentTime, $reason);

    // Execute the statement
    if ($stmt->execute()) {
        echo "Appointment booked successfully!";
    } else {
        echo "Error: " . $stmt->error;
    }

    // Close statement and connection
    $stmt->close();
    $conn->close();
}
?>