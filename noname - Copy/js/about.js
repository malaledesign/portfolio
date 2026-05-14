// ===================================
// MALALE — About Page
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    initNavbar();
    initMobileMenu();
    initLanguageSwitcher();
    initScrollAnimations();
    pageLoadAnimation();
});

// ===================================
// NAVBAR SCROLL
// ===================================
function initNavbar() {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            navbar.style.padding = '1rem 0';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
        } else {
            navbar.style.padding = '1.5rem 0';
            navbar.style.boxShadow = 'none';
        }
    });
}

// ===================================
// MOBILE MENU
// ===================================
function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navRight  = document.querySelector('.nav-right');
    const navLinks  = document.querySelectorAll('.nav-link');

    if (!navToggle || !navRight) return;

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navRight.classList.toggle('active');
        document.body.style.overflow = navRight.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navRight.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    document.addEventListener('click', (e) => {
        if (navRight.classList.contains('active') &&
            !navRight.contains(e.target) &&
            !navToggle.contains(e.target)) {
            navToggle.classList.remove('active');
            navRight.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navToggle.classList.remove('active');
            navRight.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ===================================
// LANGUAGE SWITCHER
// ===================================
function initLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');
    let currentLang = 'es';

    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            if (lang === currentLang) return;

            langButtons.forEach(b => b.classList.remove('active'));
            document.querySelectorAll(`.lang-btn[data-lang="${lang}"]`).forEach(b => b.classList.add('active'));

            applyLanguage(lang, true);
            currentLang = lang;
            localStorage.setItem('preferredLanguage', lang);
        });
    });

    // Restore saved preference — simulating click triggers active state update correctly
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && savedLang !== currentLang) {
        const savedBtn = document.querySelector(`.lang-btn[data-lang="${savedLang}"]`);
        if (savedBtn) savedBtn.click();
    }
}

function applyLanguage(lang, animate) {
    document.body.setAttribute('lang', lang);
    document.documentElement.setAttribute('lang', lang);

    const elements = Array.from(document.querySelectorAll('[data-en][data-es]'));
    elements.forEach(el => {
        const translation = el.getAttribute(`data-${lang}`);
        if (translation) {
            if (el.tagName === 'P' && translation.includes('&copy;')) {
                el.innerHTML = translation;
            } else {
                el.textContent = translation;
            }
        }
    });

    if (animate && elements.length > 0) {
        gsap.fromTo(elements,
            { opacity: 0.6 },
            { opacity: 1, duration: 0.4, stagger: 0.01, ease: 'power2.out' }
        );
    }
}

// ===================================
// SCROLL ANIMATIONS
// ===================================
function initScrollAnimations() {
    const sections = [
        '.about-manifesto',
        '.about-bio',
        '.about-disciplines',
        '.about-stats-section',
        '.about-collabs',
        '.about-cta'
    ];

    sections.forEach(sel => {
        const el = document.querySelector(sel);
        if (!el) return;
        gsap.fromTo(el,
            { opacity: 0, y: 48 },
            {
                opacity: 1, y: 0,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: { trigger: el, start: 'top 82%', once: true }
            }
        );
    });

    // Stagger logos
    gsap.fromTo('.collab-logo',
        { opacity: 0, y: 16 },
        {
            opacity: 0.65, y: 0,
            duration: 0.5,
            stagger: 0.07,
            ease: 'power2.out',
            scrollTrigger: { trigger: '.about-collabs', start: 'top 78%', once: true }
        }
    );

    // Stagger discipline items
    gsap.fromTo('.discipline-item, .discipline-dot',
        { opacity: 0, y: 12 },
        {
            opacity: 1, y: 0,
            duration: 0.5,
            stagger: 0.06,
            ease: 'power2.out',
            scrollTrigger: { trigger: '.about-disciplines', start: 'top 82%', once: true }
        }
    );

    // Stats count-up
    document.querySelectorAll('.stat-big').forEach(el => {
        const raw = el.textContent.trim();
        const num = parseInt(raw);
        if (!isNaN(num)) {
            ScrollTrigger.create({
                trigger: el,
                start: 'top 80%',
                once: true,
                onEnter: () => {
                    gsap.to(el, {
                        innerHTML: num,
                        duration: 2,
                        snap: { innerHTML: 1 },
                        ease: 'power2.out',
                        onUpdate() {
                            const suffix = raw.startsWith('+') ? '+' : (raw.endsWith('+') ? '+' : '');
                            el.innerHTML = (raw.startsWith('+') ? '+' : '') + Math.ceil(this.targets()[0].innerHTML) + (raw.endsWith('+') ? '+' : '');
                        }
                    });
                }
            });
        }
    });
}

// ===================================
// PAGE LOAD ANIMATION
// ===================================
function pageLoadAnimation() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo('.navbar',
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
    );
    tl.fromTo('.about-hero-photo',
        { opacity: 0, scale: 1.06 },
        { opacity: 1, scale: 1, duration: 1.3 },
        '-=0.5'
    );
    tl.fromTo('.about-eyebrow',
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.9'
    );
    tl.fromTo('.about-name span',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 },
        '-=0.5'
    );
    tl.fromTo('.about-name-rule',
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.6, transformOrigin: 'left' },
        '-=0.3'
    );
    tl.fromTo('.about-descriptor, .about-location',
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
        '-=0.3'
    );
    tl.fromTo('.about-scroll-cue',
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        '-=0.2'
    );
}
