import { useState } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { ProductFormModal } from './ProductFormModal';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  priceFormatted: string;
  stock: number;
  image: string;
  description: string;
}

export function AdminProducts() {
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Tas Belanja Kain Organik',
      category: 'tas-aksesori',
      price: 85000,
      priceFormatted: 'Rp 85.000',
      stock: 48,
      image: 'https://images.unsplash.com/photo-1677753669555-0866d9a48605?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXVzYWJsZSUyMHNob3BwaW5nJTIwYmFnfGVufDF8fHx8MTc2ODE4MzkwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Tas belanja ramah lingkungan dari bahan organik',
    },
    {
      id: 2,
      name: 'Sikat Gigi Bambu Natural',
      category: 'perlengkapan',
      price: 45000,
      priceFormatted: 'Rp 45.000',
      stock: 120,
      image: 'https://images.unsplash.com/photo-1563391506244-af91a410fcc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW1ib28lMjBwcm9kdWN0c3xlbnwxfHx8fDE3NjgxODM5MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Sikat gigi ramah lingkungan dari bambu alami',
    },
    {
      id: 3,
      name: 'Set Skincare Organik',
      category: 'skincare',
      price: 275000,
      priceFormatted: 'Rp 275.000',
      stock: 35,
      image: 'https://images.unsplash.com/photo-1748543668676-ea8241cb3886?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwc2tpbmNhcmV8ZW58MXx8fHwxNzY4MTgzOTA2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Set perawatan kulit dari bahan organik',
    },
    {
      id: 4,
      name: 'Kaos Katun Sustainable',
      category: 'fashion',
      price: 125000,
      priceFormatted: 'Rp 125.000',
      stock: 65,
      image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY28lMjBmcmllbmRseSUyMGNsb3RoZXN8ZW58MXx8fHwxNzY4MTgzOTA2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Kaos dari katun organik yang nyaman',
    },
    {
      id: 5,
      name: 'Tanaman Hias Air Purifier',
      category: 'tanaman',
      price: 65000,
      priceFormatted: 'Rp 65.000',
      stock: 90,
      image: 'https://images.unsplash.com/photo-1675225660576-64a2cafc7fbc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMHBsYW50cyUyMG5hdHVyZXxlbnwxfHx8fDE3NjgxODM1OTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Tanaman hias yang menyegarkan udara',
    },
  ]);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddProduct = () => {
    setEditProduct(null);
    setShowModal(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditProduct(product);
    setShowModal(true);
  };

  const handleDeleteProduct = (id: number) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const handleSaveProduct = (productData: any) => {
    if (editProduct) {
      // Update existing product
      setProducts(
        products.map((p) =>
          p.id === editProduct.id
            ? {
                ...p,
                ...productData,
                price: parseInt(productData.price),
                priceFormatted: `Rp ${parseInt(productData.price).toLocaleString('id-ID')}`,
              }
            : p
        )
      );
    } else {
      // Add new product
      const newProduct: Product = {
        id: products.length + 1,
        ...productData,
        price: parseInt(productData.price),
        priceFormatted: `Rp ${parseInt(productData.price).toLocaleString('id-ID')}`,
        image: productData.image || 'https://images.unsplash.com/photo-1633878353628-5fc8b983325c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY28lMjBmcmllbmRseSUyMHByb2R1Y3RzfGVufDF8fHx8MTc2ODExMjkyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      };
      setProducts([...products, newProduct]);
    }
    setShowModal(false);
  };

  const getCategoryLabel = (categoryId: string) => {
    const categories: { [key: string]: string } = {
      'tas-aksesori': 'Tas & Aksesori',
      'home-living': 'Home & Living',
      'fashion': 'Fashion Sustainable',
      'tanaman': 'Tanaman & Berkebun',
      'skincare': 'Skincare & Beauty',
      'perlengkapan': 'Perlengkapan Rumah',
    };
    return categories[categoryId] || categoryId;
  };

  return (
    <div>
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">📦 Kelola Produk</h3>
            <p className="text-sm text-gray-600 mt-1">
              Total {products.length} produk terdaftar
            </p>
          </div>
          <button
            onClick={handleAddProduct}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
            Tambah Produk
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Cari produk..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  No
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Gambar
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Nama Produk
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Kategori
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Harga
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Stok
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedProducts.map((product, index) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="px-6 py-4">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-gray-900">{product.name}</p>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                      {product.description}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                      {getCategoryLabel(product.category)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                    {product.priceFormatted}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-semibold ${
                      product.stock < 20 ? 'text-red-600' : 'text-gray-900'
                    }`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              ←
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentPage === page
                    ? 'bg-green-600 text-white'
                    : 'border border-gray-300 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <ProductFormModal
          product={editProduct}
          onClose={() => setShowModal(false)}
          onSave={handleSaveProduct}
        />
      )}
    </div>
  );
}
