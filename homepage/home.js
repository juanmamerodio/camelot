/**
 * CAMELOT | INSTITUCIONAL — FASE FINAL
 * Engine de Interacción: Inspirado en físicas de iOS, easing natural y modularidad.
 * Optimizado para alto rendimiento (Hardware Acceleration).
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. REVEAL SYSTEM (Intersection Observer) ---
    // Maneja la aparición fluida de los elementos al scrollear
    const revealOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Manejo dual para clases genéricas y las específicas del hero
                entry.target.classList.add('active');
                if (entry.target.classList.contains('reveal-hero')) {
                    entry.target.classList.add('visible');
                }
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealOptions);

    document.querySelectorAll('.reveal, .reveal-hero').forEach(el => revealObserver.observe(el));


    // --- 2. DYNAMIC ISLAND NAV (Estilo iOS) ---
    // Comportamiento flotante con morphing de blurs y sombras
    const nav = document.getElementById('main-nav');
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateNav = () => {
        const currentScrollY = window.scrollY;

        // Morphing del background y padding según la posición
        if (currentScrollY > 50) {
            nav.style.background = 'rgba(6, 13, 31, 0.85)';
            nav.style.backdropFilter = 'blur(24px) saturate(200%)';
            nav.style.webkitBackdropFilter = 'blur(24px) saturate(200%)'; // Soporte extra Safari
            nav.style.padding = '12px 14px 12px 28px';
            nav.style.boxShadow = '0 16px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
        } else {
            nav.style.background = 'rgba(6, 13, 31, 0.72)';
            nav.style.backdropFilter = 'blur(40px) saturate(180%)';
            nav.style.webkitBackdropFilter = 'blur(40px) saturate(180%)';
            nav.style.padding = '10px 10px 10px 28px';
            nav.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.06)';
        }

        // Hide/Show inteligente escalado (como cuando scrolleas en una app nativa)
        if (currentScrollY > lastScrollY && currentScrollY > 300) {
            nav.style.transform = 'translate(-50%, -150%) scale(0.9)';
            nav.style.opacity = '0';
        } else {
            nav.style.transform = 'translate(-50%, 0) scale(1)';
            nav.style.opacity = '1';
            nav.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        }

        lastScrollY = currentScrollY;
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateNav);
            ticking = true;
        }
    }, { passive: true });


    // --- 3. MAGNETIC BUTTONS (Física interactiva premium) ---
    // Le da ese toque donde el botón "sigue" sutilmente al mouse
    const magneticButton = document.getElementById('nav-cta');
    if (magneticButton) {
        magneticButton.addEventListener('mousemove', (e) => {
            const rect = magneticButton.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Limitamos la fuerza del imán multiplicando por 0.3
            magneticButton.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`;
        });

        magneticButton.addEventListener('mouseleave', () => {
            magneticButton.style.transform = 'translate(0px, 0px) scale(1)';
            // Restauramos la transición fluida para cuando el mouse sale
            magneticButton.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        });

        magneticButton.addEventListener('mouseenter', () => {
            // Sacamos la transición CSS para que el imán siga al mouse en tiempo real sin delay
            magneticButton.style.transition = 'none';
        });
    }


    // --- 4. COUNTER ENGINE (Animación de la franja de datos) ---
    const counters = document.querySelectorAll('.proof-num');

    // Función matemática para un easing perfecto (desacelera suavemente al llegar al número)
    const easeOutExpo = (x) => x === 1 ? 1 : 1 - Math.pow(2, -10 * x);

    const animateValue = (obj, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeProgress = easeOutExpo(progress);

            obj.innerHTML = Math.floor(easeProgress * (end - start) + start);

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                obj.innerHTML = end; // Fijamos el valor exacto al final por las dudas
            }
        };
        window.requestAnimationFrame(step);
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetEl = entry.target;
                const targetValue = parseInt(targetEl.getAttribute('data-target'), 10);
                if (!isNaN(targetValue)) {
                    animateValue(targetEl, 0, targetValue, 2500); // 2.5 segundos de duración
                }
                observer.unobserve(targetEl);
            }
        });
    }, { threshold: 0.6 });

    counters.forEach(counter => counterObserver.observe(counter));


    // --- 5. PARALLAX SCROLL (Video Hero) ---
    const heroVideo = document.querySelector('.hero-video');
    window.addEventListener('scroll', () => {
        if (!heroVideo) return;
        const scrolled = window.scrollY;

        // Solo animamos si estamos en la primera pantalla para no comer recursos
        if (scrolled < window.innerHeight) {
            // Efecto sutil de zoom in al bajar (con translate3d para forzar el GPU)
            const scale = 1.04 + (scrolled * 0.0004);
            const opacity = 0.35 - (scrolled * 0.0006);
            heroVideo.style.transform = `scale(${scale}) translate3d(0,0,0)`;
            heroVideo.style.opacity = Math.max(opacity, 0); // Evitamos valores negativos
        }
    }, { passive: true });


    // --- 6. MENÚ MOBILE (Control de estados y bloqueo de pantalla) ---
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    const toggleMobileMenu = () => {
        const isOpen = mobileMenu.classList.contains('open');

        if (!isOpen) {
            mobileMenu.classList.add('open');
            hamburger.classList.add('open');
            hamburger.setAttribute('aria-expanded', 'true');
            mobileMenu.setAttribute('aria-hidden', 'false');
            // Bloqueamos el scroll del body
            document.body.style.overflow = 'hidden';
        } else {
            mobileMenu.classList.remove('open');
            hamburger.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
            mobileMenu.setAttribute('aria-hidden', 'true');
            // Desbloqueamos
            document.body.style.overflow = '';
        }
    };

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }


    // --- 7. FORM SUBMISSION (Prevent Default) ---
    const enrollForm = document.getElementById('enroll-form');
    if (enrollForm) {
        enrollForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = enrollForm.querySelector('.btn-submit');
            const originalText = btn.innerText;
            
            btn.innerText = 'Enviando...';
            btn.disabled = true;

            // Simulación de envío premium
            setTimeout(() => {
                btn.innerText = 'Consulta enviada';
                enrollForm.reset();
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }


    // --- 8. SMOOTH SCROLL PARA ANCHORS INTERNOS ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();

                // Si el menú mobile está abierto, lo cerramos
                if (mobileMenu && mobileMenu.classList.contains('open')) {
                    toggleMobileMenu();
                }

                const navHeight = 100; // Compensación por nav flotante
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

});