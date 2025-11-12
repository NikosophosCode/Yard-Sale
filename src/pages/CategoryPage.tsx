import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Product, Category } from '@/types';
import { useProducts } from '@hooks/useProducts';
import { ProductGrid, ProductFilters, ProductSearch } from '@components/product';
import { Skeleton, SEO, Breadcrumbs } from '@components/common';

// Metadatos de categorías para SEO y UI
const CATEGORY_META: Record<Exclude<Category, 'all'>, {
  title: string;
  description: string;
  icon: string;
  keywords: string[];
}> = {
  clothes: {
    title: 'Clothes',
    description: 'Discover unique second-hand clothing items. From vintage fashion to modern styles, find your perfect outfit at great prices.',
    icon: '👕',
    keywords: ['clothes', 'fashion', 'vintage', 'apparel', 'clothing'],
  },
  electronics: {
    title: 'Electronics',
    description: 'Browse quality pre-owned electronics. Smartphones, laptops, cameras, and more tech gadgets at affordable prices.',
    icon: '📱',
    keywords: ['electronics', 'gadgets', 'tech', 'devices', 'smartphones'],
  },
  furniture: {
    title: 'Furniture',
    description: 'Find stylish second-hand furniture for your home. From sofas to tables, chairs, and more unique pieces.',
    icon: '🛋️',
    keywords: ['furniture', 'home', 'decor', 'interior', 'furnishings'],
  },
  toys: {
    title: 'Toys',
    description: 'Explore our collection of pre-loved toys. From action figures to board games, find joy at great prices.',
    icon: '🧸',
    keywords: ['toys', 'games', 'kids', 'children', 'play'],
  },
  others: {
    title: 'Others',
    description: 'Discover unique items from various categories. Books, sports equipment, collectibles, and more interesting finds.',
    icon: '🎁',
    keywords: ['miscellaneous', 'various', 'collectibles', 'unique', 'diverse'],
  },
};

export function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  
  // Validar categoría
  const validCategory = category as Exclude<Category, 'all'>;
  const categoryMeta = CATEGORY_META[validCategory];

  useEffect(() => {
    // Redirigir si la categoría no es válida
    if (!categoryMeta) {
      navigate('/404', { replace: true });
    }
  }, [categoryMeta, navigate]);

  const {
    products,
    loading,
    error,
    filters,
    setSearch,
    setSortBy,
    setCondition,
  } = useProducts({ category: validCategory });

  const handleAddToCart = (product: Product) => {
    console.log('Agregando al carrito:', product);
    // TODO: Implementar funcionalidad de carrito
  };

  const handleResetFilters = () => {
    setSearch('');
    setSortBy('recent');
    setCondition('');
  };

  // Si no hay metadata, no renderizar (se redirigirá)
  if (!categoryMeta) {
    return null;
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: categoryMeta.title, href: `/category/${validCategory}` },
  ];

  return (
    <>
      <SEO 
        title={categoryMeta.title}
        description={categoryMeta.description}
        keywords={categoryMeta.keywords}
      />
      
      <div className="bg-neutral-50 dark:bg-neutral-900 min-h-screen">
        <div className=" mx-auto px-4 py-6 sm:px-6 lg:px-3">
        {/* <div> */}
          {/* Breadcrumbs */}
          <div className="mb-6">
            <Breadcrumbs items={breadcrumbItems} />
          </div>

          {/* Hero Section con animación */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl sm:text-6xl" role="img" aria-label={categoryMeta.title}>
                {categoryMeta.icon}
              </span>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-50">
                  {categoryMeta.title}
                </h1>
                <p className="mt-2 text-base sm:text-lg text-neutral-600 dark:text-neutral-400">
                  {categoryMeta.description}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Buscador */}
          <div className="mb-6">
            <ProductSearch 
              value={filters.search || ''} 
              onChange={setSearch}
              placeholder={`Search in ${categoryMeta.title.toLowerCase()}...`}
            />
          </div>

          {/* Filtros (sin selector de categoría ya que estamos en una categoría específica) */}
          <div className="mb-8">
            <ProductFilters
              filters={filters}
              onSortChange={setSortBy}
              onConditionChange={setCondition}
              onReset={handleResetFilters}
              hideCategory // Ocultar selector de categoría
            />
          </div>

          {/* Contador de resultados */}
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin">⏳</span>
                    Loading products...
                  </span>
                ) : error ? (
                  <span className="text-red-600 dark:text-red-400">Error loading products</span>
                ) : (
                  <>
                    <span className="text-brand-600 dark:text-brand-400">
                      {products.length}
                    </span>{' '}
                    {products.length === 1 ? 'product' : 'products'} found
                  </>
                )}
              </h2>
              
              {!loading && !error && products.length > 0 && (
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Sorted by:{' '}
                  <span className="font-medium text-neutral-900 dark:text-neutral-50">
                    {filters.sortBy === 'recent' && 'Most Recent'}
                    {filters.sortBy === 'price-asc' && 'Price: Low to High'}
                    {filters.sortBy === 'price-desc' && 'Price: High to Low'}
                    {filters.sortBy === 'rating' && 'Highest Rated'}
                  </span>
                </p>
              )}
            </div>
          </motion.div>

          {/* Grid de Productos con estados */}
          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} variant="card" />
              ))}
            </div>
          ) : error ? (
            <motion.div 
              className="flex flex-col items-center justify-center py-16 px-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-4 text-6xl">⚠️</div>
              <h3 className="mb-2 text-xl font-semibold text-neutral-900 dark:text-neutral-50 text-center">
                Oops! Something went wrong
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-center mb-4 max-w-md">
                {error}
              </p>
              <button
                onClick={handleResetFilters}
                className="bg-brand-600 hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600 px-6 py-2 rounded-full text-white font-medium transition-colors"
              >
                Try Again
              </button>
            </motion.div>
          ) : products.length === 0 ? (
            <motion.div 
              className="flex flex-col items-center justify-center py-16 px-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-4 text-6xl">🔍</div>
              <h3 className="mb-2 text-xl font-semibold text-neutral-900 dark:text-neutral-50 text-center">
                No products found
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-center mb-4 max-w-md">
                We couldn't find any products matching your criteria. Try adjusting your filters or search terms.
              </p>
              <button
                onClick={handleResetFilters}
                className="bg-brand-600 hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600 px-6 py-2 rounded-full text-white font-medium transition-colors"
              >
                Reset Filters
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <ProductGrid products={products} onAddToCart={handleAddToCart} />
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}
