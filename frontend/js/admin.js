function fetchAppointments() {
    fetch('backend/admin/check_appointments.php')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Populate appointment data into the admin dashboard
    })
    .catch(error => console.error('Error:', error));
}

function fetchInventory() {
    fetch('backend/admin/check_inventory.php')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Populate inventory data into the admin dashboard
    })
    .catch(error => console.error('Error:', error));
}

// Call these functions when needed to fetch data
fetchAppointments();
fetchInventory();