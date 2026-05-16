// ===================================
// MALALE DESIGN STUDIO
// Main JavaScript - Dual Mode Portfolio
// ===================================

// Shared reference so initSmoothScroll can close the overlay
let _closeOverlay = null;

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

// ===================================
// INITIALIZATION
// ===================================
function initializeApp() {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Initialize components
    initModeSwitch();
    initProjectCards();
    initScrollAnimations();
    initContactForm();
    initSmoothScroll();
    initNavbar();
    initMobileMenu();
    initLanguageSwitcher();

    // Initial page load animation
    pageLoadAnimation();

    // Scroll to hash section after animations settle (handles navigation from other pages)
    const urlHash = window.location.hash;
    if (urlHash && urlHash !== '#spaces' && urlHash !== '#objects') {
        const hashTarget = document.querySelector(urlHash);
        if (hashTarget) {
            setTimeout(() => {
                const pos = hashTarget.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({ top: pos, behavior: 'smooth' });
            }, 900);
        }
    }
}

// ===================================
// MODE SWITCHING (Core Feature)
// ===================================
function initModeSwitch() {
    const modeButtons = document.querySelectorAll('.mode-btn');
    const body = document.body;
    let currentMode = 'spaces';

    // Set initial mode from body attribute or default to 'spaces'
    currentMode = body.getAttribute('data-mode') || 'spaces';
    body.setAttribute('data-mode', currentMode);

    modeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const newMode = btn.getAttribute('data-mode');

            // Don't do anything if clicking the already active button
            if (newMode === currentMode) return;

            // Update current mode
            currentMode = newMode;
            body.setAttribute('data-mode', currentMode);

            // Update active state on buttons
            modeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Trigger transition animation
            modeTransitionAnimation(currentMode);

            // Update URL hash without scrolling
            history.pushState(null, null, `#${currentMode}`);
        });
    });

    // Check for URL hash on load (but don't auto-switch)
    const hash = window.location.hash.replace('#', '');
    if (hash === 'objects' || hash === 'spaces') {
        currentMode = hash;
        body.setAttribute('data-mode', currentMode);

        // Update button active states without triggering animation
        modeButtons.forEach(btn => {
            if (btn.getAttribute('data-mode') === currentMode) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Update display without animation
        if (currentMode === 'objects') {
            document.querySelector('.spaces-projects').style.display = 'none';
            document.querySelector('.objects-projects').style.display = 'grid';
        }
    }
}

// Mode transition animation with GSAP
function modeTransitionAnimation(mode) {
    const timeline = gsap.timeline();

    // Animate hero title
    timeline.to('.title-dynamic', {
        duration: 0.4,
        y: mode === 'objects' ? -10 : 10,
        opacity: 0,
        ease: 'power2.in',
        onComplete: () => {
            gsap.to('.title-dynamic', {
                duration: 0.4,
                y: 0,
                opacity: 1,
                ease: 'power2.out'
            });
        }
    });

    // Animate project grids
    const currentGrid = mode === 'spaces' ? '.objects-projects' : '.spaces-projects';
    const nextGrid = mode === 'spaces' ? '.spaces-projects' : '.objects-projects';

    gsap.to(currentGrid, {
        duration: 0.6,
        opacity: 0,
        y: -30,
        ease: 'power2.inOut',
        onComplete: () => {
            document.querySelector(currentGrid).style.display = 'none';
            document.querySelector(nextGrid).style.display = 'grid';

            gsap.fromTo(nextGrid,
                { opacity: 0, y: 30 },
                { duration: 0.6, opacity: 1, y: 0, ease: 'power2.out' }
            );
        }
    });

    // Stagger animation for project cards
    setTimeout(() => {
        const cards = document.querySelectorAll(`${nextGrid} .project-card`);
        gsap.fromTo(cards,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: 'power2.out'
            }
        );
    }, 600);
}

