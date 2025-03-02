<?php
session_start();
// Check if admin is logged in
if (!isset($_SESSION['admin_id'])) {
    header("Location: admin-login.php");
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - PawssibleVet</title>
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/dashboard.css">
    <!-- Add Font Awesome for icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <div class="dashboard-container">
        <!-- Sidebar -->
        <div class="dashboard-sidebar">
            <div class="sidebar-header">
                <h2>PawssibleVet</h2>
                <p>Welcome, <?php echo htmlspecialchars($_SESSION['admin_fullname']); ?></p>
            </div>
            <!-- Update this section in your dashboard.php file -->
<div class="sidebar-nav">
    <ul>
        <li class="active" data-page="overview">
            <i class="fas fa-home"></i>
            <span>Overview</span>
        </li>
        <li data-page="appointments">
            <i class="fas fa-calendar-alt"></i>
            <span>Appointments</span>
        </li>
        <li data-page="messages">
            <i class="fas fa-envelope"></i>
            <span>Messages</span>
        </li>
        <li data-page="inventory">
            <i class="fas fa-box"></i>
            <span>Inventory</span>
        </li>
        <li id="logout">
            <i class="fas fa-sign-out-alt"></i>
            <span>Logout</span>
        </li>
    </ul>
</div>
        </div>

        <!-- Main Content -->
        <div class="dashboard-main">
            <!-- Overview Section -->
            <div class="dashboard-section active" id="overview">
                <h2>Dashboard Overview</h2>
                <div class="stats-grid">
                    <div class="stat-card">
                        <i class="fas fa-calendar-check"></i>
                        <h3>Today's Appointments</h3>
                        <p id="today-appointments">Loading...</p>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-envelope"></i>
                        <h3>New Messages</h3>
                        <p id="new-messages">Loading...</p>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-exclamation-triangle"></i>
                        <h3>Low Stock Items</h3>
                        <p id="low-stock">Loading...</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="js/dashboard.js"></script>
</body>
</html>