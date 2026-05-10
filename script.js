document.addEventListener('DOMContentLoaded', () => {

    // =========================================
    // 1. HERO — Staggered Cinematic Entrance
    // =========================================
    const heroStaggerElements = document.querySelectorAll('.hero-stagger');

    // Small delay to let the page render, then trigger the sequence
    setTimeout(() => {
        heroStaggerElements.forEach(el => {
            el.classList.add('visible');
        });
    }, 300);

    // =========================================
    // 2. NAVBAR — Dynamic Island scroll effect
    // =========================================
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });

    // =========================================
    // 3. HERO — Subtle parallax on video
    // =========================================
    const heroBg = document.querySelector('.hero-bg');
    const hero = document.querySelector('.hero');

    if (heroBg && hero) {
        window.addEventListener('scroll', () => {
            const heroBottom = hero.offsetHeight;
            if (window.scrollY < heroBottom) {
                const offset = window.scrollY * 0.3;
                heroBg.style.transform = `scale(1.05) translateY(${offset}px)`;
            }
        }, { passive: true });
    }

    // =========================================
    // 4. SCROLL REVEAL — IntersectionObserver
    // =========================================
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => revealOnScroll.observe(el));

    // =========================================
    // 5. COUNTER ANIMATION — Social Proof
    // =========================================
    const counterElements = document.querySelectorAll('.proof-number[data-target]');

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const el = entry.target;
            const target = parseInt(el.getAttribute('data-target'), 10);
            const duration = 1800; // ms
            const start = performance.now();

            function animateCounter(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);

                // Ease-out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.round(target * eased);

                el.textContent = current;

                if (progress < 1) {
                    requestAnimationFrame(animateCounter);
                } else {
                    el.textContent = target;
                }
            }

            requestAnimationFrame(animateCounter);
            observer.unobserve(el);
        });
    }, { threshold: 0.5 });

    counterElements.forEach(el => counterObserver.observe(el));

    // =========================================
    // 6. SMOOTH ANCHOR SCROLLING
    // =========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

});
