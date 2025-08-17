// Enhanced JavaScript for Vision IA modern SaaS website
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile menu toggle
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

    // Enhanced header scroll effects
    let lastScrollY = 0;
    let headerTicking = false;
    
    window.addEventListener('scroll', function() {
        if (!headerTicking) {
            requestAnimationFrame(() => {
                const header = document.querySelector('.header');
                const currentScrollY = window.scrollY;
                
                if (header) {
                    if (currentScrollY > 100) {
                        header.style.background = 'rgba(10, 10, 15, 0.98)';
                        header.style.backdropFilter = 'blur(20px)';
                        header.style.borderBottom = '1px solid rgba(102, 126, 234, 0.3)';
                        header.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.3)';
                    } else {
                        header.style.background = 'rgba(10, 10, 15, 0.95)';
                        header.style.backdropFilter = 'blur(20px)';
                        header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
                        header.style.boxShadow = 'none';
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

    // Intersection Observer for animations
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        // Animate elements on scroll
        const animateObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Special handling for cards with stagger effect
                    if (entry.target.classList.contains('features-grid') || 
                        entry.target.classList.contains('results-grid') ||
                        entry.target.classList.contains('pricing-grid') ||
                        entry.target.classList.contains('testimonials-grid')) {
                        
                        const cards = entry.target.children;
                        Array.from(cards).forEach((card, index) => {
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, index * 150);
                        });
                    }
                }
            });
        }, observerOptions);

        // Observe sections and grids
        document.querySelectorAll('section, .features-grid, .results-grid, .pricing-grid, .testimonials-grid').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            animateObserver.observe(el);
        });

        // Prepare cards for stagger animation
        document.querySelectorAll('.feature-card, .result-card, .pricing-card, .testimonial-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
    }

    // Enhanced button interactions with ripple effect
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Create ripple effect
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
        });
    });

    // Animated counters for stats and results
    function animateCounter(element, target, duration = 2000, prefix = '', suffix = '') {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = prefix + Math.floor(start) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = prefix + target + suffix;
            }
        }
        
        updateCounter();
    }

    // Observe stats and counters for animation
    if ('IntersectionObserver' in window) {
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    entry.target.classList.add('animated');
                    
                    // Animate stat numbers
                    const statNumbers = entry.target.querySelectorAll('.stat-number');
                    statNumbers.forEach(stat => {
                        const text = stat.textContent;
                        if (text.includes('1000+')) {
                            stat.textContent = '0+';
                            animateCounter(stat, 1000, 2000, '', '+');
                        } else if (text.includes('+1M')) {
                            stat.textContent = '+0M';
                            animateCounter(stat, 1, 2000, '+', 'M');
                        } else if (text.includes('99.9%')) {
                            stat.textContent = '0%';
                            animateCounter(stat, 99.9, 2000, '', '%');
                        }
                    });
                    
                    // Animate result numbers
                    const resultNumbers = entry.target.querySelectorAll('.result-number');
                    resultNumbers.forEach(result => {
                        const text = result.textContent;
                        if (text.includes('3x')) {
                            result.textContent = '0x';
                            animateCounter(result, 3, 2000, '', 'x');
                        } else if (text.includes('80%')) {
                            result.textContent = '0%';
                            animateCounter(result, 80, 2000, '', '%');
                        } else if (text.includes('60%')) {
                            result.textContent = '0%';
                            animateCounter(result, 60, 2000, '', '%');
                        }
                    });
                    
                    // Animate companies counter
                    const counterNumbers = entry.target.querySelectorAll('.counter-number');
                    counterNumbers.forEach(counter => {
                        const target = parseInt(counter.getAttribute('data-target'));
                        if (target) {
                            counter.textContent = '0';
                            animateCounter(counter, target, 2500, '', '');
                        }
                    });
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.hero-stats, .results, .companies-counter').forEach(section => {
            statsObserver.observe(section);
        });
    }

    // Parallax effect for hero elements
    let parallaxTicking = false;
    window.addEventListener('scroll', () => {
        if (!parallaxTicking) {
            requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const heroVisual = document.querySelector('.hero-visual');
                
                if (heroVisual && scrolled < window.innerHeight) {
                    const rate = scrolled * -0.2;
                    heroVisual.style.transform = `translateY(${rate}px)`;
                }
                
                parallaxTicking = false;
            });
            parallaxTicking = true;
        }
    }, { passive: true });

    // Enhanced card hover effects
    document.querySelectorAll('.feature-card, .result-card, .pricing-card, .testimonial-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.4)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });

    // Typing effect for hero title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Initialize typing effect after a delay
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero h1');
        if (heroTitle) {
            const originalText = heroTitle.textContent;
            typeWriter(heroTitle, originalText, 50);
        }
    }, 1000);

    // Smooth reveal for sections
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('section').forEach(section => {
            section.classList.add('reveal');
            revealObserver.observe(section);
        });
    }

    // Enhanced pricing card interactions
    document.querySelectorAll('.pricing-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Highlight featured benefits
            const features = this.querySelectorAll('.features-list li');
            features.forEach((feature, index) => {
                setTimeout(() => {
                    feature.style.transform = 'translateX(5px)';
                    feature.style.color = 'var(--text-primary)';
                }, index * 50);
            });
        });
        
        card.addEventListener('mouseleave', function() {
            const features = this.querySelectorAll('.features-list li');
            features.forEach(feature => {
                feature.style.transform = 'translateX(0)';
                feature.style.color = 'var(--text-secondary)';
            });
        });
    });

    // WhatsApp chat animation
    function animateChat() {
        const messageGroups = document.querySelectorAll('.message-group');
        messageGroups.forEach((group, groupIndex) => {
            const messages = group.querySelectorAll('.message');
            messages.forEach((message, messageIndex) => {
                message.style.opacity = '0';
                message.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    message.style.opacity = '1';
                    message.style.transform = 'translateY(0)';
                    message.style.transition = 'all 0.5s ease';
                }, (groupIndex * 1500) + (messageIndex * 300) + 1000);
            });
        });
    }

    // Start chat animation after page load
    setTimeout(animateChat, 2000);
    
    // Continuous typing animation
    setInterval(() => {
        const typingIndicator = document.querySelector('.typing');
        if (typingIndicator) {
            typingIndicator.style.opacity = '0';
            setTimeout(() => {
                typingIndicator.style.opacity = '1';
            }, 500);
        }
    }, 4000);

    // Enhanced phone mockup interactions
    const phoneMockup = document.querySelector('.phone-mockup');
    if (phoneMockup) {
        phoneMockup.addEventListener('mouseenter', function() {
            this.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1.02)';
        });
        
        phoneMockup.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateY(-5deg) rotateX(5deg)';
        });
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

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .reveal {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .reveal.revealed {
            opacity: 1;
            transform: translateY(0);
        }
        
        .gradient-text {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
    `;
    document.head.appendChild(style);

    // Enhanced counter animation with easing
    function animateCounterWithEasing(element, target, duration = 2000, prefix = '', suffix = '') {
        let start = 0;
        const startTime = performance.now();
        
        function easeOutQuart(t) {
            return 1 - (--t) * t * t * t;
        }
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutQuart(progress);
            
            const current = Math.floor(start + (target - start) * easedProgress);
            element.textContent = prefix + current + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = prefix + target + suffix;
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
    
    // Performance optimization: Lazy load images and heavy content
    if ('IntersectionObserver' in window) {
        const lazyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Trigger any heavy animations or content loading here
                    entry.target.classList.add('loaded');
                    lazyObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        // Observe heavy sections
        document.querySelectorAll('.hero-visual, .phone-mockup').forEach(el => {
            lazyObserver.observe(el);
        });
    }

    // Add smooth transitions for all interactive elements
    document.querySelectorAll('a, button, .btn').forEach(el => {
        el.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });

    // Add smooth scroll behavior for better UX
    document.documentElement.style.scrollBehavior = 'smooth';
    
    console.log('🚀 Vision IA website loaded successfully!');
    console.log('✨ Enhanced design with improved phone mockup and counter animations');
    console.log('🎯 All requested changes implemented successfully');
});