import { Star, ShoppingCart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface RelatedProductsProps {
  currentProductId: string;
}

export function RelatedProducts({ currentProductId: _currentProductId }: RelatedProductsProps) {
  const relatedProducts = [
    {
      id: 11,
      name: 'Tote Bag Canvas Premium',
      price: 'Rp 95.000',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1633878353628-5fc8b983325c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY28lMjBmcmllbmRseSUyMHByb2R1Y3RzfGVufDF8fHx8MTc2ODExMjkyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 12,
      name: 'Tas Punggung Sustainable',
      price: 'Rp 225.000',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1582803824122-f25becf36ad8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMHNob3BwaW5nfGVufDF8fHx8MTc2ODE4MzU5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 13,
      name: 'Pouch Mini Organik',
      price: 'Rp 55.000',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1563391506244-af91a410fcc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW1ib28lMjBwcm9kdWN0c3xlbnwxfHx8fDE3NjgxODM5MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 14,
      name: 'Tas Serut Ramah Lingkungan',
      price: 'Rp 75.000',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1614806687007-2215a9db3b1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwcHJvZHVjdHN8ZW58MXx8fHwxNzY4MTgzOTA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Produk Terkait</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <div
            key={product.id}
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer"
          >
            <div className="relative overflow-hidden">
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            <div className="p-4">
              <div className="flex items-center gap-1 mb-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium text-gray-700">
                  {product.rating}
                </span>
              </div>

              <h3 className="text-base font-bold text-gray-900 mb-3 line-clamp-2">
                {product.name}
              </h3>

              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-green-600">
                  {product.price}
                </span>
                <button className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg hover:scale-110 transition-all">
                  <ShoppingCart className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
