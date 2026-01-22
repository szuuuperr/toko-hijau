import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/* PRODUCT TYPES */
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
  sort?: "price-asc" | "price-desc" | "newest" | "rating";
}

/* PRODUCT API */
export const productAPI = {
  // GET all products
  getProducts: async (
    filters?: ProductFilters
  ): Promise<ProductsResponse> => {
    const params = new URLSearchParams();

    if (filters?.category) params.append("category", filters.category);
    if (filters?.search) params.append("search", filters.search);
    if (filters?.minPrice)
      params.append("minPrice", filters.minPrice.toString());
    if (filters?.maxPrice)
      params.append("maxPrice", filters.maxPrice.toString());
    if (filters?.sort) params.append("sort", filters.sort);

    const response = await api.get<ProductsResponse>(
      `/api/products?${params.toString()}`
    );

    return response.data;
  },

  // GET product by ID
  getProduct: async (id: string): Promise<ProductResponse> => {
    const response = await api.get<ProductResponse>(
      `/api/products/${id}`
    );
    return response.data;
  },

  // CREATE product
  createProduct: async (
    product: Omit<
      Product,
      "_id" | "priceFormatted" | "createdAt" | "updatedAt"
    >
  ): Promise<ProductResponse> => {
    const response = await api.post<ProductResponse>(
      "/api/products",
      product
    );
    return response.data;
  },

  // UPDATE product
  updateProduct: async (
    id: string,
    product: Partial<Product>
  ): Promise<ProductResponse> => {
    const response = await api.put<ProductResponse>(
      `/api/products/${id}`,
      product
    );
    return response.data;
  },

  // DELETE product
  deleteProduct: async (id: string): Promise<ProductResponse> => {
    const response = await api.delete<ProductResponse>(
      `/api/products/${id}`
    );
    return response.data;
  },
};

/* AUTH TYPES */
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "user" | "admin";
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

/* AUTH API */
export const authAPI = {
  login: async (
    credentials: LoginCredentials
  ): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>(
      "/api/auth/login",
      credentials
    );

    if (response.data.success && response.data.token) {
      localStorage.setItem("token", response.data.token);
      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
    }

    return response.data;
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>(
      "/api/auth/register",
      data
    );
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getToken: (): string | null => {
    return localStorage.getItem("token");
  },

  getUser: (): User | null => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("token");
  },
};

export default api;
