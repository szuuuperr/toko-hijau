import { useState } from 'react';
import { Navbar } from './Component/Navbar';
import { Hero } from './Component/Hero';
import { FeaturedProducts } from './Component/FeaturedProducts';
import { Features } from './Component/Features';
import { Footer } from './Component/Footer';
import { ProductsPage } from './Pages/ProductsPage';
import { ProductDetailPage } from './Pages/ProductDetailPage';
import { LoginPage } from './Pages/LoginPage';
import { RegisterPage } from './Pages/RegisterPage';
import { AdminLoginPage } from './Pages/AdminLoginPage';
import { AdminDashboard } from './Component/admin/AdminDashboard';

type PageType = 'home' | 'products' | 'detail' | 'login' | 'register' | 'admin-login' | 'admin-dashboard';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const handleProductClick = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentPage('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminLogin = () => {
    setCurrentPage('admin-dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero />
            <Features />
            <FeaturedProducts onViewAll={() => handleNavigate('products')} />
          </>
        );
      case 'products':
        return <ProductsPage onProductClick={handleProductClick} />;
      case 'detail':
        return <ProductDetailPage productId={selectedProductId} onBack={() => setCurrentPage('products')} />;
      case 'login':
        return <LoginPage onNavigateToRegister={() => handleNavigate('register')} onNavigateToAdmin={() => handleNavigate('admin-login')} />;
      case 'register':
        return <RegisterPage onNavigateToLogin={() => handleNavigate('login')} />;
      case 'admin-login':
        return <AdminLoginPage onBackToLogin={() => handleNavigate('login')} onLogin={handleAdminLogin} />;
      case 'admin-dashboard':
        return <AdminDashboard onLogout={handleLogout} />;
      default:
        return null;
    }
  };

  const getNavPage = (): 'home' | 'products' => {
    if (currentPage === 'products' || currentPage === 'detail') return 'products';
    return 'home';
  };

  const showNavAndFooter = currentPage !== 'login' && currentPage !== 'register' && currentPage !== 'admin-login' && currentPage !== 'admin-dashboard';

  return (
    <div className="min-h-screen bg-white">
      {showNavAndFooter && <Navbar currentPage={getNavPage()} onNavigate={handleNavigate} />}
      {renderPage()}
      {showNavAndFooter && <Footer />}
    </div>
  );
}
