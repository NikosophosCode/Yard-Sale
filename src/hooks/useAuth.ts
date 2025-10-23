import { useContext } from 'react';
import { AuthContext } from '@contexts/AuthContext';

/**
 * Hook personalizado para usar el contexto de autenticación
 * Debe usarse dentro de un AuthProvider
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
}
