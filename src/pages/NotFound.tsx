import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HomeIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Button } from '@components/common';

export function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        {/* 404 Illustration */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.2,
            type: 'spring',
            stiffness: 200,
          }}
          className="mb-8"
        >
          <div className="relative mx-auto h-64 w-64">
            {/* Círculo de fondo */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-200 to-brand-400 opacity-20 blur-2xl dark:from-brand-600 dark:to-brand-800"
            />

            {/* 404 Text */}
            <div className="relative flex h-full items-center justify-center">
              <h1 className="text-9xl font-bold text-brand-600 dark:text-brand-400">
                404
              </h1>
            </div>

            {/* Floating icons */}
            <motion.div
              animate={{
                y: [-10, 10, -10],
                rotate: [0, 5, 0, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute left-8 top-8"
            >
              <div className="rounded-xl bg-white p-3 shadow-lg dark:bg-neutral-800">
                <MagnifyingGlassIcon className="h-8 w-8 text-brand-500" />
              </div>
            </motion.div>

            <motion.div
              animate={{
                y: [10, -10, 10],
                rotate: [0, -5, 0, 5, 0],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5,
              }}
              className="absolute bottom-8 right-8"
            >
              <div className="rounded-xl bg-white p-3 shadow-lg dark:bg-neutral-800">
                <HomeIcon className="h-8 w-8 text-brand-500" />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="mb-2 text-3xl font-bold text-neutral-900 dark:text-neutral-50">
            Page Not Found
          </h2>
          <p className="mx-auto max-w-md text-neutral-600 dark:text-neutral-400">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link to="/">
            <Button variant="primary" size="lg" leftIcon={<HomeIcon className="h-5 w-5" />}>
              Back to Home
            </Button>
          </Link>

          <Link to="/">
            <Button
              variant="outline"
              size="lg"
              leftIcon={<MagnifyingGlassIcon className="h-5 w-5" />}
            >
              Browse Products
            </Button>
          </Link>
        </motion.div>

        {/* Additional Help */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12"
        >
          <p className="text-sm text-neutral-500 dark:text-neutral-500">
            Need help?{' '}
            <Link
              to="/account"
              className="font-medium text-brand-600 hover:underline dark:text-brand-400"
            >
              Contact Support
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
