import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/hooks/useCart';
import { CartItem } from './CartItem';
import { CartEmpty } from './CartEmpty';
import { CartSummary } from './CartSummary';
import { useNavigate } from 'react-router-dom';

export function CartSidebar() {
  const { items, isOpen, closeCart, getItemCount } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    closeCart();
    navigate('/cart');
  };

  const itemCount = getItemCount();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          />

          {/* Sidebar */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl dark:bg-neutral-900 sm:max-w-lg"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-neutral-200 p-6 dark:border-neutral-800">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                  Shopping Cart
                </h2>
                {itemCount > 0 && (
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {itemCount} {itemCount === 1 ? 'item' : 'items'}
                  </p>
                )}
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={closeCart}
                className="rounded-full p-2 text-neutral-700 transition-colors hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
                aria-label="Close cart"
              >
                <XMarkIcon className="h-6 w-6" />
              </motion.button>
            </div>

            {/* Content */}
            {items.length === 0 ? (
              <CartEmpty onClose={closeCart} />
            ) : (
              <>
                {/* Items List */}
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-4">
                    <AnimatePresence mode="popLayout">
                      {items.map((item) => (
                        <CartItem key={item.productId} item={item} />
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Summary */}
                <div className="border-t border-neutral-200 p-6 dark:border-neutral-800">
                  <CartSummary onCheckout={handleCheckout} showBenefits={false} />
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
