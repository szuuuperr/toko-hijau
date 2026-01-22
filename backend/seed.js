const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const products = [
    {
        name: 'Tas Belanja Kain Organik',
        description: 'Tas belanja yang terbuat dari 100% kain organik berkualitas tinggi. Dirancang dengan sempurna untuk kebutuhan berbelanja sehari-hari Anda. Kuat, tahan lama, dan ramah lingkungan.',
        price: 85000,
        category: 'tas-aksesori',
        image: 'https://images.unsplash.com/photo-1677753669555-0866d9a48605?w=800',
        stock: 50,
        rating: 4.8,
        reviews: 156
    },
    {
        name: 'Sikat Gigi Bambu Natural',
        description: 'Sikat gigi ramah lingkungan yang terbuat dari bambu alami. Bulu sikat lembut dan efektif membersihkan gigi. Biodegradable dan sustainable.',
        price: 45000,
        category: 'perlengkapan',
        image: 'https://images.unsplash.com/photo-1563391506244-af91a410fcc9?w=800',
        stock: 100,
        rating: 4.9,
        reviews: 203
    },
    {
        name: 'Set Skincare Organik',
        description: 'Set lengkap skincare organik yang terdiri dari cleanser, toner, dan moisturizer. Dibuat dari bahan-bahan alami tanpa bahan kimia berbahaya.',
        price: 275000,
        category: 'skincare',
        image: 'https://images.unsplash.com/photo-1614806687007-2215a9db3b1c?w=800',
        stock: 30,
        rating: 5.0,
        reviews: 89
    },
    {
        name: 'Kaos Katun Sustainable',
        description: 'Kaos yang terbuat dari 100% katun organik yang ditanam secara berkelanjutan. Nyaman dipakai dan ramah lingkungan.',
        price: 125000,
        category: 'fashion',
        image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800',
        stock: 75,
        rating: 4.7,
        reviews: 142
    },
    {
        name: 'Tanaman Hias Air Purifier',
        description: 'Tanaman hias yang berfungsi sebagai pembersih udara alami. Cocok untuk dekorasi rumah dan menyehatkan lingkungan.',
        price: 65000,
        category: 'tanaman',
        image: 'https://images.unsplash.com/photo-1675225660576-64a2cafc7fbc?w=800',
        stock: 45,
        rating: 4.6,
        reviews: 178
    },
    {
        name: 'Sabun Natural Handmade',
        description: 'Sabun handmade yang terbuat dari bahan-bahan alami seperti minyak kelapa dan essential oil. Lembut untuk kulit dan ramah lingkungan.',
        price: 35000,
        category: 'skincare',
        image: 'https://images.unsplash.com/photo-1614806687007-2215a9db3b1c?w=800',
        stock: 120,
        rating: 4.8,
        reviews: 234
    },
    {
        name: 'Dekorasi Rumah Minimalis',
        description: 'Set dekorasi rumah minimalis dari bahan-bahan alami. Menambah estetika ruangan dengan konsep ramah lingkungan.',
        price: 185000,
        category: 'home-living',
        image: 'https://images.unsplash.com/photo-1594026112499-ac6e20b2c480?w=800',
        stock: 25,
        rating: 4.9,
        reviews: 98
    },
    {
        name: 'Tote Bag Canvas Premium',
        description: 'Tote bag premium dari bahan canvas tebal berkualitas tinggi. Cocok untuk aktivitas sehari-hari dan dapat digunakan berulang kali.',
        price: 95000,
        category: 'tas-aksesori',
        image: 'https://images.unsplash.com/photo-1633878353628-5fc8b983325c?w=800',
        stock: 60,
        rating: 4.7,
        reviews: 167
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        await Product.deleteMany({});
        console.log('Deleted existing products');

        const createdProducts = await Product.insertMany(products);
        console.log(`Added ${createdProducts.length} products`);

        console.log('\nProducts added:');
        createdProducts.forEach((p, i) => {
            console.log(`   ${i + 1}. ${p.name} - ${p.priceFormatted}`);
        });

        console.log('\nDatabase seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error.message);
        process.exit(1);
    }
};

seedDB();
