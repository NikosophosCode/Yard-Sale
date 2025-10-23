import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { getOrdersByUser } from '@/api/orders';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { Button, Card, Skeleton } from '@components/common';
import type { Order } from '@/types';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
  processing: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  shipped: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  delivered: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
};

export function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadOrders() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const data = await getOrdersByUser(user.id);
        setOrders(data);
      } catch (err) {
        console.error('Error loading orders:', err);
        setError('Failed to load orders');
      } finally {
        setLoading(false);
      }
    }

    loadOrders();
  }, [user]);

  if (!user) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Card>
          <Card.Body className="py-12 text-center">
            <div className="text-6xl mb-4">🔒</div>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
              Please Sign In
            </h2>
            <p className="mt-2 text-neutral-600 dark:text-neutral-400">
              You need to be logged in to view your orders.
            </p>
            <Button variant="primary" className="mt-6" asChild>
              <Link to="/login?redirect=/orders">Sign In</Link>
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Skeleton variant="text" className="mb-6 h-10 w-48" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} variant="rectangle" className="h-48 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Card>
          <Card.Body className="py-12 text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
              Error Loading Orders
            </h2>
            <p className="mt-2 text-neutral-600 dark:text-neutral-400">{error}</p>
            <Button variant="primary" className="mt-6" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">My Orders</h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          View and track your order history
        </p>
      </motion.div>

      {orders.length === 0 ? (
        <Card>
          <Card.Body className="py-12 text-center">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
              No Orders Yet
            </h2>
            <p className="mt-2 text-neutral-600 dark:text-neutral-400">
              You haven't placed any orders yet. Start shopping to see your orders here!
            </p>
            <Button variant="primary" className="mt-6" asChild>
              <Link to="/">Start Shopping</Link>
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover clickable asChild>
                <Link to={`/order-success/${order.id}`}>
                  <Card.Body>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <h3 className="font-mono text-sm font-medium text-neutral-900 dark:text-neutral-50">
                            Order #{order.id}
                          </h3>
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${statusColors[order.status]}`}
                          >
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>

                        <div className="grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-4">
                          <div>
                            <p className="text-neutral-600 dark:text-neutral-400">Date</p>
                            <p className="font-medium text-neutral-900 dark:text-neutral-50">
                              {formatDate(order.createdAt)}
                            </p>
                          </div>
                          <div>
                            <p className="text-neutral-600 dark:text-neutral-400">Items</p>
                            <p className="font-medium text-neutral-900 dark:text-neutral-50">
                              {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                            </p>
                          </div>
                          <div>
                            <p className="text-neutral-600 dark:text-neutral-400">Payment</p>
                            <p className="font-medium text-neutral-900 dark:text-neutral-50">
                              {order.paymentMethod === 'credit-card' && '💳 Credit Card'}
                              {order.paymentMethod === 'debit-card' && '💳 Debit Card'}
                              {order.paymentMethod === 'paypal' && '🅿️ PayPal'}
                              {order.paymentMethod === 'cash-on-delivery' && '💵 COD'}
                            </p>
                          </div>
                          <div>
                            <p className="text-neutral-600 dark:text-neutral-400">Total</p>
                            <p className="text-lg font-bold text-brand-600 dark:text-brand-400">
                              {formatCurrency(order.total)}
                            </p>
                          </div>
                        </div>

                        <div className="mt-3 flex gap-2 overflow-x-auto">
                          {order.items.slice(0, 4).map((item, idx) => (
                            <img
                              key={`${item.productId}-${idx}`}
                              src={item.productImage}
                              alt={item.productName}
                              className="h-12 w-12 shrink-0 rounded-lg object-cover"
                            />
                          ))}
                          {order.items.length > 4 && (
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                              +{order.items.length - 4}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 sm:flex-col">
                        <Button variant="outline" size="sm" fullWidth asChild>
                          <span>View Details →</span>
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
