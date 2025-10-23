import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/common';
import { CartItem, CartEmpty, CartSummary } from '@/components/cart';
import { useCart } from '@/hooks/useCart';

/**
 * Página del carrito de compras
 */
export function Cart() {
  const { items, clearCart } = useCart();
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate('/');
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleClearCart = () => {
    if (window.confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
      clearCart();
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-8 dark:bg-neutral-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-brand-600 transition-colors hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            <span className="font-medium">Continue Shopping</span>
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="mx-auto max-w-md">
            <CartEmpty onClose={handleContinueShopping} />
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Lista de items */}
            <div className="lg:col-span-2">
              <div className="mb-4 flex items-center justify-between">
                <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                  Shopping Cart
                </h1>
                <Button variant="ghost" size="sm" onClick={handleClearCart}>
                  Clear Cart
                </Button>
              </div>

              <motion.div
                layout
                className="space-y-4"
              >
                {items.map((item) => (
                  <CartItem key={item.productId} item={item} />
                ))}
              </motion.div>

              {/* Botón continuar comprando (móvil) */}
              <div className="mt-6 lg:hidden">
                <Button
                  variant="outline"
                  size="lg"
                  fullWidth
                  onClick={handleContinueShopping}
                >
                  Continue Shopping
                </Button>
              </div>
            </div>

            {/* Resumen */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <CartSummary onCheckout={handleCheckout} showBenefits />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
