<?php
require_once 'db_connection.php';

// Function to sanitize input data
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect and sanitize input data
    $fullname = sanitize_input($_POST['fullname']);
    $email = sanitize_input($_POST['email']);
    $username = sanitize_input($_POST['username']);
    $password = $_POST['password'];
    $role = sanitize_input($_POST['role']);

    // Password validation
    if (strlen($password) < 8 || !preg_match("/[A-Z]/", $password) || 
        !preg_match("/[a-z]/", $password) || !preg_match("/[0-9]/", $password)) {
        die("Password does not meet requirements!");
    }

    try {
        // Check if username or email already exists
        $check_stmt = $conn->prepare("SELECT id FROM admins WHERE username = ? OR email = ?");
        $check_stmt->bind_param("ss", $username, $email);
        $check_stmt->execute();
        $result = $check_stmt->get_result();
        
        if ($result->num_rows > 0) {
            die("Username or email already exists!");
        }
        
        $check_stmt->close();

        // Hash the password
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        // Prepare SQL statement to prevent SQL injection
        $stmt = $conn->prepare("INSERT INTO admins (fullname, email, username, password, role, created_at) 
                              VALUES (?, ?, ?, ?, ?, NOW())");
        
        $stmt->bind_param("sssss", $fullname, $email, $username, $hashed_password, $role);

        // Execute the statement
        if ($stmt->execute()) {
            // Redirect to admin login page with success message
            header("Location: admin-login.php?registration=success");
            exit();
        } else {
            throw new Exception("Error registering admin");
        }

    } catch (Exception $e) {
        // Log the error and show generic error message
        error_log($e->getMessage());
        die("An error occurred during registration. Please try again later.");
    }

    $stmt->close();
    $conn->close();
}
?>