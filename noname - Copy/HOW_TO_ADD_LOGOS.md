# 📝 Cómo Agregar Logos de Clientes
## Malale Design Studio

---

## 🎯 **Ubicación**

La sección de logos está en [index.html](index.html) después de las estadísticas (línea ~177).

---

## ✨ **Paso a Paso para Agregar Logos**

### **1. Prepara tus Imágenes**

#### **Formato Recomendado:**
- **Tipo**: PNG con fondo transparente o SVG
- **Tamaño**: Máximo 500px de ancho
- **Peso**: < 100KB por logo (optimiza con [TinyPNG](https://tinypng.com/))
- **Colores**: Preferible en escala de grises o monocromo

#### **Guarda tus Logos:**
Crea una carpeta: `img/clients/` y guarda ahí tus logos:
```
img/
└── clients/
    ├── logo-cliente1.png
    ├── logo-cliente2.png
    ├── logo-cliente3.png
    └── ...
```

---

### **2. Edita el HTML**

#### **Encuentra esta sección en [index.html](index.html:177-212):**

```html
<div class="clients-grid">
    <!-- Placeholders temporales -->
    <div class="client-logo placeholder">
        <span>Logo 1</span>
    </div>
    ...
</div>
```

#### **Reemplaza los placeholders por:**

```html
<div class="clients-grid">
    <!-- Cliente 1 -->
    <div class="client-logo">
        <img src="img/clients/logo-cliente1.png" alt="Nombre Cliente 1">
    </div>

    <!-- Cliente 2 -->
    <div class="client-logo">
        <img src="img/clients/logo-cliente2.png" alt="Nombre Cliente 2">
    </div>

    <!-- Cliente 3 -->
    <div class="client-logo">
        <img src="img/clients/logo-cliente3.png" alt="Nombre Cliente 3">
    </div>

    <!-- Agrega tantos como quieras... -->
    <div class="client-logo">
        <img src="img/clients/logo-cliente4.png" alt="Nombre Cliente 4">
    </div>
</div>
```

---

## 🔄 **Agregar Más Logos (Infinitamente)**

Solo copia y pega este bloque cuantas veces quieras:

```html
<div class="client-logo">
    <img src="img/clients/TU-LOGO.png" alt="Nombre del Cliente">
</div>
```

**El grid se ajusta automáticamente** - no importa cuántos agregues.

---

## 🎨 **Personalización**

### **Cambiar el Título "Confiado por"**

En [index.html](index.html:179):
```html
<h3 class="clients-title"
    data-en="Trusted by"
    data-es="Confiado por">
    Confiado por
</h3>
```

Opciones:
- "Trabajos con" / "Worked with"
- "Clientes" / "Clients"
- "Han confiado en mí" / "They trust me"
- Lo que prefieras

---

### **Cambiar Tamaño de Logos**

En [css/style.css](css/style.css:697-707):

```css
.client-logo {
    max-width: 180px;  /* Ajusta este valor */
    height: 80px;      /* Ajusta este valor */
}
```

**Valores sugeridos:**
- **Pequeños**: max-width: 120px, height: 60px
- **Medianos**: max-width: 180px, height: 80px (actual)
- **Grandes**: max-width: 220px, height: 100px

---

### **Cambiar Número de Columnas**

En [css/style.css](css/style.css:689-695):

```css
.clients-grid {
    /* Automático (recomendado) */
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));

    /* O fijo: */
    /* 3 columnas: */
    grid-template-columns: repeat(3, 1fr);

    /* 4 columnas: */
    grid-template-columns: repeat(4, 1fr);

    /* 5 columnas: */
    grid-template-columns: repeat(5, 1fr);
}
```

---

### **Cambiar Espacio entre Logos**

En [css/style.css](css/style.css:692):

```css
.clients-grid {
    gap: 3rem 2rem;  /* vertical horizontal */

    /* Más espacio: */
    gap: 4rem 3rem;

    /* Menos espacio: */
    gap: 2rem 1.5rem;
}
```

---

## 💡 **Efectos Visuales**

### **Actual (por defecto):**
- Logos en escala de grises
- Al hover: color y escala 1.05x
- Opacidad 0.6 → 1.0

### **Quitar escala de grises:**

En [css/style.css](css/style.css:697-713):

```css
.client-logo {
    /* Comenta o elimina esta línea: */
    /* filter: grayscale(100%); */
}

.client-logo:hover {
    /* Comenta o elimina esta línea: */
    /* filter: grayscale(0%); */
}
```

### **Cambiar opacidad:**

```css
.client-logo {
    opacity: 0.8;  /* Era 0.6 */
}

.client-logo:hover {
    opacity: 1;
}
```

---

## 📱 **Responsive (Automático)**

Los logos se adaptan automáticamente:

| Pantalla | Columnas | Tamaño Logo |
|----------|----------|-------------|
| Desktop | Auto-fit (4-6) | 180px |
| Tablet | Auto-fit (3-4) | 140px |
| Mobile | 2 | 120px |

---

## ✅ **Checklist**

- [ ] Crear carpeta `img/clients/`
- [ ] Guardar logos (PNG transparente o SVG)
- [ ] Optimizar imágenes (< 100KB cada una)
- [ ] Editar [index.html](index.html:177-212)
- [ ] Reemplazar placeholders por tus logos
- [ ] Verificar que se vean bien
- [ ] (Opcional) Ajustar tamaños en CSS
- [ ] (Opcional) Cambiar el título "Confiado por"

---

## 🎯 **Ejemplo Completo**

```html
<div class="clients-section">
    <h3 class="clients-title" data-en="Trusted by" data-es="Confiado por">
        Confiado por
    </h3>
    <div class="clients-grid">

        <div class="client-logo">
            <img src="img/clients/apple.png" alt="Apple">
        </div>

        <div class="client-logo">
            <img src="img/clients/nike.png" alt="Nike">
        </div>

        <div class="client-logo">
            <img src="img/clients/samsung.png" alt="Samsung">
        </div>

        <div class="client-logo">
            <img src="img/clients/adobe.png" alt="Adobe">
        </div>

        <div class="client-logo">
            <img src="img/clients/spotify.png" alt="Spotify">
        </div>

        <div class="client-logo">
            <img src="img/clients/google.png" alt="Google">
        </div>

    </div>
</div>
```

---

## 🚀 **Tip Pro**

Si tienes **muchos** logos (10+), considera:

1. **Agrupar por tipo**: Clientes principales vs colaboradores
2. **Usar carrusel**: Para mostrar más logos sin ocupar mucho espacio
3. **Limitar a los más importantes**: 6-8 logos tops es ideal

---

## 🎨 **Estilo Japandi**

Los logos están diseñados para:
- ✨ No llamar demasiado la atención
- ✨ Complementar, no competir con tu trabajo
- ✨ Mantener la estética minimalista
- ✨ Dar confianza sin ser "flashy"

---

**¿Necesitas ayuda?** Revisa los comentarios en el código HTML o pregúntame.
