import { Leaf, ShoppingCart } from 'lucide-react';

interface NavbarProps {
  currentPage?: 'home' | 'products';
  onNavigate?: (page: 'home' | 'products' | 'login') => void;
}

export function Navbar({ currentPage = 'home', onNavigate }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button 
            onClick={() => onNavigate?.('home')}
            className="flex items-center gap-2"
          >
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2 rounded-lg">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              TokoHijau
            </span>
          </button>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => onNavigate?.('home')}
              className={`font-medium transition-colors ${
                currentPage === 'home'
                  ? 'text-green-600'
                  : 'text-gray-700 hover:text-green-600'
              }`}
            >
              Beranda
            </button>
            <button
              onClick={() => onNavigate?.('products')}
              className={`font-medium transition-colors ${
                currentPage === 'products'
                  ? 'text-green-600'
                  : 'text-gray-700 hover:text-green-600'
              }`}
            >
              Produk
            </button>
            <button 
              onClick={() => onNavigate?.('login')}
              className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full hover:shadow-lg hover:scale-105 transition-all"
            >
              Login
            </button>
          </div>

          {/* Mobile Cart Icon */}
          <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ShoppingCart className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>
    </nav>
  );
}