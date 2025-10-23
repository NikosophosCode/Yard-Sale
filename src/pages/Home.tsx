import { motion } from 'framer-motion';
import type { Product } from '@/types';
import { useAuth } from '@hooks/useAuth';
import { useProducts } from '@hooks/useProducts';
import { ProductGrid, ProductFilters, ProductSearch } from '@components/product';
import { Skeleton, SEO } from '@components/common';

export function Home() {
  const { user, isAuthenticated } = useAuth();
  const {
    products,
    loading,
    error,
    filters,
    setSearch,
    setCategory,
    setSortBy,
    setCondition,
  } = useProducts();

  const handleAddToCart = (product: Product) => {
    console.log('Agregando al carrito:', product);
    // TODO: Implementar en FASE 5
  };

  const handleResetFilters = () => {
    setSearch('');
    setCategory('all');
    setSortBy('recent');
    setCondition('');
  };

  return (
    <>
      <SEO 
        title="Home"
        description="Discover unique second-hand items at great prices. Browse our collection of clothes, electronics, furniture, toys, and more."
      />
      <div className="bg-neutral-50 dark:bg-neutral-900 min-h-screen">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="mb-4 text-4xl font-bold text-neutral-900 sm:text-5xl dark:text-neutral-50">
            {isAuthenticated && user ? (
              <>
                ¡Hola,{' '}
                <span className="text-brand-600 dark:text-brand-400">{user.name}</span>!
              </>
            ) : (
              '¡Bienvenido a Yard Sale!'
            )}
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            Encuentra artículos únicos a precios increíbles
          </p>
        </motion.div>

        {/* Buscador */}
        <div className="mb-6">
          <ProductSearch value={filters.search || ''} onChange={setSearch} />
        </div>

        {/* Filtros */}
        <div className="mb-8">
          <ProductFilters
            filters={filters}
            onCategoryChange={setCategory}
            onSortChange={setSortBy}
            onConditionChange={setCondition}
            onReset={handleResetFilters}
          />
        </div>

        {/* Resultados */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
            {loading ? (
              'Cargando productos...'
            ) : error ? (
              'Error al cargar productos'
            ) : (
              <>
                {products.length} {products.length === 1 ? 'producto' : 'productos'}{' '}
                {filters.category !== 'all' && (
                  <span className="text-neutral-600 dark:text-neutral-400">
                    en {filters.category}
                  </span>
                )}
              </>
            )}
          </h2>
        </div>

        {/* Grid de Productos */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} variant="card" />
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="mb-4 text-6xl">⚠️</div>
            <h3 className="mb-2 text-xl font-semibold text-neutral-900 dark:text-neutral-50">
              Error al cargar productos
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400">{error}</p>
          </div>
        ) : (
          <ProductGrid products={products} onAddToCart={handleAddToCart} />
        )}
      </div>
    </div>
    </>
  );
}
