# TokoHijau - E-commerce Ramah Lingkungan 🌿

Aplikasi web e-commerce untuk produk ramah lingkungan, dibangun dengan React + Vite (Frontend) dan Node.js + Express + MongoDB (Backend).

## 📁 Struktur Project

```
WebTokoHijau/
├── frontend/                # Frontend React + Vite
│   ├── src/
│   │   ├── Component/      # Komponen React
│   │   ├── Pages/          # Halaman aplikasi
│   │   ├── services/       # API services
│   │   └── App.tsx
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                 # Backend API Express + MongoDB
│   ├── config/db.js
│   ├── controllers/
│   │   ├── productController.js
│   │   └── authController.js
│   ├── models/
│   │   ├── Product.js
│   │   └── User.js
│   ├── routes/
│   │   ├── productRoutes.js
│   │   └── authRoutes.js
│   ├── .env
│   ├── package.json
│   ├── seed.js
│   └── server.js
│
├── .gitignore
└── README.md
```

## 🚀 Cara Menjalankan

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (atau MongoDB local)

### 1. Install Dependencies

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 2. Setup MongoDB Atlas

1. Buat akun di [MongoDB Atlas](https://cloud.mongodb.com)
2. Buat cluster gratis
3. Buat database user
4. Whitelist IP (0.0.0.0/0)
5. Copy connection string

### 3. Configure Environment

Buat/edit `backend/.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tokohijau
PORT=5000
NODE_ENV=development
JWT_SECRET=your-secret-key
JWT_EXPIRE=30d
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
cd frontend
npm run dev
```

Buka browser: http://localhost:5173

## 📡 API Endpoints

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/products | Get semua produk |
| GET | /api/products/:id | Get satu produk |
| POST | /api/products | Tambah produk baru |
| PUT | /api/products/:id | Update produk |
| DELETE | /api/products/:id | Hapus produk |

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Registrasi user baru |
| POST | /api/auth/login | Login user |

## 📦 Fitur

### Frontend
- ✅ Halaman Home dengan Hero & Featured Products
- ✅ Halaman Produk dengan Filter & Search
- ✅ Halaman Detail Produk
- ✅ Halaman Login & Register dengan JWT
- ✅ Navbar dinamis (berubah saat login)
- ✅ Admin Dashboard
- ✅ Responsive Design

### Backend
- ✅ RESTful API
- ✅ CRUD Operations
- ✅ JWT Authentication
- ✅ Password Hashing (bcrypt)
- ✅ MongoDB Integration
- ✅ Error Handling

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Upload dist folder
```

### Backend (Railway/Render)
```bash
cd backend
# Push to GitHub, connect to Railway/Render
# Set environment variables
```

## 📄 License

MIT License
