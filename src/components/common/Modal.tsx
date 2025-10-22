import { Fragment, useEffect } from 'react';
import type { ReactNode } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { cn } from '@/utils/helpers';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ModalProps {
  /** Estado de apertura del modal */
  isOpen: boolean;
  /** Callback al cerrar el modal */
  onClose: () => void;
  /** Título del modal */
  title?: string;
  /** Tamaño del modal */
  size?: ModalSize;
  /** Ocultar el botón de cerrar */
  hideCloseButton?: boolean;
  /** Deshabilitar el cierre al hacer click fuera o presionar ESC */
  preventClose?: boolean;
  /** Clase CSS adicional para el contenedor del modal */
  className?: string;
  /** Contenido del modal */
  children: ReactNode;
}

/**
 * Componente Modal con animaciones y accesibilidad
 *
 * @example
 * ```tsx
 * <Modal
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Confirm Action"
 *   size="md"
 * >
 *   <p>Are you sure you want to continue?</p>
 * </Modal>
 * ```
 */
export function Modal({
  isOpen,
  onClose,
  title,
  size = 'md',
  hideCloseButton = false,
  preventClose = false,
  className,
  children,
}: ModalProps) {
  // Tamaños del modal
  const sizeStyles: Record<ModalSize, string> = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full mx-4',
  };

  // Bloquear scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    if (!preventClose) {
      onClose();
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </Transition.Child>

        {/* Modal container */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={cn(
                  'w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-neutral-800',
                  sizeStyles[size],
                  className
                )}
              >
                {/* Header con título y botón de cerrar */}
                {(title || !hideCloseButton) && (
                  <div className="mb-4 flex items-start justify-between">
                    {title && (
                      <Dialog.Title
                        as="h3"
                        className="text-lg leading-6 font-semibold text-neutral-900 dark:text-neutral-100"
                      >
                        {title}
                      </Dialog.Title>
                    )}
                    {!hideCloseButton && (
                      <button
                        type="button"
                        className="focus:ring-brand-500 ml-auto rounded-lg p-1 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600 focus:ring-2 focus:outline-none dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
                        onClick={handleClose}
                        aria-label="Close modal"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                )}

                {/* Contenido */}
                <div className="text-neutral-700 dark:text-neutral-300">{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

// Sub-componentes para estructura semántica

export interface ModalBodyProps {
  className?: string;
  children: ReactNode;
}

export function ModalBody({ className, children }: ModalBodyProps) {
  return <div className={cn('my-4', className)}>{children}</div>;
}

export interface ModalFooterProps {
  className?: string;
  children: ReactNode;
}

export function ModalFooter({ className, children }: ModalFooterProps) {
  return (
    <div
      className={cn(
        'mt-6 flex flex-col-reverse gap-2 border-t border-neutral-200 pt-4 sm:flex-row sm:justify-end dark:border-neutral-700',
        className
      )}
    >
      {children}
    </div>
  );
}
