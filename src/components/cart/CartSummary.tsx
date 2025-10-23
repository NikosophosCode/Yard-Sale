import { Button } from '@/components/common';
import { formatPrice } from '@/utils/formatters';
import { useCart } from '@/hooks/useCart';
import { TruckIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

interface CartSummaryProps {
  onCheckout?: () => void;
  showBenefits?: boolean;
}

export function CartSummary({ onCheckout, showBenefits = true }: CartSummaryProps) {
  const { getSubtotal, getTax, getShipping, getTotal } = useCart();

  const subtotal = getSubtotal();
  const tax = getTax();
  const shipping = getShipping();
  const total = getTotal();

  const isFreeShipping = subtotal >= 500;

  return (
    <div className="rounded-2xl bg-neutral-50 p-6 dark:bg-neutral-800">
      {/* Título */}
      <h3 className="mb-4 text-lg font-bold text-neutral-900 dark:text-neutral-100">
        Order Summary
      </h3>

      {/* Líneas de cálculo */}
      <div className="space-y-3 border-b border-neutral-200 pb-4 dark:border-neutral-700">
        <div className="flex justify-between text-neutral-700 dark:text-neutral-300">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        <div className="flex justify-between text-neutral-700 dark:text-neutral-300">
          <span>Tax (16%)</span>
          <span>{formatPrice(tax)}</span>
        </div>

        <div className="flex justify-between text-neutral-700 dark:text-neutral-300">
          <span>Shipping</span>
          <span className={isFreeShipping ? 'text-green-600 dark:text-green-400' : ''}>
            {isFreeShipping ? 'FREE' : formatPrice(shipping)}
          </span>
        </div>

        {!isFreeShipping && subtotal > 0 && (
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            💡 Add {formatPrice(500 - subtotal)} more for free shipping
          </p>
        )}
      </div>

      {/* Total */}
      <div className="mt-4 flex justify-between text-lg font-bold">
        <span className="text-neutral-900 dark:text-neutral-100">Total</span>
        <span className="text-brand-600 dark:text-brand-400">{formatPrice(total)}</span>
      </div>

      {/* Botón de checkout */}
      {onCheckout && (
        <Button
          variant="primary"
          size="lg"
          fullWidth
          className="mt-6"
          onClick={onCheckout}
        >
          Proceed to Checkout
        </Button>
      )}

      {/* Beneficios */}
      {showBenefits && (
        <div className="mt-6 space-y-3 border-t border-neutral-200 pt-6 dark:border-neutral-700">
          <div className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
            <TruckIcon className="h-5 w-5 text-brand-600 dark:text-brand-400" />
            <span>Free shipping on orders over $500</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
            <ShieldCheckIcon className="h-5 w-5 text-brand-600 dark:text-brand-400" />
            <span>30-day money-back guarantee</span>
          </div>
        </div>
      )}
    </div>
  );
}
