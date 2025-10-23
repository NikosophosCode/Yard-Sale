import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import { Button } from '@components/common/Button';
import { UserPlusIcon } from '@heroicons/react/24/outline';

export function Home() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <div className="bg-neutral-50 dark:bg-neutral-900">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Hero section */}
          <h1 className="mb-4 text-5xl font-bold text-neutral-900 sm:text-6xl dark:text-neutral-50">
            ¡Bienvenido a Yard Sale! 🎉
          </h1>

          {/* Mensaje de autenticación */}
          {isAuthenticated && user ? (
            <div className="mb-8">
              <p className="mb-4 text-xl text-neutral-600 dark:text-neutral-400">
                Hola,{' '}
                <span className="text-brand-600 dark:text-brand-400 font-semibold">
                  {user.name}
                </span>
                ! Estás autenticado.
              </p>
              <Button variant="outline" onClick={logout}>
                Cerrar Sesión
              </Button>
            </div>
          ) : (
            <div className="mb-8">
              <p className="mb-6 text-xl text-neutral-600 dark:text-neutral-400">
                Inicia sesión o regístrate para comenzar a comprar
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/login">
                  <Button
                    variant="primary"
                    size="lg"
                    leftIcon={<UserPlusIcon className="h-5 w-5" />}
                  >
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline" size="lg">
                    Registrarse
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {/* Estado del proyecto */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mx-auto mt-12 max-w-2xl rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-800"
          >
            <h2 className="mb-4 text-2xl font-bold text-neutral-900 dark:text-neutral-50">
              Estado del Proyecto
            </h2>
            <div className="space-y-2 text-left">
              <div className="flex items-center gap-2">
                <span className="text-2xl">✅</span>
                <span className="text-neutral-700 dark:text-neutral-300">
                  <strong>FASE 1:</strong> Setup Inicial - Completado
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">✅</span>
                <span className="text-neutral-700 dark:text-neutral-300">
                  <strong>FASE 2:</strong> Componentes Base - Completado
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎉</span>
                <span className="text-neutral-700 dark:text-neutral-300">
                  <strong>FASE 3:</strong> Autenticación - ¡Completado!
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">⏳</span>
                <span className="text-neutral-500 dark:text-neutral-500">
                  <strong>FASE 4:</strong> Catálogo de Productos - Próximamente
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">⏳</span>
                <span className="text-neutral-500 dark:text-neutral-500">
                  <strong>FASE 5:</strong> Carrito de Compras - Próximamente
                </span>
              </div>
            </div>
          </motion.div>

          {/* Funcionalidades disponibles */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-12"
          >
            <h3 className="mb-6 text-xl font-semibold text-neutral-900 dark:text-neutral-50">
              Funcionalidades Disponibles
            </h3>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-800">
                <span className="mb-3 block text-3xl">🔐</span>
                <h4 className="mb-2 font-semibold text-neutral-900 dark:text-neutral-50">
                  Autenticación
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Login, registro y recuperación de contraseña funcionales
                </p>
              </div>
              <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-800">
                <span className="mb-3 block text-3xl">🌓</span>
                <h4 className="mb-2 font-semibold text-neutral-900 dark:text-neutral-50">
                  Modo Oscuro
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Sistema de temas con persistencia en localStorage
                </p>
              </div>
              <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-800">
                <span className="mb-3 block text-3xl">📱</span>
                <h4 className="mb-2 font-semibold text-neutral-900 dark:text-neutral-50">
                  Responsive
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Diseño adaptable a todos los dispositivos
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
