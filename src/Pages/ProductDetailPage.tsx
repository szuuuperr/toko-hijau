import { useState, useEffect } from 'react';
import { ChevronLeft, Star, ShoppingCart, Heart, Share2, Truck, ShieldCheck, RefreshCw, Minus, Plus, Loader2 } from 'lucide-react';
import { ImageWithFallback } from '../Component/figma/ImageWithFallback';
import { ProductReviews } from '../Component/ProductReviews';
import { RelatedProducts } from '../Component/RelatedProducts';
import { productAPI, type Product } from '../services/api';

interface ProductDetailPageProps {
  productId: string | null;
  onBack: () => void;
}

// Extended product type for detail page
interface ProductDetail extends Product {
  images: string[];
  features: string[];
  specifications: Record<string, string>;
  sold: number;
  originalPrice: string;
}

export function ProductDetailPage({ productId, onBack }: ProductDetailPageProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setError('Product ID tidak ditemukan');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await productAPI.getProduct(productId);

        if (response.success) {
          // Transform API product to ProductDetail
          const apiProduct = response.data;
          const detailProduct: ProductDetail = {
            ...apiProduct,
            images: [
              apiProduct.image,
              'https://images.unsplash.com/photo-1633878353628-5fc8b983325c?w=800',
              'https://images.unsplash.com/photo-1582803824122-f25becf36ad8?w=800',
            ],
            features: [
              '100% Bahan Berkualitas',
              'Ramah Lingkungan',
              'Tahan Lama',
              'Mudah Dibersihkan',
              'Design Minimalis',
              'Bebas Bahan Berbahaya',
            ],
            specifications: {
              'Kategori': getCategoryLabel(apiProduct.category),
              'Rating': `${apiProduct.rating} / 5`,
              'Stok': `${apiProduct.stock} unit`,
              'Ulasan': `${apiProduct.reviews} ulasan`,
            },
            sold: Math.floor(apiProduct.reviews * 8),
            originalPrice: `Rp ${Math.floor(apiProduct.price * 1.3).toLocaleString('id-ID')}`,
          };
          setProduct(detailProduct);
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Gagal memuat detail produk');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      'tas-aksesori': 'Tas & Aksesori',
      'home-living': 'Home & Living',
      'fashion': 'Fashion Sustainable',
      'tanaman': 'Tanaman & Berkebun',
      'skincare': 'Skincare & Beauty',
      'perlengkapan': 'Perlengkapan Rumah',
    };
    return labels[category] || category;
  };

  const handleQuantityChange = (delta: number) => {
    if (!product) return;
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-green-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Memuat detail produk...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">⚠️</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {error || 'Produk tidak ditemukan'}
          </h3>
          <button
            onClick={onBack}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Kembali ke Produk
          </button>
        </div>
      </div>
    );
  }

  const discountPercent = Math.round((1 - product.price / (product.price * 1.3)) * 100);

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Kembali ke Produk</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Product Info Section */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
          <div className="grid lg:grid-cols-2 gap-8 p-8">
            {/* Image Gallery */}
            <div>
              <div className="mb-4">
                <ImageWithFallback
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-2xl"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`rounded-xl overflow-hidden border-2 transition-all ${selectedImage === index
                        ? 'border-green-500 scale-95'
                        : 'border-gray-200 hover:border-green-300'
                      }`}
                  >
                    <ImageWithFallback
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-24 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div>
              <div className="mb-4">
                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                  {getCategoryLabel(product.category)}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-gray-900">{product.rating.toFixed(1)}</span>
                </div>
                <span className="text-gray-400">|</span>
                <span className="text-gray-600">{product.reviews} Ulasan</span>
                <span className="text-gray-400">|</span>
                <span className="text-gray-600">{product.sold} Terjual</span>
              </div>

              <div className="bg-green-50 rounded-xl p-6 mb-6">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-4xl font-bold text-green-600">
                    {product.priceFormatted}
                  </span>
                  <span className="text-lg text-gray-400 line-through">
                    {product.originalPrice}
                  </span>
                  <span className="px-2 py-1 bg-red-500 text-white text-sm font-semibold rounded">
                    {discountPercent}% OFF
                  </span>
                </div>
                <p className="text-sm text-green-700">
                  Hemat dengan promo spesial!
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Jumlah
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border-2 border-gray-300 rounded-xl">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="p-3 hover:bg-gray-100 transition-colors"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-5 h-5 text-gray-600" />
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 1;
                        if (val >= 1 && val <= product.stock) {
                          setQuantity(val);
                        }
                      }}
                      className="w-16 text-center font-semibold text-lg focus:outline-none"
                    />
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="p-3 hover:bg-gray-100 transition-colors"
                      disabled={quantity >= product.stock}
                    >
                      <Plus className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                  <span className="text-gray-600">
                    Stok tersisa: <span className="font-semibold text-gray-900">{product.stock}</span>
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mb-6">
                <button className="flex-1 px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Tambah ke Keranjang
                </button>
                <button className="px-4 py-4 border-2 border-green-600 text-green-600 rounded-xl hover:bg-green-50 transition-colors">
                  <Heart className="w-6 h-6" />
                </button>
                <button className="px-4 py-4 border-2 border-gray-300 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors">
                  <Share2 className="w-6 h-6" />
                </button>
              </div>

              <button className="w-full px-6 py-4 bg-white border-2 border-green-600 text-green-600 rounded-xl font-semibold hover:bg-green-50 transition-colors">
                Beli Sekarang
              </button>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Truck className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-xs text-gray-600">Gratis Ongkir</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <ShieldCheck className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-xs text-gray-600">Garansi 100%</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <RefreshCw className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-xs text-gray-600">Mudah Retur</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('description')}
                className={`flex-1 px-6 py-4 font-semibold transition-colors ${activeTab === 'description'
                    ? 'text-green-600 border-b-2 border-green-600'
                    : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                Deskripsi
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`flex-1 px-6 py-4 font-semibold transition-colors ${activeTab === 'specs'
                    ? 'text-green-600 border-b-2 border-green-600'
                    : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                Spesifikasi
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`flex-1 px-6 py-4 font-semibold transition-colors ${activeTab === 'reviews'
                    ? 'text-green-600 border-b-2 border-green-600'
                    : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                Ulasan ({product.reviews})
              </button>
            </div>
          </div>

          <div className="p-8">
            {activeTab === 'description' && (
              <div>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {product.description}
                </p>
                <h3 className="font-bold text-lg text-gray-900 mb-4">
                  Keunggulan Produk:
                </h3>
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg
                          className="w-4 h-4 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'specs' && (
              <div>
                <table className="w-full">
                  <tbody>
                    {Object.entries(product.specifications).map(([key, value], index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                      >
                        <td className="px-6 py-4 font-semibold text-gray-900 w-1/3">
                          {key}
                        </td>
                        <td className="px-6 py-4 text-gray-700">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'reviews' && <ProductReviews />}
          </div>
        </div>

        {/* Related Products */}
        <RelatedProducts currentProductId={product._id} />
      </div>
    </div>
  );
}
