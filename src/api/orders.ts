/**
 * API de Órdenes
 * Gestión de órdenes de compra para Great Sale
 */

import type { Order, OrderItem, Address, PaymentMethod, CartItem } from '@/types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

/**
 * Interfaz para crear una nueva orden
 */
export interface CreateOrderData {
  userId: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  paymentMethod: PaymentMethod;
  shippingAddress: Address;
}

/**
 * Crear una nueva orden
 */
export async function createOrder(data: CreateOrderData): Promise<Order> {
  try {
    // Transformar CartItems a OrderItems
    const orderItems: OrderItem[] = data.items.map((item) => ({
      productId: item.product.id,
      productName: item.product.name,
      productImage: item.product.image,
      quantity: item.quantity,
      priceAtPurchase: item.product.price,
    }));

    const order: Omit<Order, 'id'> = {
      userId: data.userId,
      items: orderItems,
      subtotal: data.subtotal,
      tax: data.tax,
      shipping: data.shipping,
      total: data.total,
      status: 'pending',
      paymentMethod: data.paymentMethod,
      shippingAddress: data.shippingAddress,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });

    if (!response.ok) {
      throw new Error('Failed to create order');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}

/**
 * Obtener órdenes de un usuario
 */
export async function getOrdersByUser(userId: string): Promise<Order[]> {
  try {
    const response = await fetch(`${API_URL}/orders?userId=${userId}&_sort=createdAt&_order=desc`);

    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
}

/**
 * Obtener una orden por ID
 */
export async function getOrderById(orderId: string): Promise<Order | null> {
  try {
    const response = await fetch(`${API_URL}/orders/${orderId}`);

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch order');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
}

/**
 * Actualizar el estado de una orden
 */
export async function updateOrderStatus(
  orderId: string,
  status: Order['status']
): Promise<Order> {
  try {
    const response = await fetch(`${API_URL}/orders/${orderId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status,
        updatedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to update order status');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
}

/**
 * Cancelar una orden
 */
export async function cancelOrder(orderId: string): Promise<Order> {
  return updateOrderStatus(orderId, 'cancelled');
}

/**
 * Simular procesamiento de pago
 * En producción, esto integraría con Stripe, PayPal, etc.
 */
export async function processPayment(
  _paymentMethod: PaymentMethod,
  _amount: number
): Promise<{ success: boolean; transactionId?: string; error?: string }> {
  // Simular latencia de red
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Simular 95% de éxito
  const isSuccess = Math.random() > 0.05;

  if (isSuccess) {
    return {
      success: true,
      transactionId: `TXN-${Date.now()}-${Math.random().toString(36).substring(7)}`,
    };
  } else {
    return {
      success: false,
      error: 'Payment declined. Please try again or use a different payment method.',
    };
  }
}
