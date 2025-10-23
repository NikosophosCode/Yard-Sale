import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  StarIcon,
  ShoppingCartIcon,
  ArrowLeftIcon,
  TruckIcon,
  ShieldCheckIcon,
  MinusIcon,
  PlusIcon,
} from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';
import type { Product } from '@/types';
import { getProductById, getRelatedProducts } from '@/api/products';
import { formatPrice } from '@/utils/formatters';
import { useCart } from '@/hooks/useCart';
import { Button } from '@components/common/Button';
import { Skeleton } from '@components/common/Skeleton';
import { ProductCard } from '@components/product/ProductCard';
import { cn } from '@/utils/helpers';

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addItem, openCart, getItemById } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      setLoading(true);
      setError(null);

      try {
        const data = await getProductById(id);

        if (!data) {
          setError('Producto no encontrado');
          return;
        }

        setProduct(data);

        // Obtener productos relacionados
        const related = await getRelatedProducts(id, data.category);
        setRelatedProducts(related);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar producto');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product || product.stock === 0) return;

    // Agregar la cantidad seleccionada
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }

    openCart();
    setQuantity(1); // Reset quantity
  };

  const handleIncrement = () => {
    if (product && quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // Calcular cantidad ya en el carrito
  const cartItem = product ? getItemById(product.id) : undefined;
  const cartQuantity = cartItem?.quantity || 0;
  const availableStock = product ? product.stock - cartQuantity : 0;
  const canAddMore = availableStock > 0;

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <StarIcon key={i} className="h-5 w-5 text-yellow-400" aria-hidden="true" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative h-5 w-5">
            <StarOutlineIcon className="absolute h-5 w-5 text-yellow-400" aria-hidden="true" />
            <div className="absolute overflow-hidden" style={{ width: '50%' }}>
              <StarIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
            </div>
          </div>
        );
      } else {
        stars.push(
          <StarOutlineIcon
            key={i}
            className="h-5 w-5 text-neutral-300 dark:text-neutral-600"
            aria-hidden="true"
          />
        );
      }
    }

    return stars;
  };

  const getConditionBadge = (condition: string) => {
    const badges = {
      new: { label: 'Nuevo', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
      'like-new': {
        label: 'Como nuevo',
        color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      },
      good: {
        label: 'Buen estado',
        color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      },
      fair: {
        label: 'Aceptable',
        color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      },
    };

    const badge = badges[condition as keyof typeof badges] || badges.good;

    return (
      <span className={cn('inline-flex items-center rounded-full px-3 py-1 text-sm font-medium', badge.color)}>
        {badge.label}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 py-8 dark:bg-neutral-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <Skeleton variant="rectangle" className="aspect-square w-full" />
            <div className="space-y-4">
              <Skeleton variant="text" className="h-10 w-3/4" />
              <Skeleton variant="text" className="h-6 w-1/2" />
              <Skeleton variant="text" className="h-24 w-full" />
              <Skeleton variant="rectangle" className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50 dark:bg-neutral-900">
        <div className="text-center">
          <div className="mb-4 text-6xl">😕</div>
          <h1 className="mb-2 text-2xl font-bold text-neutral-900 dark:text-neutral-50">
            {error || 'Producto no encontrado'}
          </h1>
          <Button variant="primary" onClick={() => navigate('/')} leftIcon={<ArrowLeftIcon className="h-5 w-5" />}>
            Volver al inicio
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-8 dark:bg-neutral-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Botón volver */}
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-neutral-600 transition-colors hover:text-brand-600 dark:text-neutral-400 dark:hover:text-brand-400"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Volver a productos
        </Link>

        {/* Contenido principal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid gap-8 lg:grid-cols-2"
        >
          {/* Galería de imágenes */}
          <div className="space-y-4">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-white shadow-lg dark:bg-neutral-800">
              <img
                src={product.images[selectedImage] || product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
              {getConditionBadge(product.condition)}
            </div>

            {/* Miniaturas */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      'aspect-square overflow-hidden rounded-lg border-2 transition-all',
                      selectedImage === index
                        ? 'border-brand-600 dark:border-brand-400'
                        : 'border-neutral-200 hover:border-brand-300 dark:border-neutral-700 dark:hover:border-brand-600'
                    )}
                  >
                    <img src={image} alt={`${product.name} - ${index + 1}`} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Información del producto */}
          <div className="space-y-6">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-neutral-900 dark:text-neutral-50">{product.name}</h1>

              {/* Rating y reviews */}
              <div className="mb-4 flex items-center gap-3">
                <div className="flex items-center gap-1" aria-label={`${product.rating} de 5 estrellas`}>
                  {renderStars(product.rating)}
                </div>
                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                  {product.rating} ({product.reviews} reseñas)
                </span>
              </div>

              {/* Precio */}
              <div className="mb-4">
                <p className="text-4xl font-bold text-brand-600 dark:text-brand-400">{formatPrice(product.price)}</p>
              </div>

              {/* Estado */}
              <div className="mb-4">{getConditionBadge(product.condition)}</div>
            </div>

            {/* Descripción */}
            <div>
              <h2 className="mb-2 text-lg font-semibold text-neutral-900 dark:text-neutral-50">Descripción</h2>
              <p className="text-neutral-600 dark:text-neutral-400">{product.description}</p>
            </div>

            {/* Stock */}
            <div>
              {product.stock > 0 ? (
                <div className="space-y-2">
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {product.stock > 10 ? (
                      <span className="text-green-600 dark:text-green-400">✓ En stock</span>
                    ) : (
                      <span className="text-orange-600 dark:text-orange-400">
                        ⚠️ Solo quedan {product.stock} unidades
                      </span>
                    )}
                  </p>
                  {cartQuantity > 0 && (
                    <p className="text-sm text-blue-600 dark:text-blue-400">
                      Ya tienes {cartQuantity} en tu carrito
                    </p>
                  )}
                  {!canAddMore && cartQuantity > 0 && (
                    <p className="text-sm text-red-600 dark:text-red-400">
                      ⚠️ Has alcanzado el stock disponible
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-sm font-semibold text-red-600 dark:text-red-400">Agotado</p>
              )}
            </div>

            {/* Selector de cantidad */}
            {product.stock > 0 && canAddMore && (
              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Cantidad
                </label>
                <div className="flex items-center gap-3">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleDecrement}
                    disabled={quantity <= 1}
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-neutral-700 shadow-sm transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600"
                    aria-label="Decrease quantity"
                  >
                    <MinusIcon className="h-5 w-5" />
                  </motion.button>

                  <span className="min-w-12 text-center text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                    {quantity}
                  </span>

                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleIncrement}
                    disabled={quantity >= availableStock}
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-neutral-700 shadow-sm transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600"
                    aria-label="Increase quantity"
                  >
                    <PlusIcon className="h-5 w-5" />
                  </motion.button>

                  <span className="text-sm text-neutral-500 dark:text-neutral-400">
                    ({availableStock} disponibles)
                  </span>
                </div>
              </div>
            )}

            {/* Botón agregar al carrito */}
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleAddToCart}
              disabled={product.stock === 0 || !canAddMore}
              leftIcon={<ShoppingCartIcon className="h-6 w-6" />}
            >
              {product.stock === 0 ? 'Agotado' : !canAddMore ? 'Stock máximo en carrito' : 'Agregar al carrito'}
            </Button>

            {/* Beneficios */}
            <div className="space-y-3 rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-800">
              <div className="flex items-center gap-3">
                <TruckIcon className="h-6 w-6 text-brand-600 dark:text-brand-400" />
                <div>
                  <p className="font-medium text-neutral-900 dark:text-neutral-50">Envío gratis</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">En compras mayores a $50</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheckIcon className="h-6 w-6 text-brand-600 dark:text-brand-400" />
                <div>
                  <p className="font-medium text-neutral-900 dark:text-neutral-50">Garantía de calidad</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">30 días de devolución</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Productos relacionados */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 text-2xl font-bold text-neutral-900 dark:text-neutral-50">Productos relacionados</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((related) => (
                <ProductCard key={related.id} product={related} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
