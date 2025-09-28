import type { Product, ProductListDto, PagedResponse, ApiResponse } from '../types/Product';

const API_BASE_URL = 'http://localhost:8080/api/v1';

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Get all products with pagination
  async getProducts(
    page: number = 0,
    size: number = 10,
    sortBy: string = 'id',
    sortDir: string = 'desc'
  ): Promise<ApiResponse<PagedResponse<ProductListDto>>> {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
      sortBy,
      sortDir,
    });
    return this.request(`/products?${params}`);
  }

  // Get product by ID
  async getProductById(id: number): Promise<ApiResponse<Product>> {
    return this.request(`/products/${id}`);
  }

  // Get products by category ID
  async getProductsByCategoryId(
    categoryId: number,
    page: number = 0,
    size: number = 10,
    sortBy: string = 'id',
    sortDir: string = 'desc'
  ): Promise<ApiResponse<PagedResponse<ProductListDto>>> {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
      sortBy,
      sortDir,
    });
    return this.request(`/products/category/${categoryId}?${params}`);
  }
}

export const apiService = new ApiService();
