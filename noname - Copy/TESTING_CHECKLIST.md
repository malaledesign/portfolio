# ✅ Checklist de Testing
## Malale Design Studio - Responsive & Multilingual

---

## 🖥️ **DESKTOP (> 1024px)**

### **Navegación**
- [ ] El navbar se ve correctamente con logo, menú y botones ES/EN
- [ ] Los links del menú funcionan (Portfolio, Galería 3D, Contacto)
- [ ] Smooth scroll funciona al hacer clic en los links
- [ ] Los iconos sociales son clicables
- [ ] El botón ES/EN cambia el idioma correctamente

### **Hero Section**
- [ ] El switch de modo (Espacios/Objetos) funciona
- [ ] El título cambia entre "Diseño de Espacios" y "Diseño de Objetos"
- [ ] La descripción cambia según el modo
- [ ] Los labels del switch cambian según el idioma
- [ ] La imagen hero se ve correctamente

### **Proyectos**
- [ ] El grid muestra 4 proyectos en 2 columnas
- [ ] Al hacer clic en un proyecto, se abre el panel lateral
- [ ] El panel se puede cerrar con la X
- [ ] Los proyectos cambian al alternar el modo

### **Idioma**
- [ ] Todo el texto cambia al presionar EN
- [ ] El footer también tiene el switcher de idioma
- [ ] Ambos switchers están sincronizados
- [ ] Al recargar la página, se mantiene el idioma seleccionado

---

## 📱 **TABLET (768px - 1024px)**

### **Layout**
- [ ] El navbar se mantiene horizontal pero más compacto
- [ ] El hero visual aparece ARRIBA del contenido
- [ ] Los proyectos se muestran en 2 columnas
- [ ] El footer se ve en 2 columnas
- [ ] Todo el contenido es legible y bien espaciado

### **Funcionalidad**
- [ ] El switch de modo funciona
- [ ] Los links de navegación funcionan
- [ ] El idioma se puede cambiar
- [ ] El panel de proyectos se ve bien

---

## 📱 **MOBILE (< 768px)**

### **Navbar Mobile**
- [ ] Aparece el icono hamburguesa (☰)
- [ ] Al hacer clic, se abre el menú lateral desde la derecha
- [ ] El icono cambia a X cuando el menú está abierto
- [ ] Los links están en el menú:
  - [ ] Portfolio
  - [ ] Galería 3D
  - [ ] Contacto
- [ ] Los iconos sociales aparecen en el menú
- [ ] El language switcher (ES/EN) aparece en el menú
- [ ] El menú se cierra al:
  - [ ] Hacer clic en un link
  - [ ] Hacer clic fuera del menú
  - [ ] Hacer clic en la X

### **Hero Section**
- [ ] La imagen hero aparece PRIMERO (arriba)
- [ ] El título es más pequeño pero legible
- [ ] El switch de modo está vertical (Espacios / Switch / Objetos)
- [ ] Todo el texto es legible

### **Proyectos**
- [ ] Los proyectos se muestran en 1 columna
- [ ] Las tarjetas ocupan todo el ancho disponible
- [ ] Al hacer clic, el panel ocupa toda la pantalla
- [ ] El panel se puede hacer scroll
- [ ] La X para cerrar está visible

### **Formulario de Contacto**
- [ ] El formulario es fácil de usar en mobile
- [ ] Todos los campos son accesibles
- [ ] El botón de enviar es grande y táctil
- [ ] Las labels están traducidas

### **Footer**
- [ ] Se ve en 2 columnas (768px) o 1 columna (< 480px)
- [ ] El language switcher está visible
- [ ] Todos los links son clicables

---

## 🌐 **SISTEMA DE IDIOMAS**

### **Español → Inglés**
- [ ] Navbar:
  - [ ] "Portfolio" → "Portfolio"
  - [ ] "Galería 3D" → "3D Gallery"
  - [ ] "Contacto" → "Contact"

- [ ] Hero:
  - [ ] "Diseño de" → "Design of"
  - [ ] "Espacios" → "Spaces"
  - [ ] "Objetos" → "Objects"

- [ ] Philosophy:
  - [ ] "El Arte de la Simplicidad" → "The Art of Simplicity"
  - [ ] "Años de experiencia" → "Years of experience"

- [ ] Portfolio:
  - [ ] "Ambientes & Espacios" → "Environments & Spaces"

