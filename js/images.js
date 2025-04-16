// Image Upload and Preview Functionality
const imageInput = document.querySelector('#image-upload');
const previewContainer = document.querySelector('#preview-container');
const maxImages = 3;

if (imageInput) {
    imageInput.addEventListener('change', handleImageUpload);
}

function handleImageUpload(e) {
    const files = Array.from(e.target.files);
    
    // Clear previous previews if needed
    if (previewContainer.children.length + files.length > maxImages) {
        showNotification(`You can only upload up to ${maxImages} images`, 'error');
        return;
    }
    
    files.forEach(file => {
        if (!file.type.startsWith('image/')) {
            showNotification('Please upload only image files', 'error');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
            createPreviewImage(e.target.result);
        };
        reader.readAsDataURL(file);
    });
}

function createPreviewImage(src) {
    const previewDiv = document.createElement('div');
    previewDiv.className = 'preview-image';
    
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Preview';
    
    const removeButton = document.createElement('div');
    removeButton.className = 'remove-image';
    removeButton.innerHTML = '×';
    removeButton.onclick = () => {
        previewDiv.remove();
        updateImageInput();
    };
    
    previewDiv.appendChild(img);
    previewDiv.appendChild(removeButton);
    previewContainer.appendChild(previewDiv);
    updateImageInput();
}

function updateImageInput() {
    // Create a new FileList with the remaining images
    const dataTransfer = new DataTransfer();
    const previewImages = previewContainer.querySelectorAll('img');
    
    previewImages.forEach(img => {
        // Convert base64 to blob
        fetch(img.src)
            .then(res => res.blob())
            .then(blob => {
                const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
                dataTransfer.items.add(file);
                imageInput.files = dataTransfer.files;
            });
    });
}

// Lazy Loading for Images
document.addEventListener('DOMContentLoaded', () => {
    // Handle image upload preview
    const engineImage = document.getElementById('engineImage');
    const imageUploadLabel = document.querySelector('.image-upload-label');
    
    if (engineImage && imageUploadLabel) {
        engineImage.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                // Validate file type
                const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
                if (!validTypes.includes(file.type)) {
                    showNotification('Please upload a valid image file (JPG, PNG)', 'error');
                    engineImage.value = '';
                    return;
                }
                
                // Validate file size (max 5MB)
                if (file.size > 5 * 1024 * 1024) {
                    showNotification('Image size should be less than 5MB', 'error');
                    engineImage.value = '';
                    return;
                }
                
                const reader = new FileReader();
                reader.onload = (e) => {
                    imageUploadLabel.style.backgroundImage = `url(${e.target.result})`;
                    imageUploadLabel.style.backgroundSize = 'cover';
                    imageUploadLabel.style.backgroundPosition = 'center';
                    imageUploadLabel.querySelector('.upload-text').textContent = file.name;
                    imageUploadLabel.querySelector('.upload-subtext').textContent = `${(file.size / 1024 / 1024).toFixed(2)}MB`;
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    // Lazy load images
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('loading' in HTMLImageElement.prototype) {
        images.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Show notification helper
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        setTimeout(() => notification.classList.add('show'), 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
});

// Image Error Handling
document.querySelectorAll('img').forEach(img => {
    img.onerror = function() {
        this.src = 'images/placeholder.jpg';
        this.alt = 'Image not available';
    };
});

// Image Zoom Effect for Service Cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    const img = card.querySelector('.service-card-image');
    if (img) {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            img.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`;
        });
        
        card.addEventListener('mouseleave', () => {
            img.style.transform = 'none';
        });
    }
}); 