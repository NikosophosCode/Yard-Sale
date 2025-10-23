import { useState, Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Tab } from '@headlessui/react';
import {
  UserCircleIcon,
  KeyIcon,
  MapPinIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '@/hooks/useAuth';
import {
  updateProfile,
  changePassword,
  addAddress,
  updateAddress,
  deleteAddress,
} from '@/api/auth';
import {
  profileSchema,
  changePasswordSchema,
  addressSchema,
  type ProfileFormData,
  type ChangePasswordFormData,
  type AddressFormData,
} from '@/utils/validations';
import { Button, Input, Card, Modal, ModalBody, ModalFooter, AddressCard } from '@components/common';
import type { Address } from '@/types';
import { cn } from '@/utils/helpers';

const tabs = [
  { name: 'Profile', icon: UserCircleIcon },
  { name: 'Password', icon: KeyIcon },
  { name: 'Addresses', icon: MapPinIcon },
];

export function Account() {
  const { user, updateUser } = useAuth();
  const [selectedTab, setSelectedTab] = useState(0);

  if (!user) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">
          My Account
        </h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          Manage your profile, security, and preferences
        </p>
      </div>

      {/* Tabs */}
      <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
        <Tab.List className="mb-8 flex space-x-1 rounded-xl bg-neutral-100 p-1 dark:bg-neutral-800">
          {tabs.map((tab) => (
            <Tab key={tab.name} as={Fragment}>
              {({ selected }) => (
                <button
                  className={cn(
                    'relative w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-colors',
                    'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-neutral-100 dark:focus:ring-offset-neutral-800',
                    selected
                      ? 'bg-white text-brand-700 shadow dark:bg-neutral-700 dark:text-brand-400'
                      : 'text-neutral-600 hover:bg-white/50 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-700/50 dark:hover:text-neutral-100'
                  )}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <tab.icon className="h-5 w-5" />
                    <span>{tab.name}</span>
                  </div>
                </button>
              )}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels>
          {/* Panel 1: Profile */}
          <Tab.Panel>
            <ProfileTab user={user} updateUser={updateUser} />
          </Tab.Panel>

          {/* Panel 2: Password */}
          <Tab.Panel>
            <PasswordTab userId={user.id} />
          </Tab.Panel>

          {/* Panel 3: Addresses */}
          <Tab.Panel>
            <AddressesTab user={user} updateUser={updateUser} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </motion.div>
  );
}

// ==================== Profile Tab ====================
interface ProfileTabProps {
  user: NonNullable<ReturnType<typeof useAuth>['user']>;
  updateUser: (user: NonNullable<ReturnType<typeof useAuth>['user']>) => void;
}

function ProfileTab({ user, updateUser }: ProfileTabProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      setIsLoading(true);
      setSuccessMessage('');
      setErrorMessage('');

      const updatedUser = await updateProfile(user.id, data);
      updateUser(updatedUser);

      setSuccessMessage('Profile updated successfully!');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
              Profile Information
            </h2>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              Update your account's profile information and email address.
            </p>
          </div>

          {/* Success/Error Messages */}
          <AnimatePresence mode="wait">
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center space-x-2 rounded-lg bg-green-50 p-4 text-sm text-green-800 dark:bg-green-900/20 dark:text-green-400"
              >
                <CheckCircleIcon className="h-5 w-5" />
                <span>{successMessage}</span>
              </motion.div>
            )}

            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center space-x-2 rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-400"
              >
                <XCircleIcon className="h-5 w-5" />
                <span>{errorMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              error={errors.name?.message}
              {...register('name')}
            />

            <Input
              label="Email Address"
              type="email"
              error={errors.email?.message}
              {...register('email')}
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" loading={isLoading} disabled={isLoading}>
              Save Changes
            </Button>
          </div>
        </form>
      </Card>
    </motion.div>
  );
}

// ==================== Password Tab ====================
interface PasswordTabProps {
  userId: string;
}

function PasswordTab({ userId }: PasswordTabProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (data: ChangePasswordFormData) => {
    try {
      setIsLoading(true);
      setSuccessMessage('');
      setErrorMessage('');

      await changePassword(userId, data.currentPassword, data.newPassword);

      setSuccessMessage('Password changed successfully!');
      reset();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to change password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
              Change Password
            </h2>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              Ensure your account is using a long, random password to stay secure.
            </p>
          </div>

          {/* Success/Error Messages */}
          <AnimatePresence mode="wait">
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center space-x-2 rounded-lg bg-green-50 p-4 text-sm text-green-800 dark:bg-green-900/20 dark:text-green-400"
              >
                <CheckCircleIcon className="h-5 w-5" />
                <span>{successMessage}</span>
              </motion.div>
            )}

            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center space-x-2 rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-400"
              >
                <XCircleIcon className="h-5 w-5" />
                <span>{errorMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-4">
            <Input
              label="Current Password"
              type="password"
              error={errors.currentPassword?.message}
              {...register('currentPassword')}
            />

            <Input
              label="New Password"
              type="password"
              error={errors.newPassword?.message}
              {...register('newPassword')}
            />

            <Input
              label="Confirm New Password"
              type="password"
              error={errors.confirmNewPassword?.message}
              {...register('confirmNewPassword')}
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" loading={isLoading} disabled={isLoading}>
              Update Password
            </Button>
          </div>
        </form>
      </Card>
    </motion.div>
  );
}

// ==================== Addresses Tab ====================
interface AddressesTabProps {
  user: NonNullable<ReturnType<typeof useAuth>['user']>;
  updateUser: (user: NonNullable<ReturnType<typeof useAuth>['user']>) => void;
}

function AddressesTab({ user, updateUser }: AddressesTabProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [deletingAddressId, setDeletingAddressId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
  });

  const openAddModal = () => {
    setEditingAddress(null);
    reset({
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (address: Address) => {
    setEditingAddress(address);
    reset({
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (addressId: string) => {
    try {
      setDeletingAddressId(addressId);
      setErrorMessage('');

      const updatedUser = await deleteAddress(user.id, addressId);
      updateUser(updatedUser);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to delete address');
    } finally {
      setDeletingAddressId(null);
    }
  };

  const handleSetDefault = async (addressId: string) => {
    try {
      setIsLoading(true);
      setErrorMessage('');

      const updatedUser = await updateAddress(user.id, addressId, { isDefault: true });
      updateUser(updatedUser);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to set default address');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: AddressFormData) => {
    try {
      setIsLoading(true);
      setErrorMessage('');

      if (editingAddress) {
        // Actualizar dirección existente
        const updatedUser = await updateAddress(user.id, editingAddress.id, data);
        updateUser(updatedUser);
      } else {
        // Agregar nueva dirección
        const isFirstAddress = user.addresses.length === 0;
        const updatedUser = await addAddress(user.id, {
          ...data,
          isDefault: isFirstAddress, // Primera dirección es default automáticamente
        });
        updateUser(updatedUser);
      }

      setIsModalOpen(false);
      reset();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to save address');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header */}
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
              Saved Addresses
            </h2>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              Manage your shipping addresses
            </p>
          </div>
          <Button onClick={openAddModal}>Add Address</Button>
        </div>
      </Card>

      {/* Error Message */}
      <AnimatePresence>
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center space-x-2 rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-400"
          >
            <XCircleIcon className="h-5 w-5" />
            <span>{errorMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lista de direcciones */}
      {user.addresses.length === 0 ? (
        <Card>
          <div className="py-12 text-center">
            <MapPinIcon className="mx-auto h-12 w-12 text-neutral-400 dark:text-neutral-600" />
            <h3 className="mt-4 text-lg font-medium text-neutral-900 dark:text-neutral-50">
              No addresses saved
            </h3>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              Add your first shipping address to make checkout faster.
            </p>
            <Button onClick={openAddModal} variant="primary" className="mt-6">
              Add Address
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          <AnimatePresence>
            {user.addresses.map((address) => (
              <AddressCard
                key={address.id}
                address={address}
                onEdit={openEditModal}
                onDelete={handleDelete}
                onSetDefault={handleSetDefault}
                isDeleting={deletingAddressId === address.id}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Modal para agregar/editar dirección */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          reset();
        }}
        title={editingAddress ? 'Edit Address' : 'Add New Address'}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <div className="space-y-4">
              <Input
                label="Street Address"
                type="text"
                error={errors.street?.message}
                {...register('street')}
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="City" type="text" error={errors.city?.message} {...register('city')} />

                <Input
                  label="State/Province"
                  type="text"
                  error={errors.state?.message}
                  {...register('state')}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label="ZIP Code"
                  type="text"
                  error={errors.zipCode?.message}
                  {...register('zipCode')}
                />

                <Input
                  label="Country"
                  type="text"
                  error={errors.country?.message}
                  {...register('country')}
                />
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsModalOpen(false);
                reset();
              }}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" loading={isLoading} disabled={isLoading}>
              {editingAddress ? 'Update Address' : 'Add Address'}
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </motion.div>
  );
}
