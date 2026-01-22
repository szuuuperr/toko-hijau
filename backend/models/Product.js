const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Nama produk harus diisi'],
        trim: true,
        maxlength: [200, 'Nama produk maksimal 200 karakter']
    },
    description: {
        type: String,
        required: [true, 'Deskripsi produk harus diisi'],
        maxlength: [2000, 'Deskripsi maksimal 2000 karakter']
    },
    price: {
        type: Number,
        required: [true, 'Harga produk harus diisi'],
        min: [0, 'Harga tidak boleh negatif']
    },
    category: {
        type: String,
        required: [true, 'Kategori produk harus diisi'],
        enum: {
            values: ['tas-aksesori', 'home-living', 'fashion', 'tanaman', 'skincare', 'perlengkapan'],
            message: 'Kategori tidak valid'
        }
    },
    image: {
        type: String,
        default: 'https://via.placeholder.com/400x300?text=No+Image'
    },
    stock: {
        type: Number,
        required: [true, 'Stok produk harus diisi'],
        min: [0, 'Stok tidak boleh negatif'],
        default: 0
    },
    rating: {
        type: Number,
        default: 0,
        min: [0, 'Rating minimal 0'],
        max: [5, 'Rating maksimal 5']
    },
    reviews: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true // Otomatis menambahkan createdAt dan updatedAt
});

// Virtual untuk format harga dalam Rupiah
productSchema.virtual('priceFormatted').get(function () {
    return `Rp ${this.price.toLocaleString('id-ID')}`;
});

// Pastikan virtual termasuk saat convert ke JSON
productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
