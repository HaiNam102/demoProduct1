import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiService } from '../services/api';
import { ImageService } from '../services/imageService';
import type { ProductListDto, PagedResponse, ApiResponse } from '../types/Product';

const CategoryProducts: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [products, setProducts] = useState<ProductListDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [sortBy, setSortBy] = useState('id');
  const [sortDir, setSortDir] = useState('desc');
  const [pageSize] = useState(12);
  const [categoryName, setCategoryName] = useState<string>('');

  const fetchProducts = useCallback(async (page: number) => {
    if (!categoryId) return;
    
    try {
      setLoading(true);
      setError(null);
      const response: ApiResponse<PagedResponse<ProductListDto>> = await apiService.getProductsByCategoryId(
        parseInt(categoryId),
        page,
        pageSize,
        sortBy,
        sortDir
      );
      
      if (response.success) {
        setProducts(response.data.items);
        setTotalPages(response.data.totalPages);
        setTotalElements(response.data.totalElements);
        setCurrentPage(response.data.page);
        
        // Set category name from first product if available
        if (response.data.items.length > 0) {
          setCategoryName(response.data.items[0].categoryName);
        }
      }
    } catch (err) {
      setError('Không thể tải danh sách sản phẩm theo danh mục');
      console.error('Error fetching category products:', err);
    } finally {
      setLoading(false);
    }
  }, [categoryId, pageSize, sortBy, sortDir]);

  useEffect(() => {
    fetchProducts(0);
  }, [categoryId, sortBy, sortDir, fetchProducts]);

  const handlePageChange = (newPage: number) => {
    fetchProducts(newPage);
  };

  const handleSortChange = (newSortBy: string) => {
    if (sortBy === newSortBy) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortDir('desc');
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-list-container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <div className="error-container">
          <div className="error-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="error-title">Có lỗi xảy ra</h3>
          <p className="error-message">{error}</p>
          <button
            onClick={() => fetchProducts(0)}
            className="btn btn-primary"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-list-container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      {/* Breadcrumb */}
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <ol className="breadcrumb-list">
          <li className="breadcrumb-item">
            <Link to="/" className="breadcrumb-link">
              Trang chủ
            </Link>
            <svg className="breadcrumb-separator" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </li>
          <li className="breadcrumb-item">
            <Link to="/products" className="breadcrumb-link">
              Sản phẩm
            </Link>
            <svg className="breadcrumb-separator" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </li>
          <li className="breadcrumb-item">
            <span className="breadcrumb-current">{categoryName || 'Danh mục'}</span>
          </li>
        </ol>
      </nav>

      {/* Header */}
      <div className="product-list-header">
        <h1 className="product-list-title">
          {categoryName ? `Sản phẩm - ${categoryName}` : 'Sản phẩm theo danh mục'}
        </h1>
        <p className="product-list-subtitle">
          {categoryName ? `Khám phá bộ sưu tập ${categoryName.toLowerCase()} của chúng tôi` : 'Khám phá sản phẩm theo danh mục'}
        </p>
      </div>

      {/* Filters and Sort */}
      <div className="product-filters">
        <div className="product-filters-content">
          <div className="product-filters-left">
            <span className="text-sm font-medium text-gray-700">Sắp xếp theo:</span>
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="form-select"
              style={{ width: 'auto' }}
            >
              <option value="id">Mới nhất</option>
              <option value="name">Tên sản phẩm</option>
              <option value="price">Giá</option>
            </select>
            <button
              onClick={() => setSortDir(sortDir === 'asc' ? 'desc' : 'asc')}
              className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <span>{sortDir === 'asc' ? 'Tăng dần' : 'Giảm dần'}</span>
              <svg 
                className={`h-4 w-4 transform transition-transform ${sortDir === 'asc' ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          <div className="product-filters-right">
            Hiển thị {products.length} trong tổng số {totalElements} sản phẩm
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <h3 className="empty-state-title">Không có sản phẩm</h3>
          <p className="empty-state-message">
            {categoryName ? `Không tìm thấy sản phẩm nào trong danh mục ${categoryName.toLowerCase()}.` : 'Không tìm thấy sản phẩm nào trong danh mục này.'}
          </p>
          <div className="mt-4">
            <Link
              to="/products"
              className="btn btn-primary"
            >
              Xem tất cả sản phẩm
            </Link>
          </div>
        </div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <Link to={`/products/${product.id}`} className="product-card-link">
                <div className="product-image-container">
                  <img
                    src={ImageService.getFinalImageUrl(product.imageUrl, product.name, product.categoryName)}
                    alt={product.name}
                    className="product-image"
                    onError={(e) => {
                      // Nếu hình ảnh lỗi, sử dụng placeholder
                      const target = e.target as HTMLImageElement;
                      target.src = ImageService.getPlaceholderImage();
                    }}
                  />
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-category">{product.categoryName}</p>
                  <div className="product-price-row">
                    <span className="product-price">{formatPrice(product.price)}</span>
                    <span className={`product-stock ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                      {product.stock > 0 ? 'Còn hàng' : 'Hết hàng'}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <nav className="pagination-nav">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
              className="pagination-button"
            >
              Trước
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i;
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`pagination-button ${currentPage === page ? 'active' : ''}`}
                >
                  {page + 1}
                </button>
              );
            })}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages - 1}
              className="pagination-button"
            >
              Sau
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;
