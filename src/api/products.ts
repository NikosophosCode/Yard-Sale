import type { Product, Category } from '@/types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface ProductFilters {
  search?: string;
  category?: Category;
  sortBy?: 'recent' | 'price-asc' | 'price-desc' | 'name' | 'rating';
  minPrice?: number;
  maxPrice?: number;
  condition?: string;
}

/**
 * Obtiene todos los productos con filtros opcionales
 */
export async function getProducts(filters: ProductFilters = {}): Promise<Product[]> {
  try {
    const params = new URLSearchParams();

    // Filtro por categoría
    if (filters.category && filters.category !== 'all') {
      params.append('category', filters.category);
    }

    // Filtro por búsqueda (nombre o descripción)
    if (filters.search) {
      params.append('q', filters.search);
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
    throw error;
  }
}

/**
 * Obtiene un producto por su ID
 */
export async function getProductById(id: string): Promise<Product | null> {
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
    throw error;
  }
}

/**
 * Obtiene productos destacados
 */
export async function getFeaturedProducts(limit = 6): Promise<Product[]> {
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
    throw error;
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
    throw error;
  }
}

/**
 * Busca productos por término
 */
export async function searchProducts(query: string): Promise<Product[]> {
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
    throw error;
  }
}
