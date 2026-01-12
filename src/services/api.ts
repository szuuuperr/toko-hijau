import axios from 'axios';

// Base URL untuk API
const API_BASE_URL = 'http://localhost:5000/api';

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

export default api;
