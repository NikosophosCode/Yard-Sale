import type { Product, Category } from '@/types';
import { mockProducts } from './mockData';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

export interface ProductFilters {
  search?: string;
  category?: Category;
  sortBy?: 'recent' | 'price-asc' | 'price-desc' | 'name' | 'rating';
  minPrice?: number;
  maxPrice?: number;
  condition?: string;
}

/**
 * Helper function to apply filters and sorting to products
 */
function applyFiltersAndSort(products: Product[], filters: ProductFilters = {}): Product[] {
  let result = [...products];

  // Filter by category
  if (filters.category && filters.category !== 'all') {
    result = result.filter((p) => p.category === filters.category);
  }

  // Filter by condition
  if (filters.condition) {
    result = result.filter((p) => p.condition === filters.condition);
  }

  // Filter by search
  if (filters.search && filters.search.trim()) {
    const searchLower = filters.search.toLowerCase().trim();
    result = result.filter((p) => {
      const nameMatch = p.name.toLowerCase().includes(searchLower);
      const descMatch = p.description.toLowerCase().includes(searchLower);
      return nameMatch || descMatch;
    });
  }

  // Filter by price range
  if (filters.minPrice !== undefined) {
    result = result.filter((p) => p.price >= filters.minPrice!);
  }

  if (filters.maxPrice !== undefined) {
    result = result.filter((p) => p.price <= filters.maxPrice!);
  }

  // Apply sorting
  switch (filters.sortBy) {
    case 'recent':
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      break;
    case 'price-asc':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      result.sort((a, b) => b.price - a.price);
      break;
    case 'name':
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'rating':
      result.sort((a, b) => b.rating - a.rating);
      break;
    default:
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  return result;
}

/**
 * Obtiene todos los productos con filtros opcionales
 */
export async function getProducts(filters: ProductFilters = {}): Promise<Product[]> {
  // Use mock data if configured
  if (USE_MOCK) {
    return Promise.resolve(applyFiltersAndSort(mockProducts, filters));
  }

  try {
    const params = new URLSearchParams();

    // Filtro por categoría
    if (filters.category && filters.category !== 'all') {
      params.append('category', filters.category);
    }

    // Filtro por condición
    if (filters.condition) {
      params.append('condition', filters.condition);
    }

    // Ordenamiento
    switch (filters.sortBy) {
      case 'recent':
        params.append('_sort', 'createdAt');
        params.append('_order', 'desc');
        break;
      case 'price-asc':
        params.append('_sort', 'price');
        params.append('_order', 'asc');
        break;
      case 'price-desc':
        params.append('_sort', 'price');
        params.append('_order', 'desc');
        break;
      case 'name':
        params.append('_sort', 'name');
        params.append('_order', 'asc');
        break;
      case 'rating':
        params.append('_sort', 'rating');
        params.append('_order', 'desc');
        break;
      default:
        params.append('_sort', 'createdAt');
        params.append('_order', 'desc');
    }

    const url = `${API_URL}/products${params.toString() ? `?${params.toString()}` : ''}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Error al obtener productos');
    }

    let products: Product[] = await response.json();

    // Filtro de búsqueda (nombre y descripción) - lado cliente
    if (filters.search && filters.search.trim()) {
      const searchLower = filters.search.toLowerCase().trim();
      products = products.filter((p) => {
        const nameMatch = p.name.toLowerCase().includes(searchLower);
        const descMatch = p.description.toLowerCase().includes(searchLower);
        return nameMatch || descMatch;
      });
    }

    // Filtros adicionales que JSON Server no soporta nativamente
    if (filters.minPrice !== undefined) {
      products = products.filter((p) => p.price >= filters.minPrice!);
    }

    if (filters.maxPrice !== undefined) {
      products = products.filter((p) => p.price <= filters.maxPrice!);
    }

    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    // Fallback to mock data on error
    console.warn('Using mock data as fallback');
    return applyFiltersAndSort(mockProducts, filters);
  }
}

/**
 * Obtiene un producto por su ID
 */
export async function getProductById(id: string): Promise<Product | null> {
  // Use mock data if configured
  if (USE_MOCK) {
    const product = mockProducts.find((p) => p.id === id);
    return Promise.resolve(product || null);
  }

  try {
    const response = await fetch(`${API_URL}/products/${id}`);

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Error al obtener producto');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    // Fallback to mock data
    console.warn('Using mock data as fallback');
    const product = mockProducts.find((p) => p.id === id);
    return product || null;
  }
}

/**
 * Obtiene productos destacados
 */
export async function getFeaturedProducts(limit = 6): Promise<Product[]> {
  // Use mock data if configured
  if (USE_MOCK) {
    const featured = mockProducts
      .filter((p) => p.featured)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
    return Promise.resolve(featured);
  }

  try {
    const response = await fetch(
      `${API_URL}/products?featured=true&_limit=${limit}&_sort=rating&_order=desc`
    );

    if (!response.ok) {
      throw new Error('Error al obtener productos destacados');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching featured products:', error);
    // Fallback to mock data
    console.warn('Using mock data as fallback');
    const featured = mockProducts
      .filter((p) => p.featured)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
    return featured;
  }
}

/**
 * Obtiene productos relacionados por categoría
 */
export async function getRelatedProducts(
  productId: string,
  category: Category,
  limit = 4
): Promise<Product[]> {
  // Use mock data if configured
  if (USE_MOCK) {
    const related = mockProducts
      .filter((p) => p.category === category && p.id !== productId)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
    return Promise.resolve(related);
  }

  try {
    const response = await fetch(
      `${API_URL}/products?category=${category}&_limit=${limit * 2}&_sort=rating&_order=desc`
    );

    if (!response.ok) {
      throw new Error('Error al obtener productos relacionados');
    }

    const products: Product[] = await response.json();

    // Excluir el producto actual y limitar resultados
    return products.filter((p) => p.id !== productId).slice(0, limit);
  } catch (error) {
    console.error('Error fetching related products:', error);
    // Fallback to mock data
    console.warn('Using mock data as fallback');
    const related = mockProducts
      .filter((p) => p.category === category && p.id !== productId)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
    return related;
  }
}

/**
 * Busca productos por término
 */
export async function searchProducts(query: string): Promise<Product[]> {
  // Use mock data if configured
  if (USE_MOCK) {
    if (!query.trim()) {
      return Promise.resolve([]);
    }
    const searchLower = query.toLowerCase().trim();
    const results = mockProducts.filter((p) => {
      const nameMatch = p.name.toLowerCase().includes(searchLower);
      const descMatch = p.description.toLowerCase().includes(searchLower);
      return nameMatch || descMatch;
    });
    return Promise.resolve(results);
  }

  try {
    if (!query.trim()) {
      return [];
    }

    const response = await fetch(`${API_URL}/products?q=${encodeURIComponent(query)}`);

    if (!response.ok) {
      throw new Error('Error al buscar productos');
    }

    return await response.json();
  } catch (error) {
    console.error('Error searching products:', error);
    // Fallback to mock data
    console.warn('Using mock data as fallback');
    if (!query.trim()) {
      return [];
    }
    const searchLower = query.toLowerCase().trim();
    const results = mockProducts.filter((p) => {
      const nameMatch = p.name.toLowerCase().includes(searchLower);
      const descMatch = p.description.toLowerCase().includes(searchLower);
      return nameMatch || descMatch;
    });
    return results;
  }
}
