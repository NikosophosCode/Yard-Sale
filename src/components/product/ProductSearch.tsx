import { useState, useEffect } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/helpers';

export interface ProductSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

/**
 * Buscador de productos con animaciones
 */
export function ProductSearch({
  value,
  onChange,
  placeholder = 'Buscar productos...',
  className,
}: ProductSearchProps) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onChange(newValue);
  };

  const handleClear = () => {
    setLocalValue('');
    onChange('');
  };

  return (
    <div className={cn('relative', className)}>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <MagnifyingGlassIcon
            className="h-5 w-5 text-neutral-400 dark:text-neutral-500"
            aria-hidden="true"
          />
        </div>

        <input
          type="search"
          value={localValue}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full rounded-full border-2 border-neutral-200 bg-white py-3 pl-11 pr-12 text-sm font-medium text-neutral-900 placeholder-neutral-400 transition-colors hover:border-brand-300 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-50 dark:placeholder-neutral-500 dark:hover:border-brand-600"
          aria-label="Buscar productos"
        />

        <AnimatePresence>
          {localValue && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              onClick={handleClear}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-400 hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300"
              aria-label="Limpiar búsqueda"
            >
              <XMarkIcon className="h-5 w-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {localValue && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-2 text-sm text-neutral-600 dark:text-neutral-400"
        >
          Buscando: <span className="font-semibold">{localValue}</span>
        </motion.p>
      )}
    </div>
  );
}
