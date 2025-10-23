import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { createOrder, processPayment } from '@/api/orders';
import { checkoutSchema, type CheckoutFormData } from '@/utils/validations';
import { formatCurrency } from '@/utils/formatters';
import { Button, Input, Card } from '@components/common';

export function Checkout() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, getSubtotal, getTax, getShipping, getTotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: 'credit-card',
      shippingAddress: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'USA',
      },
    },
  });

  const paymentMethod = watch('paymentMethod');

  // Redirigir si no hay usuario o carrito vacío
  if (!user) {
    navigate('/login?redirect=/checkout');
    return null;
  }

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const onSubmit = async (data: CheckoutFormData) => {
    try {
      setIsProcessing(true);
      setError('');

      // 1. Procesar pago
      const paymentResult = await processPayment(data.paymentMethod, getTotal());

      if (!paymentResult.success) {
        throw new Error(paymentResult.error || 'Payment failed');
      }

      // 2. Crear orden
      const order = await createOrder({
        userId: user.id,
        items,
        subtotal: getSubtotal(),
        tax: getTax(),
        shipping: getShipping(),
        total: getTotal(),
        paymentMethod: data.paymentMethod,
        shippingAddress: {
          id: Date.now().toString(),
          ...data.shippingAddress,
          isDefault: false,
        },
      });

      // 3. Limpiar carrito
      clearCart();

      // 4. Redirigir a página de confirmación
      navigate(`/order-success/${order.id}`);
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred during checkout');
    } finally {
      setIsProcessing(false);
    }
  };

  const subtotal = getSubtotal();
  const tax = getTax();
  const shipping = getShipping();
  const total = getTotal();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">Checkout</h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          Complete your purchase information
        </p>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6 rounded-lg bg-red-50 p-4 dark:bg-red-900/20"
        >
          <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
        </motion.div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Formulario (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Dirección de Envío */}
            <Card>
              <Card.Header>
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
                  📦 Shipping Address
                </h2>
              </Card.Header>
              <Card.Body className="space-y-4">
                <Input
                  label="Street Address"
                  placeholder="123 Main St, Apt 4B"
                  error={errors.shippingAddress?.street?.message}
                  {...register('shippingAddress.street')}
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    label="City"
                    placeholder="New York"
                    error={errors.shippingAddress?.city?.message}
                    {...register('shippingAddress.city')}
                  />
                  <Input
                    label="State/Province"
                    placeholder="NY"
                    error={errors.shippingAddress?.state?.message}
                    {...register('shippingAddress.state')}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    label="ZIP Code"
                    placeholder="10001"
                    error={errors.shippingAddress?.zipCode?.message}
                    {...register('shippingAddress.zipCode')}
                  />
                  <Input
                    label="Country"
                    placeholder="USA"
                    error={errors.shippingAddress?.country?.message}
                    {...register('shippingAddress.country')}
                  />
                </div>
              </Card.Body>
            </Card>

            {/* Método de Pago */}
            <Card>
              <Card.Header>
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
                  💳 Payment Method
                </h2>
              </Card.Header>
              <Card.Body className="space-y-4">
                <Controller
                  name="paymentMethod"
                  control={control}
                  render={({ field }) => (
                    <div className="grid gap-3 sm:grid-cols-2">
                      {(
                        [
                          { value: 'credit-card', label: '💳 Credit Card' },
                          { value: 'debit-card', label: '💳 Debit Card' },
                          { value: 'paypal', label: '🅿️ PayPal' },
                          { value: 'cash-on-delivery', label: '💵 Cash on Delivery' },
                        ] as const
                      ).map((option) => (
                        <label
                          key={option.value}
                          className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 p-4 transition-all ${
                            field.value === option.value
                              ? 'border-brand-600 bg-brand-50 dark:border-brand-400 dark:bg-brand-900/20'
                              : 'border-neutral-200 hover:border-neutral-300 dark:border-neutral-700 dark:hover:border-neutral-600'
                          }`}
                        >
                          <input
                            type="radio"
                            value={option.value}
                            checked={field.value === option.value}
                            onChange={() => field.onChange(option.value)}
                            className="h-4 w-4 text-brand-600 focus:ring-brand-500"
                          />
                          <span className="font-medium text-neutral-900 dark:text-neutral-50">
                            {option.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                />

                {/* Campos de tarjeta (simulados) */}
                {(paymentMethod === 'credit-card' || paymentMethod === 'debit-card') && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-4 pt-4"
                  >
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      💡 This is a demo. No real payment will be processed.
                    </p>
                    <Input
                      label="Card Number"
                      placeholder="4242 4242 4242 4242"
                      {...register('cardNumber')}
                    />
                    <Input
                      label="Cardholder Name"
                      placeholder="John Doe"
                      {...register('cardName')}
                    />
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Input
                        label="Expiry Date"
                        placeholder="MM/YY"
                        {...register('cardExpiry')}
                      />
                      <Input label="CVC" placeholder="123" {...register('cardCvc')} />
                    </div>
                  </motion.div>
                )}
              </Card.Body>
            </Card>
          </div>

          {/* Resumen de Orden (1/3) */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <Card.Header>
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
                  Order Summary
                </h2>
              </Card.Header>
              <Card.Body className="space-y-4">
                {/* Items */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.productId} className="flex gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-16 w-16 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-sm font-medium text-neutral-900 dark:text-neutral-50">
                          {item.product.name}
                        </p>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">
                        {formatCurrency(item.product.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-neutral-200 pt-4 dark:border-neutral-700">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-600 dark:text-neutral-400">Subtotal</span>
                      <span className="font-medium text-neutral-900 dark:text-neutral-50">
                        {formatCurrency(subtotal)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-600 dark:text-neutral-400">Tax (16%)</span>
                      <span className="font-medium text-neutral-900 dark:text-neutral-50">
                        {formatCurrency(tax)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-600 dark:text-neutral-400">Shipping</span>
                      <span className="font-medium text-neutral-900 dark:text-neutral-50">
                        {shipping === 0 ? 'FREE' : formatCurrency(shipping)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between border-t border-neutral-200 pt-4 dark:border-neutral-700">
                    <span className="text-base font-bold text-neutral-900 dark:text-neutral-50">
                      Total
                    </span>
                    <span className="text-base font-bold text-brand-600 dark:text-brand-400">
                      {formatCurrency(total)}
                    </span>
                  </div>
                </div>

                <Button type="submit" variant="primary" size="lg" fullWidth loading={isProcessing}>
                  {isProcessing ? 'Processing...' : 'Place Order'}
                </Button>

                <p className="text-center text-xs text-neutral-500 dark:text-neutral-400">
                  By placing this order, you agree to our Terms of Service
                </p>
              </Card.Body>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
