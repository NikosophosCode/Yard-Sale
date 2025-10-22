import { useState } from 'react';
import { Header, Footer } from '@/components/layout';
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Modal,
  ModalBody,
  ModalFooter,
  SkeletonProductGrid,
} from '@/components/common';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ShoppingCartIcon, HeartIcon } from '@heroicons/react/24/outline';

function AppContent() {
  const [cartCount, setCartCount] = useState(3);
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddToCart = () => {
    setCartCount(cartCount + 1);
  };

  const handleCartClick = () => {
    alert('Cart sidebar would open here!');
  };

  const mockUser = {
    name: 'John Doe',
    avatar: undefined,
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <Header cartItemsCount={cartCount} onCartClick={handleCartClick} user={mockUser} />

      {/* Main Content */}
      <main className="container mx-auto flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-neutral-900 sm:text-5xl dark:text-neutral-100">
            Welcome to Yard Sale 2.0
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
            A modern e-commerce experience built with React, TypeScript, and TailwindCSS. All
            components from PHASE 2 are now ready!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="primary" size="lg" leftIcon={<ShoppingCartIcon className="h-5 w-5" />}>
              Start Shopping
            </Button>
            <Button variant="outline" size="lg" onClick={() => setModalOpen(true)}>
              View Demo Modal
            </Button>
          </div>
        </section>

        {/* Components Demo Section */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            Component Showcase
          </h2>

          {/* Buttons */}
          <div className="mb-8">
            <h3 className="mb-4 text-lg font-semibold text-neutral-800 dark:text-neutral-200">
              Buttons
            </h3>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" onClick={handleAddToCart}>
                Add to Cart
              </Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Delete</Button>
              <Button variant="primary" loading>
                Loading...
              </Button>
              <Button
                variant="primary"
                leftIcon={<HeartIcon className="h-5 w-5" />}
                rightIcon={<ShoppingCartIcon className="h-5 w-5" />}
              >
                With Icons
              </Button>
            </div>
          </div>

          {/* Inputs */}
          <div className="mb-8">
            <h3 className="mb-4 text-lg font-semibold text-neutral-800 dark:text-neutral-200">
              Input Fields
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                type="email"
                label="Email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                label="Password"
                placeholder="••••••••"
                helperText="Must be at least 8 characters"
              />
              <Input
                type="text"
                label="Success State"
                defaultValue="Valid input"
                success
                helperText="Looks good!"
              />
              <Input
                type="text"
                label="Error State"
                defaultValue="Invalid input"
                error="This field is required"
              />
            </div>
          </div>

          {/* Cards */}
          <div className="mb-8">
            <h3 className="mb-4 text-lg font-semibold text-neutral-800 dark:text-neutral-200">
              Cards
            </h3>
            <div className="grid gap-6 md:grid-cols-3">
              <Card variant="default">
                <CardHeader>
                  <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">
                    Default Card
                  </h4>
                </CardHeader>
                <CardBody>
                  <p className="text-sm">This is a default card with subtle shadow.</p>
                </CardBody>
              </Card>

              <Card variant="elevated" hoverEffect clickable onClick={() => alert('Clicked!')}>
                <CardHeader>
                  <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">
                    Elevated Card
                  </h4>
                </CardHeader>
                <CardBody>
                  <p className="text-sm">This card has hover effect and is clickable.</p>
                </CardBody>
                <CardFooter>
                  <Button variant="primary" size="sm" fullWidth>
                    Action
                  </Button>
                </CardFooter>
              </Card>

              <Card variant="outlined">
                <CardHeader>
                  <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">
                    Outlined Card
                  </h4>
                </CardHeader>
                <CardBody>
                  <p className="text-sm">This card uses border instead of shadow.</p>
                </CardBody>
              </Card>
            </div>
          </div>

          {/* Skeletons */}
          <div className="mb-8">
            <h3 className="mb-4 text-lg font-semibold text-neutral-800 dark:text-neutral-200">
              Loading States (Skeletons)
            </h3>
            <div className="flex items-center gap-4">
              <Button
                variant={loading ? 'secondary' : 'primary'}
                onClick={() => setLoading(!loading)}
              >
                {loading ? 'Hide' : 'Show'} Loading State
              </Button>
            </div>
            {loading && (
              <div className="mt-6">
                <SkeletonProductGrid count={4} />
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Modal Demo */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Demo Modal" size="md">
        <ModalBody>
          <p className="mb-4">
            This is a modal with smooth animations powered by Framer Motion and Headless UI.
          </p>
          <p>
            You can close it by clicking the X button, clicking outside, or pressing the ESC key.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={() => setModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => setModalOpen(false)}>
            Confirm
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
