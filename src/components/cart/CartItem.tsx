import { motion } from 'framer-motion';
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import type { CartItem as CartItemType } from '@/types';
import { formatPrice } from '@/utils/formatters';
import { useCart } from '@/hooks/useCart';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity } = item;

  const handleIncrement = () => {
    if (quantity < product.stock) {
      updateQuantity(product.id, quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    }
  };

  const handleRemove = () => {
    removeItem(product.id);
  };

  const subtotal = product.price * quantity;
  const isLowStock = quantity >= product.stock;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.2 }}
      className="relative flex gap-3 rounded-2xl bg-neutral-50 p-3 dark:bg-neutral-800 sm:gap-4 sm:p-4"
    >
      {/* Botón eliminar (esquina superior derecha en móvil) */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={handleRemove}
        className="absolute right-2 top-2 rounded-lg p-1.5 text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 sm:hidden"
        aria-label="Remove item"
      >
        <TrashIcon className="h-4 w-4" />
      </motion.button>

      {/* Imagen */}
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl sm:h-24 sm:w-24">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Contenido */}
      <div className="flex min-w-0 flex-1 flex-col justify-between">
        {/* Info del producto */}
        <div className="pr-6 sm:pr-0">
          <h3 className="truncate font-semibold text-neutral-900 dark:text-neutral-100 sm:text-base">
            {product.name}
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {formatPrice(product.price)} c/u
          </p>
          {isLowStock && (
            <p className="mt-1 text-xs font-medium text-orange-600 dark:text-orange-400">
              ⚠️ Máximo stock
            </p>
          )}
        </div>

        {/* Controles */}
        <div className="flex items-center justify-between gap-2">
          {/* Cantidad */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleDecrement}
              disabled={quantity <= 1}
              className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-neutral-700 shadow-sm transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600 sm:h-8 sm:w-8"
              aria-label="Decrease quantity"
            >
              <MinusIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </motion.button>

            <span className="w-7 text-center text-sm font-semibold text-neutral-900 dark:text-neutral-100 sm:w-8 sm:text-base">
              {quantity}
            </span>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleIncrement}
              disabled={isLowStock}
              className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-neutral-700 shadow-sm transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600 sm:h-8 sm:w-8"
              aria-label="Increase quantity"
            >
              <PlusIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </motion.button>
          </div>

          {/* Subtotal y eliminar (desktop) */}
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-sm font-bold text-brand-600 dark:text-brand-400 sm:text-base">
              {formatPrice(subtotal)}
            </span>
            {/* Botón eliminar solo visible en desktop */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleRemove}
              className="hidden rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 sm:block"
              aria-label="Remove item"
            >
              <TrashIcon className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
