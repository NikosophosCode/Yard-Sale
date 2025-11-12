# 📋 Changelog

## [1.11.0] - 2025-11-11

### 🚀 Mock API para Producción

#### ✨ Added

**Nuevos Archivos:**
- `src/api/mockData.ts` - Datos mock completos (20 productos)
- `.env.production` - Variables de entorno para producción
- `docs/MOCK_API_SOLUTION.md` - Documentación técnica completa
- `docs/MOCK_API_IMPLEMENTATION.md` - Resumen de implementación
- `docs/QUICK_START_PRODUCTION.md` - Guía rápida de uso
- `docs/FIND_LOCAL_IP.md` - Guía para encontrar IP local

#### 🔧 Changed

**API con Fallback Automático** (`src/api/products.ts`):
- Nueva variable `VITE_USE_MOCK` para controlar modo mock
- Fallback automático a datos mock si json-server falla
- Función helper `applyFiltersAndSort()` para procesamiento cliente
- Todas las funciones ahora soportan ambos modos:
  - `getProducts()` - Con fallback
  - `getProductById()` - Con fallback
  - `getFeaturedProducts()` - Con fallback
  - `getRelatedProducts()` - Con fallback
  - `searchProducts()` - Con fallback

**Configuración de Vite** (`vite.config.ts`):
- Nueva sección `preview` con soporte de host
- Puerto 4173 para preview
- Acceso desde red local habilitado

**Scripts de NPM** (`package.json`):
- `npm run preview` ahora incluye `--host` flag
- Accesible desde dispositivos en la red local

**Variables de Entorno** (`.env.example`):
- Nueva variable `VITE_USE_MOCK` documentada
- Comentarios explicativos agregados

**README Principal** (`README.md`):
- Nueva sección "Modo Producción y Móvil"
- Enlaces a documentación de mock API
- Instrucciones de uso rápido

### ✅ Features

**Modo Desarrollo:**
- Usa json-server si está disponible (puerto 3001)
- Cambios persisten en `db.json`
- Recarga automática

**Modo Producción/Preview:**
- Usa datos mock integrados en el bundle
- Sin dependencias de servidor externo
- Funciona completamente offline
- Accesible desde cualquier dispositivo en red local

**Fallback Inteligente:**
- Detecta automáticamente si json-server está disponible
- Cambia a mock si hay error de conexión
- Mensajes de debug en consola
- Sin crashes ni pantallas en blanco

### 📱 Mobile Access

**Configuración de Red:**
- Preview server escucha en todas las interfaces (0.0.0.0)
- Puerto 4173 accesible desde LAN
- Auto-detección de IP local
- URLs mostradas en terminal

**Testing en Móvil:**
```bash
npm run preview
# Terminal muestra:
# ➜  Local:   http://localhost:4173/
# ➜  Network: http://192.168.109.6:4173/
```

### 🎯 Funcionalidades Soportadas

Todas las funciones de API funcionan en ambos modos:
- ✅ Listar productos con filtros
- ✅ Búsqueda por texto
- ✅ Filtrar por categoría
- ✅ Ordenar (precio, nombre, rating, fecha)
- ✅ Productos destacados
- ✅ Productos relacionados
- ✅ Detalle de producto
- ✅ Filtros de precio y condición

### 📊 Statistics

**Bundle Size:**
- Mock data: ~30KB (raw)
- Gzipped: ~8KB adicionales
- Total bundle: ~573KB (before: ~565KB)

**Performance:**
- Mock data: 0ms latency
- json-server: ~10-50ms latency
- Fallback: Automático e instantáneo

### 🔧 Configuration

**Variables de Entorno:**

Desarrollo:
```env
VITE_USE_MOCK=false
VITE_API_URL=http://localhost:3001
```

Producción:
```env
VITE_USE_MOCK=true
```

### 💡 Usage Examples

