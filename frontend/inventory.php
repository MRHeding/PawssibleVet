<?php
include('../db/db_connection.php');

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $sql = "SELECT * FROM inventory";
    $result = $conn->query($sql);

    $inventory = array();
    while($row = $result->fetch_assoc()) {
        $inventory[] = $row;
    }
    echo json_encode($inventory);
}
$conn->close();
?>