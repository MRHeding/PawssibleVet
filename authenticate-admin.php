<?php
session_start();
require_once 'db_connection.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    try {
        // Prepare SQL statement
        $stmt = $conn->prepare("SELECT id, username, password, role, fullname FROM admins WHERE username = ? AND is_active = TRUE");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows === 1) {
            $admin = $result->fetch_assoc();

            if (password_verify($password, $admin['password'])) {
                // Password is correct, create session
                $_SESSION['admin_id'] = $admin['id'];
                $_SESSION['admin_username'] = $admin['username'];
                $_SESSION['admin_role'] = $admin['role'];
                $_SESSION['admin_fullname'] = $admin['fullname'];

                // Update last login time
                $update_stmt = $conn->prepare("UPDATE admins SET last_login = NOW() WHERE id = ?");
                $update_stmt->bind_param("i", $admin['id']);
                $update_stmt->execute();
                $update_stmt->close();

                // Redirect to admin dashboard
                header("Location: admin.html");
                exit();
            }
        }

        // If we get here, authentication failed
        header("Location: admin-login.php?error=invalid");
        exit();

    } catch (Exception $e) {
        error_log($e->getMessage());
        header("Location: admin-login.php?error=system");
        exit();
    }

    $stmt->close();
    $conn->close();
}
?>