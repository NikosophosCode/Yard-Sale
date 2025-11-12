import { Outlet } from 'react-router-dom';
import { Header, Footer } from '@components/layout';
import { CartSidebar } from '@components/cart';
import { Breadcrumbs, SkipLink } from '@components/common';

/**
 * Layout principal de la aplicación con Header, Footer y CartSidebar
 */
export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <SkipLink />
      <Header />

      <main id="main-content" className="flex-1" tabIndex={-1}>
        {/* <div className="px-4 py-8 sm:px-6 lg:px-8"> */}
          <div>
          <Breadcrumbs />
          <Outlet />
        </div>
      </main>

      <Footer />
      
      {/* Cart Sidebar */}
      <CartSidebar />
    </div>
  );
}
