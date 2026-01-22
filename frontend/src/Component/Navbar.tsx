import { Leaf, ShoppingCart, User, LogOut, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { authAPI, type User as UserType } from '../services/api';

interface NavbarProps {
  currentPage?: 'home' | 'products';
  onNavigate?: (page: 'home' | 'products' | 'login') => void;
  isLoggedIn?: boolean;
  user?: UserType | null;
  onLogout?: () => void;
}

export function Navbar({ currentPage = 'home', onNavigate, isLoggedIn = false, user, onLogout }: NavbarProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    authAPI.logout();
    setShowDropdown(false);
    onLogout?.();
  };

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
              className={`font-medium transition-colors ${currentPage === 'home'
                  ? 'text-green-600'
                  : 'text-gray-700 hover:text-green-600'
                }`}
            >
              Beranda
            </button>
            <button
              onClick={() => onNavigate?.('products')}
              className={`font-medium transition-colors ${currentPage === 'products'
                  ? 'text-green-600'
                  : 'text-gray-700 hover:text-green-600'
                }`}
            >
              Produk
            </button>

            {isLoggedIn && user ? (
              /* User Dropdown - When Logged In */
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full hover:bg-green-100 transition-all"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium max-w-[120px] truncate">{user.name}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="font-medium">Keluar</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Login Button - When Not Logged In */
              <button
                onClick={() => onNavigate?.('login')}
                className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full hover:shadow-lg hover:scale-105 transition-all"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile - Cart Icon and User Avatar */}
          <div className="md:hidden flex items-center gap-2">
            {isLoggedIn && user && (
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            )}
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ShoppingCart className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}