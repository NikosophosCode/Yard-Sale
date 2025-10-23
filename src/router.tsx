import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  Home,
  Login,
  Register,
  Recovery,
  ProductDetail,
  Cart,
  Checkout,
  OrderSuccess,
  Orders,
  Account,
} from '@/pages';
import { MainLayout } from '@components/layout';
import { ProtectedRoute } from '@components/auth';

// Definir las rutas de la aplicación
const router = createBrowserRouter([
  // Rutas con layout (Header + Footer)
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'product/:id',
        element: <ProductDetail />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'checkout',
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: 'order-success/:id',
        element: <OrderSuccess />,
      },
      {
        path: 'orders',
        element: <Orders />,
      },
      {
        path: 'account',
        element: (
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        ),
      },
    ],
  },
  // Rutas de autenticación sin layout
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/recovery',
    element: <Recovery />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
