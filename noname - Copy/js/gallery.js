// ===================================
// GALLERY PAGE JAVASCRIPT
// Malale Design Studio - 3D Gallery
// ===================================

// ===================================
// GROUP DATA
// ===================================
const groupData = {
    'ambient-g1': {
        category: 'Ambiente & Espacios',
        images: [
            'img/projects/3d gallery/Ambient & Room/g1/15.png',
            'img/projects/3d gallery/Ambient & Room/g1/16.png',
            'img/projects/3d gallery/Ambient & Room/g1/17.png',
            'img/projects/3d gallery/Ambient & Room/g1/18.png',
            'img/projects/3d gallery/Ambient & Room/g1/19.png',
        ]
    },
    'ambient-g2': {
        category: 'Ambiente & Espacios',
        images: [
            'img/projects/3d gallery/Ambient & Room/g2/7.png',
            'img/projects/3d gallery/Ambient & Room/g2/2.png',
            'img/projects/3d gallery/Ambient & Room/g2/3.png',
            'img/projects/3d gallery/Ambient & Room/g2/4.png',
            'img/projects/3d gallery/Ambient & Room/g2/5.png',
            'img/projects/3d gallery/Ambient & Room/g2/6.png',
            'img/projects/3d gallery/Ambient & Room/g2/1.png'
        ]
    },
    'ambient-g3': {
        category: 'Ambiente & Espacios',
        images: [
            'img/projects/3d gallery/Ambient & Room/g3/01 A.png',
            'img/projects/3d gallery/Ambient & Room/g3/02 A.png',
            'img/projects/3d gallery/Ambient & Room/g3/03 A.png',
            'img/projects/3d gallery/Ambient & Room/g3/04 A.png'
        ]
    },
    'ambient-g4': {
        category: 'Ambiente & Espacios',
        images: [
            'img/projects/3d gallery/Ambient & Room/g4/11.png',
            'img/projects/3d gallery/Ambient & Room/g4/9.png',
            'img/projects/3d gallery/Ambient & Room/g4/10.png',
            'img/projects/3d gallery/Ambient & Room/g4/8.png',
            'img/projects/3d gallery/Ambient & Room/g4/13.png',
            'img/projects/3d gallery/Ambient & Room/g4/12.png'
        ]
    },
    'ambient-g5': {
        category: 'Ambiente & Espacios',
        images: [
            'img/projects/3d gallery/Ambient & Room/g5/Japan room 03.png',
            'img/projects/3d gallery/Ambient & Room/g5/Japan room 04.png',
            'img/projects/3d gallery/Ambient & Room/g5/Japan room 05.png'
        ]
    },
    'ambient-g6': {
        category: 'Ambiente & Espacios',
        images: [
            'img/projects/3d gallery/Ambient & Room/g6/03.png',
            'img/projects/3d gallery/Ambient & Room/g6/04.png',
            'img/projects/3d gallery/Ambient & Room/g6/05.png'
        ]
    },
    'ambient-g7': {
        category: 'Ambiente & Espacios',
        images: [
            'img/projects/3d gallery/Ambient & Room/g7/01.png',
            'img/projects/3d gallery/Ambient & Room/g7/02.png',
            'img/projects/3d gallery/Ambient & Room/g7/03 (1).png'
        ]
    },
    'product-g1': {
        category: 'Productos & Objetos',
        images: [
            'img/projects/3d gallery/Product & Objects/g1/1.png',
            'img/projects/3d gallery/Product & Objects/g1/2.png'
        ]
    },
    'product-g2': {
        category: 'Productos & Objetos',
        images: [
            'img/projects/3d gallery/Product & Objects/g2/1-1.png',
            'img/projects/3d gallery/Product & Objects/g2/2-2.png',
            'img/projects/3d gallery/Product & Objects/g2/3.png'
        ]
    },
    'product-g3': {
        category: 'Productos & Objetos',
        images: [
            'img/projects/3d gallery/Product & Objects/g3/4.png',
            'img/projects/3d gallery/Product & Objects/g3/5.png'
        ]
    },
    'product-g4': {
        category: 'Productos & Objetos',
        images: [
            'img/projects/3d gallery/Product & Objects/g4/Anillo A.png',
            'img/projects/3d gallery/Product & Objects/g4/Anillo A.A.png'
        ]
    },
    'product-g5': {
        category: 'Productos & Objetos',
        images: [
            'img/projects/3d gallery/Product & Objects/g5/03 (1) (1).png'
        ]
    }
};

