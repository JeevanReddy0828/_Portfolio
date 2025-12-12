// =====================================================
// Portfolio JavaScript - Main Functionality
// =====================================================

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollEffects();
    initMatrixRain();
    initCubeInteraction();
    initCounterAnimation();
    initTiltEffect();
    initFormHandling();
    initSmoothScroll();
    initSkillIcons();
});

// =====================================================
// Navigation
// =====================================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect for navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// =====================================================
// Scroll Effects
// =====================================================
function initScrollEffects() {
    const backToTop = document.getElementById('backToTop');
    
    // Show/hide back to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // Back to top click
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Fade in animation on scroll
    const fadeElements = document.querySelectorAll('.timeline-item, .skill-category, .project-card, .education-card, .cert-card, .stat-card');
    
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(el => observer.observe(el));
}

// =====================================================
// Matrix Rain Background
// =====================================================
function initMatrixRain() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const matrixRain = document.getElementById('matrixRain');
    
    if (!matrixRain) return;
    
    matrixRain.appendChild(canvas);
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '01</>{}[]();:=+-*&|!~^%$#@ABCDEFfunctionreturnconst';
    const charArray = chars.split('');
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
    }

    function draw() {
        ctx.fillStyle = 'rgba(10, 14, 23, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#3b82f6';
        ctx.font = fontSize + 'px JetBrains Mono, monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 50);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// =====================================================
// 3D Cube Interaction
// =====================================================
function initCubeInteraction() {
    const cube = document.getElementById('codeCube');
    if (!cube) return;

    let isHovered = false;
    let rotationX = -15;
    let rotationY = 0;
    let targetRotationX = -15;
    let targetRotationY = 0;
    let autoRotate = true;

    cube.addEventListener('mouseenter', () => {
        isHovered = true;
        autoRotate = false;
    });

    cube.addEventListener('mouseleave', () => {
        isHovered = false;
        autoRotate = true;
    });

    cube.addEventListener('mousemove', (e) => {
        if (!isHovered) return;
        
        const rect = cube.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        targetRotationY = (x / rect.width) * 60;
        targetRotationX = -(y / rect.height) * 30;
    });

    function animate() {
        if (autoRotate) {
            targetRotationY += 0.3;
        }
        
        rotationX += (targetRotationX - rotationX) * 0.08;
        rotationY += (targetRotationY - rotationY) * 0.08;
        
        cube.style.animation = 'none';
        cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// =====================================================
// Counter Animation
// =====================================================
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 1500;
    const stepTime = duration / 50;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

// =====================================================
// Tilt Effect
// =====================================================
function initTiltEffect() {
    const tiltElements = document.querySelectorAll('[data-tilt]');
    
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(tiltElements, {
            max: 5,
            speed: 400,
            glare: true,
            'max-glare': 0.1,
        });
    }
}

// =====================================================
// Form Handling
// =====================================================
function initFormHandling() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        const formData = {
            name: form.name.value,
            email: form.email.value,
            subject: form.subject.value,
            message: form.message.value
        };

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            
            if (data.status === 'success') {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                form.reset();
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            }
        } catch (error) {
            submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error';
            submitBtn.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        }
    });
}

