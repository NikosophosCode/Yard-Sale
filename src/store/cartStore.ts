import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Product, CartItem } from '@/types';

interface CartStore {
  items: CartItem[];
  isOpen: boolean;

  // Actions
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;

  // Getters
  getTotal: () => number;
  getSubtotal: () => number;
  getTax: () => number;
  getShipping: () => number;
  getItemCount: () => number;
  getItemById: (productId: string) => CartItem | undefined;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      // Actions
      addItem: (product: Product) => {
        const { items } = get();
        const existingItem = items.find((item) => item.productId === product.id);

        if (existingItem) {
          // Si el producto ya existe, incrementar cantidad
          // Validar que no exceda el stock
          const newQuantity = existingItem.quantity + 1;
          if (newQuantity > product.stock) {
            console.warn(`Cannot add more than ${product.stock} items`);
            return;
          }

          set({
            items: items.map((item) =>
              item.productId === product.id ? { ...item, quantity: newQuantity } : item
            ),
          });
        } else {
          // Nuevo producto en el carrito
          const newItem: CartItem = {
            productId: product.id,
            quantity: 1,
            product,
          };
          set({ items: [...items, newItem] });
        }
      },

      removeItem: (productId: string) => {
        set({ items: get().items.filter((item) => item.productId !== productId) });
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        const item = get().items.find((item) => item.productId === productId);
        if (item && quantity > item.product.stock) {
          console.warn(`Cannot exceed stock of ${item.product.stock}`);
          return;
        }

        set({
          items: get().items.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      toggleCart: () => set({ isOpen: !get().isOpen }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      // Getters
      getSubtotal: () => {
        return get().items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      },

      getTax: () => {
        // 16% de impuestos
        return get().getSubtotal() * 0.16;
      },

      getShipping: () => {
        const subtotal = get().getSubtotal();
        // Envío gratis para compras mayores a $500
        return subtotal >= 500 ? 0 : 50;
      },

      getTotal: () => {
        return get().getSubtotal() + get().getTax() + get().getShipping();
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      getItemById: (productId: string) => {
        return get().items.find((item) => item.productId === productId);
      },
    }),
    {
      name: 'yard-sale-cart',
      storage: createJSONStorage(() => localStorage),
      // Sincronización entre pestañas
      partialize: (state) => ({ items: state.items }),
    }
  )
);