// ===================================
// INITIALIZATION
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    initGallery();
});

function initGallery() {
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    initFilters();
    initGroupPanel();
    initMobileMenu();
    initGalleryAnimations();
    initNavbar();
    initLanguageSwitcher();
    pageLoadAnimation();
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

            document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
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

    if (animate && typeof gsap !== 'undefined' && elements.length > 0) {
        gsap.fromTo(elements,
            { opacity: 0.6 },
            { opacity: 1, duration: 0.4, stagger: 0.01, ease: 'power2.out' }
        );
    }
}

// ===================================
// FILTER FUNCTIONALITY
// ===================================
function initFilters() {
    const filterTabs   = document.querySelectorAll('.filter-tab');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const filter = tab.getAttribute('data-filter');
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            filterGalleryItems(filter, galleryItems);
        });
    });
}

function filterGalleryItems(filter, items) {
    items.forEach((item, index) => {
        const category = item.getAttribute('data-category');

        if (filter === 'all' || category === filter) {
            setTimeout(() => {
                item.style.display = 'block';
                item.classList.remove('hidden');
                item.classList.add('visible');

                if (typeof gsap !== 'undefined') {
                    gsap.fromTo(item,
                        { opacity: 0, y: 30, scale: 0.9 },
                        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power2.out' }
                    );
                }
            }, index * 50);
        } else {
            item.classList.remove('visible');
            item.classList.add('hidden');

            if (typeof gsap !== 'undefined') {
                gsap.to(item, {
                    opacity: 0, scale: 0.9, duration: 0.3,
                    onComplete: () => { item.style.display = 'none'; }
                });
            } else {
                setTimeout(() => { item.style.display = 'none'; }, 300);
            }
        }
    });
}

