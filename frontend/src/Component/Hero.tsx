import { ShoppingBag, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Hero() {
  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-block">
              <span className="px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                🌿 Produk Ramah Lingkungan
              </span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Belanja Hijau,{' '}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Masa Depan Cerah
              </span>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              Temukan berbagai produk berkualitas yang ramah lingkungan. 
              Bergabunglah dengan kami untuk menciptakan dunia yang lebih hijau dan berkelanjutan.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-medium hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Mulai Belanja
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 border-2 border-green-600 text-green-600 rounded-full font-medium hover:bg-green-50 transition-all">
                Pelajari Lebih Lanjut
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div>
                <div className="text-3xl font-bold text-green-600">1000+</div>
                <div className="text-sm text-gray-600">Produk Tersedia</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600">5000+</div>
                <div className="text-sm text-gray-600">Pelanggan Puas</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600">100%</div>
                <div className="text-sm text-gray-600">Ramah Lingkungan</div>
              </div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative">
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
            <div className="absolute -bottom-8 -left-4 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '2s' }}></div>
            
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1675225660576-64a2cafc7fbc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMHBsYW50cyUyMG5hdHVyZXxlbnwxfHx8fDE3NjgxODM1OTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Eco-friendly products"
                className="relative rounded-3xl shadow-2xl w-full h-[500px] object-cover"
              />
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🌱</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Eco-Certified</div>
                    <div className="text-sm text-gray-600">100% Organic</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
