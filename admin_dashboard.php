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
    <title>Admin Dashboard - Pawssible Solutions Veterinary Clinic</title>
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/dashboard.css">
    <!-- Add Font Awesome for icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <script src="js/appointments.js" defer></script>
</head>
<body>
    <div class="dashboard-container">
        <!-- Sidebar -->
        <div class="dashboard-sidebar">
            <div class="sidebar-header">
                <h2>Pawssible Solutions Veterinary Clinic</h2>
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

<!-- Appointments Section -->
<div class="dashboard-section" id="appointments">
    <div class="appointments-container">
        <div class="appointments-header">
            <h2>Appointments Management</h2>
            <div class="action-bar">
                <div class="filter-group">
                    <label for="appointment-date-filter">Filter by Date:</label>
                    <input type="date" id="appointment-date-filter">
                </div>
                <div class="filter-group">
                    <label for="appointment-status-filter">Filter by Status:</label>
                    <select id="appointment-status-filter">
                        <option value="">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
                <button class="btn-refresh" onclick="loadAppointments()">
                    <i class="fas fa-sync-alt"></i> Refresh
                </button>
            </div>
        </div>
        <div class="table-container">
            <div class="table-responsive">
                <table id="appointments-table">
                    <thead>
                        <tr>
                            <th>Date & Time</th>
                            <th>Pet Owner</th>
                            <th>Pet Name</th>
                            <th>Service</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Appointments will be loaded here -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
<script src="js/dashboard.js"></script>
</body>
</html>