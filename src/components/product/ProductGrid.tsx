import { motion } from 'framer-motion';
import type { Product } from '@/types';
import { ProductCard } from './ProductCard';
import { cn } from '@/utils/helpers';

export interface ProductGridProps {
  products: Product[];
  onAddToCart?: (product: Product) => void;
  className?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 24,
    },
  },
};

/**
 * Grid de productos con animaciones stagger
 */
export function ProductGrid({ products, onAddToCart, className }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="mb-4 text-6xl">📦</div>
        <h3 className="mb-2 text-xl font-semibold text-neutral-900 dark:text-neutral-50">
          No se encontraron productos
        </h3>
        <p className="text-neutral-600 dark:text-neutral-400">
          Intenta ajustar los filtros o realiza otra búsqueda
        </p>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
        className
      )}
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={itemVariants}>
          <ProductCard product={product} onAddToCart={onAddToCart} />
        </motion.div>
      ))}
    </motion.div>
  );
}
