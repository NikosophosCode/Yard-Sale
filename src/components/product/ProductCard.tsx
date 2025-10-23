import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { StarIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';
import type { Product } from '@/types';
import { formatPrice } from '@/utils/formatters';
import { cn } from '@/utils/helpers';

export interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  className?: string;
}

/**
 * Tarjeta de producto con imagen, información y acciones
 */
export function ProductCard({ product, onAddToCart, className }: ProductCardProps) {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Evitar navegación del Link
    e.stopPropagation();
    onAddToCart?.(product);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <StarIcon key={i} className="h-4 w-4 text-yellow-400" aria-hidden="true" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative h-4 w-4">
            <StarOutlineIcon className="absolute h-4 w-4 text-yellow-400" aria-hidden="true" />
            <div className="absolute overflow-hidden" style={{ width: '50%' }}>
              <StarIcon className="h-4 w-4 text-yellow-400" aria-hidden="true" />
            </div>
          </div>
        );
      } else {
        stars.push(
          <StarOutlineIcon key={i} className="h-4 w-4 text-neutral-300 dark:text-neutral-600" aria-hidden="true" />
        );
      }
    }

    return stars;
  };

  const getConditionBadge = (condition: string) => {
    const badges = {
      new: { label: 'Nuevo', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
      'like-new': { label: 'Como nuevo', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
      good: { label: 'Buen estado', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' },
      fair: { label: 'Aceptable', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' },
    };

    const badge = badges[condition as keyof typeof badges] || badges.good;

    return (
      <span className={cn('rounded-full px-2 py-1 text-xs font-medium', badge.color)}>
        {badge.label}
      </span>
    );
  };

  return (
    <motion.article
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-800',
        className
      )}
    >
      <Link to={`/product/${product.id}`} className="flex flex-col h-full">
        {/* Imagen del producto */}
        <div className="relative aspect-square w-full overflow-hidden bg-neutral-100 dark:bg-neutral-700">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />

          {/* Badge de condición */}
          <div className="absolute left-3 top-3">
            {getConditionBadge(product.condition)}
          </div>

          {/* Badge de stock bajo */}
          {product.stock > 0 && product.stock <= 3 && (
            <div className="absolute right-3 top-3">
              <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-200">
                Solo {product.stock} disponibles
              </span>
            </div>
          )}

          {/* Badge sin stock */}
          {product.stock === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <span className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-semibold text-white">
                Agotado
              </span>
            </div>
          )}
        </div>

        {/* Información del producto */}
        <div className="flex flex-1 flex-col p-4">
          <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-neutral-900 dark:text-neutral-50">
            {product.name}
          </h3>

          <p className="mb-3 line-clamp-2 flex-1 text-sm text-neutral-600 dark:text-neutral-400">
            {product.description}
          </p>

          {/* Rating y reviews */}
          <div className="mb-3 flex items-center gap-2">
            <div className="flex items-center gap-0.5" aria-label={`${product.rating} de 5 estrellas`}>
              {renderStars(product.rating)}
            </div>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              ({product.reviews})
            </span>
          </div>

          {/* Precio y botón */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-brand-600 dark:text-brand-400">
                {formatPrice(product.price)}
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={cn(
                'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors',
                product.stock > 0
                  ? 'bg-brand-600 text-white hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600'
                  : 'cursor-not-allowed bg-neutral-300 text-neutral-500 dark:bg-neutral-700 dark:text-neutral-500'
              )}
              aria-label={`Agregar ${product.name} al carrito`}
            >
              <ShoppingCartIcon className="h-5 w-5" />
              <span className="hidden sm:inline">Agregar</span>
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