// ===================================
// GROUP PANEL (OVERLAY)
// ===================================
function initGroupPanel() {
    const panel      = document.getElementById('groupPanel');
    const container  = document.querySelector('.group-moodboard-container');
    const closeBtn   = document.getElementById('groupPanelClose');
    const categoryEl = document.getElementById('groupPanelCategory');
    const countEl    = document.getElementById('groupPanelCount');
    const moodboard  = document.getElementById('groupMoodboard');
    const detail     = document.getElementById('groupDetail');
    const detailMain = document.getElementById('detailMain');
    const detailBack = document.getElementById('detailBack');

    // Open on card click
    document.querySelectorAll('.gallery-item[data-group]').forEach(item => {
        item.addEventListener('click', () => {
            const group = groupData[item.getAttribute('data-group')];
            if (group) openGroupPanel(group);
        });
    });

    // Cierra al dar click en el fondo oscuro (fuera de las imagenes)
    container.addEventListener('click', e => {
        if (e.target === container || e.target === moodboard) {
            closeGroupPanel();
        }
    });

    closeBtn.addEventListener('click', closeGroupPanel);

    detailBack.addEventListener('click', closeDetail);
    
    // Mejor UX: Tocar la imagen zoomeada también la cierra
    detailMain.addEventListener('click', closeDetail);

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            if (detail.classList.contains('active')) {
                closeDetail();
            } else if (panel.classList.contains('active')) {
                closeGroupPanel();
            }
        }
    });

    function getOptimalCols(count) {
        if (count <= 2) return count;
        if (count === 4) return 2;  // 2×2 simétrico
        return 3;
    }

    function openGroupPanel(group) {
        const count = group.images.length;

        categoryEl.textContent = group.category;
        countEl.textContent    = `${count} ${count === 1 ? 'imagen' : 'imágenes'}`;

        const cols = getOptimalCols(count);
        const gap  = 1.2; // rem, debe coincidir con el gap del CSS
        const basis = `calc(${(100 / cols).toFixed(4)}% - ${(gap * (cols - 1) / cols).toFixed(4)}rem)`;
        moodboard.style.setProperty('--img-basis', basis);

        moodboard.innerHTML = '';
        detail.classList.remove('active');

        group.images.forEach((src, i) => {
            const img    = document.createElement('img');
            img.src      = src;
            img.alt      = `${group.category} — ${i + 1}`;
            img.loading  = 'lazy';
            img.className = 'moodboard-img';

            img.addEventListener('click', () => openDetail(src, img.alt));
            moodboard.appendChild(img);
        });

        panel.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Animación de entrada limpia para las imágenes en el grid
        if (typeof gsap !== 'undefined') {
            gsap.fromTo(
                moodboard.querySelectorAll('.moodboard-img'),
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out', delay: 0.1 }
            );
        } else {
            moodboard.querySelectorAll('.moodboard-img').forEach(img => {
                img.style.opacity = 1;
                img.style.transform = 'translateY(0)';
            });
        }
    }

    function openDetail(src, alt) {
        detailMain.src = src;
        detailMain.alt = alt;
        detail.classList.add('active');

        if (typeof gsap !== 'undefined') {
            gsap.fromTo(detailMain,
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' }
            );
        }
    }

    function closeDetail() {
        if (typeof gsap !== 'undefined') {
            gsap.to(detailMain, {
                opacity: 0, scale: 0.95, duration: 0.2,
                onComplete: () => { detail.classList.remove('active'); }
            });
        } else {
            detail.classList.remove('active');
        }
    }

    function closeGroupPanel() {
        closeDetail(); // Asegurarse de cerrar el detail si está abierto
        
        // Animacion sencilla al cerrar el panel padre
        if (typeof gsap !== 'undefined') {
            gsap.to(panel, {
                opacity: 0, duration: 0.3,
                onComplete: () => {
                    panel.classList.remove('active');
                    panel.style.opacity = '';
                    document.body.style.overflow = '';
                }
            });
        } else {
            panel.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
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

    document.addEventListener('click', e => {
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
// GALLERY ANIMATIONS
// ===================================
function initGalleryAnimations() {
    if (typeof gsap === 'undefined') return;

    document.querySelectorAll('.gallery-item').forEach(item => {
        gsap.fromTo(item,
            { opacity: 0, y: 50 },
            {
                opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
                scrollTrigger: { trigger: item, start: 'top 85%', end: 'top 60%', scrub: 1 }
            }
        );
    });

    gsap.to('.gallery-hero-content', {
        y: 100, opacity: 0.5, ease: 'none',
        scrollTrigger: { trigger: '.gallery-hero', start: 'top top', end: 'bottom top', scrub: 1 }
    });
}

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================
function initNavbar() {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            navbar.style.padding   = '1rem 0';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
        } else {
            navbar.style.padding   = '1.5rem 0';
            navbar.style.boxShadow = 'none';
        }
    });
}

// ===================================
// PAGE LOAD ANIMATION
// ===================================
function pageLoadAnimation() {
    if (typeof gsap === 'undefined') return;

    const tl = gsap.timeline();

    tl.fromTo('.navbar',
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    )
    .fromTo('.hero-eyebrow',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4'
    )
    .fromTo('.gallery-title',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.4'
    )
    .fromTo('.gallery-description',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4'
    )
    .fromTo('.filter-tabs',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3'
    )
    .fromTo(document.querySelectorAll('.gallery-item'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: 'power2.out' }, '-=0.3'
    );
}