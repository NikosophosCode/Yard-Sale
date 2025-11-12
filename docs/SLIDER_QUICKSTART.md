# 🎨 Guía Rápida: Slider y Logo Adaptable

## 🎠 Slider de Productos Destacados

### ¿Qué es?
Un carousel interactivo que muestra productos destacados con animaciones modernas y atractivas.

### ¿Dónde aparece?
En la página principal (Home), después del buscador y antes de los filtros.

### Controles Disponibles

#### 1. Navegación Automática
- El slider cambia automáticamente cada 5 segundos
- Perfecto para mostrar múltiples productos sin intervención del usuario

#### 2. Flechas Laterales
- **Flecha Izquierda** ← : Producto anterior
- **Flecha Derecha** → : Siguiente producto
- Animación hover: Las flechas se mueven ligeramente

#### 3. Puntos Indicadores
- Ubicados en la parte inferior del slider
- Click en cualquier punto para ir directamente a ese producto
- El punto activo se destaca con un círculo animado

#### 4. Arrastrar/Swipe
- **Desktop**: Click y arrastra la imagen
- **Mobile/Tablet**: Desliza con el dedo
- Swipe rápido cambia al siguiente/anterior producto

#### 5. Click en Producto
- Click en cualquier parte del producto
- O click en el botón "View Details"
- Redirige a la página de detalles del producto

### Elementos Visuales

```
┌─────────────────────────────────────────────────────────────┐
│  ✨ Featured Products                                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌──────────────┐   ┌─────────────────────────────────┐  │
│   │   [Featured] │   │  Electronics                    │  │
│   │   [NEW]      │   │  Gaming Console                 │  │
│   │              │   │  Latest generation gaming...    │  │
│   │   IMAGEN     │   │  $250 USD                       │  │
│   │   PRODUCTO   │   │  [View Details] [♥]             │  │
│   │              │   │  ★★★★★ 4.8 (45 reviews)         │  │
│   └──────────────┘   └─────────────────────────────────┘  │
│                                                             │
│   ←  [• • • • •]  →                                         │
│   ▓▓▓▓▓▓▓▓▓░░░░░░░░░░░ [Barra de progreso]                 │
└─────────────────────────────────────────────────────────────┘
```

### Animaciones Incluidas

1. **Entrada del producto**
   - Rotación 3D al cambiar
   - Fade in/out suave
   - Escala desde 0.8 a 1.0

2. **Glow effect**
   - Resplandor animado detrás de la imagen
   - Pulsación continua
   - Colores brand

3. **Hover effects**
   - Imagen: Escala 1.05x
   - Botones: Escala y movimiento
   - Flechas: Desplazamiento lateral

4. **Badges**
   - "Featured": Entrada desde arriba con rotación
   - "NEW": Entrada desde arriba (lado contrario)

5. **Estrellas de rating**
   - Aparecen una por una con rotación
   - Delay progresivo

### Configuración de Productos

Para que un producto aparezca en el slider, debe tener `featured: true` en db.json:

```json
{
  "id": "1",
  "name": "Retro Bike",
  "price": 120,
  "featured": true,  ← IMPORTANTE
  ...
}
```

### Personalización

```tsx
<FeaturedSlider 
  products={products}           // Array de productos
  autoPlay={true}               // Activar auto-play
  autoPlayInterval={5000}       // 5 segundos entre slides
  className="custom-class"      // Clases adicionales
/>
```

---

## 🌓 Logo Adaptable

### ¿Qué es?
Componente de logo que cambia automáticamente según el tema activo (claro/oscuro).

### ¿Dónde aparece?
En el header principal de todas las páginas.

### Funcionamiento

#### Modo Claro (Light Mode)
```
┌─────────────────┐
│  YARD SALE      │ ← Texto negro sobre fondo claro
│  (logo verde)   │
└─────────────────┘
```

#### Modo Oscuro (Dark Mode)
```
┌─────────────────┐
│  YARD SALE      │ ← Texto blanco sobre fondo oscuro
│  (logo verde)   │
└─────────────────┘
```