// ===================================
// PROJECT CARDS & OVERLAY
// ===================================
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    const overlay = document.getElementById('projectOverlay');
    const closeBtn = document.getElementById('closeOverlay');
    const overlayLeft = document.getElementById('overlayLeft');
    const overlayRight = document.getElementById('overlayRight');

    // Project data
    const projectData = {

        'space-1': {
            title: 'Propuesta Santa Lucía',
            titleEn: 'Santa Lucía Proposal',
            category: 'Diseño de Interiores',
            categoryEn: 'Interior Design',
            description: 'Propuesta de diseño de interiores desarrollada para un proyecto residencial en el sector de Santa Lucía. La propuesta integra materialidad contemporánea con referencias al carácter histórico del barrio, articulando los espacios en torno a la identidad urbana del entorno.',
            descriptionEn: 'Interior design proposal developed for a residential project in the Santa Lucía area. The proposal integrates contemporary materiality with references to the historical character of the neighborhood, articulating spaces around the urban identity of the surroundings.',
            images: [
                'img/projects/santalucia/1.jpg',
                'img/projects/santalucia/2.jpg',
                'img/projects/santalucia/3.jpg',
                'img/projects/santalucia/4.jpg',
                'img/projects/santalucia/5.jpg',
                'img/projects/santalucia/6.jpg',
                'img/projects/santalucia/7.jpg',
                'img/projects/santalucia/8.jpg',
                'img/projects/santalucia/9.jpg',
                'img/projects/santalucia/10.jpg',
                'img/projects/santalucia/11.jpg',
                'img/projects/santalucia/12.jpg'
            ],
            details: [
                { label: 'Año', labelEn: 'Year', value: '2026', valueEn: '2026' },
                { label: 'Área', labelEn: 'Area', value: 'Diseño de Interiores', valueEn: 'Interior Design' },
                { label: 'Ubicación', labelEn: 'Location', value: 'Santa Lucía, Santiago', valueEn: 'Santa Lucía, Santiago' }
            ]
        },

        'space-2': {
            title: 'Refugio Austral',
            titleEn: 'Refugio Austral',
            category: 'Taller de Espacios IV',
            categoryEn: 'Design Studio IV',
            description: 'Proyecto académico desarrollado en el Taller Espacio IV, consistente en el diseño de un habitáculo emplazado en el sur de Chile, pensado para una persona dedicada a la fotografía de paisajes. La propuesta busca generar un refugio mínimo que dialogue con el entorno, protegiendo de las condiciones climáticas extremas sin interrumpir la contemplación del paisaje. El diseño se enfoca en la relación entre interior y exterior, utilizando aperturas estratégicas como marcos naturales que potencian la observación, el encuadre y la experiencia sensorial del territorio.',
            descriptionEn: 'Academic project developed in Design Studio IV, consisting of the design of a dwelling located in southern Chile, intended for a person dedicated to landscape photography. The proposal seeks to generate a minimal refuge that dialogues with the environment, protecting from extreme weather conditions without interrupting the contemplation of the landscape. The design focuses on the relationship between interior and exterior, using strategic openings as natural frames that enhance observation, framing, and the sensory experience of the territory.',
            images: [
                'img/projects/habitaculo/refug111.jpg',
                'img/projects/habitaculo/refug2.jpg'
            ],
            details: [
                { label: 'Año', labelEn: 'Year', value: '2023', valueEn: '2023' },
                { label: 'Taller', labelEn: 'Studio', value: 'Taller de Espacios IV', valueEn: 'Design Studio IV' },
                { label: 'Ubicación', labelEn: 'Location', value: 'Huerquehue', valueEn: 'Huerquehue' }
            ]
        },
        'space-3': {
            title: 'Nörd',
            titleEn: 'Nörd',
            category: 'Exploración Personal en 3D',
            categoryEn: 'Personal 3D Exploration',
            description: 'Este proyecto explora el concepto japonés Ma, entendido como el espacio intencionado entre los elementos y la importancia del vacío como parte activa del diseño. A través de una habitación moderna estilo japandi, busqué transmitir equilibrio, calma y armonía mediante el uso de luz natural, materiales nobles y una composición minimalista. El modelado y la visualización fueron desarrollados en Blender, herramienta que he aprendido de manera autodidacta por interés personal en el diseño tridimensional.',
            descriptionEn: 'This project explores the Japanese concept of Ma, understood as the intentional space between elements and the importance of void as an active part of design. Through a modern japandi-style room, I sought to convey balance, calm, and harmony through the use of natural light, noble materials, and a minimalist composition. The modeling and visualization were developed in Blender, a tool I have learned self-taught out of personal interest in three-dimensional design.',
            images: [
                'img/projects/japandi/1.jpg',
                'img/projects/japandi/2.jpg',
                'img/projects/japandi/3.jpg'
            ],
            details: [
                { label: 'Año', labelEn: 'Year', value: '2025', valueEn: '2025' },
                { label: 'Herramienta', labelEn: 'Tool', value: 'Blender', valueEn: 'Blender' },
                { label: 'Estilo', labelEn: 'Style', value: 'Japandi', valueEn: 'Japandi' }
            ]
        },
        'space-4': {
            title: 'Corner 3D – Modelo para FDV',
            titleEn: 'Corner 3D – Model for FDV',
            category: 'Visualización 3D',
            categoryEn: '3D Visualization',
            description: 'Para este proyecto desarrollé una visualización 3D de una esquina de cocina para FDV, con el objetivo de mostrar la correcta integración de electrodomésticos como refrigeradores, microondas y hornos dentro de un espacio realista. La propuesta buscó contextualizar los productos en un entorno funcional y estético, permitiendo a los clientes comprender dimensiones, proporciones y combinaciones posibles antes de tomar una decisión de compra.',
            descriptionEn: 'For this project I developed a 3D visualization of a kitchen corner for FDV, with the goal of showcasing the correct integration of appliances such as refrigerators, microwaves, and ovens within a realistic space. The proposal sought to contextualize the products in a functional and aesthetic environment, allowing customers to understand dimensions, proportions, and possible combinations before making a purchase decision.',
            images: [
                'img/projects/kitchen center/mini.png'
            ],
            details: [
                { label: 'Cliente', labelEn: 'Client', value: 'FDV', valueEn: 'FDV' },
                { label: 'Año', labelEn: 'Year', value: '2025', valueEn: '2025' },
                { label: 'Herramienta', labelEn: 'Tool', value: 'Blender', valueEn: 'Blender' }
            ]
        },

        'space-5': {
            title: 'SkapWood – Vitrina para Wolf',
            titleEn: 'SkapWood – Display for Wolf',
            category: 'Vitrina',
            categoryEn: 'Display Design',
            description: 'El proyecto consiste en el diseño de sistemas de exhibición conceptual para las vitrinas de tres locales comerciales. Bajo una lógica de "concurso de ideas", la propuesta busca capturar la identidad de marca mediante un recorrido fluido que atraiga al usuario. Su nombre combina conceptos de vitrina y madera, haciendo referencia directa a la materialidad y a la estética nórdica moderna característica de la tienda Wolf.',
            descriptionEn: 'The project consists of the design of conceptual display systems for the windows of three commercial stores. Following a "competition of ideas" logic, the proposal seeks to capture the brand identity through a fluid journey that attracts the user. Its name combines concepts of display and wood, making direct reference to the materiality and modern Nordic aesthetic characteristic of the Wolf store.',
            images: [
                'img/projects/wolf/Wolf1.jpg',
                'img/projects/wolf/Wolf2.jpg'
            ],
            details: [
                { label: 'Cliente', labelEn: 'Client', value: 'Wolf', valueEn: 'Wolf' },
                { label: 'Año', labelEn: 'Year', value: '2023', valueEn: '2023' },
                { label: 'Tipo', labelEn: 'Type', value: 'Vitrina', valueEn: 'Display Design' }
            ]
        },

        'object-1': {
            title: 'CAND-L',
            category: 'Diseño de Producto',
            description: 'El proyecto explora la iluminación como un acto ritual y funcional. Inspirada en la figura del cirio, la lámpara integra un sistema de regulación manual donde el desplazamiento del acrílico permite ajustar la intensidad lumínica. El diseño prioriza la honestidad de los materiales y la interacción directa del usuario con el objeto para transformar la atmósfera del entorno.',
            images: [
            'img/projects/CandL/candl1.jpg',
              'img/projects/CandL/candl2.jpg'
            ],
            details: [
                { label: 'Tipo', value: 'Colección de Productos' },
                { label: 'Año', value: '2022' },
                { label: 'Materiales', value: 'Acrílico, Madera' }
            ]
        },
        'object-2': {
            title: 'Cadeira',
            category: 'Mobiliario Infantil',
            description: 'Es una mecedora funcional desarrollada en el marco del Taller de Objetos III, diseñado bajo la influencia estética y metodológica de los Hermanos Campana. El proyecto se centra en el desarrollo de la motricidad infantil, proponiendo una experiencia de inestabilidad controlada que desafía al menor a establecer una relación consciente entre su cuerpo y el objeto en el espacio.\n\nEn cuanto a su resolución técnica, la pieza destaca por una composición material que equilibra un 60% de fieltro de lana natural (dada por la empresa Meier & Meier) con elementos industriales. La estructura, que integra tubos de polietileno espumado, listones de pino cepillado y terciado de 3mm, demuestra una exploración exhaustiva entre procesos de baja y alta tecnología, logrando una geometría orgánica que combina calidez táctil con rigor constructivo.',
            images: [
                'img/cadeira/cade0.jpg',
              'img/cadeira/cade1.jpg',
                  'img/cadeira/planocade.jpg'
            ],
            details: [
                { label: 'Tipo', value: 'Objetos Decorativos' },
                { label: 'Año', value: '2023' },
                { label: 'Materiales', value: 'Fieltro de lana, Madera, Polietileno' }
            ]
        },
        'object-3': {
            title: 'Chocolich',
            category: 'Producto',
            description: 'Inspirado en la cocina disruptiva de Gaggan Anand, este proyecto realizado para el taller de objetos III, explora el diseño gastronómico mediante la creación de un chocolate conceptual basado en el lychee. La propuesta se centra en la síntesis sensorial, fusionando el perfil floral del fruto con una morfología experimental que busca generar una experiencia inesperada. Chocolich representa un ejercicio de innovación donde la identidad verbal y visual convergen para elevar un producto de consumo a una pieza de diseño multisensorial.',
            images: [
                       'img/choco/choco1.jpg',
              'img/choco/choco2.jpg'
            ],
            details: [
                { label: 'Tipo', value: 'Accesorios' },
                { label: 'Año', value: '2024' },
                { label: 'Materiales', value: 'Chocolate blanco, Chocolate de cacao, Molde de silicona, PLA' }
            ]
        },
        'object-4': {
            title: 'Módulo de Observación Radial',
            category: 'Mobiliario',
            description: 'Este sistema de mobiliario modular fue diseñado a partir de la morfología radial y el crecimiento en capas del hongo Crepidotus, con el objetivo de transformar un mirador subutilizado en un espacio de permanencia activa. El proyecto surge de un análisis del sitio donde se detectó que los usuarios abandonaban el lugar rápidamente debido a la falta de mobiliario, proponiendo así una estructura fluida que potencia la función contemplativa del entorno. Mediante un proceso de fabricación por capas con placas de MDF vinculadas por espárragos metálicos, se logró una forma orgánica y ergonómica que se ajusta gradualmente a la postura del usuario, ofreciendo diferentes niveles y profundidades que rompen con la rigidez del mobiliario convencional.',
            images: [
              'img/projects/silla/silla1.jpg',
              'img/projects/silla/silla2.jpg',
              'img/projects/silla/silla3.jpg',
              'img/projects/silla/silla4.jpg',
            ],
            details: [
                { label: 'Tipo', value: 'Mobiliario' },
                { label: 'Año', value: '2023' },
                { label: 'Materiales', value: 'MDF, Espárragos, Golillas, Protector de madera, Cola fría' }
            ]
        }
    };

    // Open project overlay
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            const project = projectData[projectId];

            if (project) {
                openProjectOverlay(project);
            }
        });

        // Add hover animation
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                duration: 0.4,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                duration: 0.4,
                ease: 'power2.out'
            });
        });
    });

    // Close overlay
    closeBtn.addEventListener('click', closeProjectOverlay);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeProjectOverlay();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!overlay.classList.contains('active')) return;
        if (e.key === 'Escape') {
            closeProjectOverlay();
        } else if (e.key === 'ArrowLeft' && overlayRight._carouselGoTo) {
            overlayRight._carouselGoTo(-1);
        } else if (e.key === 'ArrowRight' && overlayRight._carouselGoTo) {
            overlayRight._carouselGoTo(1);
        }
    });

    function openProjectOverlay(project) {
        const lang = document.body.getAttribute('lang') || 'es';
        const isEn = lang === 'en';
        const title    = (isEn && project.titleEn)       ? project.titleEn       : project.title;
        const category = (isEn && project.categoryEn)    ? project.categoryEn    : project.category;
        const description = (isEn && project.descriptionEn) ? project.descriptionEn : project.description;

        // ── Panel starts just below navbar on both desktop and mobile ──
        // window.innerHeight = actual visible height (respects browser chrome bars on mobile)
        const navbar = document.querySelector('.navbar');
        const navH = navbar ? Math.ceil(navbar.getBoundingClientRect().height) : 80;
        overlay.style.height = `${window.innerHeight - navH}px`;

        // ── Left column: project text ──
        let leftHTML = `
            <div class="overlay-header">
                <div class="overlay-category">${category}</div>
                <h2 class="overlay-title">${title}</h2>
                <p class="overlay-description">${description.replace(/\n\n/g, '<br><br>').replace(/\n/g, '<br>')}</p>
            </div>`;

        if (project.details && project.details.length > 0) {
            leftHTML += `<div class="project-details" style="margin-top: 2rem;">`;
            project.details.forEach(detail => {
                const lbl = (isEn && detail.labelEn) ? detail.labelEn : detail.label;
                const val = (isEn && detail.valueEn) ? detail.valueEn : detail.value;
                leftHTML += `<div style="margin-bottom:1rem;">
                    <strong style="text-transform:uppercase;font-size:0.8rem;letter-spacing:0.1em;color:var(--accent);">${lbl}:</strong>
                    <span style="margin-left:0.75rem;color:var(--text-secondary);">${val}</span>
                </div>`;
            });
            leftHTML += `</div>`;
        }
        overlayLeft.innerHTML = leftHTML;

        // ── Right column: carousel on desktop, vertical gallery on mobile ──
        overlayRight.innerHTML = '';
        if (project.images && project.images.length > 0) {
            if (window.innerWidth <= 768) {
                buildMobileGallery(project.images, title, overlayRight);
            } else {
                buildCarousel(project.images, title, overlayRight);
            }
        }

        // ── Open panel (slide from bottom) ──
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        gsap.set(overlay, { display: 'flex', y: '100%' });
        gsap.to(overlay, { y: 0, duration: 0.75, ease: 'power3.out' });
        gsap.fromTo('.overlay-header',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, delay: 0.25, ease: 'power2.out' }
        );
    }

    function buildCarousel(images, title, container) {
        let current = 0;

        container.innerHTML = `
            <div class="overlay-carousel">
                <div class="carousel-stage">
                    <img class="carousel-img" src="${images[0]}" alt="${title}">
                    <button class="carousel-nav prev" aria-label="Anterior">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>
                    <button class="carousel-nav next" aria-label="Siguiente">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>
                    <div class="carousel-counter">1 / ${images.length}</div>
                </div>
                <div class="carousel-thumbs">
                    ${images.map((src, i) =>
                        `<img class="carousel-thumb${i === 0 ? ' active' : ''}" src="${src}" data-idx="${i}" loading="lazy" alt="${title} ${i + 1}">`
                    ).join('')}
                </div>
            </div>`;

        const mainImg  = container.querySelector('.carousel-img');
        const prevBtn  = container.querySelector('.carousel-nav.prev');
        const nextBtn  = container.querySelector('.carousel-nav.next');
        const counter  = container.querySelector('.carousel-counter');
        const thumbEls = container.querySelectorAll('.carousel-thumb');

        function goTo(idx, animate) {
            if (idx < 0 || idx >= images.length) return;
            current = idx;
            if (animate !== false) {
                mainImg.style.opacity = '0';
                setTimeout(() => { mainImg.src = images[idx]; mainImg.style.opacity = '1'; }, 180);
            } else {
                mainImg.src = images[idx];
            }
            counter.textContent = `${idx + 1} / ${images.length}`;
            thumbEls.forEach((t, i) => t.classList.toggle('active', i === idx));
            thumbEls[idx].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            prevBtn.disabled = idx === 0;
            nextBtn.disabled = idx === images.length - 1;
        }

        prevBtn.addEventListener('click', () => goTo(current - 1));
        nextBtn.addEventListener('click', () => goTo(current + 1));
        thumbEls.forEach(t => t.addEventListener('click', () => goTo(+t.dataset.idx)));

        goTo(0, false);

        // Expose goTo for keyboard nav
        container._carouselGoTo = (dir) => goTo(current + dir);
    }

    function buildMobileGallery(images, title, container) {
        container.innerHTML = `
            <div class="mobile-gallery">
                ${images.map((src, i) =>
                    `<img class="mobile-gallery-img" src="${src}" alt="${title} ${i + 1}" loading="${i === 0 ? 'eager' : 'lazy'}">`
                ).join('')}
            </div>`;
    }

    function closeProjectOverlay() {
        gsap.to(overlay, {
            y: '100%',
            duration: 0.55,
            ease: 'power3.in',
            onComplete: () => {
                overlay.classList.remove('active');
                gsap.set(overlay, { display: 'none', y: 0 });
                overlay.style.height = '';
                document.body.style.overflow = '';
            }
        });
    }

    // Expose so navbar smooth-scroll can close the overlay
    _closeOverlay = closeProjectOverlay;
}

