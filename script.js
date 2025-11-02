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
    
    // Add smooth hover effect for donation button
    const donationBtn = document.querySelector('.donation-btn');
    if (donationBtn) {
        donationBtn.addEventListener('click', function(e) {
            // For demo purposes, prevent default and show alert
            // In production, this would link to actual donation page
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                const btnLabel = this.querySelector('.btn-label').textContent;
                alert(`Thank you for considering a donation to: ${btnLabel}\n\nThis is a demo. In a live site, this would redirect to the donation page.`);
            }
        });
    }
});
