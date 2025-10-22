# 🚀 Próximos Pasos - Continuación FASE 2

## 📍 Estado Actual

**Fecha**: 21 de Octubre 2025  
**Progreso FASE 1**: ✅ 100% COMPLETADO  
**Progreso FASE 2**: ✅ 90% COMPLETADO (tests pendientes)  
**Ubicación del proyecto**: `C:\Users\nicon\OneDrive\Documents\Proyectos\yard-sale-v2\`

## ✅ FASE 1 - Completada al 100%

### Lo que se hizo ✅

1. ✅ Proyecto Vite + React + TypeScript creado
2. ✅ 17 dependencias principales instaladas
3. ✅ TailwindCSS configurado con design tokens personalizados
4. ✅ Prettier configurado con plugin de TailwindCSS
5. ✅ ESLint actualizado con soporte para Prettier
6. ✅ Estructura completa de carpetas creada
7. ✅ Assets migrados desde proyecto legacy
8. ✅ JSON Server configurado con db.json
9. ✅ Scripts actualizados en package.json
10. ✅ Vitest configurado con Testing Library
11. ✅ Path aliases configurados en TypeScript y Vite
12. ✅ Archivos base creados:
    - `src/types/index.ts` - Tipos TypeScript
    - `src/utils/constants.ts` - Constantes
    - `src/utils/formatters.ts` - Funciones de formateo
    - `src/utils/helpers.ts` - Utilidades
    - `src/hooks/useLocalStorage.ts` - Hook de localStorage
    - `src/hooks/useDebounce.ts` - Hook de debounce
    - `src/hooks/useMediaQuery.ts` - Hook de media queries
    - `.env.example` - Variables de entorno

### Verificación ✅

```bash
✅ npm run format - Funciona correctamente
✅ npm run lint - Sin errores
✅ Estructura de carpetas completa
✅ Assets migrados
✅ API mock lista (db.json)
```

---

## 🎯 FASE 2: Componentes Base ✅ 90% COMPLETADA

### ✅ Componentes Implementados

#### 1. Button Component ✅
**Ubicación**: `src/components/common/Button.tsx`

**Características implementadas**:
- ✅ 5 variantes: primary, secondary, outline, ghost, danger
- ✅ 3 tamaños: sm, md, lg
- ✅ Estado de loading con spinner animado
- ✅ Estado disabled
- ✅ Soporte para iconos izquierda/derecha
- ✅ Animaciones con Framer Motion (hover, tap)
- ✅ Modo oscuro completo
- ✅ TypeScript con props tipados
- ✅ forwardRef para ref forwarding
- ✅ Ancho completo opcional

**Ejemplo de uso**:
```tsx
<Button variant="primary" size="md" loading={false} leftIcon={<CartIcon />}>
  Add to Cart
</Button>
```

---

#### 2. Input Component ✅
**Ubicación**: `src/components/common/Input.tsx`

**Características implementadas**:
- ✅ Tipos: text, email, password, number, search, tel, url
- ✅ Estados de validación (error con mensaje, success)
- ✅ Label con asterisco para required
- ✅ Helper text
- ✅ Iconos izquierda/derecha
- ✅ Toggle de visibilidad para password (con iconos)
- ✅ Modo oscuro
- ✅ Accesibilidad (aria-invalid, aria-describedby)
- ✅ Integración con React Hook Form (forwardRef)

**Ejemplo de uso**:
```tsx
<Input
  type="email"
  label="Email"
  placeholder="john@example.com"
  error={errors.email?.message}
  required
/>
```

---

#### 3. Card Component ✅
**Ubicación**: `src/components/common/Card.tsx`

**Características implementadas**:
- ✅ 3 variantes: default, elevated, outlined
- ✅ Hover effect con animación
- ✅ Clickeable con Framer Motion
- ✅ 4 niveles de padding: none, sm, md, lg
- ✅ Sub-componentes: CardHeader, CardBody, CardFooter
- ✅ Modo oscuro
- ✅ Composable y flexible

**Ejemplo de uso**:
```tsx
<Card variant="elevated" hoverEffect clickable>
  <CardHeader>Title</CardHeader>
  <CardBody>Content here...</CardBody>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

