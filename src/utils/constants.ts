// Constantes de la aplicación
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const ROUTES = {
  HOME: '/',
  PRODUCT_DETAIL: '/product/:id',
  CART: '/cart',
  CHECKOUT: '/checkout',
  LOGIN: '/login',
  REGISTER: '/register',
  RECOVERY: '/recovery',
  ACCOUNT: '/account',
  ORDERS: '/orders',
  NOT_FOUND: '*',
} as const;

export const CATEGORIES = {
  ALL: 'all',
  CLOTHES: 'clothes',
  ELECTRONICS: 'electronics',
  FURNITURE: 'furniture',
  TOYS: 'toys',
  OTHERS: 'others',
} as const;

export const CONDITIONS = {
  NEW: 'new',
  LIKE_NEW: 'like-new',
  GOOD: 'good',
  FAIR: 'fair',
} as const;

export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
} as const;

export const STORAGE_KEYS = {
  CART: 'yard-sale-cart',
  USER: 'yard-sale-user',
  THEME: 'yard-sale-theme',
  TOKEN: 'yard-sale-token',
} as const;
