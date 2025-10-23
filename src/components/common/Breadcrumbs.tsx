import { Link, useLocation } from 'react-router-dom';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { cn } from '@/utils/helpers';

interface BreadcrumbItem {
  label: string;
  path: string;
}

export interface BreadcrumbsProps {
  className?: string;
}

// Mapeo de rutas a labels personalizados
const routeLabels: Record<string, string> = {
  '': 'Home',
  'products': 'Products',
  'product': 'Product',
  'cart': 'Shopping Cart',
  'checkout': 'Checkout',
  'order-success': 'Order Confirmation',
  'orders': 'My Orders',
  'account': 'My Account',
  'login': 'Sign In',
  'register': 'Sign Up',
  'recovery': 'Password Recovery',
};

export function Breadcrumbs({ className }: BreadcrumbsProps) {
  const location = useLocation();
  
  // Generar breadcrumbs desde la ruta actual
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const paths = location.pathname.split('/').filter((path) => path !== '');
    
    // Si estamos en home, no mostrar breadcrumbs
    if (paths.length === 0) {
      return [];
    }

    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', path: '/' }
    ];

    let currentPath = '';
    paths.forEach((path) => {
      currentPath += `/${path}`;
      
      // Si es un ID numérico, usar el label del path anterior
      if (/^\d+$/.test(path)) {
        const previousLabel = breadcrumbs[breadcrumbs.length - 1]?.label;
        breadcrumbs.push({
          label: `${previousLabel} Detail`,
          path: currentPath
        });
      } else {
        breadcrumbs.push({
          label: routeLabels[path] || path.charAt(0).toUpperCase() + path.slice(1),
          path: currentPath
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // No renderizar si solo hay Home o si no hay breadcrumbs
  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        'mb-6 rounded-lg bg-white px-4 py-3 dark:bg-neutral-800',
        className
      )}
    >
      <ol className="flex items-center space-x-2 text-sm">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <li key={crumb.path} className="flex items-center">
              {index > 0 && (
                <ChevronRightIcon className="mx-2 h-4 w-4 text-neutral-400 dark:text-neutral-600" />
              )}

              {isLast ? (
                <span
                  className="font-medium text-neutral-900 dark:text-neutral-50"
                  aria-current="page"
                >
                  {index === 0 ? (
                    <HomeIcon className="h-4 w-4" />
                  ) : (
                    crumb.label
                  )}
                </span>
              ) : (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to={crumb.path}
                    className="flex items-center text-neutral-600 transition-colors hover:text-brand-600 dark:text-neutral-400 dark:hover:text-brand-400"
                  >
                    {index === 0 ? (
                      <HomeIcon className="h-4 w-4" />
                    ) : (
                      crumb.label
                    )}
                  </Link>
                </motion.div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
