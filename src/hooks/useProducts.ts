import { useState, useEffect, useCallback } from 'react';
import type { Product, Category } from '@/types';
import { getProducts, type ProductFilters } from '@/api/products';
import { useDebounce } from './useDebounce';

export interface UseProductsOptions extends Omit<ProductFilters, 'search'> {
  initialSearch?: string;
  debounceDelay?: number;
}

export interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  filters: ProductFilters;
  setSearch: (search: string) => void;
  setCategory: (category: Category) => void;
  setSortBy: (sortBy: ProductFilters['sortBy']) => void;
  setCondition: (condition: string) => void;
  setPriceRange: (min?: number, max?: number) => void;
  refetch: () => Promise<void>;
}

/**
 * Hook para gestionar productos con filtros y búsqueda
 */
export function useProducts(options: UseProductsOptions = {}): UseProductsReturn {
  const {
    initialSearch = '',
    category = 'all',
    sortBy = 'recent',
    condition,
    minPrice,
    maxPrice,
    debounceDelay = 300,
  } = options;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<ProductFilters>({
    search: initialSearch,
    category,
    sortBy,
    condition,
    minPrice,
    maxPrice,
  });

  // Debounce para búsqueda
  const debouncedSearch = useDebounce(filters.search || '', debounceDelay);

  // Función para obtener productos
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getProducts({
        ...filters,
        search: debouncedSearch,
      });
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar productos');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  }, [filters, debouncedSearch]);

  // Efecto para cargar productos cuando cambien los filtros
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Funciones para actualizar filtros
  const setSearch = useCallback((search: string) => {
    setFilters((prev) => ({ ...prev, search }));
  }, []);

  const setCategory = useCallback((category: Category) => {
    setFilters((prev) => ({ ...prev, category }));
  }, []);

  const setSortBy = useCallback((sortBy: ProductFilters['sortBy']) => {
    setFilters((prev) => ({ ...prev, sortBy }));
  }, []);

  const setCondition = useCallback((condition: string) => {
    setFilters((prev) => ({ ...prev, condition }));
  }, []);

  const setPriceRange = useCallback((min?: number, max?: number) => {
    setFilters((prev) => ({ ...prev, minPrice: min, maxPrice: max }));
  }, []);

  const refetch = useCallback(async () => {
    await fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    filters,
    setSearch,
    setCategory,
    setSortBy,
    setCondition,
    setPriceRange,
    refetch,
  };
}