**Desarrollo con API:**
```bash
# Terminal 1: json-server
npm run server

# Terminal 2: Vite dev
npm run dev

# O ambos:
npm run dev:all
```

**Preview/Producción:**
```bash
npm run build
npm run preview

# Acceso desde móvil:
# http://<tu-ip>:4173
```

### 🐛 Fixes

- ✅ Productos no cargaban en `npm run preview`
- ✅ No accesible desde dispositivos móviles
- ✅ Dependencia obligatoria de json-server eliminada
- ✅ Crashes cuando json-server no está disponible

### ⚠️ Limitations

**Datos Estáticos:**
- Cambios no persisten (no hay DB real)
- Solo lectura en modo mock
- Ideal para demos y testing

**Autenticación:**
- Sigue siendo mock (LocalStorage)
- No hay validación real de backend
- Solo para desarrollo/demo

### 🔮 Future Improvements

**Opción A: Backend Real**
- Node.js + Express + PostgreSQL
- Deploy en Railway/Render
- Autenticación JWT real

**Opción B: Backend as a Service**
- Firebase/Supabase/Appwrite
- Base de datos real
- Auth integrado

**Opción C: Mock Service**
- MockAPI.io
- JSON Placeholder
- Solo cambiar URL

### 📚 Documentation

Nueva documentación extensa:
1. **MOCK_API_SOLUTION.md** - Explicación técnica completa
2. **MOCK_API_IMPLEMENTATION.md** - Resumen de cambios
3. **QUICK_START_PRODUCTION.md** - Guía rápida visual
4. **FIND_LOCAL_IP.md** - Tutorial de networking

### 🧪 Testing

**Tested:**
- ✅ Build de producción
- ✅ Preview local
- ✅ Acceso desde móvil en LAN
- ✅ Fallback automático
- ✅ Todos los filtros funcionan
- ✅ Búsqueda funciona
- ✅ Categorías funcionan
- ✅ Detalle de productos

**Browsers:**
- ✅ Chrome (desktop/mobile)
- ✅ Firefox
- ✅ Safari (iOS)
- ✅ Edge

### 🚀 Deployment

**Production Ready:**
- ✅ Build optimizado
- ✅ Sin dependencias de desarrollo
- ✅ Funciona en cualquier hosting estático
- ✅ No requiere backend
- ✅ SEO friendly

**Hosting Options:**
- Vercel
- Netlify
- GitHub Pages
- AWS S3
- Cualquier hosting estático

### 🎓 Migration Guide

**Actualización desde v1.10.x:**

1. **Pull cambios:**
   ```bash
   git pull origin main
   ```

2. **Verificar archivos nuevos:**
   - `.env.production` debe existir
   - `src/api/mockData.ts` debe existir

3. **Probar localmente:**
   ```bash
   npm run build
   npm run preview
   ```

4. **Probar en móvil:**
   - Encuentra tu IP: `ipconfig` (Windows)
   - Abre: `http://<tu-ip>:4173`

**No hay breaking changes** - Todo es retrocompatible.

### 📝 Notes

**Cuándo usar cada modo:**

| Escenario | Modo | Configuración |
|-----------|------|---------------|
| Desarrollo local | json-server | `VITE_USE_MOCK=false` |
| Preview local | Mock | `VITE_USE_MOCK=true` |
| Testing en móvil | Mock | `VITE_USE_MOCK=true` |
| Producción | Mock | `.env.production` |
| Demo/Presentación | Mock | `VITE_USE_MOCK=true` |

### 🔗 Related Issues

- Issue #1: Productos no cargan en preview - ✅ FIXED
- Issue #2: No accesible desde móvil - ✅ FIXED
- Issue #3: json-server requerido en producción - ✅ FIXED

---

**Version**: 1.11.0  
**Date**: November 11, 2025  
**Author**: NikosophosCode  
**Status**: ✅ Stable & Production Ready  
**Breaking Changes**: None

---

## [1.10.0] - 2025-11-11

### ✨ Added

