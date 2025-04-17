// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initMenuTabs();
    initTestimonialSlider();
    initParallaxEffect();
    initScrollAnimations();
});

// Handle Navigation Functionality
function initNavigation() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');
    
    // Toggle mobile menu
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Handle navbar background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Handle Menu Tab Functionality
function initMenuTabs() {
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuCategories = document.querySelectorAll('.menu-category');
    const menuTabsContainer = document.querySelector('.menu-tabs-container');
    
    // Switch tabs functionality
    menuTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            menuTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all menu categories
            menuCategories.forEach(category => {
                category.classList.remove('active');
            });
            
            // Show the selected category
            const targetCategory = document.getElementById(this.dataset.target);
            if (targetCategory) {
                targetCategory.classList.add('active');
                
                // Smooth scroll to the category (with offset for the sticky header)
                window.scrollTo({
                    top: targetCategory.offsetTop - 150,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Handle sticky menu tabs behavior
    if (menuTabsContainer) {
        const menuSection = document.getElementById('menu');
        const menuSectionTop = menuSection ? menuSection.offsetTop : 0;
        const menuSectionHeight = menuSection ? menuSection.offsetHeight : 0;
        const tabsHeight = menuTabsContainer.offsetHeight;
        
        window.addEventListener('scroll', function() {
            const scrollPos = window.scrollY;
            
            // Only apply sticky behavior when inside the menu section
            if (scrollPos >= menuSectionTop && scrollPos <= (menuSectionTop + menuSectionHeight - tabsHeight)) {
                menuTabsContainer.classList.add('sticky-active');
            } else {
                menuTabsContainer.classList.remove('sticky-active');
            }
        });
    }
    
    // Highlight menu tab based on scroll position
    window.addEventListener('scroll', function() {
        // Skip if no categories exist
        if (menuCategories.length === 0) return;
        
        // Check which category is in view
        let activeCategory = null;
        const scrollPos = window.scrollY + 200; // Offset for header
        
        menuCategories.forEach(category => {
            const categoryTop = category.offsetTop;
            const categoryHeight = category.offsetHeight;
            
            // If scroll position is within this category
            if (scrollPos >= categoryTop && scrollPos < categoryTop + categoryHeight) {
                activeCategory = category.id;
            }
        });
        
        // If we found a category in view, highlight its tab
        if (activeCategory) {
            menuTabs.forEach(tab => {
                if (tab.dataset.target === activeCategory) {
                    menuTabs.forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');
                }
            });
        }
    });
}

// Handle Testimonial Slider
function initTestimonialSlider() {
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    const prevButton = document.querySelector('.testimonial-prev');
    const nextButton = document.querySelector('.testimonial-next');
    let currentSlide = 0;
    
    // Function to show a specific slide
    function showSlide(index) {
        if (index < 0) {
            currentSlide = testimonialSlides.length - 1;
        } else if (index >= testimonialSlides.length) {
            currentSlide = 0;
        } else {
            currentSlide = index;
        }
        
        // Hide all slides
        testimonialSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        testimonialDots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the current slide
        testimonialSlides[currentSlide].classList.add('active');
        testimonialDots[currentSlide].classList.add('active');
    }
    
    // Event listeners for previous and next buttons
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            showSlide(currentSlide - 1);
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            showSlide(currentSlide + 1);
        });
    }
    
    // Event listeners for dots
    testimonialDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const slideIndex = parseInt(this.dataset.index);
            showSlide(slideIndex);
        });
    });
    
    // Auto-advance slides every 5 seconds
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
}

// Handle Parallax Effect
function initParallaxEffect() {
    window.addEventListener('scroll', function() {
        const parallaxElements = document.querySelectorAll('.parallax-container');
        
        parallaxElements.forEach(element => {
            const distance = window.scrollY;
            const elementTop = element.offsetTop;
            const elementHeight = element.offsetHeight;
            const viewportHeight = window.innerHeight;
            
            // Only apply parallax when element is in view
            if (distance > elementTop - viewportHeight && distance < elementTop + elementHeight) {
                const inner = element.querySelector('div');
                if (inner) {
                    const speed = 0.1;
                    const yPos = -((distance - elementTop) * speed);
                    inner.style.transform = `translateY(${yPos}px)`;
                }
            }
        });
    });
}

// Handle Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.section-title, .featured-item, .menu-item, .gallery-item, .contact-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    // Add CSS class for animation
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .animated {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        </style>
    `);
}

// Form Submission for Newsletter
document.addEventListener('submit', function(e) {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (e.target === newsletterForm) {
        e.preventDefault();
        
        // Get email input value
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        // Simple validation
        if (email.trim() === '') {
            alert('Please enter your email address.');
            return;
        }
        
        // Show success message (in production, this would send to a server)
        alert('Thank you for subscribing to our newsletter!');
        newsletterForm.reset();
    }
});

// Gallery Lightbox Functionality
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        // For a more advanced site, we would add a lightbox here
        // For now we'll just add a simple effect
        const image = this.querySelector('.gallery-image');
        image.style.transform = 'scale(1.1)';
        
        setTimeout(() => {
            image.style.transform = '';
        }, 300);
    });
});

// Add Animation Delay to Menu Items
document.querySelectorAll('.menu-item').forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
});
