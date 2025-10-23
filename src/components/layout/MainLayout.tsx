import { Outlet } from 'react-router-dom';
import { Header, Footer } from '@components/layout';
import { CartSidebar } from '@components/cart';

/**
 * Layout principal de la aplicación con Header, Footer y CartSidebar
 */
export function MainLayout() {
  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // TODO: Implementar búsqueda real
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header onSearch={handleSearch} />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
      
      {/* Cart Sidebar */}
      <CartSidebar />
    </div>
  );
}
