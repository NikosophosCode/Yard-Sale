import { forwardRef } from 'react';
import type { ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/utils/helpers';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'ref'> {
  /** Variante visual del botón */
  variant?: ButtonVariant;
  /** Tamaño del botón */
  size?: ButtonSize;
  /** Estado de carga, muestra un spinner */
  loading?: boolean;
  /** Ancho completo */
  fullWidth?: boolean;
  /** Icono a la izquierda del texto */
  leftIcon?: ReactNode;
  /** Icono a la derecha del texto */
  rightIcon?: ReactNode;
  /** Renderizar como otro componente (e.g., Link) */
  asChild?: boolean;
  /** Clase CSS adicional */
  className?: string;
  /** Contenido del botón */
  children: ReactNode;
}

/**
 * Componente Button reutilizable con múltiples variantes y estados
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md" loading={false}>
 *   Add to Cart
 * </Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      asChild = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    // Estilos base
    const baseStyles =
      'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    // Estilos por variante
    const variantStyles: Record<ButtonVariant, string> = {
      primary:
        'bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800 focus:ring-brand-500 dark:bg-brand-500 dark:hover:bg-brand-600 dark:active:bg-brand-700',
      secondary:
        'bg-neutral-200 text-neutral-900 hover:bg-neutral-300 active:bg-neutral-400 focus:ring-neutral-500 dark:bg-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-600 dark:active:bg-neutral-500',
      outline:
        'bg-transparent border-2 border-brand-600 text-brand-600 hover:bg-brand-50 active:bg-brand-100 focus:ring-brand-500 dark:border-brand-400 dark:text-brand-400 dark:hover:bg-brand-950 dark:active:bg-brand-900',
      ghost:
        'bg-transparent text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200 focus:ring-neutral-500 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:active:bg-neutral-700',
      danger:
        'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-red-500 dark:bg-red-500 dark:hover:bg-red-600 dark:active:bg-red-700',
    };

    // Estilos por tamaño
    const sizeStyles: Record<ButtonSize, string> = {
      sm: 'px-3 py-1.5 text-sm gap-1.5',
      md: 'px-4 py-2 text-base gap-2',
      lg: 'px-6 py-3 text-lg gap-2.5',
    };

    // Estilo de ancho completo
    const widthStyle = fullWidth ? 'w-full' : '';

    const buttonClasses = cn(baseStyles, variantStyles[variant], sizeStyles[size], widthStyle, className);

    const content = (
      <>
        {loading && (
          <svg
            className="h-5 w-5 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && leftIcon && <span className="shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {!loading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </>
    );

    // Si asChild es true, renderizar el children con las clases aplicadas
    if (asChild) {
      return children;
    }

    return (
      <motion.button
        ref={ref}
        className={buttonClasses}
        disabled={disabled || loading}
        whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
        {...props}
      >
        {content}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
