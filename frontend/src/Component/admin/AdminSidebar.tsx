import { LayoutDashboard, Package, FolderOpen, ShoppingBag, Leaf } from 'lucide-react';

interface AdminSidebarProps {
  currentPage: string;
  onNavigate: (page: 'dashboard' | 'products' | 'categories' | 'orders') => void;
}

export function AdminSidebar({ currentPage, onNavigate }: AdminSidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Produk', icon: Package },
    { id: 'categories', label: 'Kategori', icon: FolderOpen },
    { id: 'orders', label: 'Pesanan', icon: ShoppingBag },
  ];

  return (
    <aside className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white flex-shrink-0">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2 rounded-lg">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">TokoHijau</h1>
            <p className="text-xs text-gray-400">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="p-4">
        <p className="text-xs font-semibold text-gray-400 uppercase mb-4 px-3">Menu</p>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onNavigate(item.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  currentPage === item.id
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
