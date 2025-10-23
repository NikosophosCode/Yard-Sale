# Yard Sale 2.0 🛒

Aplicación moderna de e-commerce para productos de segunda mano, construida con React + TypeScript + Vite + TailwindCSS. Una plataforma completa con autenticación, carrito de compras, checkout, y gestión de órdenes.

## ✨ Características Principales

- 🛍️ **Catálogo de Productos**: 20+ productos con imágenes reales, categorías, y filtros avanzados
- 🔍 **Búsqueda y Filtrado**: Búsqueda en tiempo real con debounce, filtros por categoría y condición
- 🛒 **Carrito Funcional**: Agregar/eliminar productos, actualizar cantidades, persistencia en localStorage
- 🔐 **Autenticación Completa**: Registro, login, recuperación de contraseña, sesiones persistentes
- � **Checkout**: Formulario completo con validación, métodos de pago, dirección de envío
- 📦 **Historial de Órdenes**: Ver órdenes pasadas con detalles completos
- 🌓 **Modo Oscuro**: Tema claro/oscuro con persistencia y transiciones suaves
- 📱 **Responsive**: Diseño mobile-first que funciona en todos los dispositivos
- ♿ **Accesible**: Skip links, ARIA labels, navegación por teclado
- 🎭 **Animaciones**: Transiciones fluidas con Framer Motion
- 🧪 **Tested**: Tests unitarios con Vitest y React Testing Library

## �🚀 Stack Tecnológico

- **Frontend Framework**: React 19.1.1 + TypeScript 5.9.3
- **Build Tool**: Vite 7.1.7
- **Styling**: TailwindCSS 4.1.15 + PostCSS
- **State Management**: Zustand 5.0.8 + Context API
- **Routing**: React Router v7.9.4
- **Animations**: Framer Motion 12.23.24
- **Forms**: React Hook Form 7.65.0 + Zod 4.1.12
- **UI Components**: Headless UI 2.2.9 + Heroicons 2.2.0
- **Testing**: Vitest 3.2.4 + React Testing Library 16.3.0
- **Mock API**: JSON Server 1.0.0-beta.3
- **Code Quality**: ESLint 9.36.0 + Prettier 3.6.2

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

El proyecto incluye tests unitarios para componentes y lógica de negocio.

```bash
# Ejecutar tests
npm run test

# Ejecutar tests con UI interactiva
npm run test:ui

# Tests con coverage
npm run test -- --coverage

# Tests en modo watch
npm run test -- --watch
```

### Coverage Actual

- ✅ Componentes base (Button, Input, Card)
- ✅ Store de Zustand (cartStore)
- ✅ Utilidades (formatters, helpers)
- ⏳ Componentes de autenticación (pendiente)
- ⏳ Componentes de productos (pendiente)

## 📡 API Mock

La aplicación usa JSON Server para simular un backend REST completo.

### Endpoints Disponibles

#### Productos
```bash
# Listar todos los productos
GET http://localhost:3001/products

# Obtener un producto por ID
GET http://localhost:3001/products/:id

# Filtrar productos
GET http://localhost:3001/products?category=electronics
GET http://localhost:3001/products?q=laptop
GET http://localhost:3001/products?_sort=price&_order=asc
```

#### Usuarios
```bash
# Listar usuarios
GET http://localhost:3001/users

# Crear usuario
POST http://localhost:3001/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}

# Obtener usuario por email
GET http://localhost:3001/users?email=john@example.com
```

#### Órdenes
```bash
# Listar órdenes de un usuario
GET http://localhost:3001/orders?userId=123

# Crear orden
POST http://localhost:3001/orders
Content-Type: application/json

{
  "userId": "123",
  "items": [...],
  "total": 150.00,
  "status": "pending"
}

# Obtener orden por ID
GET http://localhost:3001/orders/:id
```

#### Categorías
```bash
# Listar categorías
GET http://localhost:3001/categories
```

### Credenciales de Prueba

Para testing rápido, usa estas credenciales:

```
Email: demo@yardsale.com
Password: demo123
```

O crea una cuenta nueva en la página de registro.

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

El proyecto está en fase avanzada de desarrollo con las siguientes fases completadas:

- ✅ **FASE 1**: Setup Inicial (100%)
- ✅ **FASE 2**: Componentes Base (100%)
- ✅ **FASE 3**: Autenticación (100%)
- ✅ **FASE 4**: Catálogo de Productos (100%)
- ✅ **FASE 5**: Carrito de Compras (100%)
- ✅ **FASE 6**: Checkout y Órdenes (100%)
- ✅ **FASE 7**: Cuenta de Usuario (100%)
- ✅ **FASE 8**: Mejoras Finales (100%)
- ✅ **FASE 9**: Testing y Documentación (en progreso)
- ⏳ **FASE 10**: Deployment (pendiente)

**Progreso Total: 85%**

Ver `MIGRATION_PLAN.md` para detalles completos del plan de migración.

## 📊 Estadísticas del Proyecto

- **Líneas de código**: ~8,000+ líneas
- **Componentes**: 30+ componentes React
- **Páginas**: 10 páginas completas
- **Contextos**: 3 (Auth, Theme, Toast)
- **Stores**: 1 (Cart con Zustand)
- **Hooks personalizados**: 7 hooks
- **Tests**: 86+ tests unitarios
- **Commits**: 50+ commits organizados

## 🎯 Roadmap Futuro

### V2.0 (Corto Plazo)
- [ ] Wishlist/Favoritos
- [ ] Reviews y ratings de usuarios
- [ ] Comparador de productos
- [ ] Notificaciones push
- [ ] Multi-idioma (i18n)

### V3.0 (Largo Plazo)
- [ ] Backend real (Node.js + MongoDB)
- [ ] Pasarela de pago real (Stripe/PayPal)
- [ ] Upload de imágenes real (Cloudinary)
- [ ] Email transaccional (SendGrid)
- [ ] Admin panel
- [ ] PWA (Progressive Web App)

## 📄 Licencia

Proyecto educativo - Curso Frontend Developer (Platzi)

## 🙌 Contribuir

Contribuciones son bienvenidas! Para contribuir:

1. Fork del proyecto
2. Crear feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

### Guías de Contribución

- Usar TypeScript para todos los archivos nuevos
- Seguir las convenciones de código (ESLint + Prettier)
- Agregar tests para nuevas funcionalidades
- Actualizar documentación si es necesario
- Commits en español siguiendo convenciones

## 👨‍💻 Autor

**Nicolas Acuña** - [NikosophosCode](https://github.com/NikosophosCode)

## 🙏 Agradecimientos

- [Platzi](https://platzi.com/) por el curso
- Comunidad de React y TypeScript
- Contribuidores de librerías open source utilizadas

---

**Nota**: Este proyecto está en desarrollo activo. Ver `MIGRATION_PLAN.md` para el plan completo de desarrollo.