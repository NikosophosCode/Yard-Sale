import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { ThemeToggle } from '@/components/common';
import { cn } from '@/utils/helpers';

export interface HeaderProps {
  /** Clase CSS adicional */
  className?: string;
  /** Cantidad de items en el carrito */
  cartItemsCount?: number;
  /** Callback al hacer click en el carrito */
  onCartClick?: () => void;
  /** Usuario logueado (null si no está logueado) */
  user?: { name: string; avatar?: string } | null;
  /** Callback para búsqueda */
  onSearch?: (query: string) => void;
}

/**
 * Header principal de la aplicación con navegación, búsqueda y carrito
 *
 * @example
 * ```tsx
 * <Header
 *   cartItemsCount={3}
 *   onCartClick={() => setCartOpen(true)}
 *   user={{ name: "John Doe" }}
 * />
 * ```
 */
export function Header({
  className,
  cartItemsCount = 0,
  onCartClick,
  user,
  onSearch,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const navLinks = [
    { label: 'All', href: '/' },
    { label: 'Clothes', href: '/category/clothes' },
    { label: 'Electronics', href: '/category/electronics' },
    { label: 'Furniture', href: '/category/furniture' },
    { label: 'Toys', href: '/category/toys' },
    { label: 'Others', href: '/category/others' },
  ];

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-lg dark:border-neutral-700 dark:bg-neutral-900/80',
        className
      )}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <a
            href="/"
            className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 flex items-center gap-2 text-xl font-bold transition-colors"
          >
            <img src="/assets/logos/logo_yard_sale.svg" alt="Yard Sale" className="h-24 w-24" />
          </a>

          {/* Navegación Desktop */}
          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-brand-600 dark:hover:text-brand-400 rounded-lg px-3 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Barra de búsqueda */}
          <form onSubmit={handleSearchSubmit} className="hidden max-w-md flex-1 lg:block">
            <div className="relative">
              <input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="focus:border-brand-500 focus:ring-brand-500/20 w-full rounded-full border border-neutral-300 bg-neutral-50 py-2 pr-4 pl-10 text-sm text-neutral-900 transition-colors focus:bg-white focus:ring-2 focus:outline-none dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100 dark:focus:bg-neutral-900"
              />
              <MagnifyingGlassIcon className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-neutral-400" />
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <ThemeToggle className="hidden sm:flex" />

            {/* Carrito */}
            <button
              type="button"
              onClick={onCartClick}
              className="relative rounded-full p-2 text-neutral-700 transition-colors hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
              aria-label={`Shopping cart with ${cartItemsCount} items`}
            >
              <ShoppingCartIcon className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="bg-brand-600 dark:bg-brand-500 absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-white"
                >
                  {cartItemsCount > 9 ? '9+' : cartItemsCount}
                </motion.span>
              )}
            </button>

            {/* Usuario */}
            {user ? (
              <a
                href="/account"
                className="hidden items-center gap-2 rounded-full py-1.5 pr-3 pl-1.5 transition-colors hover:bg-neutral-100 sm:flex dark:hover:bg-neutral-800"
              >
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full" />
                ) : (
                  <UserCircleIcon className="h-8 w-8 text-neutral-700 dark:text-neutral-300" />
                )}
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  {user.name}
                </span>
              </a>
            ) : (
              <a
                href="/login"
                className="bg-brand-600 hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600 hidden rounded-full px-4 py-2 text-sm font-medium text-white transition-colors sm:block"
              >
                Sign In
              </a>
            )}

            {/* Menú móvil toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 text-neutral-700 transition-colors hover:bg-neutral-100 lg:hidden dark:text-neutral-300 dark:hover:bg-neutral-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden lg:hidden"
            >
              <div className="space-y-1 pt-2 pb-4">
                {/* Búsqueda móvil */}
                <form onSubmit={handleSearchSubmit} className="mb-3">
                  <div className="relative">
                    <input
                      type="search"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="focus:border-brand-500 focus:ring-brand-500/20 w-full rounded-full border border-neutral-300 bg-neutral-50 py-2 pr-4 pl-10 text-sm text-neutral-900 transition-colors focus:bg-white focus:ring-2 focus:outline-none dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100"
                    />
                    <MagnifyingGlassIcon className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-neutral-400" />
                  </div>
                </form>

                {/* Links de navegación */}
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-brand-600 block rounded-lg px-3 py-2 text-base font-medium text-neutral-700 transition-colors hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
                  >
                    {link.label}
                  </a>
                ))}

                {/* Divider */}
                <div className="my-2 border-t border-neutral-200 dark:border-neutral-800" />

                {/* Usuario móvil */}
                {user ? (
                  <a
                    href="/account"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  >
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="h-10 w-10 rounded-full" />
                    ) : (
                      <UserCircleIcon className="h-10 w-10 text-neutral-700 dark:text-neutral-300" />
                    )}
                    <span className="text-base font-medium text-neutral-700 dark:text-neutral-300">
                      {user.name}
                    </span>
                  </a>
                ) : (
                  <a
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="bg-brand-600 hover:bg-brand-700 dark:bg-brand-500 block rounded-lg px-4 py-2 text-center text-base font-medium text-white transition-colors"
                  >
                    Sign In
                  </a>
                )}

                {/* Theme toggle móvil */}
                <div className="flex items-center justify-between px-3 py-2">
                  <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Theme
                  </span>
                  <ThemeToggle />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
