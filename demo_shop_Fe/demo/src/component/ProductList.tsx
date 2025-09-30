import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '../services/api';
import { ImageService } from '../services/imageService';
import type { ProductListDto, PagedResponse, ApiResponse } from '../types/Product';
import './ProductList.css';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<ProductListDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [sortBy, setSortBy] = useState('id');
  const [sortDir, setSortDir] = useState('desc');
  const [pageSize] = useState(12);
  const [addingToCart, setAddingToCart] = useState<number | null>(null);
  const [categoryId, setCategoryId] = useState<number | null>(null); // New state for categoryId

  const fetchProducts = useCallback(async (page: number) => {
    try {
      setLoading(true);
      setError(null);

      let response: ApiResponse<PagedResponse<ProductListDto>>;
      if (categoryId) {
        // Use getProductsByCategoryId if categoryId is selected
        response = await apiService.getProductsByCategoryId(categoryId, page, pageSize, sortBy, sortDir);
      } else {
        // Use getProducts if no categoryId is selected
        response = await apiService.getProducts(page, pageSize, sortBy, sortDir, null);
      }

      if (response.success) {
        setProducts(response.data.items);
        setTotalPages(response.data.totalPages);
        setTotalElements(response.data.totalElements);
        setCurrentPage(response.data.page);
      }
    } catch (err) {
      setError('Không thể tải danh sách sản phẩm');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  }, [pageSize, sortBy, sortDir, categoryId]);

  useEffect(() => {
    fetchProducts(0);
  }, [fetchProducts]);

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

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryId(event.target.value ? parseInt(event.target.value) : null);
    fetchProducts(0); // Fetch products for the selected category
  };

  const handleAddToCart = (product: ProductListDto, event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    setAddingToCart(product.id);
    console.log('Added to cart:', product.name);

    setTimeout(() => {
      setAddingToCart(null);
    }, 500); // Animation duration
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  if (loading) {
    return (
      <div className="product-list-container">
        <div className="product-list-header">
          <h1 className="product-list-title">Sản phẩm</h1>
          <p className="product-list-subtitle">Đang tải, vui lòng chờ...</p>
        </div>
        <div className="skeleton-grid">
          {Array.from({ length: pageSize }).map((_, index) => (
            <div key={index} className="skeleton-card">
              <div className="skeleton-image"></div>
              <div className="skeleton-info">
                <div className="skeleton-line"></div>
                <div className="skeleton-line skeleton-line-short"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
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
    );
  }

  return (
    <div className="product-list-container">
      {/* Header */}
      <div className="product-list-header">
        <h1 className="product-list-title">Coffee Shop</h1>
        <p className="product-list-subtitle">Khám phá thế giới cà phê phong phú với chất lượng thượng hạng</p>
      </div>

      {/* Filters and Sort */}
      <div className="product-filters">
        <div className="product-filters-content">
          <div className="product-sort-controls">
            <span className="product-sort-label">Sắp xếp theo:</span>
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="product-sort-select"
            >
              <option value="id">Mới nhất</option>
              <option value="name">Tên sản phẩm</option>
              <option value="price">Giá</option>
            </select>
            <button
              onClick={() => setSortDir(sortDir === 'asc' ? 'desc' : 'asc')}
              className="product-sort-button"
            >
              <span>{sortDir === 'asc' ? 'Tăng dần' : 'Giảm dần'}</span>
              <svg className={`product-sort-icon ${sortDir === 'asc' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          <div className="product-category-filter">
            <span className="product-category-label">Danh mục:</span>
            <select
              value={categoryId || ''}
              onChange={handleCategoryChange}
              className="product-category-select"
            >
              <option value="">Tất cả</option>
              <option value="1">Danh mục 1</option>
              <option value="2">Danh mục 2</option>
              <option value="3">Danh mục 3</option>
            </select>
          </div>
          <div className="product-count">
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
          <p className="empty-state-message">Không tìm thấy sản phẩm nào phù hợp.</p>
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
                    className="product-image enhanced-image" // Add a new class for styling
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = ImageService.getPlaceholderImage(); // Fallback image
                    }}
                  />
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-category">{product.categoryName}</p>
                  <div className="product-price-row">
                    <span className="product-price">{product.price + '.000 VNĐ'}</span>
                    <span className={`product-stock ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                      {product.stock > 0 ? 'Còn hàng' : 'Hết hàng'}
                    </span>
                  </div>
                </div>
                  <button 
                     onClick={(e) => handleAddToCart(product, e)}
                     className={`btn btn-primary product-add-to-cart-btn ${addingToCart === product.id ? 'add-to-cart-animation' : ''}`}
                   >
                     Add to Cart
                   </button>
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination-container">
          <nav className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
              className="pagination-button pagination-button-prev"
            >
              Trước
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i;
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`pagination-button pagination-button-number ${
                    currentPage === page ? 'pagination-button-active' : ''
                  }`}
                >
                  {page + 1}
                </button>
              );
            })}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages - 1}
              className="pagination-button pagination-button-next"
            >
              Sau
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default ProductList;
