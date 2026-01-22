import { Recycle, Truck, ShieldCheck, Heart } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: Recycle,
      title: 'Ramah Lingkungan',
      description: 'Semua produk kami dipilih dengan cermat untuk meminimalkan dampak lingkungan',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Truck,
      title: 'Pengiriman Cepat',
      description: 'Gratis ongkir untuk pembelian di atas Rp 200.000',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: ShieldCheck,
      title: 'Produk Berkualitas',
      description: 'Jaminan 100% kualitas terbaik untuk setiap produk',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Heart,
      title: 'Peduli Bumi',
      description: '1% dari setiap pembelian untuk program penghijauan',
      color: 'from-red-500 to-orange-500',
    },
  ];

  return (
    <div className="py-20 bg-gradient-to-b from-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Mengapa Memilih TokoHijau?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Kami berkomitmen memberikan pengalaman belanja terbaik dengan produk berkualitas yang ramah lingkungan
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
