# Category Pages - Quick Start Guide

## Overview

Las páginas de categorías permiten a los usuarios navegar productos por categoría específica (Clothes, Electronics, Furniture, Toys, Others).

## URLs de Categorías

```
/category/clothes      - 👕 Ropa y moda
/category/electronics  - 📱 Electrónicos
/category/furniture    - 🛋️ Muebles
/category/toys         - 🧸 Juguetes
/category/others       - 🎁 Otros
```

## Cómo Funciona

### 1. Navegación desde el Header

El usuario puede acceder a las páginas de categorías desde:

- **Desktop**: Links en la barra de navegación principal
- **Mobile**: Menú hamburguesa con todos los links

```tsx
// En Header.tsx
const navLinks = [
  { label: 'All', href: '/' },
  { label: 'Clothes', href: '/category/clothes' },
  { label: 'Electronics', href: '/category/electronics' },
  // ... más categorías
];
```

### 2. Componente Reutilizable

Una sola página (`CategoryPage.tsx`) maneja todas las categorías:

```tsx
// Se adapta automáticamente según la URL
/category/clothes    → Muestra productos de Clothes
/category/electronics → Muestra productos de Electronics
// etc.
```

### 3. Filtrado Automático

El componente usa el hook `useProducts` con la categoría pre-configurada:

```tsx
const { category } = useParams(); // Obtiene categoría de la URL
const { products } = useProducts({ category }); // Filtra automáticamente
```

## Características Implementadas

### ✅ Funcionalidades

1. **Filtrado por Categoría**: Productos filtrados automáticamente
2. **Búsqueda**: Buscar dentro de la categoría
3. **Ordenamiento**: Por precio, fecha, rating
4. **Condición**: Filtrar por estado del producto
5. **SEO**: Meta tags únicos por categoría
6. **Breadcrumbs**: Navegación jerárquica
7. **Responsive**: Funciona en todos los dispositivos
8. **Dark Mode**: Soporte completo
9. **Animaciones**: Transiciones suaves
10. **Estados**: Loading, empty, error

### 🎨 UI/UX

- **Hero Section**: Icono y descripción de categoría
- **Product Count**: Contador de resultados
- **Empty State**: Mensaje cuando no hay productos
- **Error State**: Manejo elegante de errores
- **Loading State**: Skeletons durante la carga

## Ejemplo de Uso

### Navegación Programática

```tsx
import { useNavigate } from 'react-router-dom';

function MyComponent() {
  const navigate = useNavigate();
  
  const goToCategory = (category: string) => {
    navigate(`/category/${category}`);
  };
  
  return (
    <button onClick={() => goToCategory('electronics')}>
      Ver Electrónicos
    </button>
  );
}
```

### Links Directos

```tsx
import { Link } from 'react-router-dom';

function CategoryList() {
  return (
    <nav>
      <Link to="/category/clothes">Ropa</Link>
      <Link to="/category/electronics">Electrónicos</Link>
      <Link to="/category/furniture">Muebles</Link>
    </nav>
  );
}
```

## Estructura de Datos

### Metadata de Categorías

```typescript
const CATEGORY_META = {
  clothes: {
    title: 'Clothes',
    description: 'Discover unique second-hand clothing items...',
    icon: '👕',
    keywords: ['clothes', 'fashion', 'vintage', 'apparel'],
  },
  // ... otras categorías
};
```

### Tipo Category

```typescript
type Category = 
  | 'all' 
  | 'clothes' 
  | 'electronics' 
  | 'furniture' 
  | 'toys' 
  | 'others';
```

## API Integration

### Endpoint de Productos

```bash
# Obtener productos de una categoría
GET http://localhost:3001/products?category=electronics

# Con búsqueda
GET http://localhost:3001/products?category=clothes&q=shirt

# Con ordenamiento
GET http://localhost:3001/products?category=furniture&_sort=price&_order=asc

# Con condición
GET http://localhost:3001/products?category=toys&condition=like-new
```

## Personalización

### Agregar Nueva Categoría

1. **Actualizar tipo Category** en `src/types/index.ts`:
```typescript
export type Category = 
  | 'all' 
  | 'clothes' 
  | 'electronics' 
  | 'furniture' 
  | 'toys' 
  | 'others'
  | 'books'; // Nueva categoría
```

2. **Agregar metadata** en `CategoryPage.tsx`:
```typescript
const CATEGORY_META = {
  // ... categorías existentes
  books: {
    title: 'Books',
    description: 'Find great reads at amazing prices...',
    icon: '📚',
    keywords: ['books', 'reading', 'literature'],
  },
};
```

3. **Agregar link al Header** en `Header.tsx`:
```typescript
const navLinks = [
  // ... links existentes
  { label: 'Books', href: '/category/books' },
];
```

4. **Actualizar ProductFilters** (opcional):
```typescript
const categories = [
  // ... categorías existentes
  { id: 'books', name: 'Libros', emoji: '📚' },
];
```

## Testing

### Verificar Funcionalidad

```bash
# 1. Iniciar aplicación
npm run dev:all

# 2. Abrir navegador en http://localhost:5173

# 3. Navegar por el menú principal a cada categoría

# 4. Verificar:
# - Productos filtrados correctamente
# - Búsqueda funciona
# - Filtros funcionan
# - Estados de carga
# - Responsive design
# - Dark mode
```

### Casos de Prueba

1. ✅ Navegar a `/category/clothes` → Ver solo ropa
2. ✅ Navegar a `/category/invalid` → Redirigir a 404
3. ✅ Buscar "laptop" en electronics → Filtrar resultados
4. ✅ Ordenar por precio → Ver productos ordenados
5. ✅ Cambiar a dark mode → Verificar tema
6. ✅ Resize a mobile → Verificar responsive
7. ✅ Sin productos en categoría → Ver empty state
8. ✅ Error de red → Ver error state

## Performance

### Optimizaciones Implementadas

1. **Lazy Loading**: Componente cargado bajo demanda
2. **Code Splitting**: Bundle separado para CategoryPage
3. **Memoización**: Callbacks memoizados con useCallback
4. **Debounce**: Búsqueda con debounce de 300ms
5. **Suspense**: Loading boundary para mejor UX

### Métricas Esperadas

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.0s
- **Bundle Size**: ~50KB (gzipped)

## Troubleshooting

### Problema: No se muestran productos

**Solución**: Verificar que el servidor mock esté corriendo
```bash
npm run server
```

### Problema: Categoría muestra todos los productos

**Solución**: Verificar que el parámetro de categoría se pase correctamente
```typescript
// En CategoryPage.tsx
const { category } = useParams();
console.log('Category:', category); // Debug
```

### Problema: Redirección a 404

**Solución**: Verificar que la categoría esté en CATEGORY_META
```typescript
const validCategories = Object.keys(CATEGORY_META);
console.log('Valid categories:', validCategories);
```

## Próximos Pasos

### Mejoras Sugeridas

1. **Imágenes de Hero**: Agregar banner específico por categoría
2. **Sub-categorías**: Implementar jerarquía de categorías
3. **Filtros Avanzados**: Rango de precios, marca, etc.
4. **Sort Persistente**: Guardar preferencias de orden
5. **Infinite Scroll**: Cargar más productos al hacer scroll
6. **Comparador**: Comparar productos dentro de categoría
7. **Analytics**: Trackear categorías más visitadas

## Recursos

- [Documentación Completa](./CATEGORY_PAGES.md)
- [Guía de Contribución](../README.md#contribuir)
- [API Documentation](../README.md#api-mock)

---

**Última actualización**: Noviembre 11, 2025
