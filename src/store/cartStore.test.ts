import { describe, it, expect, beforeEach } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useCartStore } from './cartStore';
import type { Product } from '@/types';

describe('cartStore', () => {
  const mockProduct: Product = {
    id: '1',
    title: 'Test Product',
    price: 99.99,
    description: 'Test description',
    category: 'electronics',
    images: ['test.jpg'],
    thumbnail: 'test.jpg',
    stock: 10,
    rating: 4.5,
    reviews: 100,
    brand: 'Test Brand',
    condition: 'new',
    seller: {
      id: '1',
      name: 'Test Seller',
      avatar: 'avatar.jpg',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  beforeEach(() => {
    // Reset store before each test
    const { result } = renderHook(() => useCartStore());
    act(() => {
      result.current.clearCart();
    });
  });

  describe('addItem', () => {
    it('adds a new item to the cart', () => {
      const { result } = renderHook(() => useCartStore());
      
      act(() => {
        result.current.addItem(mockProduct);
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].productId).toBe(mockProduct.id);
      expect(result.current.items[0].quantity).toBe(1);
    });

    it('increments quantity if item already exists', () => {
      const { result } = renderHook(() => useCartStore());
      
      act(() => {
        result.current.addItem(mockProduct);
        result.current.addItem(mockProduct);
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].quantity).toBe(2);
    });

    it('does not add item if stock is exceeded', () => {
      const lowStockProduct = { ...mockProduct, stock: 1 };
      const { result } = renderHook(() => useCartStore());
      
      act(() => {
        result.current.addItem(lowStockProduct);
        result.current.addItem(lowStockProduct);
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].quantity).toBe(1);
    });
  });

  describe('removeItem', () => {
    it('removes an item from the cart', () => {
      const { result } = renderHook(() => useCartStore());
      
      act(() => {
        result.current.addItem(mockProduct);
      });

      expect(result.current.items).toHaveLength(1);

      act(() => {
        result.current.removeItem(mockProduct.id);
      });

      expect(result.current.items).toHaveLength(0);
    });

    it('does nothing if item does not exist', () => {
      const { result } = renderHook(() => useCartStore());
      
      act(() => {
        result.current.addItem(mockProduct);
      });

      expect(result.current.items).toHaveLength(1);

      act(() => {
        result.current.removeItem('non-existent-id');
      });

      expect(result.current.items).toHaveLength(1);
    });
  });

  describe('updateQuantity', () => {
    it('updates item quantity', () => {
      const { result } = renderHook(() => useCartStore());
      
      act(() => {
        result.current.addItem(mockProduct);
      });

      act(() => {
        result.current.updateQuantity(mockProduct.id, 5);
      });

      expect(result.current.items[0].quantity).toBe(5);
    });

    it('removes item if quantity is 0', () => {
      const { result } = renderHook(() => useCartStore());
      
      act(() => {
        result.current.addItem(mockProduct);
      });

      act(() => {
        result.current.updateQuantity(mockProduct.id, 0);
      });

      expect(result.current.items).toHaveLength(0);
    });

    it('limits quantity to stock', () => {
      const lowStockProduct = { ...mockProduct, stock: 5 };
      const { result } = renderHook(() => useCartStore());
      
      act(() => {
        result.current.addItem(lowStockProduct);
      });

      act(() => {
        result.current.updateQuantity(lowStockProduct.id, 10);
      });

      // Should not update beyond stock, should stay at 1
      expect(result.current.items[0].quantity).toBe(1);
    });
  });

  describe('clearCart', () => {
    it('removes all items from the cart', () => {
      const { result } = renderHook(() => useCartStore());
      
      act(() => {
        result.current.addItem(mockProduct);
        result.current.addItem({ ...mockProduct, id: '2' });
      });

      expect(result.current.items).toHaveLength(2);

      act(() => {
        result.current.clearCart();
      });

      expect(result.current.items).toHaveLength(0);
    });
  });

  describe('getItemCount', () => {
    it('returns total number of items', () => {
      const { result } = renderHook(() => useCartStore());
      
      act(() => {
        result.current.addItem(mockProduct);
        result.current.addItem(mockProduct);
        result.current.addItem({ ...mockProduct, id: '2' });
      });

      expect(result.current.getItemCount()).toBe(3);
    });

    it('returns 0 for empty cart', () => {
      const { result } = renderHook(() => useCartStore());
      expect(result.current.getItemCount()).toBe(0);
    });
  });

  describe('getSubtotal', () => {
    it('calculates subtotal correctly', () => {
      const { result } = renderHook(() => useCartStore());
      
      act(() => {
        result.current.addItem(mockProduct); // 99.99
        result.current.addItem(mockProduct); // 99.99
        result.current.addItem({ ...mockProduct, id: '2', price: 50 }); // 50
      });

      expect(result.current.getSubtotal()).toBe(249.98);
    });
  });

  describe('getTax', () => {
    it('calculates tax as 16% of subtotal', () => {
      const { result } = renderHook(() => useCartStore());
      
      act(() => {
        result.current.addItem({ ...mockProduct, price: 100 });
      });

      expect(result.current.getTax()).toBe(16);
    });
  });

  describe('getShipping', () => {
    it('returns $50 for orders under $500', () => {
      const { result } = renderHook(() => useCartStore());
      
      act(() => {
        result.current.addItem({ ...mockProduct, price: 100 });
      });

      expect(result.current.getShipping()).toBe(50);
    });

    it('returns $0 for orders over $500', () => {
      const { result } = renderHook(() => useCartStore());
      
      act(() => {
        result.current.addItem({ ...mockProduct, price: 600 });
      });

      expect(result.current.getShipping()).toBe(0);
    });
  });

  describe('getTotal', () => {
    it('calculates total correctly with shipping', () => {
      const { result } = renderHook(() => useCartStore());
      
      act(() => {
        result.current.addItem({ ...mockProduct, price: 100 });
      });

      // Subtotal: 100, Tax: 16, Shipping: 50, Total: 166
      expect(result.current.getTotal()).toBe(166);
    });

    it('calculates total correctly without shipping (free shipping)', () => {
      const { result } = renderHook(() => useCartStore());
      
      act(() => {
        result.current.addItem({ ...mockProduct, price: 600 });
      });

      // Subtotal: 600, Tax: 96, Shipping: 0, Total: 696
      expect(result.current.getTotal()).toBe(696);
    });
  });

  describe('sidebar state', () => {
    it('toggles sidebar open/close', () => {
      const { result } = renderHook(() => useCartStore());
      
      expect(result.current.isOpen).toBe(false);

      act(() => {
        result.current.toggleCart();
      });

      expect(result.current.isOpen).toBe(true);

      act(() => {
        result.current.toggleCart();
      });

      expect(result.current.isOpen).toBe(false);
    });

    it('opens sidebar', () => {
      const { result } = renderHook(() => useCartStore());
      
      act(() => {
        result.current.openCart();
      });

      expect(result.current.isOpen).toBe(true);
    });

    it('closes sidebar', () => {
      const { result } = renderHook(() => useCartStore());
      
      act(() => {
        result.current.openCart();
      });

      expect(result.current.isOpen).toBe(true);

      act(() => {
        result.current.closeCart();
      });

      expect(result.current.isOpen).toBe(false);
    });
  });
});