---

#### 4. Modal Component ✅
**Ubicación**: `src/components/common/Modal.tsx`

**Características implementadas**:
- ✅ Animaciones suaves con Framer Motion
- ✅ Backdrop con blur
- ✅ Cerrar con ESC, click fuera o botón X
- ✅ 5 tamaños: sm, md, lg, xl, full
- ✅ Bloqueo de scroll del body
- ✅ preventClose para modales críticos
- ✅ Accesibilidad con Headless UI Dialog
- ✅ Sub-componentes: ModalBody, ModalFooter
- ✅ Modo oscuro

**Ejemplo de uso**:
```tsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Action"
  size="md"
>
  <ModalBody>
    <p>Are you sure?</p>
  </ModalBody>
  <ModalFooter>
    <Button variant="ghost" onClick={onClose}>Cancel</Button>
    <Button variant="primary" onClick={onConfirm}>Confirm</Button>
  </ModalFooter>
</Modal>
```

---

#### 5. Skeleton Component ✅
**Ubicación**: `src/components/common/Skeleton.tsx`

**Características implementadas**:
- ✅ 4 variantes: text, circle, rectangle, card
- ✅ Animación shimmer (gradiente animado)
- ✅ Componentes pre-configurados: SkeletonProductCard, SkeletonProductGrid, SkeletonText, SkeletonAvatar
- ✅ Composable y flexible
- ✅ Modo oscuro

**Ejemplo de uso**:
```tsx
<SkeletonProductGrid count={8} />
<SkeletonText lines={3} />
<SkeletonAvatar size={64} />
```

---

#### 6. ThemeContext & ThemeToggle ✅
**Ubicación**: 
- `src/contexts/ThemeContext.tsx`
- `src/hooks/useTheme.ts`
- `src/components/common/ThemeToggle.tsx`

**Características implementadas**:
- ✅ Context API con ThemeProvider
- ✅ 3 modos: light, dark, system (auto-detect)
- ✅ Persistencia en localStorage
- ✅ Escucha cambios del sistema (prefers-color-scheme)
- ✅ Hook useTheme() para consumir el contexto
- ✅ ThemeToggle con animación de iconos (sol/luna)
- ✅ ThemeToggleSwitch (diseño de switch)
- ✅ Tooltip en hover

**Ejemplo de uso**:
```tsx
// En main.tsx o App.tsx
<ThemeProvider defaultTheme="system">
  <App />
</ThemeProvider>

// En cualquier componente
const { theme, toggleTheme, resolvedTheme } = useTheme();

// Toggle button
<ThemeToggle />
<ThemeToggleSwitch />
```

---

#### 7. Header Component ✅
**Ubicación**: `src/components/layout/Header.tsx`

**Características implementadas**:
- ✅ Logo de Yard Sale
- ✅ Navegación horizontal (6 categorías)
- ✅ Buscador con icono
- ✅ Carrito con badge animado de cantidad
- ✅ Avatar de usuario / botón Sign In
- ✅ Theme toggle integrado
- ✅ Menú móvil hamburguesa con animación
- ✅ Sticky header con backdrop blur
- ✅ Completamente responsive
- ✅ Modo oscuro

**Props**:
- `cartItemsCount`: número de items en carrito
- `onCartClick`: callback al hacer click en carrito
- `user`: objeto con name y avatar (opcional)
- `onSearch`: callback de búsqueda

---

#### 8. Footer Component ✅
**Ubicación**: `src/components/layout/Footer.tsx`

**Características implementadas**:
- ✅ 4 columnas de links: Shop, Account, Support, Company
- ✅ Logo y descripción
- ✅ Redes sociales (Twitter, GitHub, Instagram)
- ✅ Copyright dinámico con año actual
- ✅ Responsive (columnas en mobile)
- ✅ Modo oscuro

---

### 📦 Archivos Creados

