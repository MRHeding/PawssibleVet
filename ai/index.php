<?php
session_start(); // Start a session for multi-turn conversations

// Include the backend logic for API calls
require 'api.php';

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $userMessage = sanitizeInput($_POST['message']);
    if (!empty($userMessage)) {
        // Store the user's message in the session
        $_SESSION['chat_history'][] = ['role' => 'user', 'content' => $userMessage, 'timestamp' => date('H:i')];

        // Get the AI's response
        $chatResponse = getChatResponse($userMessage, $_SESSION['chat_history']);
        $_SESSION['chat_history'][] = ['role' => 'bot', 'content' => $chatResponse, 'timestamp' => date('H:i')];
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Floating Chatbot</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- Floating Chat Button -->
    <div class="chat-button" id="chat-button">
        <span>💬 Pawssible AI</span>
    </div>

    <!-- Chat Container -->
    <div class="chat-container" id="chat-container">
        <div class="chat-header">
            Pawssible Solutions Veterinary Clinic
            <button class="close-button" id="close-button">×</button>
        </div>
        <div class="chat-window" id="chat-window">
            <?php if (!empty($_SESSION['chat_history'])): ?>
                <?php foreach ($_SESSION['chat_history'] as $message): ?>
                    <div class="message <?php echo $message['role'] === 'user' ? 'user-message' : 'bot-message'; ?>">
                        <div class="text"><?php echo nl2br($message['content']); ?></div>
                        <div class="timestamp"><?php echo $message['timestamp']; ?></div>
                    </div>
                <?php endforeach; ?>
            <?php endif; ?>
        </div>
        <form class="chat-form" id="chat-form">
            <input type="text" name="message" id="message" placeholder="Type your message..." required>
            <button type="submit">Send</button>
        </form>
    </div>
    <script src="script.js"></script>
</body>
</html>