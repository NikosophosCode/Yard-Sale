import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User } from '@/types';
import * as authAPI from '@/api/auth';

// Tipos para el contexto
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

// Tipos para la sesión guardada en localStorage
interface Session {
  user: User;
  token: string;
  expiresAt: string;
}

// Crear el contexto
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Nombre de la clave en localStorage
const SESSION_KEY = 'yard-sale-session';

// Provider del contexto
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Inicializar sesión desde localStorage
  useEffect(() => {
    const initSession = () => {
      try {
        const sessionData = localStorage.getItem(SESSION_KEY);
        if (sessionData) {
          const session: Session = JSON.parse(sessionData);

          // Verificar si la sesión expiró
          const expiresAt = new Date(session.expiresAt);
          const now = new Date();

          if (expiresAt > now) {
            setUser(session.user);
          } else {
            // Sesión expirada, limpiar
            localStorage.removeItem(SESSION_KEY);
          }
        }
      } catch (error) {
        console.error('Error al cargar sesión:', error);
        localStorage.removeItem(SESSION_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    initSession();
  }, []);

  // Función de login
  const login = async (email: string, password: string) => {
    try {
      const { user: loggedUser, token } = await authAPI.login(email, password);

      // Crear sesión (expira en 7 días)
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);

      const session: Session = {
        user: loggedUser,
        token,
        expiresAt: expiresAt.toISOString(),
      };

      // Guardar en localStorage y estado
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      setUser(loggedUser);
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  };

  // Función de registro
  const register = async (name: string, email: string, password: string) => {
    try {
      const { user: newUser, token } = await authAPI.register(name, email, password);

      // Crear sesión (expira en 7 días)
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);

      const session: Session = {
        user: newUser,
        token,
        expiresAt: expiresAt.toISOString(),
      };

      // Guardar en localStorage y estado
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      setUser(newUser);
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    }
  };

  // Función de logout
  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  // Función para actualizar datos del usuario
  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);

    // Actualizar también en localStorage
    const sessionData = localStorage.getItem(SESSION_KEY);
    if (sessionData) {
      const session: Session = JSON.parse(sessionData);
      session.user = updatedUser;
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