// =====================================================
// Smooth Scroll
// =====================================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// =====================================================
// Skill Icons
// =====================================================
function initSkillIcons() {
    const skillIconMap = {
        'Python': 'fab fa-python',
        'C': 'fas fa-code',
        'C++': 'fas fa-code',
        'JavaScript': 'fab fa-js-square',
        'SQL': 'fas fa-database',
        'AWS Lambda': 'fab fa-aws',
        'API Gateway': 'fab fa-aws',
        'EC2': 'fab fa-aws',
        'CloudWatch': 'fab fa-aws',
        'Docker': 'fab fa-docker',
        'Podman': 'fas fa-cube',
        'Git': 'fab fa-git-alt',
        'CI/CD': 'fas fa-sync-alt',
        'Linux': 'fab fa-linux',
        'MongoDB': 'fas fa-leaf',
        'MySQL': 'fas fa-database',
        'PostgreSQL': 'fas fa-database',
        'DynamoDB': 'fab fa-aws',
        'Oracle': 'fas fa-database',
        'FastAPI': 'fas fa-bolt',
        'Flask': 'fas fa-pepper-hot',
        'Django': 'fas fa-layer-group',
        'REST API': 'fas fa-plug',
        'Microservices': 'fas fa-cubes',
        'Kafka': 'fas fa-stream',
        'Event Bus': 'fas fa-exchange-alt',
        'Event-Driven Architecture': 'fas fa-sitemap',
        'Message Queues': 'fas fa-envelope',
        'Pytest': 'fas fa-vial',
        'Unit Testing': 'fas fa-check-circle',
        'Integration Testing': 'fas fa-link',
        'Postman': 'fas fa-paper-plane',
        'Bruno': 'fas fa-terminal',
        'Scikit-learn': 'fas fa-brain',
        'TensorFlow': 'fas fa-project-diagram',
        'Keras': 'fas fa-network-wired',
        'PyTorch': 'fas fa-fire',
        'XGBoost': 'fas fa-rocket',
        'LLMs': 'fas fa-robot',
        'GenAI': 'fas fa-wand-magic-sparkles',
        'NLTK': 'fas fa-language',
        'SpaCy': 'fas fa-spell-check',
        'BERT': 'fas fa-comments',
        'Hugging Face': 'fas fa-face-smile',
        'LangChain': 'fas fa-link',
        'RAG': 'fas fa-search',
        'NER': 'fas fa-tag',
        'Pandas': 'fas fa-table',
        'NumPy': 'fas fa-calculator',
        'Matplotlib': 'fas fa-chart-line',
        'Seaborn': 'fas fa-chart-area',
        'Power BI': 'fas fa-chart-pie',
        'Tableau': 'fas fa-chart-bar'
    };

    document.querySelectorAll('.skill-item').forEach(item => {
        const skillName = item.getAttribute('data-skill');
        const iconWrapper = item.querySelector('.skill-icon');
        
        if (iconWrapper && skillIconMap[skillName]) {
            iconWrapper.className = 'skill-icon ' + skillIconMap[skillName];
        }
    });
}

// =====================================================
// Particle Effect on Hero
// =====================================================
function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: #3b82f6;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        left: ${x}px;
        top: ${y}px;
        animation: particleFade 1s ease-out forwards;
    `;
    document.body.appendChild(particle);
    
    setTimeout(() => particle.remove(), 1000);
}

// Add particle animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFade {
        0% {
            opacity: 1;
            transform: scale(1) translate(0, 0);
        }
        100% {
            opacity: 0;
            transform: scale(0) translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
        }
    }
`;
document.head.appendChild(style);

// =====================================================
// Cursor Trail Effect (Optional)
// =====================================================
let mouseX = 0, mouseY = 0;
let cursorTrailEnabled = false;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    if (cursorTrailEnabled && Math.random() > 0.9) {
        createParticle(mouseX, mouseY);
    }
});

// =====================================================
// Keyboard Navigation
// =====================================================
document.addEventListener('keydown', (e) => {
    // Press 'T' to toggle cursor trail
    if (e.key === 't' || e.key === 'T') {
        cursorTrailEnabled = !cursorTrailEnabled;
    }
    
    // Press 'Home' to go to top
    if (e.key === 'Home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Press 'End' to go to bottom
    if (e.key === 'End') {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
});

// =====================================================
// Loading Animation
// =====================================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate hero elements
    const heroElements = document.querySelectorAll('.hero-text > *');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100);
    });
});

// =====================================================
// Console Easter Egg
// =====================================================
console.log('%c👋 Hello, fellow developer!', 'font-size: 24px; font-weight: bold; color: #3b82f6;');
console.log('%cInterested in the code? Check out my GitHub: https://github.com/JeevanReddy0828', 'font-size: 14px; color: #9ca3af;');
console.log('%c💼 Open for opportunities! Contact: arlagadda.jeevan@gmail.com', 'font-size: 14px; color: #10b981;');
