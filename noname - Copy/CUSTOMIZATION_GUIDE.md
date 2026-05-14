# Guía Rápida de Personalización
## Malale Design Studio

---

## 🎨 Cambios Comunes

### **1. Actualizar Información Personal**

#### **Nombre y Título**
```html
<!-- En index.html y gallery.html -->
<div class="hero-eyebrow">Tu Nombre Completo</div>
<span class="logo-text">Tu Marca</span>
<span class="logo-subtitle">Tu Tagline</span>
```

#### **Información de Contacto**
```html
<!-- En index.html, sección de contacto -->
<span>tu-email@ejemplo.com</span>
<span>Tu Ciudad, País</span>
```

---

### **2. Agregar Nuevos Proyectos**

#### **En la Página Principal (index.html)**

**Modo Espacios:**
```html
<article class="project-card" data-project="space-5">
    <div class="project-image">
        <img src="img/projects/3d gallery/Ambient & Room/15.png" alt="Nuevo Proyecto">
        <div class="project-overlay">
            <span class="view-project">Ver Proyecto</span>
        </div>
    </div>
    <div class="project-info">
        <h3 class="project-title">Título del Proyecto</h3>
        <p class="project-category">Categoría</p>
    </div>
</article>
```

**Modo Objetos:**
```html
<article class="project-card" data-project="object-5">
    <div class="project-image">
        <img src="img/projects/3d gallery/Product & Objects/1.png" alt="Nuevo Producto">
        <div class="project-overlay">
            <span class="view-project">Ver Proyecto</span>
        </div>
    </div>
    <div class="project-info">
        <h3 class="project-title">Nombre del Producto</h3>
        <p class="project-category">Diseño de Producto</p>
    </div>
</article>
```

#### **Agregar Datos del Proyecto (main.js)**
```javascript
// En js/main.js, dentro del objeto projectData:
'space-5': {
    title: 'Título del Nuevo Proyecto',
    category: 'Categoría del Proyecto',
    description: 'Descripción detallada del proyecto...',
    images: [
        'img/projects/ruta/imagen1.png',
        'img/projects/ruta/imagen2.png',
        'img/projects/ruta/imagen3.png'
    ],
    details: [
        { label: 'Cliente', value: 'Nombre del Cliente' },
        { label: 'Año', value: '2026' },
        { label: 'Ubicación', value: 'Ciudad, País' }
    ]
}
```

---

### **3. Modificar Colores del Tema**

#### **Paleta de Colores Completa (style.css)**
```css
:root {
    /* ===== MODO ESPACIOS ===== */
    --spaces-bg-primary: #F5F3EE;       /* Fondo principal - beige claro */
    --spaces-bg-secondary: #E8E4DD;     /* Fondo secundario - beige medio */
    --spaces-text-primary: #2C2822;     /* Texto principal - casi negro */
    --spaces-text-secondary: #6B6660;   /* Texto secundario - gris cálido */
    --spaces-accent: #8B7E6A;           /* Color acento - marrón suave */
    --spaces-accent-light: #B5A89A;     /* Acento claro */

    /* ===== MODO OBJETOS ===== */
    --objects-bg-primary: #EDE7E0;      /* Fondo principal - piedra */
    --objects-bg-secondary: #D8CFBF;    /* Fondo secundario - arena */
    --objects-text-primary: #3A342E;    /* Texto principal */
    --objects-text-secondary: #7A6F64;  /* Texto secundario */
    --objects-accent: #A67C52;          /* Color acento - terracota */
    --objects-accent-light: #C9A882;    /* Acento claro */
}
```