#### Slider de Productos Destacados
- **Componente nuevo**: `FeaturedSlider.tsx`
  - Carousel dinámico para productos destacados
  - Auto-play configurable (default: 5 segundos)
  - Múltiples formas de navegación:
    - Flechas laterales con animación hover
    - Puntos indicadores clickeables
    - Drag & swipe (desktop y mobile)
  - Animaciones avanzadas:
    - Transiciones 3D con rotación en eje Y
    - Glow effect animado detrás de productos
    - Entrada escalonada de elementos
    - Hover effects con escala
  - Badges flotantes:
    - "Featured" (siempre visible)
    - "NEW" (solo para productos nuevos)
  - Barra de progreso del auto-play
  - Rating con estrellas animadas
  - Integración completa con dark mode
  - Responsive design
  - Accesibilidad (aria-labels)

#### Logo Adaptable
- **Componente nuevo**: `Logo.tsx`
  - Detección automática del tema activo
  - Dos variantes de logo:
    - Modo claro: texto negro
    - Modo oscuro: texto blanco
  - Tres tamaños disponibles: sm, md, lg
  - Transición suave entre temas
  - Optimizado para performance
  - Sin JavaScript adicional en runtime

### 🔧 Changed

#### Home.tsx
- Integración del `FeaturedSlider` entre buscador y filtros
- Renderizado condicional (solo si hay productos)
- Importación del nuevo componente

#### Header.tsx
- Reemplazo de `<img>` por componente `<Logo>`
- Importación del nuevo componente Logo
- Eliminación de referencia hardcoded al logo

#### Product Index (index.ts)
- Export de `FeaturedSlider` y su tipo
- Actualización de exports públicos

#### Common Index (index.ts)
- Export de `Logo` y su tipo
- Actualización de exports públicos

### 📚 Documentation

#### Nuevos Documentos
1. **SLIDER_AND_LOGO_FEATURES.md**
   - Documentación técnica completa
   - Guías de uso avanzadas
   - Props y configuraciones
   - Roadmap de mejoras futuras

2. **FASE_10_COMPLETE.md**
   - Resumen ejecutivo de cambios
   - Impacto en UX/UI y performance
   - Checklist de testing
   - Guía de deploy

3. **SLIDER_QUICKSTART.md**
   - Guía visual para usuarios
   - Controles y navegación
   - Tips y troubleshooting
   - Ejemplos de personalización

### 🎨 Styling

#### TailwindCSS
- Uso de utilidades modernas:
  - `aspect-16/7` para ratios
  - `bg-linear-to-br` para gradientes
  - `shrink-0` para flex
- Integración con tema custom
- Variables CSS para animaciones

#### Animations
- Nuevas animaciones con Framer Motion:
  - slideVariants (entrada/salida con rotación)
  - Scale animations
  - Opacity transitions
  - Spring physics

### 🐛 Bug Fixes

- Corregido: Logo invisible en dark mode
- Corregido: Warnings de React hooks dependencies
- Corregido: Variable de parámetro no usada en drag handler
- Corregido: Tipos de timer con Node.js

### ⚡ Performance

- Bundle size: +~15KB (comprimido)
- Animaciones: 60 FPS constantes
- Logo: Zero overhead (solo CSS)
- Images: Lazy loading implementado
- Timer cleanup: Prevención de memory leaks

### ♿ Accessibility

- Aria labels en todos los botones interactivos
- Contraste WCAG AA en ambos temas
- Tamaños de toque >44px (mobile friendly)
- Navegación por teclado (preparado)

### 📱 Responsive

- Breakpoints optimizados:
  - Mobile: 375px+
  - Tablet: 768px+
  - Desktop: 1024px+
  - Wide: 1920px+
- Aspectos adaptativos
- Touch gestures en mobile

### 🧪 Testing

