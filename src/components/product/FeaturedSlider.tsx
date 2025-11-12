import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { HeartIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import type { Product } from '@/types';
import { formatPrice } from '@/utils/formatters';
import { cn } from '@/utils/helpers';

export interface FeaturedSliderProps {
  /** Productos destacados a mostrar */
  products: Product[];
  /** Auto-play activado */
  autoPlay?: boolean;
  /** Intervalo de auto-play en ms */
  autoPlayInterval?: number;
  /** Clase CSS adicional */
  className?: string;
}

/**
 * Slider moderno y dinámico para productos destacados
 * Con animaciones atractivas y navegación fluida
 */
export function FeaturedSlider({
  products,
  autoPlay = true,
  autoPlayInterval = 5000,
  className,
}: FeaturedSliderProps) {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const featuredProducts = products.filter((p) => p.featured);

  // Funciones de navegación (definidas antes de useEffect)
  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
  }, [featuredProducts.length]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
  }, [featuredProducts.length]);

  const handleDotClick = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }, [currentIndex]);

  const handleProductClick = useCallback((productId: string) => {
    navigate(`/product/${productId}`);
  }, [navigate]);

  // Auto-play
  useEffect(() => {
    if (!autoPlay || featuredProducts.length <= 1) return;

    const startTimer = () => {
      timerRef.current = setTimeout(() => {
        handleNext();
      }, autoPlayInterval);
    };

    startTimer();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentIndex, autoPlay, autoPlayInterval, featuredProducts.length, handleNext]);

  if (featuredProducts.length === 0) {
    return null;
  }

  const currentProduct = featuredProducts[currentIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 45 : -45,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <div className={cn('relative overflow-hidden rounded-3xl', className)}>
      {/* Header con título animado */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex items-center gap-3"
      >
        <motion.div
          animate={{
            rotate: [0, 10, -10, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        >
          <SparklesIcon className="h-8 w-8 text-brand-500 dark:text-brand-400" />
        </motion.div>
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">
          Featured Products
        </h2>
      </motion.div>

      {/* Slider Container */}
      <div className="relative aspect-4/5 overflow-hidden rounded-3xl bg-linear-to-br from-brand-50 to-brand-100 sm:aspect-video lg:aspect-16/7 dark:from-neutral-800 dark:to-neutral-900">
        {/* Background Pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(172,217,178,0.8),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(172,217,178,0.6),transparent_40%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(172,217,178,0.6),transparent_40%)]" />
        </div>

        {/* Main Slider */}
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 },
              scale: { duration: 0.3 },
              rotateY: { duration: 0.4 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(_e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                handleNext();
              } else if (swipe > swipeConfidenceThreshold) {
                handlePrev();
              }
            }}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            <div
              className="flex h-full flex-col items-center gap-4 px-4 py-6 sm:gap-6 sm:px-8 lg:flex-row lg:gap-8 lg:px-12 lg:py-0 xl:px-16"
              onClick={() => handleProductClick(currentProduct.id)}
            >
              {/* Product Image */}
              <motion.div
                key={`image-${currentProduct.id}`}
                className="relative h-48 w-full shrink-0 sm:h-64 lg:h-full lg:w-1/2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="relative h-full w-full">
                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-linear-to-br from-brand-400/20 to-brand-600/20 blur-3xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                  
                  {/* Image container with multiple effects */}
                  <div className="relative h-full w-full rounded-2xl bg-white p-3 shadow-2xl sm:p-6 dark:bg-neutral-800">
                    <motion.img
                      src={currentProduct.image}
                      alt={currentProduct.name}
                      className="h-full w-full object-contain"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    />
                    
                    {/* Floating badges */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.4, type: 'spring' }}
                      className="absolute top-2 right-2 rounded-full bg-brand-500 px-2 py-1 text-xs font-bold text-white shadow-lg sm:top-4 sm:right-4 sm:px-4 sm:py-2 sm:text-sm"
                    >
                      Featured
                    </motion.div>
                    
                    {currentProduct.condition === 'new' && (
                      <motion.div
                        initial={{ scale: 0, rotate: 180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.5, type: 'spring' }}
                        className="absolute top-2 left-2 rounded-full bg-yellow-500 px-2 py-1 text-xs font-bold text-white shadow-lg sm:top-4 sm:left-4 sm:px-3 sm:py-1.5"
                      >
                        NEW
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Product Info */}
              <div className="flex w-full flex-1 flex-col justify-center space-y-2 overflow-y-auto sm:space-y-3 lg:space-y-4">
                <motion.div
                  key={`category-${currentProduct.id}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="inline-block rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700 sm:px-4 sm:py-1.5 sm:text-sm dark:bg-brand-900/50 dark:text-brand-300">
                    {currentProduct.category}
                  </span>
                </motion.div>

                <motion.h3
                  key={`name-${currentProduct.id}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl font-bold leading-tight text-neutral-900 line-clamp-2 sm:text-3xl lg:text-4xl xl:text-5xl dark:text-neutral-50"
                >
                  {currentProduct.name}
                </motion.h3>

                <motion.p
                  key={`description-${currentProduct.id}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-sm text-neutral-600 line-clamp-2 sm:text-base lg:line-clamp-3 dark:text-neutral-400"
                >
                  {currentProduct.description}
                </motion.p>

                <motion.div
                  key={`price-${currentProduct.id}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-baseline gap-2"
                >
                  <span className="text-3xl font-bold text-brand-600 sm:text-4xl lg:text-5xl dark:text-brand-400">
                    {formatPrice(currentProduct.price)}
                  </span>
                  <span className="text-base text-neutral-500 sm:text-lg lg:text-xl dark:text-neutral-400">USD</span>
                </motion.div>

                <motion.div
                  key={`buttons-${currentProduct.id}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-center gap-2 sm:gap-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProductClick(currentProduct.id);
                    }}
                    className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-brand-700 sm:px-6 sm:py-3 sm:text-base lg:px-8 lg:py-4 lg:text-lg dark:bg-brand-500 dark:hover:bg-brand-600"
                  >
                    View Details
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => e.stopPropagation()}
                    className="rounded-full bg-white p-2 text-brand-600 shadow-lg transition-colors hover:bg-brand-50 sm:p-3 lg:p-4 dark:bg-neutral-800 dark:text-brand-400 dark:hover:bg-neutral-700"
                    aria-label="Add to favorites"
                  >
                    <HeartIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </motion.button>
                </motion.div>

                {/* Rating */}
                <motion.div
                  key={`rating-${currentProduct.id}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex items-center gap-1 sm:gap-2"
                >
                  <div className="flex gap-0.5 sm:gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <motion.span
                        key={`star-${currentProduct.id}-${i}`}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.9 + i * 0.1 }}
                        className={cn(
                          'text-base sm:text-xl lg:text-2xl',
                          i < Math.floor(currentProduct.rating)
                            ? 'text-yellow-400'
                            : 'text-neutral-300 dark:text-neutral-600'
                        )}
                      >
                        ★
                      </motion.span>
                    ))}
                  </div>
                  <span className="text-xs text-neutral-600 sm:text-sm lg:text-base dark:text-neutral-400">
                    {currentProduct.rating} ({currentProduct.reviews} reviews)
                  </span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {featuredProducts.length > 1 && (
          <>
            <motion.button
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrev}
              className="absolute top-1/3 left-2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-xl backdrop-blur-sm transition-colors hover:bg-white sm:left-4 sm:top-1/2 sm:p-3 dark:bg-neutral-800/90 dark:hover:bg-neutral-800"
              aria-label="Previous product"
            >
              <ChevronLeftIcon className="h-4 w-4 text-neutral-900 sm:h-6 sm:w-6 dark:text-neutral-50" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNext}
              className="absolute top-1/3 right-2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-xl backdrop-blur-sm transition-colors hover:bg-white sm:right-4 sm:top-1/2 sm:p-3 dark:bg-neutral-800/90 dark:hover:bg-neutral-800"
              aria-label="Next product"
            >
              <ChevronRightIcon className="h-4 w-4 text-neutral-900 sm:h-6 sm:w-6 dark:text-neutral-50" />
            </motion.button>
          </>
        )}

        {/* Dots Navigation */}
        {featuredProducts.length > 1 && (
          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5 sm:bottom-6 sm:gap-2">
            {featuredProducts.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => handleDotClick(index)}
                className="group relative"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Go to product ${index + 1}`}
              >
                <div
                  className={cn(
                    'h-2 w-2 rounded-full transition-all duration-300 sm:h-3 sm:w-3',
                    currentIndex === index
                      ? 'bg-brand-600 dark:bg-brand-400'
                      : 'bg-white/60 group-hover:bg-white/80 dark:bg-neutral-600/60 dark:group-hover:bg-neutral-600/80'
                  )}
                />
                {currentIndex === index && (
                  <motion.div
                    layoutId="activeDot"
                    className="absolute inset-0 -m-0.5 rounded-full border-2 border-brand-600 sm:-m-1 dark:border-brand-400"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        )}

        {/* Progress Bar */}
        {autoPlay && featuredProducts.length > 1 && (
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-brand-600 dark:bg-brand-400"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: autoPlayInterval / 1000, ease: 'linear' }}
            key={currentIndex}
          />
        )}
      </div>
    </div>
  );
}