// ===================================
// SCROLL ANIMATIONS
// ===================================
function initScrollAnimations() {
    // Fade in sections on scroll
    const sections = document.querySelectorAll('.philosophy, .portfolio, .cta-section, .contact');

    sections.forEach(section => {
        gsap.fromTo(section,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    end: 'top 50%',
                    scrub: 1
                }
            }
        );
    });

    // Parallax effect on hero visual
    gsap.to('.hero-visual', {
        y: 100,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        }
    });

    // Stats counter animation
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = stat.textContent;
        const isNumber = /^\d+/.test(target);

        if (isNumber) {
            const number = parseInt(target);
            ScrollTrigger.create({
                trigger: stat,
                start: 'top 80%',
                onEnter: () => {
                    gsap.to(stat, {
                        innerHTML: number,
                        duration: 2,
                        snap: { innerHTML: 1 },
                        ease: 'power2.out',
                        onUpdate: function() {
                            stat.innerHTML = Math.ceil(this.targets()[0].innerHTML) + '+';
                        }
                    });
                },
                once: true
            });
        }
    });
}

// ===================================
// CONTACT FORM
// ===================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('.submit-button');
        const btnSpan = submitBtn.querySelector('span');
        const originalText = btnSpan.textContent;

        btnSpan.textContent = 'Enviando...';
        submitBtn.disabled = true;

        gsap.fromTo(form,
            { scale: 1 },
            { scale: 1.02, duration: 0.2, yoyo: true, repeat: 1, ease: 'power2.inOut' }
        );

        try {
            const formData = new FormData(form);
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            const result = await response.json();

            if (result.success) {
                btnSpan.textContent = '¡Mensaje Enviado!';
                setTimeout(() => {
                    form.reset();
                    btnSpan.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            } else {
                throw new Error(result.message || 'Error al enviar');
            }
        } catch {
            btnSpan.textContent = 'Error al enviar. Inténtalo de nuevo.';
            setTimeout(() => {
                btnSpan.textContent = originalText;
                submitBtn.disabled = false;
            }, 3000);
        }
    });

    // Input focus animations
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            gsap.to(input, { scale: 1.01, duration: 0.3, ease: 'power2.out' });
        });
        input.addEventListener('blur', () => {
            gsap.to(input, { scale: 1, duration: 0.3, ease: 'power2.out' });
        });
    });
}

