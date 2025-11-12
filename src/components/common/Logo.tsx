import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/utils/helpers';

export interface LogoProps {
  /** Clase CSS adicional */
  className?: string;
  /** Tamaño del logo */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Logo adaptable que cambia automáticamente según el tema activo
 * Usa el logo con texto negro en modo claro y texto blanco en modo oscuro
 * 
 * @example
 * ```tsx
 * <Logo size="md" />
 * ```
 */
export function Logo({ className, size = 'md' }: LogoProps) {
  const { resolvedTheme } = useTheme();
  
  // Seleccionar el logo apropiado según el tema
  const logoSrc = resolvedTheme === 'dark' 
    ? '/assets/logos/logo_yard_sale_dark_mode.svg'
    : '/assets/logos/logo_yard_sale.svg';

  // Clases de tamaño
  const sizeClasses = {
    sm: 'h-16 w-16',
    md: 'h-24 w-24',
    lg: 'h-32 w-32',
  };

  return (
    <img
      src={logoSrc}
      alt="Great Sale"
      className={cn(
        'transition-opacity duration-200',
        sizeClasses[size],
        className
      )}
      loading="eager"
    />
  );
}
