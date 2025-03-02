document.addEventListener('DOMContentLoaded', function() {
    
    
    // Function to load dashboard statistics
    function loadDashboardStats() {
        fetch('get_dashboard_stats.php')
            .then(response => response.json())
            .then(data => {
                // Update appointments count
                document.getElementById('today-appointments').textContent = data.appointments;
                
                // Update messages count
                document.getElementById('new-messages').textContent = data.messages;
            })
            .catch(error => {
                console.error('Error loading dashboard stats:', error);
                document.getElementById('today-appointments').textContent = 'Error';
                document.getElementById('new-messages').textContent = 'Error';
            });
    }

    // Load stats immediately when dashboard loads
    loadDashboardStats();

    // Refresh stats every 5 minutes
    setInterval(loadDashboardStats, 5 * 60 * 1000);




     // Add logout functionality
     const logoutButton = document.getElementById('logout');
     if (logoutButton) {
         logoutButton.addEventListener('click', function(e) {
             e.preventDefault();
             
             if (confirm('Are you sure you want to logout?')) {
                 // Show loading state
                 logoutButton.classList.add('logging-out');
                 const originalText = logoutButton.querySelector('span').textContent;
                 logoutButton.querySelector('span').textContent = 'Logging out...';
 
                 fetch('logout.php', {
                     method: 'POST',
                     headers: {
                         'X-Requested-With': 'XMLHttpRequest'
                     }
                 })
                 .then(response => response.json())
                 .then(data => {
                     if (data.success) {
                         window.location.href = data.redirect;
                     } else {
                         throw new Error('Logout failed');
                     }
                 })
                 .catch(error => {
                     console.error('Error:', error);
                     alert('Failed to logout. Please try again.');
                     logoutButton.classList.remove('logging-out');
                     logoutButton.querySelector('span').textContent = originalText;
                 });
             }
         });
     }
 
     // Add session timeout warning
     let sessionTimeout;
     const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
     const WARNING_TIME = 5 * 60 * 1000; // 5 minutes before timeout
 
     function resetSessionTimer() {
         clearTimeout(sessionTimeout);
         sessionTimeout = setTimeout(showSessionWarning, SESSION_TIMEOUT - WARNING_TIME);
     }
 
     function showSessionWarning() {
         const warningModal = document.createElement('div');
         warningModal.className = 'session-warning-modal';
         warningModal.innerHTML = `
             <div class="session-warning-content">
                 <h3>Session Timeout Warning</h3>
                 <p>Your session will expire in 5 minutes. Would you like to stay logged in?</p>
                 <div class="session-warning-buttons">
                     <button class="btn-stay">Stay Logged In</button>
                     <button class="btn-logout">Logout Now</button>
                 </div>
             </div>
         `;
 
         document.body.appendChild(warningModal);
 
         warningModal.querySelector('.btn-stay').addEventListener('click', function() {
             // Extend session
             fetch('extend_session.php', {
                 method: 'POST',
                 headers: {
                     'X-Requested-With': 'XMLHttpRequest'
                 }
             })
             .then(response => response.json())
             .then(data => {
                 if (data.success) {
                     warningModal.remove();
                     resetSessionTimer();
                 }
             });
         });
 
         warningModal.querySelector('.btn-logout').addEventListener('click', function() {
             window.location.href = 'logout.php';
         });
 
         // Auto logout after 5 minutes if no action is taken
         setTimeout(() => {
             if (document.contains(warningModal)) {
                 window.location.href = 'logout.php';
             }
         }, WARNING_TIME);
     }
 
     // Initialize session timer
     resetSessionTimer();
 
     // Reset timer on user activity
     ['click', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
         document.addEventListener(event, resetSessionTimer, false);
     });



});