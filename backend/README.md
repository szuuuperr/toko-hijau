# TokoHijau Backend API

Backend RESTful API untuk TokoHijau E-commerce Platform.

## Tech Stack
- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose

## Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Setup MongoDB Atlas

1. Buka [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Buat akun gratis atau login
3. Buat Cluster baru (pilih Free Tier)
4. Buat Database User:
   - Klik "Database Access" di sidebar
   - Klik "Add New Database User"
   - Isi username dan password, simpan kredensial ini
5. Whitelist IP Address:
   - Klik "Network Access" di sidebar
   - Klik "Add IP Address"
   - Pilih "Allow Access from Anywhere" (0.0.0.0/0) untuk development
6. Dapatkan Connection String:
   - Klik "Connect" pada cluster
   - Pilih "Connect your application"
   - Copy connection string

### 3. Configure Environment Variables

Edit file `.env`:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/tokohijau?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
```

Ganti:
- `<username>` dengan Database username Anda
- `<password>` dengan Database password Anda
- `cluster0.xxxxx` dengan cluster address Anda

### 4. Seed Database (Optional)
```bash
node seed.js
```

### 5. Run Server
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

## API Endpoints

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/products | Get all products |
| GET | /api/products/:id | Get single product |
| POST | /api/products | Create new product |
| PUT | /api/products/:id | Update product |
| DELETE | /api/products/:id | Delete product |

### Query Parameters (GET /api/products)

| Parameter | Description | Example |
|-----------|-------------|---------|
| category | Filter by category | ?category=fashion |
| search | Search by name | ?search=tas |
| minPrice | Minimum price | ?minPrice=50000 |
| maxPrice | Maximum price | ?maxPrice=200000 |
| sort | Sort results | ?sort=price-asc |

Sort options: `price-asc`, `price-desc`, `newest`, `rating`

### Example Request

**Create Product:**
```json
POST /api/products
{
  "name": "Tas Belanja Kain Organik",
  "description": "Tas belanja ramah lingkungan",
  "price": 85000,
  "category": "tas-aksesori",
  "stock": 50,
  "image": "https://example.com/image.jpg"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Produk berhasil ditambahkan",
  "data": {
    "_id": "...",
    "name": "Tas Belanja Kain Organik",
    "price": 85000,
    "priceFormatted": "Rp 85.000",
    ...
  }
}
```

## Categories

Available categories:
- `tas-aksesori` - Tas & Aksesori
- `home-living` - Home & Living
- `fashion` - Fashion Sustainable
- `tanaman` - Tanaman & Berkebun
- `skincare` - Skincare & Beauty
- `perlengkapan` - Perlengkapan Rumah
