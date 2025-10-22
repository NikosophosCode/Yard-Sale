# Yard Sale 2.0 🛒

Aplicación moderna de e-commerce para productos de segunda mano, construida con React + TypeScript + Vite + TailwindCSS.

## 🚀 Stack Tecnológico

- **Frontend Framework**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **Styling**: TailwindCSS 4 + PostCSS
- **State Management**: Zustand
- **Routing**: React Router v7
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **UI Components**: Headless UI + Heroicons
- **Testing**: Vitest + React Testing Library
- **Mock API**: JSON Server
- **Code Quality**: ESLint + Prettier

## 📦 Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd yard-sale-v2

# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env
```

## 🎯 Scripts Disponibles

```bash
# Desarrollo (solo frontend)
npm run dev

# Desarrollo con API mock (frontend + backend)
npm run dev:all

# API mock standalone
npm run server

# Build de producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint

# Formateo de código
npm run format
npm run format:check

# Testing
npm run test
npm run test:ui
```

## 🏗️ Estructura del Proyecto

```
yard-sale-v2/
├── public/               # Assets estáticos
│   └── assets/
│       ├── icons/        # Iconos SVG
│       └── logos/        # Logos de la marca
├── src/
│   ├── api/              # Servicios de API
│   ├── components/       # Componentes React
│   │   ├── common/       # Componentes reutilizables
│   │   ├── layout/       # Layout components
│   │   ├── product/      # Componentes de productos
│   │   ├── cart/         # Componentes del carrito
│   │   └── auth/         # Componentes de autenticación
│   ├── contexts/         # Context API providers
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Páginas/Vistas
│   ├── store/            # Zustand stores
│   ├── types/            # TypeScript types
│   ├── utils/            # Utilidades y helpers
│   └── test/             # Configuración de testing
├── db.json               # Base de datos mock (JSON Server)
├── .prettierrc           # Configuración de Prettier
├── eslint.config.js      # Configuración de ESLint
├── tailwind.config.js    # Configuración de TailwindCSS
├── tsconfig.json         # Configuración de TypeScript
├── vite.config.ts        # Configuración de Vite
└── vitest.config.ts      # Configuración de Vitest
```

## 🎨 Sistema de Diseño

### Colores
- **Brand**: Paleta verde (#acd9b2 - color original de Yard Sale)
- **Neutral**: Escala de grises para UI
- **Dark Mode**: Soporte completo con `class` strategy

### Tipografía
- **Font**: Quicksand (Google Fonts)
- **Pesos**: 300, 400, 500, 600, 700

### Componentes
- Botones con variantes (primary, secondary, outline, ghost)
- Cards con sombras suaves
- Inputs con validación visual
- Modales animados con Framer Motion

## 🔧 Configuración

### Path Aliases
El proyecto usa aliases para imports más limpios:

```typescript
import Component from '@/components/Component'
import { useHook } from '@hooks/useHook'
import { utility } from '@utils/utility'
```

Aliases disponibles:
- `@/*` → `src/*`
- `@components/*` → `src/components/*`
- `@hooks/*` → `src/hooks/*`
- `@contexts/*` → `src/contexts/*`
- `@store/*` → `src/store/*`
- `@utils/*` → `src/utils/*`
- `@types/*` → `src/types/*`
- `@api/*` → `src/api/*`
- `@pages/*` → `src/pages/*`

### API Mock
La aplicación usa JSON Server para simular un backend REST:

- **URL**: `http://localhost:3001`
- **Endpoints**:
  - `GET /products` - Listar productos
  - `GET /products/:id` - Detalle de producto
  - `GET /users` - Listar usuarios
  - `POST /users` - Crear usuario
  - `GET /orders` - Listar órdenes
  - `POST /orders` - Crear orden
  - `GET /categories` - Listar categorías

## 🧪 Testing

```bash
# Ejecutar tests
npm run test

# Ejecutar tests con UI
npm run test:ui

# Tests con coverage
npm run test -- --coverage
```

## 🌓 Modo Oscuro

La aplicación soporta modo oscuro usando la estrategia `class` de TailwindCSS:

```jsx
<div className="bg-white dark:bg-neutral-900">
  <h1 className="text-neutral-900 dark:text-neutral-50">
    Hello World
  </h1>
</div>
```

## 📱 Responsive Design

Mobile-first approach con breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## 🚧 Estado del Proyecto

**FASE 1: Completada ✅**
- [x] Setup inicial del proyecto
- [x] Configuración de herramientas
- [x] Estructura de carpetas
- [x] Path aliases
- [x] API mock básica
- [x] Testing setup

**FASE 2: Componentes Base** (En progreso)
- [ ] Button, Input, Card, Modal
- [ ] Header, Footer
- [ ] ThemeToggle
- [ ] Skeleton loaders

## 📄 Licencia

Proyecto educativo - Curso Frontend Developer (Platzi)

## 🙌 Contribuir

1. Fork del proyecto
2. Crear feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

---

**Próximos pasos**: Ver `NEXT_STEPS.md` para continuar con FASE 2