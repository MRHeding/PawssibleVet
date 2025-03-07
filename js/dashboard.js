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




     document.addEventListener('DOMContentLoaded', function() {
    // Handle sidebar navigation
    const sidebarItems = document.querySelectorAll('.sidebar-nav li');
    const dashboardSections = document.querySelectorAll('.dashboard-section');

    sidebarItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            sidebarItems.forEach(i => i.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');

            // Hide all sections
            dashboardSections.forEach(section => {
                section.classList.remove('active');
            });

            // Show selected section
            const pageId = this.getAttribute('data-page');
            const targetSection = document.getElementById(pageId);
            if (targetSection) {
                targetSection.classList.add('active');
                // If appointments section is selected, load appointments
                if (pageId === 'appointments') {
                    loadAppointments();
                }
            }
        });
    });

    // Function to load appointments
    async function loadAppointments() {
        const tbody = document.querySelector('#appointments-table tbody');
        const dateFilter = document.getElementById('appointment-date-filter').value;
        const statusFilter = document.getElementById('appointment-status-filter').value;

        try {
            const response = await fetch('get_appointments.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    date: dateFilter,
                    status: statusFilter
                })
            });

            const appointments = await response.json();
            
            // Clear existing rows
            tbody.innerHTML = '';

            // Add new rows
            appointments.forEach(appointment => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${appointment.datetime}</td>
                    <td>${appointment.petOwner}</td>
                    <td>${appointment.petName}</td>
                    <td>${appointment.service}</td>
                    <td><span class="status-badge ${appointment.status.toLowerCase()}">${appointment.status}</span></td>
                    <td>
                        <button class="btn-action edit" data-id="${appointment.id}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-action delete" data-id="${appointment.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        } catch (error) {
            console.error('Error loading appointments:', error);
        }
    }

    // Add event listeners for filters
    document.getElementById('appointment-date-filter').addEventListener('change', loadAppointments);
    document.getElementById('appointment-status-filter').addEventListener('change', loadAppointments);
});








    // Handle sidebar navigation
    const sidebarItems = document.querySelectorAll('.sidebar-nav li');
    const dashboardSections = document.querySelectorAll('.dashboard-section');

    sidebarItems.forEach(item => {
        item.addEventListener('click', function() {
            // Skip if this is the logout button
            if (this.id === 'logout') return;

            // Remove active class from all items
            sidebarItems.forEach(i => i.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');

            // Hide all sections
            dashboardSections.forEach(section => {
                section.classList.remove('active');
            });

            // Show selected section
            const pageId = this.getAttribute('data-page');
            const targetSection = document.getElementById(pageId);
            if (targetSection) {
                targetSection.classList.add('active');
                // If appointments section is selected, load appointments data
                if (pageId === 'appointments') {
                    loadAppointments();
                }
            }
        });
    });

    // Function to load appointments
    function loadAppointments() {
        const tbody = document.querySelector('#appointments-table tbody');
        const dateFilter = document.getElementById('appointment-date-filter').value;
        const statusFilter = document.getElementById('appointment-status-filter').value;

        // Show loading state
        tbody.innerHTML = '<tr><td colspan="6" class="text-center">Loading appointments...</td></tr>';

        fetch('get_appointments.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                date: dateFilter,
                status: statusFilter
            })
        })
        .then(response => response.json())
        .then(appointments => {
            tbody.innerHTML = ''; // Clear loading message

            if (appointments.length === 0) {
                tbody.innerHTML = '<tr><td colspan="6" class="text-center">No appointments found</td></tr>';
                return;
            }

            appointments.forEach(appointment => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${appointment.datetime}</td>
                    <td>${appointment.petOwner}</td>
                    <td>${appointment.petName}</td>
                    <td>${appointment.service}</td>
                    <td><span class="status-badge ${appointment.status.toLowerCase()}">${appointment.status}</span></td>
                    <td>
                        <button class="btn-action edit" onclick="editAppointment(${appointment.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-action delete" onclick="deleteAppointment(${appointment.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error loading appointments:', error);
            tbody.innerHTML = '<tr><td colspan="6" class="text-center text-danger">Error loading appointments</td></tr>';
        });
    }

    // Add event listeners for appointment filters
    const dateFilter = document.getElementById('appointment-date-filter');
    const statusFilter = document.getElementById('appointment-status-filter');
    if (dateFilter && statusFilter) {
        dateFilter.addEventListener('change', loadAppointments);
        statusFilter.addEventListener('change', loadAppointments);
    }

    // Add this to your existing dashboard.js file
function loadAppointments() {
    const tableContainer = document.querySelector('.table-container');
    const tbody = document.querySelector('#appointments-table tbody');
    
    // Show loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div>
            <i class="fas fa-spinner fa-spin"></i>
            <span>Loading appointments...</span>
        </div>
    `;
    tableContainer.appendChild(loadingOverlay);

    // Get filter values
    const dateFilter = document.getElementById('appointment-date-filter').value;
    const statusFilter = document.getElementById('appointment-status-filter').value;

    // Fetch appointments from the server
    fetch('get_appointments.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            date: dateFilter,
            status: statusFilter
        })
    })
    .then(response => response.json())
    .then(data => {
        // Remove loading overlay
        loadingOverlay.remove();
        
        tbody.innerHTML = '';
        
        if (data.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6">
                        <div class="empty-state">
                            <i class="fas fa-calendar-times"></i>
                            <p>No appointments found</p>
                        </div>
                    </td>
                </tr>
            `;
            return;
        }

        data.forEach(appointment => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${appointment.datetime}</td>
                <td>
                    <div>${appointment.petOwner}</div>
                    <div style="font-size: 0.85em; color: #666;">
                        ${appointment.email}<br>${appointment.phone}
                    </div>
                </td>
                <td>
                    <div>${appointment.petName}</div>
                    <div style="font-size: 0.85em; color: #666;">
                        ${appointment.petType}
                    </div>
                </td>
                <td>${appointment.service}</td>
                <td>
                    <span class="status-badge ${appointment.status.toLowerCase()}">
                        ${appointment.status}
                    </span>
                </td>
                <td>
                    <button class="btn-action edit" onclick="editAppointment(${appointment.id})" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-action delete" onclick="deleteAppointment(${appointment.id})" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });
    })
    .catch(error => {
        // Remove loading overlay
        loadingOverlay.remove();
        
        tbody.innerHTML = `
            <tr>
                <td colspan="6">
                    <div class="error-message">
                        <i class="fas fa-exclamation-circle"></i>
                        <p>Failed to load appointments. Please try again.</p>
                    </div>
                </td>
            </tr>
        `;
        console.error('Error:', error);
    });
}


});