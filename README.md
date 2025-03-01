# Veterinary Clinic Management System

## Overview
This project is a modern Veterinary Clinic Management System that includes an appointment system and an inventory management system. The backend is built with PHP and MySQL, and the frontend is built with HTML, CSS, and JavaScript.

## Features
- Users can set an appointment without creating an account.
- Admin can check and manage appointments and inventory items.
- Pages include Home, About, Contact Us, and Set Appointment.

## Project Structure
```
online_vet_management/
├── backend/
│   ├── db/
│   │   └── db_connection.php
│   ├── api/
│   │   ├── appointments.php
│   │   ├── inventory.php
│   └── admin/
│       ├── check_appointments.php
│       ├── check_inventory.php
├── frontend/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── app.js
│   │   └── admin.js
│   ├── index.html
│   ├── about.html
│   ├── contact.html
│   └── appointment.html
└── README.md
```

## Installation
1. Clone the repository.
2. Create a MySQL database called `vet_clinic`.
3. Import the `vet_clinic.sql` file to create the necessary tables.
4. Update the `db_connection.php` file with your database credentials.
5. Run the project on a local server.

## Usage
- Open `index.html` to view the homepage.
- Navigate to other pages using the navigation bar.
- Fill out the appointment form to set an appointment.
- Admin can access the appointment and inventory data via the backend PHP scripts.

## License
This project is licensed under the MIT License.