// Modern Tech Portfolio JavaScript

// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 1000,
  easing: 'ease-out-cubic',
  once: true,
  offset: 100
});

// Navigation functionality
class Navigation {
  constructor() {
    this.navbar = document.getElementById('navbar');
    this.navToggle = document.getElementById('nav-toggle');
    this.navMenu = document.getElementById('nav-menu');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.progressBar = document.getElementById('progress-bar');
    
    this.init();
  }
  
  init() {
    this.setupScrollEffect();
    this.setupMobileMenu();
    this.setupSmoothScrolling();
    this.setupProgressBar();
    this.setupActiveSection();
  }
  
  setupScrollEffect() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        this.navbar.classList.add('scrolled');
      } else {
        this.navbar.classList.remove('scrolled');
      }
    });
  }
  
  setupMobileMenu() {
    this.navToggle.addEventListener('click', () => {
      this.navMenu.classList.toggle('active');
      this.navToggle.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    this.navLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.navMenu.classList.remove('active');
        this.navToggle.classList.remove('active');
      });
    });
  }
  
  setupSmoothScrolling() {
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }
  
  setupProgressBar() {
    window.addEventListener('scroll', () => {
      const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      this.progressBar.style.width = `${scrolled}%`;
    });
  }
  
  setupActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
      const scrollY = window.pageYOffset;
      
      sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    });
  }
}

// Terminal typing animation
class TerminalAnimation {
  constructor() {
    this.init();
  }
  
  init() {
    this.setupTypingAnimation();
    this.setupTerminalButtons();
  }
  
  setupTypingAnimation() {
    const typingElements = document.querySelectorAll('.typing-animation');
    
    typingElements.forEach((element, index) => {
      const text = element.getAttribute('data-text');
      element.textContent = '';
      
      setTimeout(() => {
        this.typeText(element, text, 100);
      }, index * 2000);
    });
  }
  
  typeText(element, text, speed) {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(timer);
        element.style.borderRight = 'none';
      }
    }, speed);
  }
  
  setupTerminalButtons() {
    const closeBtn = document.querySelector('.close');
    const minimizeBtn = document.querySelector('.minimize');
    const maximizeBtn = document.querySelector('.maximize');
    const terminal = document.querySelector('.hero-terminal');
    
    if (closeBtn && terminal) {
      closeBtn.addEventListener('click', () => {
        terminal.style.animation = 'fadeOut 0.5s forwards';
        setTimeout(() => {
          terminal.style.animation = 'fadeIn 0.5s forwards';
        }, 2000);
      });
    }
    
    if (minimizeBtn && terminal) {
      minimizeBtn.addEventListener('click', () => {
        terminal.style.transform = 'scale(0.8)';
        terminal.style.opacity = '0.5';
        setTimeout(() => {
          terminal.style.transform = 'scale(1)';
          terminal.style.opacity = '1';
        }, 1000);
      });
    }
    
    if (maximizeBtn && terminal) {
      maximizeBtn.addEventListener('click', () => {
        terminal.classList.toggle('maximized');
      });
    }
  }
}

// Skills animation
class SkillsAnimation {
  constructor() {
    this.init();
  }
  
  init() {
    this.setupIntersectionObserver();
  }
  
  setupIntersectionObserver() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.style.width || '0%';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
      observer.observe(bar);
    });
  }
}

// Particles animation
class ParticlesAnimation {
  constructor() {
    this.canvas = this.createCanvas();
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.init();
  }
  
  createCanvas() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);
    return canvas;
  }
  
  init() {
    this.resize();
    this.createParticles();
    this.animate();
    
    window.addEventListener('resize', () => this.resize());
  }
  
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  createParticles() {
    const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 10000);
    
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        life: Math.random()
      });
    }
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach(particle => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life += 0.01;
      
      // Wrap around edges
      if (particle.x < 0) particle.x = this.canvas.width;
      if (particle.x > this.canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = this.canvas.height;
      if (particle.y > this.canvas.height) particle.y = 0;
      
      // Draw particle
      const opacity = Math.sin(particle.life) * 0.5 + 0.5;
      this.ctx.fillStyle = `rgba(0, 255, 136, ${opacity * 0.1})`;
      this.ctx.fillRect(particle.x, particle.y, 1, 1);
    });
    
    requestAnimationFrame(() => this.animate());
  }
}

