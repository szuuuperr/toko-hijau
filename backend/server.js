const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// API Routes
app.use('/api/products', require('./routes/productRoutes'));

// Root route
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to TokoHijau API',
        version: '1.0.0',
        endpoints: {
            products: '/api/products'
        }
    });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint tidak ditemukan'
    });
});

// Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan pada server',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`
  🚀 TokoHijau API Server Started!
  ================================
  🌐 Server running on: http://localhost:${PORT}
  📦 API Endpoints: http://localhost:${PORT}/api/products
  🔧 Environment: ${process.env.NODE_ENV || 'development'}
  `);
});
