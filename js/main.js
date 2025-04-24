document.addEventListener('DOMContentLoaded', function () {
    // ========== Loading Overlay scroll-hint==========
    const loadingOverlay = document.querySelector('.loading-overlay');
    if (loadingOverlay) {
        window.addEventListener('load', function () {
            setTimeout(function () {
                loadingOverlay.style.opacity = '0';
                loadingOverlay.style.visibility = 'hidden';
            }, 500);
        });
    }

    // ========== Navigation scroll-hint==========
    const menuToggle = document.querySelector('.menu-toggle');
    const navOverlay = document.querySelector('.nav-overlay');
    const navLinks = document.querySelectorAll('.nav-link');
    const menuIcon = document.querySelector('.menu-icon');

    if (menuToggle && navOverlay && menuIcon) {
        menuToggle.addEventListener('click', function () {
            const isActive = this.classList.toggle('active');
            navOverlay.classList.toggle('active');

            if (isActive) {
                menuIcon.style.transform = 'rotate(45deg)';
                menuIcon.style.setProperty('--before-transform', 'rotate(-45deg) translate(-5px, 6px)');
                menuIcon.style.setProperty('--after-opacity', '0');
            } else {
                menuIcon.style.transform = 'rotate(0)';
                menuIcon.style.setProperty('--before-transform', 'rotate(0) translate(0, 0)');
                menuIcon.style.setProperty('--after-opacity', '1');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');

            if (menuToggle && navOverlay && menuIcon) {
                menuToggle.classList.remove('active');
                navOverlay.classList.remove('active');
                menuIcon.style.transform = 'rotate(0)';
                menuIcon.style.setProperty('--before-transform', 'rotate(0) translate(0, 0)');
                menuIcon.style.setProperty('--after-opacity', '1');
            }

            switchSection(targetSection);
        });
    });

    // ========== Section Management ==========
    function switchSection(sectionId) {
        const currentSection = document.querySelector('.active-section');
        const newSection = document.getElementById(sectionId);

        if (currentSection && newSection && currentSection !== newSection) {
            currentSection.classList.remove('active-section');
            newSection.classList.add('active-section');
        }
    }

    // ========== Close Section Buttons ==========
    const closeButtons = document.querySelectorAll('.close-section');
    closeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const currentSection = this.closest('.fullscreen-section');
            const heroSection = document.getElementById('hero');

            if (currentSection && heroSection) {
                currentSection.classList.remove('active-section');
                heroSection.classList.add('active-section');
            }
        });
    });

    // ========== Hero Slider ==========
    const heroImages = document.querySelectorAll('.hero-image');
    if (heroImages.length > 0) {
        let currentHeroImage = 0;
        heroImages[currentHeroImage].classList.add('active');

        if (heroImages.length > 1) {
            setInterval(function () {
                heroImages[currentHeroImage].classList.remove('active');
                currentHeroImage = (currentHeroImage + 1) % heroImages.length;
                heroImages[currentHeroImage].classList.add('active');
            }, 5000);
        }
    }


    // ========== Gallery Slider (Fade Transition) ==========
    const galleryTrack = document.querySelector('.gallery-track');
    const galleryPrev = document.querySelector('.gallery-prev');
    const galleryNext = document.querySelector('.gallery-next');

    const TOTAL_IMAGES = 16;
    let currentGallerySlide = 0;
    let gallerySlides = [];

    function createGallerySlides() {
        for (let i = 1; i <= TOTAL_IMAGES; i++) {
            const slide = document.createElement('div');
            slide.className = 'gallery-slide';

            const img = document.createElement('img');
            img.src = `images/gallery/gallery${i}.jpg`;
            img.alt = `Gallery Image ${i}`;
            img.loading = 'lazy';

            slide.appendChild(img);
            galleryTrack.appendChild(slide);
        }

        gallerySlides = document.querySelectorAll('.gallery-slide');
        updateGalleryFade(); // show first one
    }

    function updateGalleryFade() {
        gallerySlides.forEach((slide, index) => {
            slide.style.opacity = index === currentGallerySlide ? '1' : '0';
            slide.style.zIndex = index === currentGallerySlide ? '2' : '1';
            slide.classList.toggle('active', index === currentGallerySlide);
        });
    }

    // Navigation Events
    if (galleryPrev) {
        galleryPrev.addEventListener('click', () => {
            currentGallerySlide = (currentGallerySlide - 1 + gallerySlides.length) % gallerySlides.length;
            updateGalleryFade();
        });
    }
    if (galleryNext) {
        galleryNext.addEventListener('click', () => {
            currentGallerySlide = (currentGallerySlide + 1) % gallerySlides.length;
            updateGalleryFade();
        });
    }

    // Touch Swipe Events
    if (galleryTrack) {
        let startX = 0;
        let endX = 0;

        galleryTrack.addEventListener('touchstart', e => {
            startX = e.changedTouches[0].screenX;
        }, false);

        galleryTrack.addEventListener('touchend', e => {
            endX = e.changedTouches[0].screenX;
            if (endX < startX - 50) {
                currentGallerySlide = (currentGallerySlide + 1) % gallerySlides.length;
            } else if (endX > startX + 50) {
                currentGallerySlide = (currentGallerySlide - 1 + gallerySlides.length) % gallerySlides.length;
            }
            updateGalleryFade();
        }, false);
    }

    // Init
    createGallerySlides();


    // ========== Scroll Hint ==========
    const scrollHint = document.querySelector('.scroll-hint');
    const aboutSection = document.getElementById('about');
    const heroSection = document.getElementById('hero');

    function setupScrollTransition() {
        const heroSection = document.getElementById('hero');
        const aboutSection = document.getElementById('about');
        let hasScrolled = false;
    
        if (!heroSection || !aboutSection) return;
    
        window.addEventListener('wheel', function (e) {
            if (!hasScrolled && e.deltaY > 0) {
                aboutSection.classList.add('active-section');
                heroSection.classList.remove('active-section');
                hasScrolled = true;
            }
        }, { passive: true });
    
        // Reset on scroll up (optional)
        window.addEventListener('wheel', function (e) {
            if (hasScrolled && e.deltaY < 0) {
                heroSection.classList.add('active-section');
                aboutSection.classList.remove('active-section');
                hasScrolled = false;
            }
        }, { passive: true });
    }
    
    function setupTouchScrollTransition() {
        const heroSection = document.getElementById('hero');
        const aboutSection = document.getElementById('about');
        let startY = 0;
    
        window.addEventListener('touchstart', e => {
            startY = e.touches[0].clientY;
        }, { passive: true });
    
        window.addEventListener('touchend', e => {
            const endY = e.changedTouches[0].clientY;
            if (startY - endY > 50) {
                // Swipe up
                aboutSection.classList.add('active-section');
                heroSection.classList.remove('active-section');
            } else if (endY - startY > 50) {
                // Swipe down
                heroSection.classList.add('active-section');
                aboutSection.classList.remove('active-section');
            }
        }, { passive: true });


        //on click or touch 
        scrollHint.addEventListener('click', function () {
            aboutSection.classList.add('active-section');
            heroSection.classList.remove('active-section');
        });
        scrollHint.addEventListener('touchstart', function () {
            aboutSection.classList.add('active-section');
            heroSection.classList.remove('active-section');
        });

    }
    
    setupScrollTransition();
    setupTouchScrollTransition();

    // ========== Contact Form ==========
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Thank you for your message. Veronica will get back to you soon.');
            this.reset();

            const heroSection = document.getElementById('hero');
            const currentSection = this.closest('.fullscreen-section');

            if (heroSection && currentSection) {
                heroSection.classList.add('active-section');
                currentSection.classList.remove('active-section');
            }
        });
    }
});
