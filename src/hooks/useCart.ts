import { useCartStore } from '@/store/cartStore';

/**
 * Hook para acceder al carrito de compras
 * Wrapper del cartStore para mejor compatibilidad con React Fast Refresh
 */
export const useCart = () => {
  const items = useCartStore((state) => state.items);
  const isOpen = useCartStore((state) => state.isOpen);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const toggleCart = useCartStore((state) => state.toggleCart);
  const openCart = useCartStore((state) => state.openCart);
  const closeCart = useCartStore((state) => state.closeCart);
  const getTotal = useCartStore((state) => state.getTotal);
  const getSubtotal = useCartStore((state) => state.getSubtotal);
  const getTax = useCartStore((state) => state.getTax);
  const getShipping = useCartStore((state) => state.getShipping);
  const getItemCount = useCartStore((state) => state.getItemCount);
  const getItemById = useCartStore((state) => state.getItemById);

  return {
    items,
    isOpen,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart,
    openCart,
    closeCart,
    getTotal,
    getSubtotal,
    getTax,
    getShipping,
    getItemCount,
    getItemById,
  };
};
