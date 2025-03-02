document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const navLinks = document.querySelectorAll('.nav-links li');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (this.id === 'logout') {
                window.location.href = 'logout.php';
                return;
            }
            
            // Remove active class from all links and tabs
            navLinks.forEach(l => l.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
            
            // Add active class to clicked link and corresponding tab
            this.classList.add('active');
            document.getElementById(`${this.dataset.tab}-tab`).classList.add('active');
            
            // Load content based on active tab
            loadTabContent(this.dataset.tab);
        });
    });

    // Initial load of dashboard data
    loadDashboardData();
    
    // Modal functionality
    const modal = document.getElementById('inventory-modal');
    const addInventoryBtn = document.getElementById('add-inventory-btn');
    const closeBtn = document.querySelector('.close');
    
    addInventoryBtn.onclick = () => {
        document.getElementById('inventory-form').reset();
        document.getElementById('item-id').value = '';
        modal.style.display = 'block';
    }
    
    closeBtn.onclick = () => {
        modal.style.display = 'none';
    }
    
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }
    
    // Form submission
    document.getElementById('inventory-form').addEventListener('submit', handleInventorySubmit);
});

function loadDashboardData() {
    // Load counts for dashboard cards
    fetch('admin-api.php?action=get_counts')
        .then(response => response.json())
        .then(data => {
            document.getElementById('total-messages').textContent = data.messages;
            document.getElementById('total-appointments').textContent = data.appointments;
            document.getElementById('total-inventory').textContent = data.inventory;
        });
}

function loadTabContent(tab) {
    switch(tab) {
        case 'messages':
            loadMessages();
            break;
        case 'inventory':
            loadInventory();
            break;
        case 'appointments':
            loadAppointments();
            break;
    }
}

function loadMessages() {
    fetch('admin-api.php?action=get_messages')
        .then(response => response.json())
        .then(messages => {
            const container = document.getElementById('messages-container');
            container.innerHTML = `
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Message</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${messages.map(message => `
                            <tr>
                                <td>${new Date(message.date).toLocaleDateString()}</td>
                                <td>${message.name}</td>
                                <td>${message.email}</td>
                                <td>${message.message}</td>
                                <td>
                                    <button onclick="deleteMessage(${message.id})" class="delete-btn">Delete</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        });
}

function loadInventory() {
    fetch('admin-api.php?action=get_inventory')
        .then(response => response.json())
        .then(items => {
            const container = document.getElementById('inventory-container');
            container.innerHTML = `
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${items.map(item => `
                            <tr>
                                <td>${item.name}</td>
                                <td>${item.quantity}</td>
                                <td>$${item.price}</td>
                                <td class="action-buttons">
                                    <button onclick="editInventoryItem(${item.id})" class="edit-btn">Edit</button>
                                    <button onclick="deleteInventoryItem(${item.id})" class="delete-btn">Delete</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        });
}

function loadAppointments() {
    fetch('admin-api.php?action=get_appointments')
        .then(response => response.json())
        .then(appointments => {
            const container = document.getElementById('appointments-container');
            container.innerHTML = `
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Pet Owner</th>
                            <th>Pet Name</th>
                            <th>Service</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${appointments.map(apt => `
                            <tr>
                                <td>${new Date(apt.date).toLocaleDateString()}</td>
                                <td>${apt.time}</td>
                                <td>${apt.owner_name}</td>
                                <td>${apt.pet_name}</td>
                                <td>${apt.service}</td>
                                <td>${apt.status}</td>
                                <td class="action-buttons">
                                    <button onclick="updateAppointmentStatus(${apt.id}, 'confirmed')" 
                                            class="btn-primary">Confirm</button>
                                    <button onclick="updateAppointmentStatus(${apt.id}, 'cancelled')" 
                                            class="delete-btn">Cancel</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        });
}

function handleInventorySubmit(e) {
    e.preventDefault();
    const formData = {
        id: document.getElementById('item-id').value,
        name: document.getElementById('item-name').value,
        quantity: document.getElementById('item-quantity').value,
        price: document.getElementById('item-price').value
    };

    fetch('admin-api.php?action=save_inventory', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            document.getElementById('inventory-modal').style.display = 'none';
            loadInventory();
        } else {
            alert('Error saving inventory item');
        }
    });
}