import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { ToastProvider } from '@/contexts/ToastContext';
import { Router } from '@/router';

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <AuthProvider>
        <ToastProvider>
          <Router />
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
