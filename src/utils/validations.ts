import { z } from 'zod';

// Schema para login
export const loginSchema = z.object({
  email: z.string().min(1, 'El email es requerido').email('Email inválido'),
  password: z
    .string()
    .min(1, 'La contraseña es requerida')
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Schema para registro
export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, 'El nombre es requerido')
      .min(2, 'El nombre debe tener al menos 2 caracteres')
      .max(50, 'El nombre no puede tener más de 50 caracteres'),
    email: z.string().min(1, 'El email es requerido').email('Email inválido'),
    password: z
      .string()
      .min(1, 'La contraseña es requerida')
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'La contraseña debe contener al menos una mayúscula, una minúscula y un número'
      ),
    confirmPassword: z.string().min(1, 'Debes confirmar tu contraseña'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

// Schema para recuperación de contraseña
export const recoverySchema = z.object({
  email: z.string().min(1, 'El email es requerido').email('Email inválido'),
});

export type RecoveryFormData = z.infer<typeof recoverySchema>;

// Schema para cambio de contraseña
export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'La contraseña actual es requerida'),
    newPassword: z
      .string()
      .min(1, 'La nueva contraseña es requerida')
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'La contraseña debe contener al menos una mayúscula, una minúscula y un número'
      ),
    confirmNewPassword: z.string().min(1, 'Debes confirmar tu nueva contraseña'),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmNewPassword'],
  });

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

// Schema para edición de perfil
export const profileSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede tener más de 50 caracteres'),
  email: z.string().min(1, 'El email es requerido').email('Email inválido'),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

// Schema para dirección de envío
export const addressSchema = z.object({
  street: z
    .string()
    .min(1, 'La dirección es requerida')
    .min(5, 'La dirección debe tener al menos 5 caracteres')
    .max(100, 'La dirección es demasiado larga'),
  city: z
    .string()
    .min(1, 'La ciudad es requerida')
    .min(2, 'La ciudad debe tener al menos 2 caracteres')
    .max(50, 'El nombre de la ciudad es demasiado largo'),
  state: z
    .string()
    .min(1, 'El estado/provincia es requerido')
    .min(2, 'El estado debe tener al menos 2 caracteres')
    .max(50, 'El nombre del estado es demasiado largo'),
  zipCode: z
    .string()
    .min(1, 'El código postal es requerido')
    .regex(/^\d{5}(-\d{4})?$/, 'Código postal inválido (formato: 12345 o 12345-6789)'),
  country: z
    .string()
    .min(1, 'El país es requerido')
    .min(2, 'El país debe tener al menos 2 caracteres')
    .max(50, 'El nombre del país es demasiado largo'),
});

export type AddressFormData = z.infer<typeof addressSchema>;

// Schema para checkout completo
export const checkoutSchema = z.object({
  shippingAddress: addressSchema,
  paymentMethod: z
    .enum(['credit-card', 'debit-card', 'paypal', 'cash-on-delivery'])
    .refine((val) => val !== undefined, { message: 'Selecciona un método de pago' }),
  // Campos opcionales para tarjeta (en producción se usaría Stripe/PayPal)
  cardNumber: z.string().optional(),
  cardName: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvc: z.string().optional(),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;

// Utilidad para validar fuerza de contraseña
export function getPasswordStrength(password: string): {
  score: number;
  label: string;
  color: string;
} {
  let score = 0;

  if (password.length === 0) {
    return { score: 0, label: '', color: 'text-neutral-400' };
  }

  // Longitud
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;

  // Minúsculas
  if (/[a-z]/.test(password)) score += 1;

  // Mayúsculas
  if (/[A-Z]/.test(password)) score += 1;

  // Números
  if (/\d/.test(password)) score += 1;

  // Caracteres especiales
  if (/[^a-zA-Z\d]/.test(password)) score += 1;

  // Mapear score a label y color
  if (score <= 2) {
    return { score, label: 'Débil', color: 'text-red-500' };
  } else if (score <= 4) {
    return { score, label: 'Media', color: 'text-yellow-500' };
  } else {
    return { score, label: 'Fuerte', color: 'text-green-500' };
  }
}
