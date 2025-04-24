document.addEventListener('DOMContentLoaded', function() {
    // ========== Loading Overlay ==========
    const loadingOverlay = document.querySelector('.loading-overlay');
    
    // Simulate loading
    setTimeout(function() {
        loadingOverlay.style.opacity = '0';
        loadingOverlay.style.pointerEvents = 'none';
    }, 1500);

    // ========== Theme Toggle ==========
    const themeToggle = document.querySelector('.theme-toggle');
    const html = document.documentElement;
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        
        // Update icon
        const icon = this.querySelector('i');
        icon.className = newTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        
        // Save preference
        localStorage.setItem('theme', newTheme);
    });

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    const icon = themeToggle.querySelector('i');
    icon.className = savedTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';

    // ========== Navigation ==========
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
            });
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get target section
            const targetId = this.getAttribute('data-section');
            const targetSection = document.getElementById(targetId);
            
            // Hide all sections
            sections.forEach(section => {
                section.classList.remove('active-section');
            });
            
            // Show target section
            targetSection.classList.add('active-section');
            
            // Scroll to top of section
            window.scrollTo(0, 0);
        });
    });

    // ========== Gallery ==========
    const galleryGrid = document.querySelector('.gallery-grid');
    const imageViewer = document.querySelector('.image-viewer');
    const viewerImage = document.querySelector('.viewer-image');
    const viewerCaption = document.querySelector('.viewer-caption');
    const closeViewer = document.querySelector('.close-viewer');
    const viewerPrev = document.querySelector('.viewer-prev');
    const viewerNext = document.querySelector('.viewer-next');
    
    // Sample gallery data (replace with your actual images)
    const galleryData = [
        { src: 'images/gallery/gallery1.jpg', caption: 'Gallery Image 1' },
        { src: 'images/gallery/gallery2.jpg', caption: 'Gallery Image 2' },
        { src: 'images/gallery/gallery3.jpg', caption: 'Gallery Image 3' },
        { src: 'images/gallery/gallery4.jpg', caption: 'Gallery Image 4' },
        { src: 'images/gallery/gallery5.jpg', caption: 'Gallery Image 5' },
        { src: 'images/gallery/gallery6.jpg', caption: 'Gallery Image 6' },
        { src: 'images/gallery/gallery7.jpg', caption: 'Gallery Image 7' },
        { src: 'images/gallery/gallery8.jpg', caption: 'Gallery Image 8' },
        { src: 'images/gallery/gallery9.jpg', caption: 'Gallery Image 9' },
        { src: 'images/gallery/gallery10.jpg', caption: 'Gallery Image 10' },
        { src: 'images/gallery/gallery11.jpg', caption: 'Gallery Image 11' },
        { src: 'images/gallery/gallery12.jpg', caption: 'Gallery Image 12' },
        { src: 'images/gallery/gallery13.jpg', caption: 'Gallery Image 13' },
        { src: 'images/gallery/gallery14.jpg', caption: 'Gallery Image 14' },
        { src: 'images/gallery/gallery15.jpg', caption: 'Gallery Image 15' },
        { src: 'images/gallery/gallery16.jpg', caption: 'Gallery Image 16' },
        { src: 'images/gallery/gallery17.jpg', caption: 'Gallery Image 17' }
      ];
      
    
    // Populate gallery
    galleryData.forEach((item, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.setAttribute('data-index', index);
        
        const img = document.createElement('img');
        img.src = item.src;
        img.alt = item.caption;
        
        const caption = document.createElement('div');
        caption.className = 'gallery-caption';
        caption.textContent = item.caption;
        
        galleryItem.appendChild(img);
        galleryItem.appendChild(caption);
        galleryGrid.appendChild(galleryItem);
        
        // Add click event to open viewer
        galleryItem.addEventListener('click', function() {
            openViewer(index);
        });
    });
    
    // Open image viewer
    function openViewer(index) {
        const item = galleryData[index];
        viewerImage.src = item.src;
        viewerImage.alt = item.caption;
        viewerCaption.textContent = item.caption;
        imageViewer.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Update current index
        currentIndex = index;
    }
    
    // Close image viewer
    function closeViewerFunc() {
        imageViewer.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Navigation in viewer
    let currentIndex = 0;
    
    function showPrevImage() {
        currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
        const item = galleryData[currentIndex];
        viewerImage.src = item.src;
        viewerCaption.textContent = item.caption;
    }
    
    function showNextImage() {
        currentIndex = (currentIndex + 1) % galleryData.length;
        const item = galleryData[currentIndex];
        viewerImage.src = item.src;
        viewerCaption.textContent = item.caption;
    }
    
    // Event listeners
    closeViewer.addEventListener('click', closeViewerFunc);
    viewerPrev.addEventListener('click', showPrevImage);
    viewerNext.addEventListener('click', showNextImage);
    
    // Close viewer when clicking on overlay
    imageViewer.addEventListener('click', function(e) {
        if (e.target === imageViewer) {
            closeViewerFunc();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (imageViewer.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeViewerFunc();
            } else if (e.key === 'ArrowLeft') {
                showPrevImage();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            }
        }
    });

    // ========== Contact Form ==========
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('#name').value;
            const email = this.querySelector('#email').value;
            const message = this.querySelector('#message').value;
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', { name, email, message });
            
            // Show success message
            alert('Thank you for your message! Veronica will get back to you soon.');
            
            // Reset form
            this.reset();
        });
    }

    // ========== Scroll Animations ==========
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.gallery-item, .skill-level');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };
    
    // Initial check
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);

    // ========== Hero Button Navigation ==========
    const heroPortfolioBtn = document.querySelector('.hero-cta .btn-primary');
    const heroContactBtn = document.querySelector('.hero-cta .btn-outline');
    
    if (heroPortfolioBtn) {
        heroPortfolioBtn.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('[data-section="gallery"]').click();
        });
    }
    
    if (heroContactBtn) {
        heroContactBtn.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('[data-section="contact"]').click();
        });
    }
});