// ===================================
// SMOOTH SCROLL
// ===================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip if it's just a hash or mode selector
            if (href === '#' || href === '#spaces' || href === '#objects') {
                return;
            }

            e.preventDefault();

            // Always close mobile menu first
            const navRight = document.querySelector('.nav-right');
            const navToggle = document.getElementById('navToggle');
            if (navRight && navRight.classList.contains('active')) {
                navRight.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }

            // If project overlay is open, close it then scroll
            const overlay = document.getElementById('projectOverlay');
            if (overlay && overlay.classList.contains('active') && _closeOverlay) {
                _closeOverlay();
                setTimeout(() => {
                    const target = document.querySelector(href);
                    if (target) {
                        window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
                    }
                }, 600);
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
            }
        });
    });
}

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.padding = '1rem 0';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
        } else {
            navbar.style.padding = '1.5rem 0';
            navbar.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });
}

// ===================================
// MOBILE MENU
// ===================================
function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navRight = document.querySelector('.nav-right');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!navToggle || !navRight) return;

    // Toggle menu
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navRight.classList.toggle('active');

        // Prevent body scroll when menu is open
        if (navRight.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navRight.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navRight.classList.contains('active') &&
            !navRight.contains(e.target) &&
            !navToggle.contains(e.target)) {
            navToggle.classList.remove('active');
            navRight.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close menu on window resize
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

    // Translation data
    const translations = {
        en: {
            // Add more translations as needed
        },
        es: {
            // Default Spanish content
        }
    };

    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            if (lang === currentLang) return;

            // Update active state
            langButtons.forEach(b => b.classList.remove('active'));
            document.querySelectorAll(`.lang-btn[data-lang="${lang}"]`).forEach(b => {
                b.classList.add('active');
            });

            // Switch language
            switchLanguage(lang);
            currentLang = lang;

            // Save preference
            localStorage.setItem('preferredLanguage', lang);
        });
    });

    // Check for saved language preference
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && savedLang !== currentLang) {
        document.querySelector(`.lang-btn[data-lang="${savedLang}"]`).click();
    }
}