```
src/
├── components/
│   ├── common/
│   │   ├── Button.tsx ✅
│   │   ├── Input.tsx ✅
│   │   ├── Card.tsx ✅
│   │   ├── Modal.tsx ✅
│   │   ├── Skeleton.tsx ✅
│   │   ├── ThemeToggle.tsx ✅
│   │   └── index.ts ✅ (exports)
│   └── layout/
│       ├── Header.tsx ✅
│       ├── Footer.tsx ✅
│       └── index.ts ✅ (exports)
├── contexts/
│   └── ThemeContext.tsx ✅
├── hooks/
│   └── useTheme.ts ✅
└── App.tsx ✅ (demo page actualizada)
```

---

### 🎨 Demo Page

Se actualizó `App.tsx` con una página de demostración completa que incluye:
- ✅ Header funcional con carrito
- ✅ Hero section con botones
- ✅ Showcase de todos los componentes:
  - Todas las variantes de Button
  - Input con diferentes estados
  - Cards con variantes
  - Modal funcional
  - Skeletons con toggle
- ✅ Footer
- ✅ ThemeProvider envolviendo toda la app

**Para ver la demo**: `npm run dev`

---

### 📋 Checklist FASE 2

```
✅ Crear Button component con todas sus variantes
✅ Crear Input component con validación
✅ Crear Card component
✅ Crear Modal component con animaciones
✅ Crear Header component responsive
✅ Crear Footer component
✅ Implementar ThemeContext y ThemeToggle
✅ Crear Skeleton loaders
□ Escribir tests unitarios para componentes (PENDIENTE)
✅ Documentar componentes con ejemplos
✅ Verificar accesibilidad (a11y)
✅ Revisar modo oscuro en todos los componentes
```

---

### ⚡ Verificación de Funcionamiento

Para probar todos los componentes:

```bash
# 1. Iniciar servidor de desarrollo
npm run dev

# 2. Abrir en navegador
http://localhost:5173

# 3. Probar:
- Tema claro/oscuro (botón en header)
- Responsive (resize ventana)
- Botones con diferentes variantes
- Inputs con validación
- Cards clickables
- Modal (botón "View Demo Modal")
- Skeletons (botón Show/Hide Loading)
- Header móvil (menú hamburguesa)
- Carrito (badge animado)
```

---

### 🐛 Issues Conocidos

1. **Fast Refresh Warning**: El ThemeContext genera un warning de Fast Refresh en desarrollo (no afecta producción)
   - ⚠️ `Fast refresh only works when a file only exports components`
   - 💡 **Solución futura**: Separar el Context en un archivo dedicado de contexts

2. **Motion Component Type Issues**: Warnings menores de TypeScript con Framer Motion
   - ⚠️ Incompatibilidad entre tipos de React y Framer Motion para eventos onDrag
   - ✅ **No afecta funcionalidad** - es un issue conocido de tipos

---

### 🎯 Siguiente Paso: Testing (Opcional para FASE 2)

Si deseas completar el 100% de FASE 2, el siguiente paso es:

**Escribir tests unitarios** para los componentes base:

```bash
# Crear archivos de test
src/components/common/__tests__/
├── Button.test.tsx
├── Input.test.tsx
├── Card.test.tsx
├── Modal.test.tsx
└── ThemeToggle.test.tsx
```

**Ejemplo de test para Button**:
```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
  it('renders with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('shows loading spinner', () => {
    render(<Button loading>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

---

## 🚀 FASE 3: Autenticación (Siguiente)

Una vez satisfecho con FASE 2, continuar con:

### Objetivo FASE 3
Implementar el sistema completo de autenticación con:
- AuthContext con login/register/logout
- Formularios con React Hook Form + Zod
- Páginas: Login, Register, Recovery
- ProtectedRoute component
- Persistencia de sesión
- Mensajes de error/éxito

**Duración estimada**: 2-3 días

---

**🎉 FASE 2 COMPLETADA AL 90% - ¡Todos los componentes base están listos para usar!**

---

## 🎨 Guía de Estilo para Componentes

### Estructura de Archivo
```tsx
import { ComponentProps } from './types';
import { cn } from '@utils/helpers';

