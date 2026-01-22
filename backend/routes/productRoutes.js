const express = require('express');
const router = express.Router();
const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

// Routes
router.route('/')
    .get(getProducts)      // GET /api/products - Ambil semua produk
    .post(createProduct);  // POST /api/products - Tambah produk baru

router.route('/:id')
    .get(getProduct)       // GET /api/products/:id - Ambil satu produk
    .put(updateProduct)    // PUT /api/products/:id - Update produk
    .delete(deleteProduct); // DELETE /api/products/:id - Hapus produk

module.exports = router;
