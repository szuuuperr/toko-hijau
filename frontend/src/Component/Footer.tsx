import { Leaf, Facebook, Instagram, Twitter, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2 rounded-lg">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">TokoHijau</span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-4">
              Platform e-commerce terpercaya untuk produk ramah lingkungan. Bersama kita ciptakan masa depan yang lebih hijau.
            </p>
            <div className="flex gap-3">
              <button className="p-2 bg-gray-800 hover:bg-green-600 rounded-lg transition-colors">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="p-2 bg-gray-800 hover:bg-green-600 rounded-lg transition-colors">
                <Instagram className="w-5 h-5" />
              </button>
              <button className="p-2 bg-gray-800 hover:bg-green-600 rounded-lg transition-colors">
                <Twitter className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Produk */}
          <div>
            <h3 className="font-bold text-lg mb-4">Produk</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                  Tas & Aksesori
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                  Home & Living
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                  Fashion Sustainable
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                  Tanaman & Berkebun
                </a>
              </li>
            </ul>
          </div>

          {/* Perusahaan */}
          <div>
            <h3 className="font-bold text-lg mb-4">Perusahaan</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                  Karir
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                  Hubungi Kami
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Dapatkan update produk terbaru dan promo spesial
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email Anda"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500 text-white"
              />
              <button className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg hover:shadow-lg transition-all">
                <Mail className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2026 TokoHijau. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
              Kebijakan Privasi
            </a>
            <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
              Syarat & Ketentuan
            </a>
            <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
              FAQ
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
