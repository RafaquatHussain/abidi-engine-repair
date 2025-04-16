// DOM Elements
const adminLoginForm = document.getElementById('adminLoginForm');
const customerLoginForm = document.getElementById('customerLoginForm');
const passwordToggles = document.querySelectorAll('.toggle-password');

// Toggle Password Visibility
passwordToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
        const passwordInput = this.previousElementSibling;
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Toggle eye icon
        const icon = this.querySelector('i');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
    });
});

// Admin Login Form Handler
if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('adminPassword').value;
        const securityCode = document.getElementById('securityCode').value;
        const remember = document.getElementById('adminRemember').checked;
        
        try {
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
            submitBtn.disabled = true;
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // TODO: Replace with actual API call
            if (username === 'admin' && password === 'admin123' && securityCode === '123456') {
                showNotification('Login successful! Redirecting to dashboard...', 'success');
                
                // Store remember me preference
                if (remember) {
                    localStorage.setItem('adminRemembered', 'true');
                }
                
                // Redirect to admin dashboard
                setTimeout(() => {
                    window.location.href = 'admin-dashboard.html';
                }, 1500);
            } else {
                throw new Error('Invalid credentials');
            }
        } catch (error) {
            showNotification(error.message || 'Login failed. Please try again.', 'error');
        } finally {
            // Reset button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Customer Login Form Handler
if (customerLoginForm) {
    customerLoginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember').checked;
        
        try {
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
            submitBtn.disabled = true;
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // TODO: Replace with actual API call
            if (email === 'customer@example.com' && password === 'password123') {
                showNotification('Login successful! Redirecting to dashboard...', 'success');
                
                // Store remember me preference
                if (remember) {
                    localStorage.setItem('customerRemembered', 'true');
                }
                
                // Redirect to customer dashboard
                setTimeout(() => {
                    window.location.href = 'customer-dashboard.html';
                }, 1500);
            } else {
                throw new Error('Invalid email or password');
            }
        } catch (error) {
            showNotification(error.message || 'Login failed. Please try again.', 'error');
        } finally {
            // Reset button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove any existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add notification to DOM
    document.body.appendChild(notification);
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        backgroundColor: type === 'success' ? '#2ecc71' : type === 'error' ? '#e74c3c' : '#3498db',
        color: 'white',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        opacity: '0',
        transform: 'translateX(100%)',
        transition: 'all 0.3s ease',
        zIndex: '9999'
    });
    
    // Show notification with animation
    requestAnimationFrame(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    });
    
    // Remove notification after delay
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Check for remembered login
document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('adminRemembered') === 'true') {
        document.getElementById('adminRemember').checked = true;
    }
    if (localStorage.getItem('customerRemembered') === 'true') {
        document.getElementById('remember').checked = true;
    }
});

// Social login handlers
document.querySelectorAll('.social-button').forEach(button => {
    button.addEventListener('click', function() {
        const provider = this.classList.contains('google') ? 'Google' : 'Facebook';
        showNotification(`${provider} login coming soon!`, 'info');
    });
});

// Add notification styles
const style = document.createElement('style');
style.textContent = `
    .auth-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 10px;
        background: white;
        color: #333;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        transform: translateX(120%);
        transition: transform 0.3s ease;
        z-index: 1000;
    }
    
    .auth-notification.show {
        transform: translateX(0);
    }
    
    .auth-notification.success {
        background: #2ecc71;
        color: white;
    }
    
    .auth-notification.error {
        background: #e74c3c;
        color: white;
    }
    
    .auth-notification.info {
        background: #3498db;
        color: white;
    }
`;
document.head.appendChild(style);

// Remember me functionality
document.querySelectorAll('input[name="remember"]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            localStorage.setItem('remember_me', 'true');
        } else {
            localStorage.removeItem('remember_me');
        }
    });
    
    // Check saved preference
    if (localStorage.getItem('remember_me') === 'true') {
        checkbox.checked = true;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Get form and elements
    const loginForm = document.getElementById('loginForm');
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');
    
    // Toggle password visibility
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Toggle eye icon
            const icon = togglePassword.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-eye');
                icon.classList.toggle('fa-eye-slash');
            }
        });
    }
    
    // Handle form submission
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(loginForm);
            const data = Object.fromEntries(formData);
            
            try {
                // Show loading state
                const submitBtn = loginForm.querySelector('button[type="submit"]');
                if (!submitBtn) return;

                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
                submitBtn.disabled = true;
                
                // Simulate API call (replace with actual API call)
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // For demo purposes, check if email and password match demo credentials
                if (data.email === 'demo@abidiservice.com' && data.password === 'demo123') {
                    showNotification('Login successful! Redirecting...', 'success');
                    
                    // Store auth state
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('user', JSON.stringify({
                        email: data.email,
                        name: 'Demo User'
                    }));
                    
                    // Redirect after a short delay
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 1500);
                } else {
                    throw new Error('Invalid credentials');
                }
            } catch (error) {
                showNotification(error.message || 'Login failed. Please try again.', 'error');
                
                // Reset button
                const submitBtn = loginForm.querySelector('button[type="submit"]');
                if (submitBtn) {
                    submitBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login';
                    submitBtn.disabled = false;
                }
            }
        });
    }
    
    // Handle social login buttons
    const socialButtons = document.querySelectorAll('.social-button');
    socialButtons.forEach(button => {
        button.addEventListener('click', () => {
            const provider = button.classList.contains('google') ? 'Google' : 'Facebook';
            showNotification(`${provider} login is not implemented in this demo`, 'info');
        });
    });

    // Handle remember me functionality
    const rememberCheckbox = document.querySelector('input[name="remember"]');
    if (rememberCheckbox) {
        // Check saved preference
        if (localStorage.getItem('remember_me') === 'true') {
            rememberCheckbox.checked = true;
        }

        rememberCheckbox.addEventListener('change', function() {
            if (this.checked) {
                localStorage.setItem('remember_me', 'true');
            } else {
                localStorage.removeItem('remember_me');
            }
        });
    }
}); 