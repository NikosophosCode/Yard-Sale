import { forwardRef } from 'react';
import type { ReactNode, HTMLAttributes } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/utils/helpers';

export type CardVariant = 'default' | 'elevated' | 'outlined';

export interface CardProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  /** Variante visual de la card */
  variant?: CardVariant;
  /** Indica si la card es clickeable */
  clickable?: boolean;
  /** Hover effect más pronunciado */
  hoverEffect?: boolean;
  /** Hover effect (alias de hoverEffect) */
  hover?: boolean;
  /** Renderizar como otro componente (e.g., Link) */
  asChild?: boolean;
  /** Padding de la card */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Clase CSS adicional */
  className?: string;
  /** Contenido de la card */
  children: ReactNode;
}

/**
 * Componente Card reutilizable con múltiples variantes
 *
 * @example
 * ```tsx
 * <Card variant="elevated" hoverEffect clickable>
 *   <Card.Header>Title</Card.Header>
 *   <Card.Body>Content</Card.Body>
 *   <Card.Footer>Footer</Card.Footer>
 * </Card>
 * ```
 */
const CardComponent = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      clickable = false,
      hoverEffect = false,
      hover = false,
      asChild = false,
      padding = 'md',
      className,
      children,
      ...props
    },
    ref
  ) => {
    // Estilos base
    const baseStyles = 'rounded-xl transition-all duration-200 bg-white dark:bg-neutral-800';

    // Estilos por variante
    const variantStyles: Record<CardVariant, string> = {
      default: 'shadow-sm',
      elevated: 'shadow-md',
      outlined: 'border border-neutral-300 dark:border-neutral-600',
    };

    // Padding
    const paddingStyles = {
      none: '',
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
    };

    // Hover effect (aceptar tanto hover como hoverEffect)
    const shouldHover = hover || hoverEffect;
    const hoverStyles = shouldHover
      ? 'hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1'
      : '';

    // Clickable
    const clickableStyles = clickable ? 'cursor-pointer' : '';

    const cardClasses = cn(
      baseStyles,
      variantStyles[variant],
      paddingStyles[padding],
      hoverStyles,
      clickableStyles,
      className
    );

    // Si asChild es true, renderizar el children con las clases aplicadas
    if (asChild) {
      return children;
    }

    // Siempre usar motion.div para consistencia
    return (
      <motion.div
        ref={ref}
        className={cardClasses}
        whileHover={clickable ? { scale: 1.02, y: -4 } : undefined}
        whileTap={clickable ? { scale: 0.98 } : undefined}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

CardComponent.displayName = 'Card';

// Sub-componentes para estructura semántica

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('mb-3 border-b border-neutral-200 pb-3 dark:border-neutral-600', className)}
      {...props}
    >
      {children}
    </div>
  )
);

CardHeader.displayName = 'CardHeader';

export interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
}

export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('text-neutral-600 dark:text-neutral-300', className)} {...props}>
      {children}
    </div>
  )
);

CardBody.displayName = 'CardBody';

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('mt-3 border-t border-neutral-200 pt-3 dark:border-neutral-600', className)}
      {...props}
    >
      {children}
    </div>
  )
);

CardFooter.displayName = 'CardFooter';

// Crear el componente Card con sub-componentes
type CardWithSubComponents = typeof CardComponent & {
  Header: typeof CardHeader;
  Body: typeof CardBody;
  Footer: typeof CardFooter;
};

export const Card = CardComponent as CardWithSubComponents;

// Asignar sub-componentes al componente Card
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
