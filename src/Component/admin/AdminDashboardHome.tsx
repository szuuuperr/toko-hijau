import { Package, ShoppingBag, Users, TrendingUp } from 'lucide-react';

export function AdminDashboardHome() {
  const stats = [
    { label: 'Total Produk', value: '156', icon: Package, color: 'from-blue-500 to-blue-600', change: '+12%' },
    { label: 'Total Pesanan', value: '1,240', icon: ShoppingBag, color: 'from-green-500 to-emerald-600', change: '+23%' },
    { label: 'Total Pengguna', value: '5,420', icon: Users, color: 'from-purple-500 to-pink-600', change: '+8%' },
    { label: 'Total Pendapatan', value: 'Rp 24,5 Juta', icon: TrendingUp, color: 'from-orange-500 to-red-600', change: '+15%' },
  ];

  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-900 mb-6">📊 Dashboard Overview</h3>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                {stat.change}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-lg p-8 text-white">
        <h4 className="text-2xl font-bold mb-2">Selamat Datang di Admin Panel TokoHijau! 🌿</h4>
        <p className="text-green-50">
          Kelola toko Anda dengan mudah. Gunakan menu di sebelah kiri untuk mengakses berbagai fitur.
        </p>
      </div>
    </div>
  );
}