// Form handling
class ContactForm {
  constructor() {
    this.form = document.querySelector('.form');
    this.init();
  }
  
  init() {
    if (this.form) {
      this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
  }
  
  handleSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    const submitBtn = this.form.querySelector('.form-submit');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        this.form.reset();
      }, 2000);
    }, 2000);
  }
}

// Floating elements animation
class FloatingElements {
  constructor() {
    this.elements = document.querySelectorAll('.profile-card, .code-snippet, .project-card');
    this.init();
  }
  
  init() {
    this.elements.forEach((element, index) => {
      this.addFloatingAnimation(element, index);
    });
  }
  
  addFloatingAnimation(element, index) {
    const delay = index * 0.5;
    element.style.animation = `float 6s ease-in-out infinite ${delay}s`;
  }
}

// Theme switcher (for future enhancement)
class ThemeManager {
  constructor() {
    this.currentTheme = localStorage.getItem('theme') || 'dark';
    this.init();
  }
  
  init() {
    this.applyTheme();
    // Can add theme toggle button here
  }
  
  applyTheme() {
    document.documentElement.setAttribute('data-theme', this.currentTheme);
  }
  
  toggleTheme() {
    this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', this.currentTheme);
    this.applyTheme();
  }
}

// Performance optimization
class PerformanceOptimizer {
  constructor() {
    this.init();
  }
  
  init() {
    this.lazyLoadImages();
    this.optimizeAnimations();
  }
  
  lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }
  
  optimizeAnimations() {
    // Reduce animations on low-performance devices
    if (navigator.hardwareConcurrency < 4) {
      document.documentElement.style.setProperty('--transition-normal', '0.1s ease');
      document.documentElement.style.setProperty('--transition-slow', '0.2s ease');
    }
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Core functionality
  new Navigation();
  new TerminalAnimation();
  new SkillsAnimation();
  new ContactForm();
  new FloatingElements();
  new ThemeManager();
  new PerformanceOptimizer();
  
  // Initialize particles only on desktop for performance
  if (window.innerWidth > 768) {
    new ParticlesAnimation();
  }
  
  // Add custom cursor
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);
  
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
  
  // Add keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-navigation');
    }
  });
  
  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
  });
});

// Add some CSS animations dynamically
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes fadeOut {
    to { opacity: 0; transform: scale(0.8); }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.8); }
    to { opacity: 1; transform: scale(1); }
  }
  
  .hero-terminal.maximized {
    position: fixed !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) scale(1.2) !important;
    z-index: 1000 !important;
    max-width: 90vw !important;
    max-height: 90vh !important;
  }
  
  .custom-cursor {
    position: fixed;
    width: 20px;
    height: 20px;
    background: rgba(0, 255, 136, 0.3);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.1s ease;
  }
  
  .keyboard-navigation *:focus {
    outline: 2px solid var(--text-accent) !important;
    outline-offset: 2px !important;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
`;
document.head.appendChild(styleSheet);

// Error handling
window.addEventListener('error', (e) => {
  console.error('Portfolio error:', e.error);
});

// Performance monitoring
if ('performance' in window) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = performance.getEntriesByType('navigation')[0];
      console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart + 'ms');
    }, 0);
  });
}

// CV Download functionality
function downloadCV() {
  // Google Drive direct download link
  const driveFileId = '1FMGbXRDR5gTQvhnRmNq0mNd9KUf8_GY6';
  const downloadUrl = `https://drive.google.com/uc?export=download&id=${driveFileId}`;
  
  // Create a temporary link element and trigger download
  const a = document.createElement('a');
  a.href = downloadUrl;
  a.download = 'Resume_Arkar_Pyae_Phyo.pdf';
  a.target = '_blank'; // Open in new tab as fallback
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  
  // Show feedback to user
  const button = document.querySelector('.cta-primary');
  if (button) {
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i> Downloading...';
    
    setTimeout(() => {
      button.innerHTML = originalText;
    }, 2000);
  }
}
