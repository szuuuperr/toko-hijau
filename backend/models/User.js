const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Nama harus diisi'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email harus diisi'],
        unique: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email tidak valid']
    },
    phone: {
        type: String,
        required: [true, 'Nomor telepon harus diisi']
    },
    password: {
        type: String,
        required: [true, 'Password harus diisi'],
        minlength: [8, 'Password minimal 8 karakter'],
        select: false
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, {
    timestamps: true
});

// Hash password sebelum save
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Method untuk cek password
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Method untuk generate JWT token
UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign(
        { id: this._id, role: this.role },
        process.env.JWT_SECRET || 'tokohijau-secret-key-2024',
        { expiresIn: process.env.JWT_EXPIRE || '30d' }
    );
};

module.exports = mongoose.model('User', UserSchema);
