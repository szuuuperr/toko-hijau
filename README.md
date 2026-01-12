# TokoHijau - E-commerce Ramah Lingkungan 🌿

Aplikasi web e-commerce untuk produk ramah lingkungan, dibangun dengan React + Vite (Frontend) dan Node.js + Express + MongoDB (Backend).

## 📸 Preview

Website toko online yang menjual produk-produk sustainable dan ramah lingkungan.

## 🛠️ Tech Stack

### Frontend
- **React** - UI Library
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **Axios** - HTTP Client
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime
- **Express.js** - Web Framework
- **MongoDB** - Database
- **Mongoose** - ODM

## 📁 Struktur Project

```
WebTokoHijau/
├── backend/                 # Backend API
│   ├── config/
│   │   └── db.js           # Database connection
│   ├── controllers/
│   │   └── productController.js
│   ├── models/
│   │   └── Product.js      # Product schema
│   ├── routes/
│   │   └── productRoutes.js
│   ├── .env                # Environment variables
│   ├── package.json
│   ├── seed.js             # Database seeder
│   └── server.js           # Entry point
│
├── src/                     # Frontend React
│   ├── Component/          # Komponen React
│   │   ├── admin/          # Komponen Admin
│   │   ├── figma/          # Komponen dari Figma
│   │   ├── ui/             # UI Components
│   │   └── *.tsx           # Komponen utama
│   ├── Pages/              # Halaman aplikasi
│   │   ├── ProductsPage.tsx
│   │   ├── ProductDetailPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   └── AdminLoginPage.tsx
│   ├── services/           # API services
│   │   └── api.ts
│   ├── styles/             # CSS Global
│   ├── App.tsx
│   └── main.tsx
│
├── package.json
├── vite.config.ts
└── README.md
```

## 🚀 Cara Menjalankan

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (atau MongoDB local)

### 1. Clone & Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
```

### 2. Setup MongoDB Atlas

1. Buat akun di [MongoDB Atlas](https://cloud.mongodb.com)
2. Buat cluster gratis
3. Buat database user
4. Whitelist IP (0.0.0.0/0)
5. Copy connection string

### 3. Configure Environment

Edit `backend/.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tokohijau
PORT=5000
NODE_ENV=development
```

### 4. Seed Database (Optional)

```bash
cd backend
node seed.js
```

### 5. Jalankan Aplikasi

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

Buka browser: http://localhost:5173

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/products | Get semua produk |
| GET | /api/products/:id | Get satu produk |
| POST | /api/products | Tambah produk baru |
| PUT | /api/products/:id | Update produk |
| DELETE | /api/products/:id | Hapus produk |

### Query Parameters

- `category` - Filter kategori
- `search` - Pencarian nama
- `minPrice` - Harga minimum
- `maxPrice` - Harga maksimum
- `sort` - Sorting (price-asc, price-desc, newest, rating)

## 📦 Fitur

### Frontend
- ✅ Halaman Home dengan Hero & Featured Products
- ✅ Halaman Produk dengan Filter & Search
- ✅ Halaman Detail Produk
- ✅ Halaman Login & Register
- ✅ Admin Dashboard
- ✅ Responsive Design
- ✅ Loading & Error States

### Backend
- ✅ RESTful API
- ✅ CRUD Operations
- ✅ Data Validation
- ✅ MongoDB Integration
- ✅ Error Handling
- ✅ CORS Enabled

## 👨‍💻 Development

```bash
# Frontend dev server
npm run dev

# Backend dev server (with nodemon)
cd backend && npm run dev

# Build frontend
npm run build
```

## 📄 License

MIT License
