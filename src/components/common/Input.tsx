import { forwardRef, useState } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { cn } from '@/utils/helpers';

export type InputType = 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Tipo de input */
  type?: InputType;
  /** Label del input */
  label?: string;
  /** Texto de ayuda debajo del input */
  helperText?: string;
  /** Mensaje de error */
  error?: string;
  /** Indica si el input es válido (borde verde) */
  success?: boolean;
  /** Icono a la izquierda */
  leftIcon?: ReactNode;
  /** Icono a la derecha */
  rightIcon?: ReactNode;
  /** Ancho completo */
  fullWidth?: boolean;
  /** Clase CSS adicional para el contenedor */
  containerClassName?: string;
  /** Clase CSS adicional para el input */
  className?: string;
}

/**
 * Componente Input reutilizable con validación visual y soporte para iconos
 *
 * @example
 * ```tsx
 * <Input
 *   type="email"
 *   label="Email"
 *   placeholder="john@example.com"
 *   error={errors.email?.message}
 * />
 * ```
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = 'text',
      label,
      helperText,
      error,
      success,
      leftIcon,
      rightIcon,
      fullWidth = true,
      containerClassName,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [internalType, setInternalType] = useState(type);

    // Toggle para mostrar/ocultar contraseña
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
      setInternalType(showPassword ? 'password' : 'text');
    };

    // Estilos base del input
    const baseStyles =
      'block w-full rounded-lg border px-4 py-2.5 bg-white placeholder:text-neutral-400 transition-colors duration-200 focus:outline-none focus:ring-2 disabled:bg-neutral-100 disabled:cursor-not-allowed text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:disabled:bg-neutral-900';

    // Estilos de estado (error, success, default)
    const stateStyles = error
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20 dark:border-red-400'
      : success
        ? 'border-green-500 focus:border-green-500 focus:ring-green-500/20 dark:border-green-400'
        : 'border-neutral-300 focus:border-brand-500 focus:ring-brand-500/20 dark:border-neutral-700 dark:focus:border-brand-400';

    // Padding adicional si hay iconos
    const iconPaddingStyles = leftIcon ? 'pl-10' : rightIcon || type === 'password' ? 'pr-10' : '';

    // Estilo del contenedor
    const widthStyle = fullWidth ? 'w-full' : '';

    return (
      <div className={cn(widthStyle, containerClassName)}>
        {/* Label */}
        {label && (
          <label
            className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
            htmlFor={props.id || props.name}
          >
            {label}
            {props.required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}

        {/* Input container */}
        <div className="relative">
          {/* Left icon */}
          {leftIcon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400 dark:text-neutral-500">
              {leftIcon}
            </div>
          )}

          {/* Input field */}
          <input
            ref={ref}
            type={type === 'password' ? internalType : type}
            className={cn(baseStyles, stateStyles, iconPaddingStyles, className)}
            disabled={disabled}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={
              error
                ? `${props.id || props.name}-error`
                : helperText
                  ? `${props.id || props.name}-helper`
                  : undefined
            }
            {...props}
          />

          {/* Right icon or password toggle */}
          {(rightIcon || type === 'password') && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              {type === 'password' ? (
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="text-neutral-400 hover:text-neutral-600 focus:outline-none dark:text-neutral-500 dark:hover:text-neutral-300"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              ) : (
                <div className="text-neutral-400 dark:text-neutral-500">{rightIcon}</div>
              )}
            </div>
          )}
        </div>

        {/* Helper text o error */}
        {(helperText || error) && (
          <p
            id={error ? `${props.id || props.name}-error` : `${props.id || props.name}-helper`}
            className={cn(
              'mt-1.5 text-sm',
              error ? 'text-red-600 dark:text-red-400' : 'text-neutral-500 dark:text-neutral-400'
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
