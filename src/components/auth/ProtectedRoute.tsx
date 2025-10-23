import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import { Skeleton } from '@components/common/Skeleton';

interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

/**
 * Componente para proteger rutas que requieren autenticación
 * Si el usuario no está autenticado, redirige a la página de login
 * preservando la ubicación a la que quería acceder
 */
export function ProtectedRoute({ children, redirectTo = '/login' }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Mientras carga la sesión, mostrar skeleton
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md space-y-4 p-4">
          <Skeleton variant="rectangle" className="h-12 w-full" />
          <Skeleton variant="rectangle" className="h-12 w-full" />
          <Skeleton variant="rectangle" className="h-12 w-full" />
        </div>
      </div>
    );
  }

  // Si no está autenticado, redirigir a login
  // Guardar la ubicación actual para redirigir después del login
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location.pathname }} replace />;
  }

  // Si está autenticado, renderizar el contenido
  return <>{children}</>;
}