### Cambio Automático

El logo detecta el tema y cambia automáticamente:

1. Usuario hace click en el botón de tema (☀️/🌙)
2. El contexto de tema cambia
3. El logo detecta el cambio
4. Carga la imagen apropiada
5. Transición suave (fade)

### Tamaños Disponibles

```tsx
// Pequeño (64x64px) - Para footers o sidebar
<Logo size="sm" />

// Mediano (96x96px) - Para headers normales ✅ ACTUAL
<Logo size="md" />

// Grande (128x128px) - Para páginas de landing
<Logo size="lg" />
```

### Uso en Otros Componentes

Si necesitas usar el logo en otro lugar:

```tsx
import { Logo } from '@/components/common';

// En tu componente
<Logo size="md" className="mi-clase-custom" />
```

### Archivos de Logo

```
public/
  assets/
    logos/
      logo_yard_sale.svg              ← Modo claro (texto negro)
      logo_yard_sale_dark_mode.svg    ← Modo oscuro (texto blanco)
```

---

## 🎯 Tips de Usuario

### Para el Slider

**¿Quieres explorar más rápido?**
- Usa los puntos indicadores para saltar directamente

**¿Encuentras un producto interesante?**
- Click en cualquier parte del slide para ver detalles

**¿En mobile?**
- Swipe rápidamente para cambiar productos

**¿Quieres que se detenga?**
- Interactúa con él (click, hover, drag)
- Se reiniciará automáticamente después

### Para el Logo

**¿No ves bien el logo?**
- Verifica que el modo oscuro esté activado correctamente
- El logo debería cambiar instantáneamente

**¿Quieres cambiar el tema?**
- Busca el botón de tema en el header (☀️/🌙)
- Click para alternar entre claro/oscuro

---

## 🐛 Troubleshooting

### Slider no aparece
1. ✓ Verifica que hay productos con `featured: true`
2. ✓ Asegúrate de que la página Home cargó correctamente
3. ✓ Revisa la consola por errores de red

### Logo no cambia
1. ✓ Verifica que ambos archivos SVG existen en `/public/assets/logos/`
2. ✓ Limpia la caché del navegador
3. ✓ Revisa que el ThemeProvider está activo

### Animaciones lentas
1. ✓ Verifica que tu navegador es moderno (Chrome 90+, Firefox 88+, Safari 14+)
2. ✓ Cierra otras pestañas pesadas
3. ✓ Desactiva extensiones que puedan interferir

---

## 📱 Compatibilidad

### Navegadores Soportados
- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Opera 76+

### Dispositivos
- ✅ Desktop (1920x1080+)
- ✅ Laptop (1366x768+)
- ✅ Tablet (768x1024)
- ✅ Mobile (375x667+)

---

## 🎓 Para Desarrolladores

### Agregar más productos destacados

1. Edita `db.json`
2. Encuentra o crea un producto
3. Agrega `"featured": true`
4. Guarda el archivo
5. El servidor JSON se recargará automáticamente

```json
{
  "id": "10",
  "name": "Nuevo Producto",
  "featured": true,  ← Agregar esta línea
  ...
}
```

### Personalizar animaciones

Las animaciones están en `FeaturedSlider.tsx`:

```tsx
// Cambiar velocidad de transición
transition={{ duration: 0.3 }}  // Más rápido
transition={{ duration: 1 }}    // Más lento

// Cambiar tipo de spring
transition={{ type: 'spring', stiffness: 500 }}  // Más rebote
transition={{ type: 'spring', stiffness: 200 }}  // Más suave
```

### Personalizar auto-play

```tsx
<FeaturedSlider 
  autoPlay={true}
  autoPlayInterval={3000}  // 3 segundos
/>
```

---

**¿Preguntas?** Consulta la documentación completa en:
- `docs/SLIDER_AND_LOGO_FEATURES.md` - Documentación técnica completa
- `docs/FASE_10_COMPLETE.md` - Resumen de implementación

---

**Última actualización**: Noviembre 11, 2025  
**Versión**: Yard Sale v2.0
