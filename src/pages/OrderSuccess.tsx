import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getOrderById } from '@/api/orders';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { Button, Card, Skeleton } from '@components/common';
import type { Order } from '@/types';

export function OrderSuccess() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadOrder() {
      if (!id) {
        setError('Order ID not provided');
        setLoading(false);
        return;
      }

      try {
        const data = await getOrderById(id);
        if (!data) {
          setError('Order not found');
        } else {
          setOrder(data);
        }
      } catch (err) {
        console.error('Error loading order:', err);
        setError('Failed to load order details');
      } finally {
        setLoading(false);
      }
    }

    loadOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <Skeleton variant="text" className="mb-4 h-10 w-64" />
        <Skeleton variant="rectangle" className="h-96 w-full" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <Card>
          <Card.Body className="py-12 text-center">
            <div className="text-6xl mb-4">❌</div>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
              {error || 'Order not found'}
            </h2>
            <p className="mt-2 text-neutral-600 dark:text-neutral-400">
              We couldn't find the order you're looking for.
            </p>
            <Button variant="primary" className="mt-6" asChild>
              <Link to="/">Back to Home</Link>
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center mb-8"
      >
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">
          Order Confirmed!
        </h1>
        <p className="mt-2 text-lg text-neutral-600 dark:text-neutral-400">
          Thank you for your purchase
        </p>
      </motion.div>

      <Card className="mb-6">
        <Card.Header>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
              Order Details
            </h2>
            <span className="rounded-full bg-brand-100 px-3 py-1 text-sm font-medium text-brand-700 dark:bg-brand-900/30 dark:text-brand-300">
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
          </div>
        </Card.Header>
        <Card.Body className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Order Number</p>
              <p className="mt-1 font-mono text-sm font-medium text-neutral-900 dark:text-neutral-50">
                #{order.id}
              </p>
            </div>
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Order Date</p>
              <p className="mt-1 text-sm font-medium text-neutral-900 dark:text-neutral-50">
                {formatDate(order.createdAt)}
              </p>
            </div>
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Payment Method</p>
              <p className="mt-1 text-sm font-medium text-neutral-900 dark:text-neutral-50">
                {order.paymentMethod === 'credit-card' && '💳 Credit Card'}
                {order.paymentMethod === 'debit-card' && '💳 Debit Card'}
                {order.paymentMethod === 'paypal' && '🅿️ PayPal'}
                {order.paymentMethod === 'cash-on-delivery' && '💵 Cash on Delivery'}
              </p>
            </div>
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Total Amount</p>
              <p className="mt-1 text-lg font-bold text-brand-600 dark:text-brand-400">
                {formatCurrency(order.total)}
              </p>
            </div>
          </div>

          <div className="border-t border-neutral-200 pt-4 dark:border-neutral-700">
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
              Shipping Address
            </p>
            <div className="rounded-lg bg-neutral-50 p-3 text-sm dark:bg-neutral-800">
              <p className="font-medium text-neutral-900 dark:text-neutral-50">
                {order.shippingAddress.street}
              </p>
              <p className="text-neutral-600 dark:text-neutral-400">
                {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                {order.shippingAddress.zipCode}
              </p>
              <p className="text-neutral-600 dark:text-neutral-400">
                {order.shippingAddress.country}
              </p>
            </div>
          </div>
        </Card.Body>
      </Card>

      <Card className="mb-6">
        <Card.Header>
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
            Order Items ({order.items.length})
          </h2>
        </Card.Header>
        <Card.Body>
          <div className="space-y-4">
            {order.items.map((item, index) => (
              <div
                key={`${item.productId}-${index}`}
                className="flex gap-4 pb-4 last:pb-0 border-b last:border-b-0 border-neutral-200 dark:border-neutral-700"
              >
                <img
                  src={item.productImage}
                  alt={item.productName}
                  className="h-20 w-20 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-neutral-900 dark:text-neutral-50">
                    {item.productName}
                  </p>
                  <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                    Quantity: {item.quantity}
                  </p>
                  <p className="mt-1 text-sm font-medium text-neutral-900 dark:text-neutral-50">
                    {formatCurrency(item.priceAtPurchase)} × {item.quantity} ={' '}
                    {formatCurrency(item.priceAtPurchase * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-neutral-200 pt-4 dark:border-neutral-700">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600 dark:text-neutral-400">Subtotal</span>
                <span className="font-medium text-neutral-900 dark:text-neutral-50">
                  {formatCurrency(order.subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600 dark:text-neutral-400">Tax</span>
                <span className="font-medium text-neutral-900 dark:text-neutral-50">
                  {formatCurrency(order.tax)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600 dark:text-neutral-400">Shipping</span>
                <span className="font-medium text-neutral-900 dark:text-neutral-50">
                  {order.shipping === 0 ? 'FREE' : formatCurrency(order.shipping)}
                </span>
              </div>
              <div className="flex justify-between border-t border-neutral-200 pt-2 dark:border-neutral-700">
                <span className="text-base font-bold text-neutral-900 dark:text-neutral-50">
                  Total
                </span>
                <span className="text-base font-bold text-brand-600 dark:text-brand-400">
                  {formatCurrency(order.total)}
                </span>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button variant="primary" asChild>
          <Link to="/orders">View All Orders</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/">Continue Shopping</Link>
        </Button>
      </div>

      <Card className="mt-6 bg-brand-50 dark:bg-brand-900/20">
        <Card.Body>
          <div className="flex gap-4">
            <div className="text-2xl">📧</div>
            <div>
              <p className="font-medium text-neutral-900 dark:text-neutral-50">
                Order confirmation sent
              </p>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                We've sent a confirmation email with your order details and tracking information.
              </p>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
