import { cn } from '@/utils/helpers';

interface SkipLinkProps {
  href?: string;
  children?: string;
  className?: string;
}

export function SkipLink({ href = '#main-content', children = 'Skip to main content', className }: SkipLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        'sr-only focus:not-sr-only',
        'fixed left-4 top-4 z-[10000]',
        'rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white',
        'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
        'transition-all duration-200',
        className
      )}
    >
      {children}
    </a>
  );
}