export function ComponentName({ prop1, prop2, ...props }: ComponentProps) {
  return (
    <div className={cn('base-classes', props.className)}>
      {/* content */}
    </div>
  );
}
```

### Naming Conventions
- Componentes: PascalCase (`Button.tsx`)
- Props interfaces: `ComponentNameProps`
- Variantes: string literals (`'primary' | 'secondary'`)

### Clases de Tailwind
- Usar `cn()` helper para combinar clases
- Modo oscuro: `dark:` prefix
- Hover: `hover:` prefix
- Focus: `focus:` y `focus-visible:` prefix

---

## 🔧 Comandos Útiles

```bash
# Desarrollo (frontend + backend mock)
npm run dev:all

# Solo frontend
npm run dev

# Solo backend mock
npm run server

# Formatear código
npm run format

# Linting
npm run lint

# Tests
npm run test

# Tests con UI
npm run test:ui
```

---

## 💡 Tips para FASE 2

1. **Empezar por Button**: Es el componente más usado, define el patrón
2. **Documentar mientras codeas**: Comentarios JSDoc para props
3. **Testear componentes aislados**: Usa Vitest + Testing Library
4. **Probar en modo oscuro**: Revisar cada componente en dark mode
5. **Accesibilidad primero**: aria-labels, keyboard navigation
6. **Mobile-first**: Probar responsive en cada componente

---

## 📚 Referencias Útiles

- [TailwindCSS Components](https://tailwindui.com/components)
- [Headless UI](https://headlessui.com/)
- [Framer Motion API](https://www.framer.com/motion/)
- [React Hook Form](https://react-hook-form.com/)
- [Testing Library](https://testing-library.com/react)

---

**¡FASE 1 Completada! 🎉**  
**Siguiente objetivo: Completar todos los componentes base en FASE 2**

### 1. Abrir el Nuevo Workspace ⭐
```bash
cd C:\Users\nicon\OneDrive\Documents\Proyectos\yard-sale-v2
code .
```

### 2. Instalar Dependencias Faltantes
```bash
# Prettier y ESLint
npm install -D prettier eslint-config-prettier prettier-plugin-tailwindcss

# JSON Server para API mock
npm install -D json-server concurrently

# Testing
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

### 3. Configurar TailwindCSS

#### a) Ejecutar inicialización
```bash
npx tailwindcss init -p
```

#### b) Actualizar `tailwind.config.js`
Agregar los design tokens personalizados (colores brand y neutral), animaciones, plugins, etc.  
Ver configuración completa en `MIGRATION_PLAN.md` sección "Sistema de Diseño"

#### c) Actualizar `src/index.css`
```css
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    font-family: 'Quicksand', system-ui, sans-serif;
  }
}
```

### 4. Configurar Prettier

#### Crear `.prettierrc`
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

#### Crear `.prettierignore`
```
node_modules
dist
build
coverage
*.md
package-lock.json
```

### 5. Configurar ESLint

#### Actualizar `.eslintrc.cjs` (agregar Prettier)
```javascript
module.exports = {
  // ... configuración existente
  extends: [
    // ... extends existentes
    'prettier',
  ],
}
```

### 6. Crear Estructura de Carpetas

#### Comando rápido (PowerShell)
```powershell
# En la raíz del proyecto yard-sale-v2
New-Item -ItemType Directory -Path "src/api"
New-Item -ItemType Directory -Path "src/components/common"
New-Item -ItemType Directory -Path "src/components/layout"
New-Item -ItemType Directory -Path "src/components/product"
New-Item -ItemType Directory -Path "src/components/cart"
New-Item -ItemType Directory -Path "src/components/auth"
New-Item -ItemType Directory -Path "src/contexts"
New-Item -ItemType Directory -Path "src/hooks"
New-Item -ItemType Directory -Path "src/pages"
New-Item -ItemType Directory -Path "src/store"
New-Item -ItemType Directory -Path "src/types"
New-Item -ItemType Directory -Path "src/utils"
New-Item -ItemType Directory -Path "public/assets/icons"
New-Item -ItemType Directory -Path "public/assets/logos"
```

### 7. Migrar Assets

Copiar desde `YardZellePlatzi/assets/` hacia `yard-sale-v2/public/assets/`

