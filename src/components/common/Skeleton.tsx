import type { HTMLAttributes } from 'react';
import { cn } from '@/utils/helpers';

export type SkeletonVariant = 'text' | 'circle' | 'rectangle' | 'card';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** Variante del skeleton */
  variant?: SkeletonVariant;
  /** Ancho (aplica a rectangle) */
  width?: string | number;
  /** Alto (aplica a rectangle y circle) */
  height?: string | number;
  /** Número de líneas (aplica a text) */
  lines?: number;
  /** Clase CSS adicional */
  className?: string;
}

/**
 * Componente Skeleton para estados de carga
 *
 * @example
 * ```tsx
 * <Skeleton variant="text" lines={3} />
 * <Skeleton variant="circle" height={64} />
 * <Skeleton variant="rectangle" width="100%" height={200} />
 * <Skeleton variant="card" />
 * ```
 */
export function Skeleton({
  variant = 'text',
  width,
  height,
  lines = 1,
  className,
  ...props
}: SkeletonProps) {
  // Animación shimmer
  const shimmerStyles =
    'animate-pulse bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 dark:from-neutral-700 dark:via-neutral-600 dark:to-neutral-700 bg-[length:200%_100%]';

  // Estilos base
  const baseStyles = 'rounded';

  // Renderizar según variante
  if (variant === 'text') {
    return (
      <div className={cn('space-y-2', className)} {...props}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={cn(
              baseStyles,
              shimmerStyles,
              'h-4',
              index === lines - 1 && lines > 1 ? 'w-4/5' : 'w-full'
            )}
            style={{ width: width }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'circle') {
    return (
      <div
        className={cn(baseStyles, shimmerStyles, 'rounded-full', className)}
        style={{
          width: height || width || 40,
          height: height || width || 40,
        }}
        {...props}
      />
    );
  }

  if (variant === 'rectangle') {
    return (
      <div
        className={cn(baseStyles, shimmerStyles, className)}
        style={{
          width: width || '100%',
          height: height || 100,
        }}
        {...props}
      />
    );
  }

  if (variant === 'card') {
    return (
      <div
        className={cn('rounded-xl bg-white p-4 shadow-sm dark:bg-neutral-800', className)}
        {...props}
      >
        <div className="space-y-4">
          {/* Image skeleton */}
          <Skeleton variant="rectangle" height={192} />

          {/* Title skeleton */}
          <Skeleton variant="text" lines={1} />

          {/* Description skeleton */}
          <Skeleton variant="text" lines={2} />

          {/* Footer skeleton */}
          <div className="flex items-center justify-between pt-2">
            <Skeleton variant="text" width={80} />
            <Skeleton variant="rectangle" width={100} height={36} />
          </div>
        </div>
      </div>
    );
  }

  return null;
}

// Componentes pre-configurados para casos comunes

export function SkeletonProductCard({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <Skeleton variant="card" className={className} {...props} />;
}

export function SkeletonProductGrid({
  count = 8,
  className,
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div className={cn('grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4', className)}>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonProductCard key={index} />
      ))}
    </div>
  );
}

export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return <Skeleton variant="text" lines={lines} className={className} />;
}

export function SkeletonAvatar({ size = 40, className }: { size?: number; className?: string }) {
  return <Skeleton variant="circle" height={size} className={className} />;
}
