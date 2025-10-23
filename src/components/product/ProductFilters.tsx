import { motion } from 'framer-motion';
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';
import type { Category } from '@/types';
import type { ProductFilters as Filters } from '@/api/products';
import { Button } from '@components/common/Button';
import { cn } from '@/utils/helpers';

export interface ProductFiltersProps {
  filters: Filters;
  onCategoryChange: (category: Category) => void;
  onSortChange: (sort: Filters['sortBy']) => void;
  onConditionChange: (condition: string) => void;
  onReset: () => void;
  className?: string;
}

const categories: { id: Category; name: string; emoji: string }[] = [
  { id: 'all', name: 'Todos', emoji: '🏪' },
  { id: 'clothes', name: 'Ropa', emoji: '👕' },
  { id: 'electronics', name: 'Electrónicos', emoji: '📱' },
  { id: 'furniture', name: 'Muebles', emoji: '🪑' },
  { id: 'toys', name: 'Juguetes', emoji: '🧸' },
  { id: 'others', name: 'Otros', emoji: '🎨' },
];

const sortOptions = [
  { value: 'recent', label: 'Más recientes' },
  { value: 'price-asc', label: 'Precio: Menor a Mayor' },
  { value: 'price-desc', label: 'Precio: Mayor a Menor' },
  { value: 'name', label: 'Nombre A-Z' },
  { value: 'rating', label: 'Mejor valorados' },
] as const;

const conditionOptions = [
  { value: '', label: 'Todas las condiciones' },
  { value: 'new', label: 'Nuevo' },
  { value: 'like-new', label: 'Como nuevo' },
  { value: 'good', label: 'Buen estado' },
  { value: 'fair', label: 'Aceptable' },
];

/**
 * Componente de filtros para productos
 */
export function ProductFilters({
  filters,
  onCategoryChange,
  onSortChange,
  onConditionChange,
  onReset,
  className,
}: ProductFiltersProps) {
  const hasActiveFilters =
    filters.category !== 'all' ||
    filters.sortBy !== 'recent' ||
    Boolean(filters.condition);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-800',
        className
      )}
    >
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FunnelIcon className="h-5 w-5 text-brand-600 dark:text-brand-400" />
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
            Filtros
          </h2>
        </div>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            leftIcon={<XMarkIcon className="h-4 w-4" />}
          >
            Limpiar
          </Button>
        )}
      </div>

      {/* Categorías */}
      <div className="mb-6">
        <h3 className="mb-3 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
          Categorías
        </h3>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onCategoryChange(category.id)}
              className={cn(
                'flex flex-col items-center gap-1 rounded-xl border-2 p-3 transition-all',
                filters.category === category.id
                  ? 'border-brand-600 bg-brand-50 dark:border-brand-400 dark:bg-brand-900/20'
                  : 'border-neutral-200 bg-white hover:border-brand-300 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-brand-600'
              )}
            >
              <span className="text-2xl" aria-hidden="true">
                {category.emoji}
              </span>
              <span
                className={cn(
                  'text-xs font-medium',
                  filters.category === category.id
                    ? 'text-brand-700 dark:text-brand-300'
                    : 'text-neutral-600 dark:text-neutral-400'
                )}
              >
                {category.name}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Ordenar y Condición */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Ordenar por */}
        <div>
          <label
            htmlFor="sort"
            className="mb-2 block text-sm font-semibold text-neutral-700 dark:text-neutral-300"
          >
            Ordenar por
          </label>
          <select
            id="sort"
            value={filters.sortBy || 'recent'}
            onChange={(e) => onSortChange(e.target.value as Filters['sortBy'])}
            className="w-full rounded-xl border-2 border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-neutral-900 transition-colors hover:border-brand-300 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:border-brand-600"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Condición */}
        <div>
          <label
            htmlFor="condition"
            className="mb-2 block text-sm font-semibold text-neutral-700 dark:text-neutral-300"
          >
            Condición
          </label>
          <select
            id="condition"
            value={filters.condition || ''}
            onChange={(e) => onConditionChange(e.target.value)}
            className="w-full rounded-xl border-2 border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-neutral-900 transition-colors hover:border-brand-300 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:border-brand-600"
          >
            {conditionOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </motion.div>
  );
}
