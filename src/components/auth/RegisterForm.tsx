import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@components/common/Button';
import { Input } from '@components/common/Input';
import { useAuth } from '@hooks/useAuth';
import { registerSchema, getPasswordStrength } from '@utils/validations';
import type { RegisterFormData } from '@utils/validations';

interface RegisterFormProps {
  redirectTo?: string;
  onSuccess?: () => void;
}

export function RegisterForm({ redirectTo = '/', onSuccess }: RegisterFormProps) {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  // Observar el valor del password para mostrar la fortaleza
  const password = watch('password', '');

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setServerError(null);
      await registerUser(data.name, data.email, data.password);

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
        setServerError('Error inesperado al registrarse');
      }
    }
  };

  // Obtener la fortaleza de la contraseña
  const passwordStrength = getPasswordStrength(password);

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

        {/* Nombre */}
        <Input
          type="text"
          label="Nombre completo"
          placeholder="Juan Pérez"
          error={errors.name?.message}
          leftIcon={<UserIcon className="h-5 w-5" />}
          autoComplete="name"
          {...register('name')}
        />

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
        <div>
          <Input
            type="password"
            label="Contraseña"
            placeholder="••••••••"
            error={errors.password?.message}
            leftIcon={<LockClosedIcon className="h-5 w-5" />}
            autoComplete="new-password"
            {...register('password')}
          />

          {/* Indicador de fortaleza de contraseña */}
          {password && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2"
            >
              <div className="flex items-center gap-2">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(passwordStrength.score / 6) * 100}%` }}
                    transition={{ duration: 0.3 }}
                    className={`h-full ${
                      passwordStrength.score <= 2
                        ? 'bg-red-500'
                        : passwordStrength.score <= 4
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                    }`}
                  />
                </div>
                <span className={`text-xs font-medium ${passwordStrength.color}`}>
                  {passwordStrength.label}
                </span>
              </div>

              {/* Requisitos de contraseña */}
              <ul className="mt-2 space-y-1 text-xs text-neutral-600 dark:text-neutral-400">
                <li className="flex items-center gap-1.5">
                  {password.length >= 8 ? (
                    <CheckCircleIcon className="h-3.5 w-3.5 text-green-500" />
                  ) : (
                    <div className="h-3.5 w-3.5 rounded-full border border-neutral-300 dark:border-neutral-600" />
                  )}
                  <span>Al menos 8 caracteres</span>
                </li>
                <li className="flex items-center gap-1.5">
                  {/[A-Z]/.test(password) ? (
                    <CheckCircleIcon className="h-3.5 w-3.5 text-green-500" />
                  ) : (
                    <div className="h-3.5 w-3.5 rounded-full border border-neutral-300 dark:border-neutral-600" />
                  )}
                  <span>Una letra mayúscula</span>
                </li>
                <li className="flex items-center gap-1.5">
                  {/[a-z]/.test(password) ? (
                    <CheckCircleIcon className="h-3.5 w-3.5 text-green-500" />
                  ) : (
                    <div className="h-3.5 w-3.5 rounded-full border border-neutral-300 dark:border-neutral-600" />
                  )}
                  <span>Una letra minúscula</span>
                </li>
                <li className="flex items-center gap-1.5">
                  {/\d/.test(password) ? (
                    <CheckCircleIcon className="h-3.5 w-3.5 text-green-500" />
                  ) : (
                    <div className="h-3.5 w-3.5 rounded-full border border-neutral-300 dark:border-neutral-600" />
                  )}
                  <span>Un número</span>
                </li>
              </ul>
            </motion.div>
          )}
        </div>

        {/* Confirm Password */}
        <Input
          type="password"
          label="Confirmar contraseña"
          placeholder="••••••••"
          error={errors.confirmPassword?.message}
          leftIcon={<LockClosedIcon className="h-5 w-5" />}
          autoComplete="new-password"
          {...register('confirmPassword')}
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
          {isSubmitting ? 'Creando cuenta...' : 'Crear Cuenta'}
        </Button>

        {/* Link de login */}
        <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">
          ¿Ya tienes cuenta?{' '}
          <Link
            to="/login"
            className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 font-medium"
          >
            Inicia sesión aquí
          </Link>
        </p>
      </form>
    </motion.div>
  );
}
