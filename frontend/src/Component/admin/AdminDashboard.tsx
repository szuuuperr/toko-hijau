import { useState } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { AdminProducts } from './AdminProducts';
import { AdminDashboardHome } from './AdminDashboardHome';
import { AdminCategories } from './AdminCategories';
import { AdminOrders } from './AdminOrders';

interface AdminDashboardProps {
  onLogout: () => void;
}

type AdminPageType = 'dashboard' | 'products' | 'categories' | 'orders';

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [currentPage, setCurrentPage] = useState<AdminPageType>('dashboard');

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <AdminDashboardHome />;
      case 'products':
        return <AdminProducts />;
      case 'categories':
        return <AdminCategories />;
      case 'orders':
        return <AdminOrders />;
      default:
        return <AdminDashboardHome />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <AdminSidebar currentPage={currentPage} onNavigate={setCurrentPage} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <AdminHeader onLogout={onLogout} />

        {/* Content */}
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
