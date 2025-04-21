// Custom JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bootstrap components
    initBootstrapComponents();

    // Navbar scroll effect
    handleNavbarScroll();

    // Back to top button
    handleBackToTopButton();

    // Filter buttons
    handleFilterButtons();

    // Theme toggle
    handleThemeToggle();

    // Handle like and bookmark buttons
    handleInteractionButtons();

    // Handle responsive navbar
    handleResponsiveNavbar();

    // Initialize AOS animations
    initAOS();
});

// Initialize Bootstrap components
function initBootstrapComponents() {
    // Enable tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Enable popovers
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
}

// Navbar scroll effect
function handleNavbarScroll() {
    const navbar = document.getElementById('mainNavbar');
    if (!navbar) return;

    // Function to update navbar based on scroll position
    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');

            // Update auth buttons if they exist
            const loginBtn = document.querySelector('.auth-buttons .btn-outline-light');
            if (loginBtn) {
                loginBtn.classList.add('scrolled');
            }
        } else {
            navbar.classList.remove('navbar-scrolled');

            // Update auth buttons if they exist
            const loginBtn = document.querySelector('.auth-buttons .btn-outline-light');
            if (loginBtn) {
                loginBtn.classList.remove('scrolled');
            }
        }
    }

    // Apply scroll effect on page load if already scrolled
    updateNavbar();

    // Listen for scroll events
    window.addEventListener('scroll', updateNavbar);
}

// Back to top button
function handleBackToTopButton() {
    const backToTopButton = document.getElementById('backToTop');
    if (!backToTopButton) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Filter buttons
function handleFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length === 0) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Here you would typically filter the content based on the selected category
            // For now, we'll just log the selected category
            console.log('Selected category:', this.textContent.trim());
        });
    });
}

// Theme toggle
function handleThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    const body = document.body;
    const icon = themeToggle.querySelector('i');

    // Function to set theme
    function setTheme(theme) {
        const navbar = document.getElementById('mainNavbar');

        if (theme === 'dark') {
            body.classList.add('dark-theme');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');

            // Update meta theme color for mobile browsers
            const metaThemeColor = document.querySelector('meta[name="theme-color"]');
            if (metaThemeColor) {
                metaThemeColor.setAttribute('content', '#1e293b'); // dark navbar color
            } else {
                const meta = document.createElement('meta');
                meta.name = 'theme-color';
                meta.content = '#1e293b';
                document.head.appendChild(meta);
            }
        } else {
            body.classList.remove('dark-theme');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');

            // Update meta theme color for mobile browsers
            const metaThemeColor = document.querySelector('meta[name="theme-color"]');
            if (metaThemeColor) {
                metaThemeColor.setAttribute('content', '#1f2937'); // light navbar color
            }
        }

        // Apply navbar scrolled class if already scrolled
        if (window.scrollY > 50 && navbar) {
            navbar.classList.add('navbar-scrolled');
        }
    }

    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        // Check system preference
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        if (prefersDarkScheme.matches) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }

    // Listen for theme toggle click
    themeToggle.addEventListener('click', function() {
        if (body.classList.contains('dark-theme')) {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) { // Only if user hasn't manually set a preference
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
}

// Handle like and bookmark buttons
function handleInteractionButtons() {
    // Like buttons
    const likeButtons = document.querySelectorAll('.btn-like');
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            icon.classList.toggle('far');
            icon.classList.toggle('fas');
            icon.classList.toggle('text-danger');

            // Here you would typically send an AJAX request to update the like status
            console.log('Like button clicked');
        });
    });

    // Bookmark buttons
    const bookmarkButtons = document.querySelectorAll('.btn-bookmark');
    bookmarkButtons.forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            icon.classList.toggle('far');
            icon.classList.toggle('fas');
            icon.classList.toggle('text-primary');

            // Here you would typically send an AJAX request to update the bookmark status
            console.log('Bookmark button clicked');
        });
    });
}

// Handle responsive navbar
function handleResponsiveNavbar() {
    // Close navbar collapse when clicking outside
    document.addEventListener('click', function(event) {
        const navbar = document.getElementById('mainNavbar');
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');

        if (!navbar || !navbarToggler || !navbarCollapse) return;

        // If navbar is expanded and click is outside navbar
        if (navbarCollapse.classList.contains('show') &&
            !navbarCollapse.contains(event.target) &&
            !navbarToggler.contains(event.target)) {
            // Create a new bootstrap collapse instance and hide it
            const bsCollapse = new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
        }
    });

    // Close navbar when clicking on a nav-link on mobile
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    if (navLinks.length && navbarCollapse) {
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                // Only close if navbar is expanded (mobile view)
                if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            });
        });
    }

    // Handle dropdown menus on mobile
    const dropdownToggles = document.querySelectorAll('.navbar-nav .dropdown-toggle');

    if (dropdownToggles.length) {
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', function() {
                // Only handle differently on mobile
                if (window.innerWidth < 992) {
                    // Prevent default bootstrap dropdown behavior on mobile
                    if (this.getAttribute('aria-expanded') === 'true') {
                        // If already expanded, let the default behavior close it
                        return;
                    }

                    // Close all other open dropdowns first
                    dropdownToggles.forEach(otherToggle => {
                        if (otherToggle !== this && otherToggle.getAttribute('aria-expanded') === 'true') {
                            const dropdown = new bootstrap.Dropdown(otherToggle);
                            dropdown.hide();
                        }
                    });
                }
            });
        });
    }

    // Handle window resize
    window.addEventListener('resize', function() {
        // If transitioning from mobile to desktop view, ensure dropdowns are reset
        if (window.innerWidth >= 992) {
            const openDropdowns = document.querySelectorAll('.navbar-nav .dropdown-menu.show');
            openDropdowns.forEach(dropdown => {
                const toggle = dropdown.previousElementSibling;
                if (toggle && toggle.classList.contains('dropdown-toggle')) {
                    const bsDropdown = new bootstrap.Dropdown(toggle);
                    bsDropdown.hide();
                }
            });
        }
    });
}

// Initialize AOS animations with responsive settings
function initAOS() {
    // Check if AOS is available
    if (typeof AOS !== 'undefined') {
        // Initialize AOS with responsive settings
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false,
            disable: 'mobile', // Disable on mobile devices for better performance
            offset: 50,
            delay: 100,
            // Responsive settings
            responsive: {
                0: {
                    disable: false, // Enable on all devices
                    offset: 30,
                    duration: 600,
                    delay: 0 // No delay on small devices for better UX
                },
                768: {
                    offset: 50,
                    duration: 800,
                    delay: 100
                }
            }
        });

        // Refresh AOS when images are loaded
        window.addEventListener('load', function() {
            AOS.refresh();
        });

        // Refresh AOS on window resize (debounced)
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                AOS.refresh();
            }, 250);
        });
    }
}
