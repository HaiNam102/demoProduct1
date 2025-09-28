export interface Category {
  id: number;
  name: string;
  description?: string;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  category: Category;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductListDto {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
  categoryName: string;
  stock: number;
}

export interface PagedResponse<T> {
  items: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
