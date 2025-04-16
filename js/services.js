// Service data
const services = [
    {
        id: 1,
        title: 'Engine Diagnostics',
        category: 'diagnostic',
        image: 'https://placehold.co/600x400/2c3e50/ffffff?text=Engine+Diagnostics',
        description: 'Comprehensive engine diagnostics using state-of-the-art equipment',
        features: ['Advanced diagnostic tools', 'Expert analysis', 'Detailed reports', 'Quick turnaround'],
        price: '$49.99'
    },
    {
        id: 2,
        title: 'Engine Repair',
        category: 'repair',
        image: 'https://placehold.co/600x400/2c3e50/ffffff?text=Engine+Repair',
        description: 'Professional engine repair services for all vehicle types',
        features: ['Certified mechanics', 'Quality parts', 'Warranty included', '24/7 support'],
        price: '$199.99'
    },
    {
        id: 3,
        title: 'Regular Maintenance',
        category: 'maintenance',
        image: 'https://placehold.co/600x400/2c3e50/ffffff?text=Regular+Maintenance',
        description: 'Regular engine maintenance to keep your vehicle running smoothly',
        features: ['Scheduled service', 'Oil changes', 'Filter replacement', 'Performance checks'],
        price: '$79.99'
    }
];

// Function to create service cards
function createServiceCards(filter = 'all') {
    const servicesContainer = document.querySelector('.services-container');
    if (!servicesContainer) return;

    const filteredServices = filter === 'all' 
        ? services 
        : services.filter(service => service.category === filter);

    servicesContainer.innerHTML = filteredServices.map(service => `
        <div class="service-card" data-aos="fade-up">
            <div class="service-image">
                <img src="${service.image}" alt="${service.title}" loading="lazy">
                <div class="service-overlay">
                    <a href="#contact" class="cta-button">Book Now</a>
                </div>
            </div>
            <div class="service-content">
                <div class="service-icon">
                    <i class="fas fa-cogs"></i>
                </div>
                <h3>${service.title}</h3>
                <p>${service.description}</p>
                <div class="service-features">
                    ${service.features.map(feature => `
                        <div class="feature-item">
                            <i class="fas fa-check"></i>
                            <span>${feature}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="service-price">${service.price}</div>
                <a href="#contact" class="book-now-btn">
                    <i class="fas fa-calendar-check"></i>
                    Book Service
                </a>
            </div>
        </div>
    `).join('');

    // Reinitialize AOS for new elements
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}

// Review Data
const reviews = [
    {
        name: 'John Smith',
        rating: 5,
        comment: 'Excellent service! The team was professional and completed the engine repair quickly. I highly recommend their expertise.',
        image: 'https://placehold.co/200x200/2c3e50/ffffff?text=JS',
        date: 'March 15, 2024'
    },
    {
        name: 'Sarah Johnson',
        rating: 5,
        comment: 'Very knowledgeable technicians. They explained everything clearly and the price was fair. Will definitely come back for future services.',
        image: 'https://placehold.co/200x200/2c3e50/ffffff?text=SJ',
        date: 'March 10, 2024'
    },
    {
        name: 'Mike Wilson',
        rating: 5,
        comment: 'Best engine tuning service I\'ve ever had. My car runs better than ever! The attention to detail was impressive.',
        image: 'https://placehold.co/200x200/2c3e50/ffffff?text=MW',
        date: 'March 5, 2024'
    }
];

// Function to create review cards
function createReviewCards() {
    const reviewsContainer = document.querySelector('.reviews-container');
    if (!reviewsContainer) return;

    reviewsContainer.innerHTML = reviews.map((review, index) => `
        <div class="review-card" data-aos="fade-up" data-aos-delay="${index * 100}">
            <div class="review-header">
                <div class="review-image">
                    <img src="${review.image}" alt="${review.name}" loading="lazy" onerror="this.src='./images/placeholder.jpg'">
                </div>
                <div class="review-info">
                    <h3 class="review-name">${review.name}</h3>
                    <div class="review-rating">
                        ${createStarRating(review.rating)}
                    </div>
                </div>
            </div>
            <div class="review-comment">
                ${review.comment}
            </div>
            <div class="review-date">
                <i class="far fa-calendar-alt"></i>
                ${review.date}
            </div>
        </div>
    `).join('');
}

// Create Star Rating
function createStarRating(rating) {
    return Array(5).fill('').map((_, index) => `
        <i class="fas fa-star ${index < rating ? 'filled' : ''}"></i>
    `).join('');
}

// Initialize Services and Reviews
document.addEventListener('DOMContentLoaded', () => {
    // Create initial cards
    createServiceCards();
    createReviewCards();

    // Handle Filter Buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            // Filter services
            createServiceCards(button.dataset.filter);
        });
    });

    // Handle Book Now Buttons
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('book-now-btn') || 
            e.target.closest('.book-now-btn')) {
            showBookingModal();
        }
    });
}); 