import { motion } from 'framer-motion';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/utils/helpers';

export interface ThemeToggleProps {
  /** Clase CSS adicional */
  className?: string;
  /** Mostrar labels */
  showLabel?: boolean;
}

/**
 * Botón para cambiar entre modo claro y oscuro
 *
 * @example
 * ```tsx
 * <ThemeToggle />
 * <ThemeToggle showLabel />
 * ```
 */
export function ThemeToggle({ className, showLabel = false }: ThemeToggleProps) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        'group focus:ring-brand-500 relative inline-flex items-center gap-2 rounded-full p-2 transition-colors hover:bg-neutral-100 focus:ring-2 focus:ring-offset-2 focus:outline-none dark:hover:bg-neutral-800',
        className
      )}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* Contenedor de iconos con animación */}
      <div className="relative h-5 w-5">
        {/* Sol (modo claro) */}
        <motion.div
          initial={false}
          animate={{
            scale: isDark ? 0 : 1,
            opacity: isDark ? 0 : 1,
            rotate: isDark ? 180 : 0,
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <SunIcon className="h-5 w-5 text-yellow-500" />
        </motion.div>

        {/* Luna (modo oscuro) */}
        <motion.div
          initial={false}
          animate={{
            scale: isDark ? 1 : 0,
            opacity: isDark ? 1 : 0,
            rotate: isDark ? 0 : -180,
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <MoonIcon className="h-5 w-5 text-blue-400" />
        </motion.div>
      </div>

      {/* Label opcional */}
      {showLabel && (
        <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
          {isDark ? 'Dark' : 'Light'}
        </span>
      )}

      {/* Tooltip */}
      <span className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 rounded-lg bg-neutral-900 px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100 dark:bg-neutral-100 dark:text-neutral-900">
        {isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      </span>
    </button>
  );
}

/**
 * Toggle de tema más grande con diseño de switch
 */
export function ThemeToggleSwitch({ className }: { className?: string }) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        'focus:ring-brand-500 relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none',
        isDark ? 'bg-brand-600' : 'bg-neutral-300',
        className
      )}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      role="switch"
      aria-checked={isDark}
    >
      {/* Switch handle */}
      <motion.span
        layout
        className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md"
        animate={{
          x: isDark ? 30 : 4,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      >
        {isDark ? (
          <MoonIcon className="text-brand-600 h-4 w-4" />
        ) : (
          <SunIcon className="h-4 w-4 text-yellow-500" />
        )}
      </motion.span>
    </button>
  );
}
