// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Animated counters for statistics
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.dataset.suffix || '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (element.dataset.suffix || '');
        }
    }, 16);
};

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Animate counters when they come into view
            if (entry.target.classList.contains('stat-number')) {
                const target = parseInt(entry.target.textContent);
                const suffix = entry.target.textContent.replace(/[0-9]/g, '');
                entry.target.dataset.suffix = suffix;
                animateCounter(entry.target, target);
            }
            
            // Animate calculator amounts
            if (entry.target.classList.contains('amount')) {
                const text = entry.target.textContent;
                const number = parseInt(text.replace(/[^\d]/g, ''));
                const prefix = text.replace(/[0-9]/g, '').replace(/\s/g, '');
                entry.target.dataset.prefix = prefix;
                
                let start = 0;
                const increment = number / 120;
                const timer = setInterval(() => {
                    start += increment;
                    if (start >= number) {
                        entry.target.textContent = prefix + ' ' + number.toLocaleString();
                        clearInterval(timer);
                    } else {
                        entry.target.textContent = prefix + ' ' + Math.floor(start).toLocaleString();
                    }
                }, 16);
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.stat-number, .amount, .solution-card, .benefit-item, .testimonial-card').forEach(el => {
    observer.observe(el);
});

// Form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        try {
            // Simulate API call (replace with actual endpoint)
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Show success message
            showNotification('Thank you! We\'ll contact you within 24 hours to schedule your free farm assessment.', 'success');
            contactForm.reset();
            
        } catch (error) {
            showNotification('Sorry, there was an error sending your message. Please call us directly at +27 23 347 1234.', 'error');
        } finally {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#059669' : type === 'error' ? '#dc2626' : '#2563eb'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        .notification-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 1rem;
        }
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
    
    // Manual close
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
}

// Track resource downloads
document.querySelectorAll('a[download]').forEach(link => {
    link.addEventListener('click', (e) => {
        const resourceName = link.getAttribute('href').split('/').pop();
        
        // Analytics tracking (replace with actual analytics)
        console.log('Resource downloaded:', resourceName);
        
        // Show thank you message
        setTimeout(() => {
            showNotification('Thank you for downloading our resource! We hope you find it valuable for your farming operation.', 'success');
        }, 500);
    });
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add scroll-triggered animations
const addScrollAnimation = () => {
    const elements = document.querySelectorAll('.solution-card, .benefit-item, .testimonial-card, .resource-card');
    
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        element.style.transitionDelay = `${index * 0.1}s`;
    });
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
        scrollObserver.observe(element);
    });
};

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', addScrollAnimation);

// Add floating CTA button
const createFloatingCTA = () => {
    const floatingCTA = document.createElement('div');
    floatingCTA.innerHTML = `
        <a href="#contact" class="floating-cta">
            <i class="fas fa-calculator"></i>
            <span>Free Assessment</span>
        </a>
    `;
    
    floatingCTA.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        z-index: 1000;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .floating-cta {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            background: #2563eb;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            box-shadow: 0 10px 30px rgba(37, 99, 235, 0.3);
            transition: all 0.3s ease;
            animation: pulse 2s infinite;
        }
        
        .floating-cta:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 40px rgba(37, 99, 235, 0.4);
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        @media (max-width: 768px) {
            .floating-cta {
                bottom: 20px;
                right: 20px;
                padding: 0.75rem 1rem;
                font-size: 0.875rem;
            }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(floatingCTA);
    
    // Hide when in contact section
    const contactSection = document.querySelector('#contact');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                floatingCTA.style.display = 'none';
            } else {
                floatingCTA.style.display = 'block';
            }
        });
    }, { threshold: 0.1 });
    
    if (contactSection) {
        observer.observe(contactSection);
    }
};

// Add floating CTA after page loads
window.addEventListener('load', createFloatingCTA);
