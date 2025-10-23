import { motion } from 'framer-motion';
import type { Address } from '@/types';
import { Button } from './Button';

interface AddressCardProps {
  address: Address;
  onEdit?: (address: Address) => void;
  onDelete?: (addressId: string) => void;
  onSetDefault?: (addressId: string) => void;
  isDeleting?: boolean;
}

export function AddressCard({
  address,
  onEdit,
  onDelete,
  onSetDefault,
  isDeleting = false,
}: AddressCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="relative overflow-hidden rounded-lg border border-neutral-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-neutral-700 dark:bg-neutral-800"
    >
      {/* Badge de dirección por defecto */}
      {address.isDefault && (
        <div className="absolute right-4 top-4">
          <span className="inline-flex items-center rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-medium text-brand-800 dark:bg-brand-900/30 dark:text-brand-300">
            Default
          </span>
        </div>
      )}

      {/* Contenido de la dirección */}
      <div className="mb-4 space-y-1">
        <p className="text-base font-medium text-neutral-900 dark:text-neutral-50">
          {address.street}
        </p>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {address.city}, {address.state} {address.zipCode}
        </p>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">{address.country}</p>
      </div>

      {/* Botones de acción */}
      <div className="flex flex-wrap gap-2">
        {onEdit && (
          <Button variant="outline" size="sm" onClick={() => onEdit(address)}>
            Edit
          </Button>
        )}

        {onSetDefault && !address.isDefault && (
          <Button variant="ghost" size="sm" onClick={() => onSetDefault(address.id)}>
            Set as Default
          </Button>
        )}

        {onDelete && (
          <Button
            variant="danger"
            size="sm"
            onClick={() => onDelete(address.id)}
            loading={isDeleting}
            disabled={isDeleting}
          >
            Delete
          </Button>
        )}
      </div>
    </motion.div>
  );
}
