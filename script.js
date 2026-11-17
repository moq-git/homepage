/**
 * MOQ Formation - Script JavaScript Complet
 * Gère : Menu mobile, filtres portfolio, slider témoignages, animations, back-to-top
 */

document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // 1. MOBILE NAVIGATION
    // ============================================
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu mobile
    navToggle.addEventListener('click', function() {
        navList.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Fermer le menu quand on clique sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navList.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // ============================================
    // 2. HEADER SCROLL EFFECT
    // ============================================
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ============================================
    // 3. SMOOTH SCROLLING (pour tous les liens ancres)
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Fermer le menu mobile si ouvert
                navList.classList.remove('active');
                navToggle.classList.remove('active');

                // Scroll fluide (offset pour le header fixe)
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Mettre à jour l'onglet actif dans la navigation
                updateActiveNavLink(targetId);
            }
        });
    });

    // Mettre à jour le lien actif dans la navigation
    function updateActiveNavLink(targetId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === targetId) {
                link.classList.add('active');
            }
        });
    }

    // Mettre à jour le lien actif au scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 100;
        const sections = document.querySelectorAll('section[id]');

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
    });

    // ============================================
    // 4. PORTFOLIO FILTERS
    // ============================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Mettre à jour le bouton actif
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            // Filtrer les items
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    item.classList.add('animate-fade-in-up');
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // ============================================
    // 5. TESTIMONIALS SLIDER
    // ============================================
    const slider = document.querySelector('.testimonials-slider');
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    const dots = document.querySelectorAll('.dot');

    let currentIndex = 0;
    const totalTestimonials = testimonials.length;

    // Fonction pour aller à un testimonial spécifique
    function goToTestimonial(index) {
        if (index < 0) index = totalTestimonials - 1;
        if (index >= totalTestimonials) index = 0;

        currentIndex = index;

        // Calculer la position de scroll
        const testimonialWidth = testimonials[0].offsetWidth;
        const gap = 30; // Espacement entre les testimonials
        const scrollPosition = index * (testimonialWidth + gap);

        slider.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });

        // Mettre à jour les dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    // Boutons précédent/suivant
    prevBtn.addEventListener('click', () => goToTestimonial(currentIndex - 1));
    nextBtn.addEventListener('click', () => goToTestimonial(currentIndex + 1));

    // Clic sur les dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToTestimonial(index));
    });

    // Auto-advance du slider (toutes les 5 secondes)
    let sliderInterval = setInterval(() => {
        goToTestimonial(currentIndex + 1);
    }, 5000);

    // Pause au survol
    slider.addEventListener('mouseenter', () => {
        clearInterval(sliderInterval);
    });

    slider.addEventListener('mouseleave', () => {
        sliderInterval = setInterval(() => {
            goToTestimonial(currentIndex + 1);
        }, 5000);
    });

    // ============================================
    // 6. BACK TO TOP BUTTON
    // ============================================
    const backToTopBtn = document.querySelector('.back-to-top');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ============================================
    // 7. SCROLL REVEAL ANIMATIONS
    // ============================================
    const revealElements = document.querySelectorAll('.reveal, .service-card, .portfolio-item, .testimonial, .skill, .stat, .contact-item, .trust-logo');

    function revealOnScroll() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    }

    // Initialiser les animations au chargement
    revealOnScroll();

    // Vérifier au scroll
    window.addEventListener('scroll', revealOnScroll);

    // ============================================
    // 8. ANIMATIONS AU CHARGEMENT
    // ============================================
    // Animation du hero
    const heroElements = document.querySelectorAll('.hero-content > *, .hero-illustration, .scroll-down');
    heroElements.forEach((el, index) => {
        el.classList.add('reveal');
        el.style.animationDelay = `${index * 0.1}s`;
        setTimeout(() => {
            el.classList.add('active');
        }, 100);
    });

    // Animation des sphères dans l'illustration
    const illustrationElements = document.querySelectorAll('.illustration-element');
    illustrationElements.forEach((el, index) => {
        el.classList.add('reveal');
        setTimeout(() => {
            el.classList.add('active');
        }, 500 + (index * 200));
    });

    // ============================================
    // 9. FORMULAIRE DE CONTACT
    // ============================================
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validation simple
            const nom = document.getElementById('nom').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!nom || !email || !message) {
                alert('Veuillez remplir tous les champs obligatoires (*)');
                return;
            }

            // Validation email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Veuillez entrer une adresse email valide');
                return;
            }

            // Si tout est OK (en vrai, il faudrait envoyer les données à un serveur)
            alert('Merci pour votre message ! Je vous répondrai dans les plus brefs délais.');
            contactForm.reset();
        });
    }

    // ============================================
    // 10. GESTION DES TAILLES RESPONSIVE
    // ============================================
    function handleResize() {
        // Recalculer la position du slider testimonials
        goToTestimonial(currentIndex);

        // Pour les écrans mobiles, forcer le display block sur tous les portfolio items
        if (window.innerWidth <= 768) {
            portfolioItems.forEach(item => {
                item.style.display = 'block';
            });
        }
    }

    // Écouter les changements de taille
    window.addEventListener('resize', handleResize);

    // Initialiser
    handleResize();
});