```powershell
# Desde YardZellePlatzi
Copy-Item -Path "assets/icons/*" -Destination "../yard-sale-v2/public/assets/icons/" -Recurse
Copy-Item -Path "assets/logos/*" -Destination "../yard-sale-v2/public/assets/logos/" -Recurse
```

### 8. Setup JSON Server

#### a) Crear `db.json` en la raíz
```json
{
  "products": [],
  "users": [
    {
      "id": "1",
      "name": "Demo User",
      "email": "demo@yardsale.com",
      "password": "demo123",
      "role": "user",
      "avatar": null,
      "createdAt": "2025-10-21T00:00:00.000Z"
    }
  ],
  "orders": [],
  "categories": [
    { "id": "all", "name": "All", "count": 0 },
    { "id": "clothes", "name": "Clothes", "count": 0 },
    { "id": "electronics", "name": "Electronics", "count": 0 },
    { "id": "furniture", "name": "Furniture", "count": 0 },
    { "id": "toys", "name": "Toys", "count": 0 },
    { "id": "others", "name": "Others", "count": 0 }
  ]
}
```

#### b) Actualizar `package.json` scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "server": "json-server --watch db.json --port 3001",
    "dev:all": "concurrently \"npm run dev\" \"npm run server\"",
    "test": "vitest",
    "lint": "eslint . --ext ts,tsx",
    "format": "prettier --write \"src/**/*.{ts,tsx,css}\""
  }
}
```

### 9. Configurar Vitest

#### Crear `vitest.config.ts`
```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

#### Crear `src/test/setup.ts`
```typescript
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
```

### 10. Configurar TypeScript Path Aliases

#### Actualizar `tsconfig.json`
```json
{
  "compilerOptions": {
    // ... otras opciones
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@hooks/*": ["src/hooks/*"],
      "@contexts/*": ["src/contexts/*"],
      "@store/*": ["src/store/*"],
      "@utils/*": ["src/utils/*"],
      "@types/*": ["src/types/*"],
      "@api/*": ["src/api/*"],
      "@pages/*": ["src/pages/*"]
    }
  }
}
```

#### Actualizar `vite.config.ts`
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@contexts': path.resolve(__dirname, './src/contexts'),
      '@store': path.resolve(__dirname, './src/store'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@types': path.resolve(__dirname, './src/types'),
      '@api': path.resolve(__dirname, './src/api'),
      '@pages': path.resolve(__dirname, './src/pages'),
    },
  },
});
```

## 🎉 Después de Completar Todo lo Anterior

### Verificar que todo funciona
```bash
# Probar el servidor de desarrollo
npm run dev

# Probar el JSON server
npm run server

# Probar ambos simultáneamente
npm run dev:all

# Probar linting
npm run lint

# Probar formateo
npm run format

# Probar tests (cuando haya algunos)
npm run test
```

### Siguiente Fase
Una vez completada la **FASE 1 al 100%**, continuar con:
- **FASE 2**: Componentes Base (Button, Input, Card, Modal, Header, Footer, ThemeToggle)

## 📋 Checklist Rápido

```
□ Abrir workspace yard-sale-v2
□ Instalar dependencias faltantes (prettier, json-server, vitest)
□ Configurar TailwindCSS (config + index.css)
□ Configurar Prettier (.prettierrc)
□ Crear estructura de carpetas completa
□ Migrar assets (icons y logos)
□ Setup JSON Server (db.json + scripts)
□ Configurar Vitest (config + setup)
□ Configurar path aliases (tsconfig + vite.config)
□ Verificar que todo funciona (npm run dev:all)
□ Commit inicial con setup completo
□ Actualizar MIGRATION_PLAN.md con FASE 1 completada
```

## 💡 Tips

- Usa `npm run dev:all` para tener frontend y backend mock corriendo simultáneamente
- Los path aliases (`@/`, `@components/`, etc.) harán los imports más limpios
- El JSON Server en puerto 3001 permite hacer requests a `http://localhost:3001/products`, etc.
- Prettier se encargará de ordenar las clases de Tailwind automáticamente

---

**¡Listo para continuar! 🚀**

Cuando abras el workspace `yard-sale-v2`, podrás pedirme ayuda con cualquiera de estos pasos.
