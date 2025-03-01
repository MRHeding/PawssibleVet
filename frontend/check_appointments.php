<?php
include('../db/db_connection.php');

$sql = "SELECT * FROM appointments";
$result = $conn->query($sql);

$appointments = array();
while($row = $result->fetch_assoc()) {
    $appointments[] = $row;
}

echo json_encode($appointments);
$conn->close();
?>