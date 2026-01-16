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
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const id = `#${entry.target.id}`;
                navLinks.forEach((link) => {
                    link.classList.toggle('active', link.getAttribute('href') === id);
                });
            }
        });
    }, {
        root: null,
        threshold: 0.35,
        rootMargin: '-20% 0px -35% 0px'
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
            if (index !== currentIndex) {
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
