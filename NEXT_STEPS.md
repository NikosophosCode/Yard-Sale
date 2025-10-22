# 🚀 Próximos Pasos - Continuación FASE 2

## 📍 Estado Actual

**Fecha**: 21 de Octubre 2025  
**Progreso FASE 1**: ✅ 100% COMPLETADO  
**Progreso FASE 2**: 0% - Por iniciar  
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

## 🎯 FASE 2: Componentes Base (Por Iniciar)

### Objetivo
Crear los componentes básicos reutilizables que servirán como fundación para toda la aplicación.

### Duración Estimada: 2-3 días

### Tareas Pendientes

#### 1. Componente Button 🔘
**Prioridad**: Alta  
**Ubicación**: `src/components/common/Button.tsx`

Características:
- Variantes: primary, secondary, outline, ghost, danger
- Tamaños: sm, md, lg
- Estados: loading, disabled
- Soporte para iconos (left/right)
- Animación con Framer Motion
- TypeScript con props tipados

```tsx
// Ejemplo de uso
<Button variant="primary" size="md" loading={false}>
  Add to Cart
</Button>
```

#### 2. Componente Input 📝
**Prioridad**: Alta  
**Ubicación**: `src/components/common/Input.tsx`

Características:
- Tipos: text, email, password, number, search
- Estados de validación (error, success)
- Placeholder y label
- Iconos opcionales
- Integración con React Hook Form
- Modo oscuro

#### 3. Componente Card 🃏
**Prioridad**: Alta  
**Ubicación**: `src/components/common/Card.tsx`

Características:
- Variantes: default, elevated, outlined
- Hover effects
- Click handler opcional
- Soporte para header/body/footer
- Responsive

#### 4. Componente Modal 🪟
**Prioridad**: Media  
**Ubicación**: `src/components/common/Modal.tsx`

Características:
- Backdrop con blur
- Animación de entrada/salida (Framer Motion)
- Cerrar con ESC o click fuera
- Tamaños: sm, md, lg, xl, full
- Accesible (focus trap, aria-labels)

#### 5. Header Component 🎯
**Prioridad**: Alta  
**Ubicación**: `src/components/layout/Header.tsx`

Características:
- Logo de Yard Sale
- Navegación principal
- Buscador
- Carrito (con badge de cantidad)
- Avatar de usuario / Login
- Theme toggle
- Menú móvil responsive

#### 6. Footer Component 👣
**Prioridad**: Baja  
**Ubicación**: `src/components/layout/Footer.tsx`

Características:
- Links útiles
- Redes sociales
- Copyright
- Responsive

#### 7. ThemeContext & ThemeToggle 🌓
**Prioridad**: Alta  
**Ubicación**: 
- `src/contexts/ThemeContext.tsx`
- `src/components/common/ThemeToggle.tsx`

Características:
- Context API para tema global
- Persistencia en localStorage
- Animación de toggle
- Soporte para sistema (auto)

#### 8. Skeleton Loaders 💀
**Prioridad**: Media  
**Ubicación**: `src/components/common/Skeleton.tsx`

Características:
- Variantes: text, circle, rectangle, card
- Animación de shimmer
- Composable

#### 9. Testing de Componentes ✅
**Prioridad**: Media  

Tests a crear:
- `Button.test.tsx` - Renderizado, clicks, variantes
- `Input.test.tsx` - Validación, cambios
- `Card.test.tsx` - Renderizado
- `Modal.test.tsx` - Apertura/cierre, ESC key
- `ThemeToggle.test.tsx` - Cambio de tema

---

## 📋 Checklist FASE 2

```
□ Crear Button component con todas sus variantes
□ Crear Input component con validación
□ Crear Card component
□ Crear Modal component con animaciones
□ Crear Header component responsive
□ Crear Footer component
□ Implementar ThemeContext y ThemeToggle
□ Crear Skeleton loaders
□ Escribir tests unitarios para componentes
□ Documentar componentes con ejemplos
□ Verificar accesibilidad (a11y)
□ Revisar modo oscuro en todos los componentes
```

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
