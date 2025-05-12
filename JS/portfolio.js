// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Portfolio filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Filter projects
                projectItems.forEach(item => {
                    if (filterValue === 'all') {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.classList.add('revealed');
                        }, 100);
                    } else {
                        if (item.getAttribute('data-category') === filterValue) {
                            item.style.display = 'block';
                            setTimeout(() => {
                                item.classList.add('revealed');
                            }, 100);
                        } else {
                            item.classList.remove('revealed');
                            setTimeout(() => {
                                item.style.display = 'none';
                            }, 500);
                        }
                    }
                });
            });
        });
    }
    
    // Anchor link handling for deep linking
    function handleAnchorLinks() {
        if (window.location.hash) {
            const id = window.location.hash.substring(1);
            const element = document.getElementById(id);
            
            if (element) {
                setTimeout(() => {
                    window.scrollTo({
                        top: element.offsetTop - 100,
                        behavior: 'smooth'
                    });
                    
                    // Highlight the element
                    element.classList.add('highlight');
                    setTimeout(() => {
                        element.classList.remove('highlight');
                    }, 2000);
                }, 500);
                
                // If the element has a category, activate that filter
                const category = element.getAttribute('data-category');
                if (category) {
                    const filterBtn = document.querySelector(`.filter-btn[data-filter="${category}"]`);
                    if (filterBtn) {
                        filterBtn.click();
                    }
                }
            }
        }
    }
    
    // Handle anchor links on page load
    handleAnchorLinks();
    
    // Add CSS for project highlight animation
    const style = document.createElement('style');
    style.textContent = `
        .project-item.highlight {
            box-shadow: 0 0 0 3px var(--accent-primary);
            animation: pulse 2s;
        }
        
        @keyframes pulse {
            0% {
                box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.7);
            }
            70% {
                box-shadow: 0 0 0 10px rgba(76, 175, 80, 0);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(76, 175, 80, 0);
            }
        }
    `;
    document.head.appendChild(style);
}); 