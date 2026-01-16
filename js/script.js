'use strict';

const CV_FILE_ID = '18ZRel2enGR9QxSmOWof7r6_eNIc0gbX3';

function initDownloadButton() {
    const link = document.getElementById('download-cv');
    if (!link) return;

    link.addEventListener('click', (event) => {
        event.preventDefault();
        const downloadUrl = `https://drive.google.com/uc?export=download&id=${CV_FILE_ID}`;
        const tempLink = document.createElement('a');
        tempLink.href = downloadUrl;
        tempLink.target = '_blank';
        tempLink.rel = 'noopener';
        tempLink.download = 'Arkar_Pyae_Phyo_CV.pdf';
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

    const setPosition = (x, y) => {
        root.style.setProperty('--cursor-x', `${x}px`);
        root.style.setProperty('--cursor-y', `${y}px`);
    };

    const handlePointerMove = (event) => {
        setPosition(event.clientX, event.clientY);
        root.style.setProperty('--cursor-opacity', '1');
    };

    const handlePointerOut = (event) => {
        if (!event.relatedTarget) {
            root.style.setProperty('--cursor-opacity', '0');
        }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerout', handlePointerOut, { passive: true });
    window.addEventListener('blur', () => root.style.setProperty('--cursor-opacity', '0'), { passive: true });
}

function init() {
    initDownloadButton();
    initSectionNavigation();
    initCertificateCarousel();
    initCursorHalo();
}

document.addEventListener('DOMContentLoaded', init);
