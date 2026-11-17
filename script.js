/**
 * MOQ - Concepteur Pédagogique & Formateur Freelance
 * JavaScript pour les animations et fonctionnalités
 */

// ============================================
// DOM Elements
// ============================================
const header = document.querySelector('.header');
const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');
const navLinks = document.querySelectorAll('.nav-link');
const backToTop = document.querySelector('.back-to-top');
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const sliderBtns = document.querySelectorAll('.slider-btn');
const sliderDots = document.querySelectorAll('.dot');
const testimonialsSlider = document.querySelector('.testimonials-slider');
const contactForm = document.querySelector('.contact-form');

// ============================================
// Header Scroll Effect
// ============================================
function handleHeaderScroll() {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleHeaderScroll);

// ============================================
// Mobile Navigation Toggle
// ============================================
function toggleMobileNav() {
    navList.classList.toggle('active');
    navToggle.classList.toggle('active');

    // Toggle icon animation
    const spans = navToggle.querySelectorAll('span');
    if (navList.classList.contains('active')) {
        spans[0].style.transform = 'translateY(8px) rotate(45deg)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'translateY(-8px) rotate(-45deg)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

navToggle.addEventListener('click', toggleMobileNav);

// Close mobile nav when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');
        navToggle.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ============================================
// Smooth Scroll for Navigation Links
// ============================================
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        const headerHeight = header.offsetHeight;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('href');
        smoothScroll(target);

        // Update active link
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        link.classList.add('active');
    });
});

// Update active nav link on scroll
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + header.offsetHeight;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = `#${section.getAttribute('id')}`;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ============================================
// Back to Top Button
// ============================================
function handleBackToTop() {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
}

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', handleBackToTop);

// ============================================
// Portfolio Filter
// ============================================
function filterPortfolio(category) {
    portfolioItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');

        if (category === 'all' || itemCategory === category) {
            item.style.display = 'block';
            item.classList.add('animate-fade-in');
        } else {
            item.style.display = 'none';
            item.classList.remove('animate-fade-in');
        }
    });
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(filterBtn => filterBtn.classList.remove('active'));
        btn.classList.add('active');

        // Filter items
        const category = btn.getAttribute('data-filter');
        filterPortfolio(category);
    });
});

// ============================================
// Testimonials Slider
// ============================================
let currentSlide = 0;
const testimonials = document.querySelectorAll('.testimonial');
const totalSlides = testimonials.length;

function updateSlider() {
    const slideWidth = testimonials[0].offsetWidth + 30; // width + gap
    testimonialsSlider.scrollTo({
        left: slideWidth * currentSlide,
        behavior: 'smooth'
    });

    // Update dots
    sliderDots.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
}

sliderBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.classList.contains('next')) {
            nextSlide();
        } else {
            prevSlide();
        }
    });
});

sliderDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        updateSlider();
    });
});

// Auto slide every 5 seconds
let slideInterval = setInterval(nextSlide, 5000);

// Pause on hover
testimonialsSlider.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

testimonialsSlider.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 5000);
});

// ============================================
// Scroll Reveal Animation
// ============================================
function revealElements() {
    const revealElements = document.querySelectorAll('.reveal');

    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
        }
    });
}

// Add reveal class to elements
function initScrollReveal() {
    const animatedElements = document.querySelectorAll(
        '.service-card, .portfolio-item, .testimonial, .skill, .stat, .contact-item, .trust-logo'
    );

    animatedElements.forEach(element => {
        element.classList.add('reveal');
    });
}

window.addEventListener('scroll', revealElements);
window.addEventListener('load', () => {
    initScrollReveal();
    revealElements();
});

// ============================================
// Contact Form
// ============================================
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        // Show loading state
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual API call)
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Show success message
        submitBtn.textContent = 'Message envoyé !';
        submitBtn.style.backgroundColor = '#27ae60';

        // Reset form
        setTimeout(() => {
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.style.backgroundColor = '';
            submitBtn.disabled = false;
        }, 3000);
    });
}

// ============================================
// Skills Progress Bar Animation
// ============================================
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0%';

                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const skillsSection = document.querySelector('.about-skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

// ============================================
// Counter Animation
// ============================================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => {
                    const target = parseInt(counter.textContent);
                    let current = 0;
                    const increment = target / 50;

                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            counter.textContent = target + '+';
                            clearInterval(timer);
                        } else {
                            counter.textContent = Math.floor(current) + '+';
                        }
                    }, 40);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

// ============================================
// Initialize
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Initial animations
    animateSkills();
    animateCounters();

    // Add animation classes to hero elements
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((element, index) => {
        element.classList.add('animate-fade-in-up', `delay-${index + 1}`);
    });

    // Add animation to hero illustration
    const heroIllustration = document.querySelector('.hero-illustration');
    if (heroIllustration) {
        heroIllustration.classList.add('animate-fade-in', 'delay-4');
    }
});
