<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login - PawssibleVet</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <div class="container">
        <main class="content">
            <div class="card">
                <h2>Admin Login</h2>
                <?php
                    if (isset($_GET['registration']) && $_GET['registration'] == 'success') {
                        echo '<div class="alert alert-success fade-in">Registration successful! Please login with your credentials.</div>';
                    }
                ?>
                <form action="authenticate-admin.php" method="POST" class="fade-in">
                    <div class="form-group">
                        <label for="username">Username</label>
                        <input type="text" id="username" name="username" required>
                    </div>

                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" required>
                    </div>

                    <button type="submit">Login</button>
                </form>
            </div>
        </main>
    </div>

    <style>
        .alert {
            padding: 1rem;
            margin-bottom: 1rem;
            border-radius: 8px;
            font-weight: 500;
        }
        .alert-success {
            background-color: #e6ffe6;
            color: #006600;
            border: 1px solid #00cc00;
        }
    </style>
</body>
</html>