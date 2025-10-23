import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { EnvelopeIcon, LockClosedIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@components/common/Button';
import { Input } from '@components/common/Input';
import { useAuth } from '@hooks/useAuth';
import { loginSchema } from '@utils/validations';
import type { LoginFormData } from '@utils/validations';

interface LoginFormProps {
  redirectTo?: string;
  onSuccess?: () => void;
}

export function LoginForm({ redirectTo = '/', onSuccess }: LoginFormProps) {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setServerError(null);
      await login(data.email, data.password);

      // Callback opcional
      if (onSuccess) {
        onSuccess();
      }

      // Redireccionar
      navigate(redirectTo);
    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message);
      } else {
        setServerError('Error inesperado al iniciar sesión');
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
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

        {/* Password */}
        <Input
          type="password"
          label="Contraseña"
          placeholder="••••••••"
          error={errors.password?.message}
          leftIcon={<LockClosedIcon className="h-5 w-5" />}
          autoComplete="current-password"
          {...register('password')}
        />

        {/* Link de recuperación */}
        <div className="flex justify-end">
          <Link
            to="/recovery"
            className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 text-sm"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        {/* Botón de submit */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </Button>

        {/* Link de registro */}
        <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">
          ¿No tienes cuenta?{' '}
          <Link
            to="/register"
            className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 font-medium"
          >
            Regístrate aquí
          </Link>
        </p>
      </form>

      {/* Credenciales de prueba */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-8 rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-800"
      >
        <p className="mb-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Credenciales de prueba:
        </p>
        <div className="space-y-1 text-xs text-neutral-600 dark:text-neutral-400">
          <p>
            <span className="font-medium">Usuario:</span> demo@yardsale.com
          </p>
          <p>
            <span className="font-medium">Contraseña:</span> demo123
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
