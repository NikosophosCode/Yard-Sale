import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from '@/pages'; // Home no se lazy-load porque es la página principal
import { MainLayout } from '@components/layout';
import { ProtectedRoute } from '@components/auth';
import { SkeletonProductGrid } from '@components/common';

// Lazy loading de páginas para mejorar performance
const Login = lazy(() => import('@/pages').then((m) => ({ default: m.Login })));
const Register = lazy(() => import('@/pages').then((m) => ({ default: m.Register })));
const Recovery = lazy(() => import('@/pages').then((m) => ({ default: m.Recovery })));
const ProductDetail = lazy(() => import('@/pages').then((m) => ({ default: m.ProductDetail })));
const Cart = lazy(() => import('@/pages').then((m) => ({ default: m.Cart })));
const Checkout = lazy(() => import('@/pages').then((m) => ({ default: m.Checkout })));
const OrderSuccess = lazy(() => import('@/pages').then((m) => ({ default: m.OrderSuccess })));
const Orders = lazy(() => import('@/pages').then((m) => ({ default: m.Orders })));
const Account = lazy(() => import('@/pages').then((m) => ({ default: m.Account })));
const NotFound = lazy(() => import('@/pages').then((m) => ({ default: m.NotFound })));

// Componente de loading para Suspense
function PageLoader() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <SkeletonProductGrid count={6} />
    </div>
  );
}

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
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProductDetail />
          </Suspense>
        ),
      },
      {
        path: 'cart',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: 'checkout',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: 'order-success/:id',
        element: (
          <Suspense fallback={<PageLoader />}>
            <OrderSuccess />
          </Suspense>
        ),
      },
      {
        path: 'orders',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Orders />
          </Suspense>
        ),
      },
      {
        path: 'account',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      // Catch-all 404 route dentro del layout
      {
        path: '*',
        element: (
          <Suspense fallback={<PageLoader />}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
  // Rutas de autenticación sin layout
  {
    path: '/login',
    element: (
      <Suspense fallback={<PageLoader />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: '/register',
    element: (
      <Suspense fallback={<PageLoader />}>
        <Register />
      </Suspense>
    ),
  },
  {
    path: '/recovery',
    element: (
      <Suspense fallback={<PageLoader />}>
        <Recovery />
      </Suspense>
    ),
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
