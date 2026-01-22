import axios from 'axios';

// Base URL untuk API - gunakan environment variable untuk production
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance dengan konfigurasi default
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Types
export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    priceFormatted: string;
    category: string;
    image: string;
    stock: number;
    rating: number;
    reviews: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ProductsResponse {
    success: boolean;
    count: number;
    data: Product[];
}

export interface ProductResponse {
    success: boolean;
    data: Product;
    message?: string;
}

export interface ProductFilters {
    category?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: 'price-asc' | 'price-desc' | 'newest' | 'rating';
}

// Product API functions
export const productAPI = {
    // GET all products with optional filters
    getProducts: async (filters?: ProductFilters): Promise<ProductsResponse> => {
        const params = new URLSearchParams();

        if (filters?.category) params.append('category', filters.category);
        if (filters?.search) params.append('search', filters.search);
        if (filters?.minPrice) params.append('minPrice', filters.minPrice.toString());
        if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
        if (filters?.sort) params.append('sort', filters.sort);

        const response = await api.get<ProductsResponse>(`/products?${params.toString()}`);
        return response.data;
    },

    // GET single product by ID
    getProduct: async (id: string): Promise<ProductResponse> => {
        const response = await api.get<ProductResponse>(`/products/${id}`);
        return response.data;
    },

    // POST create new product
    createProduct: async (product: Omit<Product, '_id' | 'priceFormatted' | 'createdAt' | 'updatedAt'>): Promise<ProductResponse> => {
        const response = await api.post<ProductResponse>('/products', product);
        return response.data;
    },

    // PUT update product
    updateProduct: async (id: string, product: Partial<Product>): Promise<ProductResponse> => {
        const response = await api.put<ProductResponse>(`/products/${id}`, product);
        return response.data;
    },

    // DELETE product
    deleteProduct: async (id: string): Promise<ProductResponse> => {
        const response = await api.delete<ProductResponse>(`/products/${id}`);
        return response.data;
    },
};

// Auth Types
export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: 'user' | 'admin';
}

export interface AuthResponse {
    success: boolean;
    message: string;
    token?: string;
    user?: User;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    name: string;
    email: string;
    phone: string;
    password: string;
}

// Auth API functions
export const authAPI = {
    // Login user
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>('/auth/login', credentials);
        if (response.data.success && response.data.token) {
            localStorage.setItem('token', response.data.token);
            if (response.data.user) {
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }
        }
        return response.data;
    },

    // Register user
    register: async (data: RegisterData): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>('/auth/register', data);
        return response.data;
    },

    // Logout user
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    // Get token from localStorage
    getToken: (): string | null => {
        return localStorage.getItem('token');
    },

    // Get user from localStorage
    getUser: (): User | null => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    // Check if user is authenticated
    isAuthenticated: (): boolean => {
        return !!localStorage.getItem('token');
    },
};

export default api;