- [ ] Contact:
  - [ ] "Conversemos" → "Let's Talk"
  - [ ] "Nombre" → "Name"
  - [ ] "Asunto" → "Subject"
  - [ ] "Mensaje" → "Message"
  - [ ] "Enviar Mensaje" → "Send Message"

- [ ] Footer:
  - [ ] "Navegación" → "Navigation"
  - [ ] "Inicio" → "Home"
  - [ ] "Sígueme" → "Follow Me"
  - [ ] "Todos los derechos reservados" → "All rights reserved"

### **Persistencia**
- [ ] Cambio a EN → Recargo la página → Sigue en EN
- [ ] Cambio a ES → Recargo la página → Sigue en ES

---

## 🎯 **NAVEGACIÓN**

### **Smooth Scroll**
- [ ] Hacer clic en "Portfolio" lleva a la sección de proyectos
- [ ] Hacer clic en "Contacto" lleva al formulario
- [ ] El scroll es suave (no instantáneo)
- [ ] El navbar no tapa el contenido (offset 80px)

### **Links Externos**
- [ ] "Galería 3D" abre `gallery.html`
- [ ] Instagram abre en nueva pestaña
- [ ] LinkedIn abre en nueva pestaña
- [ ] Email abre el cliente de correo

---

## 🎨 **ANIMACIONES**

### **Mode Switch**
- [ ] La transición entre Espacios/Objetos es suave
- [ ] Los colores cambian gradualmente
- [ ] El título se anima al cambiar
- [ ] Los proyectos hacen fade in/out

### **Language Switch**
- [ ] Los textos hacen un fade sutil al cambiar
- [ ] No hay saltos bruscos
- [ ] La animación es fluida

### **Mobile Menu**
- [ ] El menú se desliza suavemente desde la derecha
- [ ] La X rota al activarse
- [ ] El cierre es suave

---

## 🔍 **TESTING EN DIFERENTES NAVEGADORES**

### **Chrome**
- [ ] Desktop
- [ ] Mobile (responsive mode)

### **Firefox**
- [ ] Desktop
- [ ] Mobile (responsive mode)

### **Safari** (si tienes Mac/iPhone)
- [ ] Desktop
- [ ] iPhone

### **Edge**
- [ ] Desktop
- [ ] Mobile (responsive mode)

---

## 📱 **TESTING EN DISPOSITIVOS REALES**

### **Smartphone**
- [ ] Menú hamburguesa funciona
- [ ] Idioma se puede cambiar
- [ ] Proyectos son clicables
- [ ] Todo es legible

### **Tablet**
- [ ] Layout se adapta correctamente
- [ ] 2 columnas de proyectos
- [ ] Navegación funciona

---

## ⚡ **PERFORMANCE**

- [ ] La página carga rápido en mobile
- [ ] Las imágenes no tardan mucho en cargar
- [ ] Las animaciones son fluidas (60fps)
- [ ] No hay lag al abrir el menú mobile

---

## 🐛 **RESOLUCIÓN DE PROBLEMAS**

### **El menú mobile no aparece**
1. Verifica el ancho de la ventana (< 768px)
2. Refresca la página
3. Abre la consola (F12) y busca errores

### **El idioma no cambia**
1. Limpia el localStorage: `localStorage.clear()` en consola
2. Refresca la página
3. Verifica que los botones ES/EN estén visibles

### **El smooth scroll no funciona**
1. Asegúrate de que GSAP esté cargado (no hay errores en consola)
2. Verifica que el link tenga el href correcto (`#portfolio`)
3. Refresca la página

---

## ✅ **CHECKLIST FINAL**

- [ ] **Desktop**: Todo funciona perfectamente
- [ ] **Tablet**: Layout correcto, todo funciona
- [ ] **Mobile**: Menú hamburguesa, idioma, navegación OK
- [ ] **Idiomas**: ES ↔ EN funciona en todas las secciones
- [ ] **Navegación**: Smooth scroll, links externos OK
- [ ] **Animaciones**: Suaves y sin errores
- [ ] **Performance**: Carga rápido, no hay lag

---

## 🎉 **SI TODO ESTÁ MARCADO...**

**¡Felicidades! Tu sitio está 100% responsive y multilenguaje!** 🎊

Puedes empezar a:
1. Agregar tus imágenes de productos
2. Actualizar los enlaces sociales
3. Configurar el formulario de contacto
4. ¡Lanzar al mundo!

---

**Última actualización**: 2026-01-10
