<?php
include('../db/db_connection.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $appointment_date = $_POST['appointment_date'];
    $message = $_POST['message'];

    $sql = "INSERT INTO appointments (name, email, phone, appointment_date, message) VALUES ('$name', '$email', '$phone', '$appointment_date', '$message')";
    if ($conn->query($sql) === TRUE) {
        echo "Appointment set successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
} elseif ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $sql = "SELECT * FROM appointments";
    $result = $conn->query($sql);

    $appointments = array();
    while($row = $result->fetch_assoc()) {
        $appointments[] = $row;
    }
    echo json_encode($appointments);
}

$conn->close();
?>