import { Outlet } from 'react-router-dom';
import { Header, Footer } from '@components/layout';
import { useAuth } from '@hooks/useAuth';

/**
 * Layout principal de la aplicación con Header y Footer
 * Automáticamente pasa los datos del usuario autenticado al Header
 */
export function MainLayout() {
  const { user } = useAuth();

  const handleCartClick = () => {
    alert('Cart sidebar would open here! (Próximamente en FASE 4)');
  };

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    alert(`Searching for: ${query} (Próximamente en FASE 4)`);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        cartItemsCount={0}
        onCartClick={handleCartClick}
        user={user ? { name: user.name, avatar: user.avatar || undefined } : null}
        onSearch={handleSearch}
      />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