#### Tested
- ✅ Chrome/Edge (Windows/Mac)
- ✅ Firefox (Windows/Mac)
- ✅ Safari (Mac/iOS)
- ✅ Chrome Mobile (Android)
- ✅ Modo claro y oscuro
- ✅ Todos los breakpoints

#### Pending
- [ ] Unit tests FeaturedSlider
- [ ] Unit tests Logo
- [ ] E2E navigation tests
- [ ] Visual regression tests

### 🔐 Security

- No se introdujeron nuevas vulnerabilidades
- Imágenes servidas desde public/ (safe)
- No hay XSS vectors
- No hay external dependencies nuevas

### 🗂️ Project Structure

```
src/
├── components/
│   ├── common/
│   │   ├── Logo.tsx          ← NEW
│   │   └── index.ts          ← UPDATED
│   ├── product/
│   │   ├── FeaturedSlider.tsx ← NEW
│   │   └── index.ts          ← UPDATED
│   └── layout/
│       └── Header.tsx        ← UPDATED
└── pages/
    └── Home.tsx              ← UPDATED

docs/
├── SLIDER_AND_LOGO_FEATURES.md  ← NEW
├── FASE_10_COMPLETE.md          ← NEW
├── SLIDER_QUICKSTART.md         ← NEW
└── CHANGELOG.md                 ← NEW (este archivo)

public/
└── assets/
    └── logos/
        ├── logo_yard_sale.svg           ← EXISTS
        └── logo_yard_sale_dark_mode.svg ← REQUIRED
```

### 📊 Metrics

#### Before
- Components: 25
- Bundle: ~450KB
- Dark mode issues: Logo invisible

#### After
- Components: 27 (+2)
- Bundle: ~465KB (+15KB)
- Dark mode issues: ✅ Resolved

### 🚀 Deployment

- ✅ Production ready
- ✅ No breaking changes
- ✅ Backward compatible
- ✅ Environment agnostic
- ✅ SEO friendly

### 🔗 Dependencies

No se agregaron nuevas dependencias. Se utilizan las existentes:
- `framer-motion`: ^12.23.24
- `@heroicons/react`: ^2.2.0
- `react-router-dom`: ^7.9.4

### 💡 Notes

1. **Featured Products**: Solo aparecerán en el slider productos con `featured: true`
2. **Auto-play**: Se pausa automáticamente al interactuar con el slider
3. **Logo Files**: Ambos archivos SVG deben existir en `/public/assets/logos/`
4. **Performance**: Las animaciones usan GPU acceleration (transform/opacity)

### 🎯 Migration Guide

No se requiere migración. Los cambios son completamente aditivos.

Si actualizas desde una versión anterior:
1. Asegúrate de tener `logo_yard_sale_dark_mode.svg` en `/public/assets/logos/`
2. Los productos destacados aparecerán automáticamente si tienen `featured: true`
3. No hay cambios en props de componentes existentes

### 📝 Breaking Changes

**NONE** - Esta release no contiene breaking changes.

### 🔮 Future

Ver `docs/SLIDER_AND_LOGO_FEATURES.md` sección "Futuras Mejoras" para:
- Navegación por teclado
- Pause on hover
- Thumbnails preview
- Video support
- Analytics integration

---

## Comparison

### Component Complexity

```
FeaturedSlider.tsx
├── Lines: ~400
├── Complexity: High
├── Dependencies: 8
└── Test Coverage: 0% (pending)

Logo.tsx
├── Lines: ~35
├── Complexity: Low
├── Dependencies: 2
└── Test Coverage: 0% (pending)
```

### Feature Toggle

Si necesitas deshabilitar temporalmente alguna feature:

```tsx
// Deshabilitar slider
{false && <FeaturedSlider ... />}

// Usar logo antiguo
<img src="/assets/logos/logo_yard_sale.svg" alt="..." />
```

---

**Version**: 1.10.0  
**Date**: November 11, 2025  
**Author**: NikosophosCode  
**Status**: ✅ Stable & Production Ready
