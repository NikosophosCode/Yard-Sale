import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/common';
import { Link } from 'react-router-dom';

interface CartEmptyProps {
  onClose?: () => void;
}

export function CartEmpty({ onClose }: CartEmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {/* Icono */}
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
        <ShoppingBagIcon className="h-12 w-12 text-neutral-400 dark:text-neutral-600" />
      </div>

      {/* Texto */}
      <h3 className="mb-2 text-xl font-bold text-neutral-900 dark:text-neutral-100">
        Your cart is empty
      </h3>
      <p className="mb-6 max-w-sm text-neutral-600 dark:text-neutral-400">
        Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
      </p>

      {/* Botón */}
      <Link to="/" onClick={onClose}>
        <Button variant="primary" size="lg">
          Start Shopping
        </Button>
      </Link>
    </div>
  );
}
