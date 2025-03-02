<?php
session_start();

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PawssibleVet Admin Dashboard</title>
    <link rel="stylesheet" href="admin-style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <div class="admin-container">
        <nav class="admin-sidebar">
            <div class="logo">
                <h2>PawssibleVet Admin</h2>
            </div>
            <ul class="nav-links">
                <li class="active" data-tab="dashboard"><i class="fas fa-tachometer-alt"></i> Dashboard</li>
                <li data-tab="messages"><i class="fas fa-envelope"></i> Messages</li>
                <li data-tab="inventory"><i class="fas fa-box"></i> Inventory</li>
                <li data-tab="appointments"><i class="fas fa-calendar-check"></i> Appointments</li>
                <li id="logout"><i class="fas fa-sign-out-alt"></i> Logout</li>
            </ul>
        </nav>

        <main class="admin-content">
            <div id="dashboard-tab" class="tab-content active">
                <h2>Dashboard Overview</h2>
                <div class="dashboard-cards">
                    <div class="card">
                        <h3>Total Messages</h3>
                        <p id="total-messages">Loading...</p>
                    </div>
                    <div class="card">
                        <h3>Total Appointments</h3>
                        <p id="total-appointments">Loading...</p>
                    </div>
                    <div class="card">
                        <h3>Inventory Items</h3>
                        <p id="total-inventory">Loading...</p>
                    </div>
                </div>
            </div>

            <div id="messages-tab" class="tab-content">
                <h2>User Messages</h2>
                <div class="messages-list" id="messages-container"></div>
            </div>

            <div id="inventory-tab" class="tab-content">
                <h2>Inventory Management</h2>
                <button id="add-inventory-btn" class="btn-primary">Add New Item</button>
                <div class="inventory-list" id="inventory-container"></div>
            </div>

            <div id="appointments-tab" class="tab-content">
                <h2>Appointments</h2>
                <div class="appointments-list" id="appointments-container"></div>
            </div>
        </main>
    </div>

    <!-- Add Item Modal -->
    <div id="inventory-modal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Add/Edit Inventory Item</h2>
            <form id="inventory-form">
                <input type="hidden" id="item-id">
                <div class="form-group">
                    <label for="item-name">Item Name</label>
                    <input type="text" id="item-name" required>
                </div>
                <div class="form-group">
                    <label for="item-quantity">Quantity</label>
                    <input type="number" id="item-quantity" required>
                </div>
                <div class="form-group">
                    <label for="item-price">Price</label>
                    <input type="number" step="0.01" id="item-price" required>
                </div>
                <button type="submit" class="btn-primary">Save Item</button>
            </form>
        </div>
    </div>

    <script src="admin.js"></script>
</body>
</html>