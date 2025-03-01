<?php
include('../db/db_connection.php');

$sql = "SELECT * FROM inventory";
$result = $conn->query($sql);

$inventory = array();
while($row = $result->fetch_assoc()) {
    $inventory[] = $row;
}

echo json_encode($inventory);
$conn->close();
?>