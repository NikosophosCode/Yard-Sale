// Tipos base para productos
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: Category;
  condition: ProductCondition;
  image: string;
  images: string[];
  stock: number;
  featured: boolean;
  sellerId: string;
  createdAt: string;
  updatedAt: string;
}

export type Category = 'all' | 'clothes' | 'electronics' | 'furniture' | 'toys' | 'others';

export type ProductCondition = 'new' | 'like-new' | 'good' | 'fair';

// Tipos para usuario
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  avatar: string | null;
  addresses: Address[];
  createdAt: string;
  lastLogin: string;
}

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

// Tipos para carrito
export interface CartItem {
  productId: string;
  quantity: number;
  product: Product;
}

export interface Cart {
  items: CartItem[];
  total: number;
  lastUpdated: string;
}

// Tipos para órdenes
export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  shippingAddress: Address;
  createdAt: string;
  updatedAt: string;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

// Tipos para categorías
export interface CategoryInfo {
  id: string;
  name: string;
  count: number;
}
