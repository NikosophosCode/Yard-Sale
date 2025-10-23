import { motion } from 'framer-motion';
import { RecoveryForm } from '@components/auth';
import { Link } from 'react-router-dom';

export function Recovery() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4 py-12 dark:bg-neutral-900">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="mb-8 text-center">
          <Link to="/" className="inline-block">
            <img
              src="/assets/logos/logo_yard_sale.svg"
              alt="Yard Sale"
              className="mx-auto h-12 w-auto"
            />
          </Link>
          <h1 className="mt-6 text-3xl font-bold text-neutral-900 dark:text-neutral-50">
            Recupera tu contraseña
          </h1>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            No te preocupes, te ayudaremos a recuperarla
          </p>
        </div>

        {/* Card con el formulario */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-800">
          <RecoveryForm />
        </div>
      </motion.div>
    </div>
  );
}
