import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  EnvelopeIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@components/common/Button';
import { Input } from '@components/common/Input';
import { recoverySchema } from '@utils/validations';
import type { RecoveryFormData } from '@utils/validations';
import * as authAPI from '@/api/auth';

export function RecoveryForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RecoveryFormData>({
    resolver: zodResolver(recoverySchema),
  });

  const onSubmit = async (data: RecoveryFormData) => {
    try {
      setServerError(null);
      await authAPI.recoverPassword(data.email);
      setSuccess(true);
    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message);
      } else {
        setServerError('Error inesperado al solicitar recuperación');
      }
    }
  };

  // Si ya se envió el email, mostrar mensaje de éxito
  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full"
      >
        <div className="rounded-lg border border-green-200 bg-green-50 p-6 dark:border-green-800 dark:bg-green-900/20">
          <div className="flex items-start gap-3">
            <CheckCircleIcon className="h-6 w-6 shrink-0 text-green-600 dark:text-green-400" />
            <div className="flex-1">
              <h3 className="mb-2 text-lg font-semibold text-green-900 dark:text-green-100">
                ¡Correo enviado!
              </h3>
              <p className="text-sm text-green-700 dark:text-green-300">
                Si el email existe en nuestro sistema, recibirás instrucciones para recuperar tu
                contraseña. Por favor revisa tu bandeja de entrada y la carpeta de spam.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 inline-flex items-center gap-2 text-sm font-medium"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Volver al inicio de sesión
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      {/* Descripción */}
      <div className="mb-6 text-center">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Ingresa tu email y te enviaremos instrucciones para recuperar tu contraseña
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Error del servidor */}
        {serverError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20"
          >
            <ExclamationCircleIcon className="h-5 w-5 shrink-0 text-red-600 dark:text-red-400" />
            <p className="text-sm text-red-700 dark:text-red-300">{serverError}</p>
          </motion.div>
        )}

        {/* Email */}
        <Input
          type="email"
          label="Email"
          placeholder="tu@email.com"
          error={errors.email?.message}
          leftIcon={<EnvelopeIcon className="h-5 w-5" />}
          autoComplete="email"
          {...register('email')}
        />

        {/* Botón de submit */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar Instrucciones'}
        </Button>

        {/* Link de vuelta */}
        <div className="text-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Volver al inicio de sesión
          </Link>
        </div>
      </form>
    </motion.div>
  );
}
