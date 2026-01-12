import { useEffect, useState } from 'react';
import { Star, ShoppingCart, Loader2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Filters } from '../Pages/ProductsPage';
import { productAPI, type Product } from '../services/api';

interface ProductGridProps {
  filters: Filters;
  onProductClick: (productId: string) => void;
}

export function ProductGrid({ filters, onProductClick }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Build API filters
        const apiFilters = {
          category: filters.category.length === 1 ? filters.category[0] : undefined,
          search: filters.searchQuery || undefined,
          minPrice: filters.priceRange[0] > 0 ? filters.priceRange[0] : undefined,
          maxPrice: filters.priceRange[1] < 1000000 ? filters.priceRange[1] : undefined,
        };

        const response = await productAPI.getProducts(apiFilters);

        if (response.success) {
          // Apply additional client-side filtering for multiple categories and rating
          let filteredProducts = response.data;

          // Filter by multiple categories (API only supports one)
          if (filters.category.length > 1) {
            filteredProducts = filteredProducts.filter(p =>
              filters.category.includes(p.category)
            );
          }

          // Filter by rating
          if (filters.rating > 0) {
            filteredProducts = filteredProducts.filter(p => p.rating >= filters.rating);
          }

          setProducts(filteredProducts);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Gagal memuat produk. Pastikan backend server berjalan.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Loader2 className="w-12 h-12 text-green-600 animate-spin mb-4" />
        <p className="text-gray-600">Memuat produk...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-4xl">⚠️</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Terjadi Kesalahan
        </h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Menampilkan <span className="font-semibold text-gray-900">{products.length}</span> produk
        </p>
      </div>

      {/* Product Grid */}
      {products.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              onClick={() => onProductClick(product._id)}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer"
            >
              <div className="relative overflow-hidden">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg">
                    <svg
                      className="w-5 h-5 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                </div>
                {product.stock <= 5 && product.stock > 0 && (
                  <div className="absolute top-4 left-4">
                    <span className="px-2 py-1 bg-orange-500 text-white text-xs font-medium rounded">
                      Stok Terbatas
                    </span>
                  </div>
                )}
                {product.stock === 0 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg">
                      Habis
                    </span>
                  </div>
                )}
              </div>

              <div className="p-5">
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium text-gray-700">
                    {product.rating.toFixed(1)}
                  </span>
                  <span className="text-sm text-gray-500">
                    ({product.reviews})
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                  {product.name}
                </h3>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-600">
                    {product.priceFormatted}
                  </span>
                  <button
                    className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-lg hover:scale-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={product.stock === 0}
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">🔍</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Produk tidak ditemukan
          </h3>
          <p className="text-gray-600">
            Coba ubah filter atau kata kunci pencarian Anda
          </p>
        </div>
      )}
    </div>
  );
}