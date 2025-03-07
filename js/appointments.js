// Function to handle edit appointment
function editAppointment(appointmentId) {
    // Show edit modal
    const modal = document.createElement('div');
    modal.className = 'modal fade show';
    modal.id = 'editAppointmentModal';
    modal.style.display = 'block';
    modal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Edit Appointment</h5>
                    <button type="button" class="close" onclick="closeModal('editAppointmentModal')">
                        <span>&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="editAppointmentForm">
                        <input type="hidden" id="appointmentId" value="${appointmentId}">
                        
                        <div class="form-group">
                            <label for="appointmentDate">Date</label>
                            <input type="date" class="form-control" id="appointmentDate" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="appointmentTime">Time</label>
                            <input type="time" class="form-control" id="appointmentTime" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="status">Status</label>
                            <select class="form-control" id="status" required>
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="notes">Notes</label>
                            <textarea class="form-control" id="notes" rows="3"></textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onclick="closeModal('editAppointmentModal')">Close</button>
                    <button type="button" class="btn btn-primary" onclick="saveAppointmentChanges(${appointmentId})">Save changes</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.classList.add('modal-open');
    
    // Fetch appointment details and populate the form
    fetch(`get_appointment.php?id=${appointmentId}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('appointmentDate').value = data.date;
            document.getElementById('appointmentTime').value = data.time;
            document.getElementById('status').value = data.status;
            document.getElementById('notes').value = data.notes;
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to load appointment details');
        });
}

// Function to save appointment changes
function saveAppointmentChanges(appointmentId) {
    const form = document.getElementById('editAppointmentForm');
    const formData = {
        id: appointmentId,
        date: document.getElementById('appointmentDate').value,
        time: document.getElementById('appointmentTime').value,
        status: document.getElementById('status').value,
        notes: document.getElementById('notes').value
    };

    fetch('update_appointment.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            closeModal('editAppointmentModal');
            // Refresh the appointments table
            loadAppointments();
            showToast('Success', 'Appointment updated successfully', 'success');
        } else {
            throw new Error(data.message || 'Failed to update appointment');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showToast('Error', error.message, 'error');
    });
}

// Function to delete appointment
function deleteAppointment(appointmentId) {
    if (confirm('Are you sure you want to delete this appointment?')) {
        fetch('delete_appointment.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: appointmentId })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Refresh the appointments table
                loadAppointments();
                showToast('Success', 'Appointment deleted successfully', 'success');
            } else {
                throw new Error(data.message || 'Failed to delete appointment');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showToast('Error', error.message, 'error');
        });
    }
}

// Utility function to close modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.remove();
        document.body.classList.remove('modal-open');
    }
}

// Toast notification function
function showToast(title, message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-header">
            <strong>${title}</strong>
            <button type="button" class="close" onclick="this.parentElement.parentElement.remove()">
                <span>&times;</span>
            </button>
        </div>
        <div class="toast-body">
            ${message}
        </div>
    `;
    
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 5000); // Remove after 5 seconds
}