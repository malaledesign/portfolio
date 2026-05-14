# Malale Design Studio
## Portfolio Website - Dual Mode Design

Una sofisticada web de portafolio con estética Japandi y sistema de modo dual para María Alejandra Silva.

---

## 🎨 Características Principales

### **Sistema de Modo Dual**
- **Modo Espacios**: Diseño de ambientes, conceptos 3D, emoción y entorno
- **Modo Objetos**: Diseño de producto, valor hogareño, decoración
- Transición suave y fluida entre modos con cambio de colores
- Título animado que cambia entre "Diseño de Espacios" y "Diseño de Objetos"

### **Animaciones Exquisitas**
- GSAP para animaciones fluidas y profesionales
- Transiciones con easing avanzado (cubic-bezier)
- Animaciones de scroll (parallax, fade-in)
- Efectos hover creativos en tarjetas de proyecto

### **Diseño Japandi**
- Minimalismo sofisticado
- Paleta de colores tierra y neutros
- Texturas orgánicas y espacios en blanco
- Tipografía elegante: Cormorant Garamond + Montserrat

### **Funcionalidades**
- ✅ Navegación fija con efecto de scroll
- ✅ Grid de proyectos con 4 proyectos por modo
- ✅ Panel lateral (Off-canvas) para detalles de proyecto
- ✅ Galería 3D con lightbox
- ✅ Sistema de filtros en galería
- ✅ Formulario de contacto funcional
- ✅ Diseño completamente responsive

---

## 📁 Estructura del Proyecto

```
noname/
├── index.html              # Página principal con modo dual
├── gallery.html            # Galería 3D completa
├── css/
│   ├── style.css          # Estilos principales
│   └── gallery.css        # Estilos de galería
├── js/
│   ├── main.js            # JavaScript principal
│   └── gallery.js         # JavaScript de galería
├── img/
│   └── projects/
│       └── 3d gallery/
│           ├── Ambient & Room/     # 18 imágenes de espacios
│           └── Product & Objects/  # Para tus imágenes de productos
└── README.md
```

---

## 🚀 Cómo Usar

### **1. Abrir el Proyecto**
Simplemente abre `index.html` en tu navegador favorito.

### **2. Navegar entre Modos**
- Usa el **switch toggle** en la sección hero para cambiar entre modos
- También puedes usar URLs: `index.html#spaces` o `index.html#objects`

### **3. Ver Proyectos**
- Haz clic en cualquier tarjeta de proyecto para ver detalles
- El panel lateral se abrirá con más información e imágenes

### **4. Galería 3D**
- Ve a [gallery.html](gallery.html) desde el menú
- Usa los filtros para ver solo espacios o productos
- Haz clic en cualquier imagen para abrir el lightbox

---

## 🖼️ Agregar tus Imágenes de Productos

### **Ubicación**
Coloca tus imágenes en: `img/projects/3d gallery/Product & Objects/`

### **Actualizar la Galería**
En `gallery.html`, reemplaza los placeholders:

```html
<!-- Reemplaza esto: -->
<div class="gallery-item" data-category="product">
    <div class="placeholder-item">
        <span>Producto 1</span>
        <p>Espacio para imagen de producto</p>
    </div>
    ...
</div>

<!-- Por esto: -->
<div class="gallery-item" data-category="product">
    <img src="img/projects/3d gallery/Product & Objects/tu-imagen.png"
         alt="Descripción del producto"
         loading="lazy">
    <div class="gallery-item-overlay">
        <span class="item-category">Producto</span>
    </div>
</div>
```

### **Actualizar el Index**
En `index.html`, encuentra la sección `.objects-projects` y actualiza las imágenes:

```html
<div class="project-image">
    <img src="img/projects/3d gallery/Product & Objects/tu-imagen.png"
         alt="Proyecto Objeto 1">
    ...
</div>
```

---

## ✏️ Personalización

### **Cambiar Colores**
Edita las variables CSS en `css/style.css`:

```css
:root {
    /* Colores del Modo Espacios */
    --spaces-bg-primary: #F5F3EE;
    --spaces-accent: #8B7E6A;

    /* Colores del Modo Objetos */
    --objects-bg-primary: #EDE7E0;
    --objects-accent: #A67C52;
}
```

### **Cambiar Textos**
Todos los textos están en español y pueden editarse directamente en `index.html` y `gallery.html`.

### **Modificar Animaciones**
Las animaciones están en `js/main.js` y `js/gallery.js`. Busca las funciones de GSAP:

```javascript
gsap.to(elemento, {
    duration: 0.8,  // Duración
    ease: 'power2.out',  // Tipo de easing
    // ... otras propiedades
});
```

---

## 🔗 Enlaces Sociales

Actualiza tus enlaces en ambos archivos HTML:

```html
<!-- Instagram -->
<a href="https://instagram.com/tu-usuario" target="_blank">

<!-- LinkedIn -->
<a href="https://linkedin.com/in/tu-usuario" target="_blank">

<!-- Email -->
<a href="mailto:tu-email@ejemplo.com">
```

---

## 📱 Responsive Design

El sitio es completamente responsive con breakpoints en:
- **1024px**: Tablets
- **768px**: Móviles

No necesitas hacer nada adicional, todo está optimizado.

---

## 🎯 Próximos Pasos Recomendados

1. **Agregar tus imágenes de productos** a la carpeta correspondiente
2. **Actualizar los enlaces sociales** con tus perfiles reales
3. **Configurar el formulario de contacto** con un servicio backend (FormSpree, EmailJS, etc.)
4. **Optimizar las imágenes** para web (compresión, formato WebP)
5. **Agregar un favicon** personalizado
6. **Configurar Google Analytics** para tracking (opcional)

---

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos con Custom Properties
- **JavaScript ES6+** - Interactividad
- **GSAP 3** - Animaciones profesionales
- **ScrollTrigger** - Animaciones de scroll
- **Google Fonts** - Tipografía Cormorant Garamond & Montserrat

---

## 📝 Notas Importantes

### **Formulario de Contacto**
Actualmente el formulario solo muestra los datos en la consola. Para hacerlo funcional:

1. **Opción 1**: Usar [FormSpree](https://formspree.io/)
2. **Opción 2**: Usar [EmailJS](https://www.emailjs.com/)
3. **Opción 3**: Conectar con tu propio backend

### **Lightbox en Galería**
- Usa las flechas del teclado para navegar
- Presiona ESC para cerrar
- Haz clic fuera de la imagen para cerrar

### **Rendimiento**
- Las imágenes usan `loading="lazy"` para carga diferida
- Las animaciones están optimizadas para 60fps
- El código está organizado y comentado para fácil mantenimiento

---

## 🎨 Créditos de Diseño

**Inspiración**: Estética Japandi - fusión de diseño japonés y escandinavo
**Paleta de colores**: Tonos tierra, beige, terracota suave
**Tipografía**: Serif elegante + Sans-serif minimalista

---

## 📧 Soporte

Para preguntas o problemas, contacta a: hello@malale.com

---

**Desarrollado con ❤️ para Malale Design Studio**
*María Alejandra Silva • 2026*
