'use strict';

const CV_FILE_PATH = 'resume/Resume_ArkarPyaePhyo.pdf';

function initDownloadButton() {
    const link = document.getElementById('download-cv');
    if (!link) return;

    link.addEventListener('click', (event) => {
        event.preventDefault();
        const tempLink = document.createElement('a');
        tempLink.href = CV_FILE_PATH;
        tempLink.target = '_blank';
        tempLink.rel = 'noopener';
        tempLink.download = 'Resume_ArkarPyaePhyo.pdf';
        document.body.appendChild(tempLink);
        tempLink.click();
        tempLink.remove();
    });
}

function initSectionNavigation() {
    const navLinks = Array.from(document.querySelectorAll('.section-nav .nav-link'));
    if (!navLinks.length) return;

    navLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href');
            const section = document.querySelector(targetId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    const sections = navLinks
        .map((link) => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver((entries) => {
        let maxRatio = 0;
        let maxEntry = null;
        
        entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
                maxRatio = entry.intersectionRatio;
                maxEntry = entry;
            }
        });
        
        if (maxEntry) {
            const id = `#${maxEntry.target.id}`;
            navLinks.forEach((link) => {
                link.classList.toggle('active', link.getAttribute('href') === id);
            });
        }
    }, {
        root: null,
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5],
        rootMargin: '-10% 0px -40% 0px'
    });

    sections.forEach((section) => observer.observe(section));
}

function initCertificateCarousel() {
    const carousel = document.querySelector('.certificate-carousel');
    if (!carousel) return;

    const slides = Array.from(carousel.querySelectorAll('.certificate-slide'));

    if (!slides.length) return;

    let currentIndex = 0;

    const total = slides.length;

    const modulo = (value) => (value + total) % total;

    const updateSlides = () => {
        slides.forEach((slide, index) => {
            slide.classList.remove('active', 'prev', 'next', 'hidden');

            if (index === currentIndex) {
                slide.classList.add('active');
            } else if (index === modulo(currentIndex - 1)) {
                slide.classList.add('prev');
            } else if (index === modulo(currentIndex + 1)) {
                slide.classList.add('next');
            } else {
                slide.classList.add('hidden');
            }
        });
    };

    const goTo = (targetIndex) => {
        currentIndex = modulo(targetIndex);
        updateSlides();
    };

    slides.forEach((slide, index) => {
        slide.addEventListener('click', () => {
            if (index === currentIndex) {
                // Open lightbox for active certificate
                openCertificateLightbox(slide);
            } else {
                goTo(index);
            }
        });
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
            goTo(currentIndex - 1);
        } else if (event.key === 'ArrowRight') {
            goTo(currentIndex + 1);
        }
    });

    updateSlides();
}

function openCertificateLightbox(slide) {
    const imgSrc = slide.querySelector('.certificate-visual img')?.src;
    if (!imgSrc) return;

    // Create lightbox
    const lightbox = document.createElement('div');
    lightbox.className = 'certificate-lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-backdrop"></div>
        <div class="lightbox-content">
            <button class="lightbox-close" aria-label="Close">&times;</button>
            <img src="${imgSrc}" alt="Certificate">
        </div>
    `;

    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';

    // Add close handlers
    const close = () => {
        lightbox.classList.add('closing');
        setTimeout(() => {
            document.body.removeChild(lightbox);
            document.body.style.overflow = '';
        }, 300);
    };

    lightbox.querySelector('.lightbox-close').addEventListener('click', close);
    lightbox.querySelector('.lightbox-backdrop').addEventListener('click', close);
    
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            close();
            document.removeEventListener('keydown', escHandler);
        }
    });

    // Animate in
    setTimeout(() => lightbox.classList.add('active'), 10);
}

function initCursorHalo() {
    const root = document.documentElement;
    if (!root) return;

    // Create the spotlight element
    let spotlight = document.getElementById('cursor-spotlight');
    if (!spotlight) {
        spotlight = document.createElement('div');
        spotlight.id = 'cursor-spotlight';
        spotlight.style.position = 'fixed';
        spotlight.style.pointerEvents = 'none';
        spotlight.style.zIndex = '9999';
        spotlight.style.width = '600px';
        spotlight.style.height = '600px';
        spotlight.style.borderRadius = '50%';
        spotlight.style.background = 'radial-gradient(circle, rgba(0,123,255,0.22) 0%, rgba(0,123,255,0.10) 60%, rgba(0,123,255,0) 100%)';
        spotlight.style.filter = 'blur(120px)';
        spotlight.style.transition = 'opacity 0.25s cubic-bezier(.4,0,.2,1)';
        spotlight.style.opacity = '0';
        spotlight.style.transform = 'translate(-50%, -50%)';
        document.body.appendChild(spotlight);
    }

    let lastX = window.innerWidth / 2;
    let lastY = window.innerHeight / 2;
    let visible = false;

    function moveSpotlight(x, y) {
        // Use requestAnimationFrame for smoothness
        spotlight.style.left = `${x}px`;
        spotlight.style.top = `${y}px`;
    }

    function showSpotlight() {
        if (!visible) {
            spotlight.style.opacity = '1';
            visible = true;
        }
    }

    function hideSpotlight() {
        if (visible) {
            spotlight.style.opacity = '0';
            visible = false;
        }
    }

    let rafId = null;
    let targetX = lastX;
    let targetY = lastY;

    function animate() {
        // Motion blur: interpolate position
        lastX += (targetX - lastX) * 0.25;
        lastY += (targetY - lastY) * 0.25;
        moveSpotlight(lastX, lastY);
        rafId = requestAnimationFrame(animate);
    }

    const handlePointerMove = (event) => {
        targetX = event.clientX;
        targetY = event.clientY;
        showSpotlight();
        if (!rafId) {
            animate();
        }
    };

    const handlePointerOut = (event) => {
        if (!event.relatedTarget) {
            hideSpotlight();
            if (rafId) {
                cancelAnimationFrame(rafId);
                rafId = null;
            }
        }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerout', handlePointerOut, { passive: true });
    window.addEventListener('blur', () => {
        hideSpotlight();
        if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = null;
        }
    }, { passive: true });
}

function init() {
    initDownloadButton();
    initSectionNavigation();
    initCertificateCarousel();
    initCursorHalo();
}

document.addEventListener('DOMContentLoaded', init);
