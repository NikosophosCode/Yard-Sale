import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home, Login, Register, Recovery, ProductDetail } from '@/pages';
import { MainLayout } from '@components/layout';
// import { ProtectedRoute } from '@components/auth'; // Para uso futuro

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
  // Ejemplo de ruta protegida (para futuras páginas)
  // {
  //   path: '/',
  //   element: <MainLayout />,
  //   children: [
  //     {
  //       path: 'account',
  //       element: (
  //         <ProtectedRoute>
  //           <Account />
  //         </ProtectedRoute>
  //       ),
  //     },
  //     {
  //       path: 'cart',
  //       element: (
  //         <ProtectedRoute>
  //           <Cart />
  //         </ProtectedRoute>
  //       ),
  //     },
  //   ]
  // },
  // Ruta 404 (agregar después)
  // {
  //   path: '*',
  //   element: <NotFound />,
  // },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
