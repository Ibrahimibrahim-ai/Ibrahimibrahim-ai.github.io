// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function() {
            navLinks.classList.toggle('show');
            // Toggle between hamburger and close icon
            const icon = mobileNavToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Hero section background animation
    const particlesContainer = document.querySelector('.particles-container');
    if (particlesContainer) {
        // Configuration
        const particleCount = 15; // Number of nodes
        const particleSizeMin = 3;
        const particleSizeMax = 8;
        const connectionDistance = 200; // Max distance to draw connections
        const particles = [];
        const connections = [];
        
        // Generate particles
        for (let i = 0; i < particleCount; i++) {
            createParticle();
        }
        
        // Create connections between particles
        updateConnections();
        
        // Animation loop for particles
        function animateParticles() {
            particles.forEach(particle => {
                // Update position
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                
                // Boundary check and bounce
                if (particle.x <= 0 || particle.x >= window.innerWidth) {
                    particle.speedX *= -1;
                }
                if (particle.y <= 0 || particle.y >= window.innerHeight) {
                    particle.speedY *= -1;
                }
                
                // Update DOM element position
                particle.element.style.left = `${particle.x}px`;
                particle.element.style.top = `${particle.y}px`;
            });
            
            // Update connections
            updateConnections();
            
            // Continue animation
            requestAnimationFrame(animateParticles);
        }
        
        // Create a single particle
        function createParticle() {
            const element = document.createElement('div');
            element.classList.add('particle');
            
            // Random size
            const size = Math.random() * (particleSizeMax - particleSizeMin) + particleSizeMin;
            element.style.width = `${size}px`;
            element.style.height = `${size}px`;
            
            // Random position
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;
            
            // Random speed
            const speedX = (Math.random() - 0.5) * 0.5;
            const speedY = (Math.random() - 0.5) * 0.5;
            
            // Random delay for pulse animation
            element.style.animationDelay = `${Math.random() * 2}s`;
            
            // Add to DOM
            particlesContainer.appendChild(element);
            
            // Store particle data
            particles.push({
                element,
                x,
                y,
                size,
                speedX,
                speedY
            });
        }
        
        // Update connections between particles
        function updateConnections() {
            // Clear existing connections
            connections.forEach(conn => {
                conn.element.remove();
            });
            connections.length = 0;
            
            // Check distances between particles and create connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const p1 = particles[i];
                    const p2 = particles[j];
                    
                    // Calculate distance
                    const dx = p2.x - p1.x;
                    const dy = p2.y - p1.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    // If close enough, create or update connection
                    if (distance < connectionDistance) {
                        createConnection(p1, p2, distance);
                    }
                }
            }
        }
        
        // Create a connection between two particles
        function createConnection(p1, p2, distance) {
            const element = document.createElement('div');
            element.classList.add('connection');
            
            // Calculate position and dimensions
            const x1 = p1.x + p1.size / 2;
            const y1 = p1.y + p1.size / 2;
            const x2 = p2.x + p2.size / 2;
            const y2 = p2.y + p2.size / 2;
            
            const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
            const angle = Math.atan2(y2 - y1, x2 - x1);
            
            // Opacity based on distance
            const opacity = 1 - distance / connectionDistance;
            
            // Style the connection
            element.style.width = `${length}px`;
            element.style.left = `${x1}px`;
            element.style.top = `${y1}px`;
            element.style.transform = `rotate(${angle}rad)`;
            element.style.opacity = opacity;
            
            // Add to DOM
            particlesContainer.appendChild(element);
            
            // Store connection data
            connections.push({
                element,
                p1,
                p2
            });
        }
        
        // Handle window resize
        window.addEventListener('resize', () => {
            // Adjust particle positions if they're outside new bounds
            particles.forEach(particle => {
                if (particle.x > window.innerWidth) {
                    particle.x = window.innerWidth - particle.size;
                }
                if (particle.y > window.innerHeight) {
                    particle.y = window.innerHeight - particle.size;
                }
            });
            
            // Update connections
            updateConnections();
        });
        
        // Start animation
        animateParticles();
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
                const icon = mobileNavToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            
            // Scroll smoothly to the target section
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Here you would normally send the data to a server
            // For now, let's just show a success message
            
            // Clear form fields
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('message').value = '';
            
            // Show success message
            const formButton = contactForm.querySelector('button');
            const originalText = formButton.textContent;
            
            formButton.textContent = 'Message Sent!';
            formButton.disabled = true;
            formButton.style.backgroundColor = 'var(--accent-secondary)';
            
            // Reset button after 3 seconds
            setTimeout(() => {
                formButton.textContent = originalText;
                formButton.disabled = false;
                formButton.style.backgroundColor = '';
            }, 3000);
        });
    }
    
    // Add scroll reveal animations
    const revealElements = document.querySelectorAll('.featured-card, .expertise-card, .stats-card, .project-item');
    
    function checkReveal() {
        const triggerBottom = window.innerHeight * 0.8;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('revealed');
            }
        });
    }
    
    // Check on initial load
    window.addEventListener('load', checkReveal);
    
    // Check on scroll
    window.addEventListener('scroll', checkReveal);
    
    // Add CSS for reveal animation
    const style = document.createElement('style');
    style.textContent = `
        .featured-card, .expertise-card, .stats-card, .project-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .featured-card.revealed, .expertise-card.revealed, .stats-card.revealed, .project-item.revealed {
            opacity: 1;
            transform: translateY(0);
        }

        /* Skill Level Animation */
        .skill-level {
            width: 0 !important;
            transition: width 1.5s ease-in-out;
        }
        
        .skill-level.animate {
            width: var(--skill-percent) !important;
        }
        
        /* Number counter animation */
        .skill-percentage {
            display: inline-block;
            min-width: 40px;
            text-align: right;
            font-weight: 500;
            color: var(--accent-primary);
        }
    `;
    document.head.appendChild(style);
    
    // Animate skill bars when they become visible
    const skillsSection = document.querySelector('.skills');
    const skillLevels = document.querySelectorAll('.skill-level');
    
    function animateSkillBars() {
        if (!skillsSection) return;
        
        const sectionTop = skillsSection.getBoundingClientRect().top;
        const triggerPosition = window.innerHeight * 0.8;
        
        if (sectionTop < triggerPosition) {
            skillLevels.forEach(skillLevel => {
                // Extract width percentage from the style attribute
                const width = skillLevel.style.width;
                // Set this as a CSS variable to be used in the animation
                skillLevel.style.setProperty('--skill-percent', width);
                // Reset initial width to 0 (will be animated via CSS)
                skillLevel.style.width = '0';
                
                // Add percentage counter to each skill
                const skillItem = skillLevel.closest('.skill-item');
                if (skillItem && !skillItem.querySelector('.skill-percentage')) {
                    const percentValue = parseInt(width);
                    const percentSpan = document.createElement('span');
                    percentSpan.className = 'skill-percentage';
                    percentSpan.textContent = '0%';
                    percentSpan.dataset.target = percentValue;
                    skillItem.appendChild(percentSpan);
                }
                
                // Trigger animation after a small delay
                setTimeout(() => {
                    skillLevel.classList.add('animate');
                    
                    // Animate the percentage counter
                    const percentSpan = skillItem.querySelector('.skill-percentage');
                    if (percentSpan) {
                        const targetValue = parseInt(percentSpan.dataset.target);
                        let currentValue = 0;
                        const duration = 1500; // match the CSS transition duration
                        const stepTime = Math.abs(Math.floor(duration / targetValue));
                        
                        const counter = setInterval(() => {
                            currentValue += 1;
                            percentSpan.textContent = currentValue + '%';
                            
                            if (currentValue >= targetValue) {
                                clearInterval(counter);
                            }
                        }, stepTime);
                    }
                }, 200);
            });
            
            // Remove the scroll event listener once animation is triggered
            window.removeEventListener('scroll', animateSkillBars);
        }
    }
    
    // Check if skills should animate on page load
    window.addEventListener('load', animateSkillBars);
    
    // Check if skills should animate on scroll
    window.addEventListener('scroll', animateSkillBars);
    
    // Timeline Journey Animation
    const timelineSection = document.querySelector('.journey-section');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const progressFill = document.querySelector('.progress-fill');
    
    function animateTimeline() {
        if (!timelineSection) return;
        
        const sectionTop = timelineSection.getBoundingClientRect().top;
        const triggerPosition = window.innerHeight * 0.8;
        
        if (sectionTop < triggerPosition) {
            // Add animation to each timeline item with increasing delay
            timelineItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('animate');
                    
                    // Add pulse effect to the current dot
                    const dot = item.querySelector('.timeline-dot');
                    if (dot) {
                        dot.classList.add('pulse');
                        
                        // Remove pulse after a delay
                        setTimeout(() => {
                            dot.classList.remove('pulse');
                        }, 1500);
                    }
                }, 300 * index); // Stagger the animations
            });
            
            // Animate progress bar
            if (progressFill) {
                setTimeout(() => {
                    progressFill.classList.add('animate');
                }, 300 * timelineItems.length); // Start after all items have animated
            }
            
            // Remove scroll listener once animation is triggered
            window.removeEventListener('scroll', animateTimeline);
        }
    }
    
    // Check if timeline should animate on page load
    window.addEventListener('load', animateTimeline);
    
    // Check if timeline should animate on scroll
    window.addEventListener('scroll', animateTimeline);
    
    // Additional timeline effects
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            // Add pulsing effect to timeline dot on hover
            const dot = item.querySelector('.timeline-dot');
            if (dot) {
                dot.style.animation = 'pulse 1.5s infinite ease-in-out';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            // Remove pulsing effect when mouse leaves
            const dot = item.querySelector('.timeline-dot');
            if (dot) {
                dot.style.animation = '';
            }
        });
    });
}); 