#### **Crear tu Propia Paleta**
1. Elige tus colores en [Coolors.co](https://coolors.co/)
2. Reemplaza los valores hexadecimales arriba
3. Mantén suficiente contraste para accesibilidad

---

### **4. Cambiar Tipografía**

#### **Usar Otras Fuentes de Google Fonts**
```html
<!-- En <head> de index.html y gallery.html -->
<link href="https://fonts.googleapis.com/css2?family=TuFuenteSerif:wght@300;400;600&family=TuFuenteSans:wght@300;400;500&display=swap" rel="stylesheet">
```

```css
/* En style.css */
:root {
    --font-serif: 'TuFuenteSerif', serif;
    --font-sans: 'TuFuenteSans', sans-serif;
}
```

**Recomendaciones Japandi:**
- **Serif**: Cormorant Garamond, Playfair Display, Lora
- **Sans**: Montserrat, Raleway, Inter, Work Sans

---

### **5. Ajustar Velocidad de Animaciones**

#### **Transiciones CSS (style.css)**
```css
:root {
    /* Más rápido */
    --transition-smooth: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);

    /* Más lento */
    --transition-smooth: all 1.2s cubic-bezier(0.4, 0, 0.2, 1);
}
```

#### **Animaciones GSAP (main.js)**
```javascript
// Busca las animaciones y cambia la duración:
gsap.to(elemento, {
    duration: 1.5,  // Cambia este valor (en segundos)
    ease: 'power2.out'
});
```

---

### **6. Configurar Formulario de Contacto**

#### **Opción 1: FormSpree (Recomendado)**
```html
<!-- En index.html, reemplaza el form: -->
<form action="https://formspree.io/f/TU_FORM_ID" method="POST" class="contact-form">
    <input type="hidden" name="_subject" value="Nuevo mensaje de contacto">
    <input type="hidden" name="_next" value="index.html#contact">

    <!-- El resto de los campos permanece igual -->
</form>
```

#### **Opción 2: EmailJS**
```javascript
// En main.js, en la función del formulario:
emailjs.send('tu_service_id', 'tu_template_id', {
    from_name: data.name,
    from_email: data.email,
    subject: data.subject,
    message: data.message
});
```

---

### **7. Agregar Más Imágenes a la Galería**

#### **Para cada nueva imagen:**
```html
<!-- En gallery.html, dentro de .gallery-grid -->
<div class="gallery-item" data-category="ambient">
    <img src="img/projects/3d gallery/Ambient & Room/19.png"
         alt="Descripción del proyecto"
         loading="lazy">
    <div class="gallery-item-overlay">
        <span class="item-category">Ambiente</span>
    </div>
</div>
```

**Categorías disponibles:**
- `data-category="ambient"` - Para espacios/ambientes
- `data-category="product"` - Para productos/objetos

---

### **8. Modificar Textos de los Modos**

#### **Títulos y Descripciones (index.html)**
```html
<!-- Hero Section -->
<span class="title-variant spaces-text">Tu Texto Espacios</span>
<span class="title-variant objects-text">Tu Texto Objetos</span>

<span class="description-variant spaces-desc">
    Tu descripción para el modo espacios...
</span>
<span class="description-variant objects-desc">
    Tu descripción para el modo objetos...
</span>
```

#### **Sección de Filosofía**
```html
<p class="philosophy-description spaces-philosophy">
    Tu filosofía sobre diseño de espacios...
</p>
<p class="philosophy-description objects-philosophy">
    Tu filosofía sobre diseño de objetos...
</p>
```

---

### **9. Ajustar el Layout del Grid**

#### **Cambiar Número de Columnas (style.css)**
```css
.projects-grid {
    /* 2 columnas (actual) */
    grid-template-columns: repeat(2, 1fr);

    /* 3 columnas */
    grid-template-columns: repeat(3, 1fr);

    /* 4 columnas */
    grid-template-columns: repeat(4, 1fr);

    /* Auto-ajustable */
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
```

#### **Cambiar Espaciado**
```css
.projects-grid {
    gap: 4rem;  /* Más espacio */
    gap: 1.5rem;  /* Menos espacio */
}
```

---

### **10. Personalizar el Navbar**

#### **Cambiar Transparencia (style.css)**
```css
.navbar {
    background: rgba(245, 243, 238, 0.95);  /* Más transparente: 0.7 */
    backdrop-filter: blur(10px);            /* Más blur: blur(20px) */
}
```

#### **Navbar Siempre Sólido**
```css
.navbar {
    background: var(--bg-primary);
    backdrop-filter: none;
}
```

---

## 🎯 Consejos de Diseño Japandi

### **Principios a Seguir:**
1. **Menos es Más**: Elimina elementos innecesarios
2. **Funcionalidad**: Cada elemento debe tener un propósito
3. **Naturalidad**: Usa colores tierra y materiales orgánicos
4. **Espacio**: Deja respirar los elementos (negative space)
5. **Textura**: Combina superficies suaves con texturizadas

### **Colores Recomendados:**
- **Neutros**: #F5F3EE, #E8E4DD, #D8CFBF
- **Tierra**: #8B7E6A, #A67C52, #9B8B7E
- **Oscuros**: #2C2822, #3A342E, #4A443E

### **No Hacer:**
- ❌ Colores brillantes o neón
- ❌ Demasiados elementos en una sección
- ❌ Tipografías decorativas excesivas
- ❌ Animaciones muy rápidas o bruscas

---

## 📱 Optimización

### **Comprimir Imágenes**
Usa [TinyPNG](https://tinypng.com/) o [Squoosh](https://squoosh.app/)
- **Objetivo**: < 200KB por imagen
- **Formato**: WebP cuando sea posible

### **Performance**
```html
<!-- Agrega preload para fuentes críticas -->
<link rel="preload" href="url-de-fuente.woff2" as="font" type="font/woff2" crossorigin>
```

---

## 🔧 Solución de Problemas

### **Las animaciones no funcionan**
1. Verifica que GSAP esté cargado (abre la consola)
2. Revisa que no haya errores de JavaScript
3. Limpia la caché del navegador

### **Las imágenes no se muestran**
1. Verifica la ruta del archivo
2. Asegúrate que las barras sean `/` no `\`
3. Revisa mayúsculas/minúsculas en los nombres

### **El modo dual no cambia**
1. Verifica que `main.js` esté cargado
2. Revisa la consola por errores
3. Asegura que el atributo `data-mode` cambie en `<body>`

---

**¿Necesitas más ayuda?** Revisa los comentarios en el código o consulta la documentación de [GSAP](https://greensock.com/docs/).
