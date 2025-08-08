// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = this.querySelectorAll('span');
            if (spans.length >= 3) {
                if (navMenu.classList.contains('active')) {
                    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                    spans[1].style.opacity = '0';
                    spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            }
        });
    }

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) {
                navMenu.classList.remove('active');
                // Reset hamburger animation
                if (navToggle) {
                    const spans = navToggle.querySelectorAll('span');
                    spans.forEach(span => {
                        span.style.transform = 'none';
                        span.style.opacity = '1';
                    });
                }
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navToggle && navMenu && !navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            // Reset hamburger animation
            const spans = navToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        }
    });

    // Enhanced smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: 'smooth'
                });
            }
        });
    });

    // Enhanced scroll effect for header
    let lastScrollY = 0;
    let headerTicking = false;
    
    window.addEventListener('scroll', function() {
        if (!headerTicking) {
            requestAnimationFrame(() => {
                const header = document.querySelector('.header');
                const currentScrollY = window.scrollY;
                
                if (header) {
                    if (currentScrollY > 100) {
                        header.style.background = 'rgba(15, 23, 42, 0.98)';
                        header.style.backdropFilter = 'blur(20px)';
                        header.style.borderBottom = '1px solid rgba(14, 165, 233, 0.3)';
                    } else {
                        header.style.background = 'rgba(15, 23, 42, 0.95)';
                        header.style.backdropFilter = 'blur(20px)';
                        header.style.borderBottom = '1px solid rgba(203, 213, 225, 0.1)';
                    }
                    
                    // Hide/show header on scroll
                    if (currentScrollY > lastScrollY && currentScrollY > 200) {
                        header.style.transform = 'translateY(-100%)';
                    } else {
                        header.style.transform = 'translateY(0)';
                    }
                }
                
                lastScrollY = currentScrollY;
                headerTicking = false;
            });
            headerTicking = true;
        }
    }, { passive: true });

    // Enhanced card animations with stagger effect
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -80px 0px'
        };

        const cardObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const cards = entry.target.querySelectorAll('.feature-card, .module-card, .pricing-card, .language-card, .tech-category');
                    
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0) scale(1)';
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);

        // Observe sections containing cards
        document.querySelectorAll('.features, .modules, .pricing, .languages, .tech').forEach(section => {
            const cards = section.querySelectorAll('.feature-card, .module-card, .pricing-card, .language-card, .tech-category');
            
            cards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px) scale(0.95)';
                card.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            });
            
            cardObserver.observe(section);
        });
    }

    // Enhanced button interactions
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
            this.style.boxShadow = '0 10px 40px -10px rgba(14, 165, 233, 0.4)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
        
        btn.addEventListener('click', function(e) {
            // Ripple effect
            if (e.clientX && e.clientY) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                    z-index: 0;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    if (ripple.parentNode) {
                        ripple.remove();
                    }
                }, 600);
            }
        });
    });

    // Add enhanced typing effect to hero title
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.style.opacity = '0';
        
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 500);
    }
    
    // Add parallax effect to hero
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const heroImage = document.querySelector('.hero-image i');
                
                if (heroImage && scrolled < window.innerHeight) {
                    const rate = scrolled * -0.3;
                    heroImage.style.transform = `translateY(${rate}px)`;
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
    
    // Add smooth reveal animations
    if ('IntersectionObserver' in window) {
        const revealElements = document.querySelectorAll('section');
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        revealElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            revealObserver.observe(el);
        });
    }

    // Enhanced counter animation for pricing
    function animateCounter(element, target, prefix = '$', duration = 1500) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = prefix + Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = prefix + target;
            }
        }
        
        updateCounter();
    }

    // Observe pricing cards for enhanced animations
    if ('IntersectionObserver' in window) {
        const pricingObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const priceElement = entry.target.querySelector('.price');
                    if (priceElement && !priceElement.classList.contains('animated')) {
                        priceElement.classList.add('animated');
                        const priceText = priceElement.textContent || '';
                        const priceNumber = parseInt(priceText.replace(/[^0-9]/g, ''));
                        
                        if (priceNumber > 0) {
                            priceElement.textContent = '$0';
                            setTimeout(() => {
                                animateCounter(priceElement, priceNumber);
                            }, 200);
                        }
                    }
                    
                    // Animate card features
                    const features = entry.target.querySelectorAll('li');
                    features.forEach((feature, index) => {
                        setTimeout(() => {
                            feature.style.opacity = '1';
                            feature.style.transform = 'translateX(0)';
                        }, index * 100);
                    });
                }
            });
        }, { threshold: 0.2 });

        document.querySelectorAll('.pricing-card').forEach(card => {
            // Prepare features for animation
            const features = card.querySelectorAll('li');
            features.forEach(feature => {
                feature.style.opacity = '0';
                feature.style.transform = 'translateX(-20px)';
                feature.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            });
            
            pricingObserver.observe(card);
        });
    }
    
    // Add floating animation to hero robot
    const heroRobot = document.querySelector('.hero-image i');
    if (heroRobot) {
        heroRobot.style.animation = 'float 6s ease-in-out infinite';
    }
    
    // Add loading animation
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
        document.body.style.transform = 'translateY(0)';
    });
    
    // Initialize page with loading state
    if (document.readyState === 'loading') {
        document.body.style.opacity = '0';
        document.body.style.transform = 'translateY(20px)';
        document.body.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    }
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});