function switchLanguage(lang) {
    // Set language attribute on body FIRST
    document.body.setAttribute('lang', lang);
    document.documentElement.setAttribute('lang', lang);

    // Find all elements with data-en and data-es attributes
    const elements = document.querySelectorAll('[data-en][data-es]');

    // Only update visible elements to avoid conflicts
    const visibleElements = [];

    elements.forEach(element => {
        // Check if element is actually visible (not hidden by CSS)
        const styles = window.getComputedStyle(element);
        const isVisible = styles.display !== 'none' &&
                         styles.visibility !== 'hidden' &&
                         styles.opacity !== '0';

        const translation = element.getAttribute(`data-${lang}`);
        if (translation) {
            // Handle innerHTML for elements that might contain HTML entities
            if (element.tagName === 'P' && translation.includes('&copy;')) {
                element.innerHTML = translation;
            } else {
                element.textContent = translation;
            }

            if (isVisible) {
                visibleElements.push(element);
            }
        }
    });

    // Animate only visible elements
    if (visibleElements.length > 0) {
        gsap.fromTo(visibleElements,
            { opacity: 0.7 },
            {
                opacity: 1,
                duration: 0.4,
                stagger: 0.02,
                ease: 'power2.out'
            }
        );
    }
}

// ===================================
// PAGE LOAD ANIMATION
// ===================================
function pageLoadAnimation() {
    const timeline = gsap.timeline();

    // Navbar
    timeline.fromTo('.navbar',
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    );

    // Hero content
    timeline.fromTo('.hero-eyebrow',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
    );

    timeline.fromTo('.hero-title',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.4'
    );

    timeline.fromTo('.hero-description',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
    );

    timeline.fromTo('.mode-switch-container',
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
        '-=0.3'
    );

    // Hero visual
    timeline.fromTo('.hero-visual',
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 1, ease: 'power3.out' },
        '-=0.8'
    );
}

// ===================================
// UTILITY FUNCTIONS
// ===================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Random number generator
function random(min, max) {
    return Math.random() * (max - min) + min;
}

// ===================================
// EXPORT FOR POTENTIAL MODULE USE
// ===================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeApp,
        modeTransitionAnimation
    };
}
