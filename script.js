// Read More Functionality
document.addEventListener('DOMContentLoaded', function() {
    const readMoreBtn = document.getElementById('readMoreBtn');
    const fullStory = document.getElementById('fullStory');
    const btnText = readMoreBtn.querySelector('.btn-text');
    
    readMoreBtn.addEventListener('click', function() {
        // Toggle the expanded class
        fullStory.classList.toggle('expanded');
        readMoreBtn.classList.toggle('expanded');
        
        // Update button text
        if (fullStory.classList.contains('expanded')) {
            btnText.textContent = 'Read Less';
        } else {
            btnText.textContent = 'Read More';
        }
        
        // Smooth scroll to the story section when expanding
        if (fullStory.classList.contains('expanded')) {
            setTimeout(() => {
                fullStory.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        }
    });
    
    // Optional: Add fade-in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe gallery items for scroll animations
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
    
    // Add smooth hover effect for donation buttons
    const donationBtns = document.querySelectorAll('.donation-btn');
    donationBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // For demo purposes, prevent default and show alert
            // In production, these would link to actual donation pages
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                const btnLabel = this.querySelector('.btn-label').textContent;
                alert(`Thank you for considering a donation to: ${btnLabel}\n\nThis is a demo. In a live site, this would redirect to the donation page.`);
            }
        });
    });
});
