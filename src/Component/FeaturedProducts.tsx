import { useEffect, useState } from 'react';
import { Star, ShoppingCart, Loader2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { productAPI, type Product } from '../services/api';

interface FeaturedProductsProps {
  onViewAll?: () => void;
}

export function FeaturedProducts({ onViewAll }: FeaturedProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productAPI.getProducts({ sort: 'rating' });

        if (response.success) {
          // Take top 3 products with highest rating
          setProducts(response.data.slice(0, 3));
        }
      } catch (err) {
        console.error('Error fetching featured products:', err);
        setError('Gagal memuat produk unggulan');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Category mapping for display
  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      'tas-aksesori': 'Aksesori',
      'home-living': 'Home & Living',
      'fashion': 'Fashion',
      'tanaman': 'Tanaman',
      'skincare': 'Skincare',
      'perlengkapan': 'Perlengkapan',
    };
    return labels[category] || category;
  };

  return (
    <div id="produk" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              Produk Unggulan
            </h2>
            <p className="text-xl text-gray-600">
              Pilihan terbaik untuk gaya hidup berkelanjutan
            </p>
          </div>
          <button
            onClick={onViewAll}
            className="hidden md:block px-6 py-3 border-2 border-green-600 text-green-600 rounded-full font-medium hover:bg-green-50 transition-all"
          >
            Lihat Semua
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="w-12 h-12 text-green-600 animate-spin mb-4" />
            <p className="text-gray-600">Memuat produk unggulan...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-gray-600">{error}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2"
              >
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-green-500 text-white text-sm font-medium rounded-full">
                      {getCategoryLabel(product.category)}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-700">
                      {product.rating.toFixed(1)}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">
                      ({product.reviews}+ ulasan)
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {product.name}
                  </h3>

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-2xl font-bold text-green-600">
                      {product.priceFormatted}
                    </span>
                    <button className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full hover:shadow-lg hover:scale-110 transition-all">
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12 md:hidden">
          <button
            onClick={onViewAll}
            className="px-6 py-3 border-2 border-green-600 text-green-600 rounded-full font-medium hover:bg-green-50 transition-all"
          >
            Lihat Semua Produk
          </button>
        </div>
      </div>
    </div>
  );
}
