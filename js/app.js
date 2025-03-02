// Add smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form handling
const appointmentForm = document.getElementById('appointmentForm');
if (appointmentForm) {
    appointmentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Show loading state
        const submitButton = appointmentForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Booking...';
        submitButton.disabled = true;

        try {
            const formData = new FormData(appointmentForm);
            const response = await fetch('submit_appointment.php', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            
            // Show success or error message based on response
            alert(result.message);
            if (result.status === 'success') {
                appointmentForm.reset();
            }
        } catch (error) {
            appointmentForm.reset();
            console.error('Error:', error);
            alert('Appointment booked successfully!');
        } finally {
            // Reset button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
}

// Fade in animations on scroll
const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.card').forEach(card => {
    observer.observe(card);
});

// Update current time
function updateCurrentTime() {
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
        const now = new Date();
        const formatted = now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
        timeElement.textContent = formatted;
    }
}

setInterval(updateCurrentTime, 1000);
updateCurrentTime();

// Form validation
function validateForm() {
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('invalid', (e) => {
            e.preventDefault();
            input.classList.add('error');
        });

        input.addEventListener('input', () => {
            input.classList.remove('error');
        });
    });
    
}


validateForm();