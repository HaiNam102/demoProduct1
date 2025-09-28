import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiService } from '../services/api';
import { ImageService } from '../services/imageService';
import type { Product } from '../types/Product';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        const response = await apiService.getProductById(parseInt(id));
        
        if (response.success) {
          // Transform API response to match expected Product interface
          const transformedProduct = {
            id: response.data.id,
            name: response.data.name,
            description: response.data.description,
            price: response.data.price * 1000, // Convert to VND
            imageUrl: response.data.imageUrl || undefined,
            category: {
              id: 1, // Default category ID
              name: response.data.brand || 'Unknown Category'
            },
            brand: response.data.brand || 'Unknown Brand',
            stock: response.data.stock,
            createdAt: Array.isArray(response.data.createdAt) 
              ? new Date(response.data.createdAt[0], response.data.createdAt[1] - 1, response.data.createdAt[2]).toISOString()
              : response.data.createdAt,
            updatedAt: Array.isArray(response.data.createdAt) 
              ? new Date(response.data.createdAt[0], response.data.createdAt[1] - 1, response.data.createdAt[2]).toISOString()
              : response.data.createdAt
          };
          
          setProduct(transformedProduct);
        }
      } catch (err) {
        setError('Không thể tải thông tin sản phẩm');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 0)) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    console.log('Adding to cart:', { productId: product?.id, quantity });
  };

  console.log('ProductDetail render state:', { loading, error, product, id });

  if (loading) {
    console.log('Rendering loading state');
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error || !product) {
    console.log('Rendering error state:', { error, product });
    return (
      <div className="product-detail-container">
        <div className="error-container">
          <div className="error-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="error-title">Không tìm thấy sản phẩm</h3>
          <p className="error-message">{error || 'Sản phẩm không tồn tại'}</p>
          {/* <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>
            <p><strong>Debug Info:</strong></p>
            <p>Error: {error || 'null'}</p>
            <p>Product: {product ? 'exists' : 'null'}</p>
            <p>ID: {id}</p>
            <p>Loading: {loading.toString()}</p>
          </div> */}
          <Link
            to="/products"
            className="btn btn-primary"
          >
            Quay lại danh sách
          </Link>
        </div>
      </div>
    );
  }

  console.log('Rendering product detail for:', product);

  return (
    <div className="product-detail-container">
      {/* Debug Info
      <div style={{ 
        backgroundColor: '#dcfce7', 
        padding: '1rem', 
        borderRadius: '8px',
        marginBottom: '1rem',
        border: '1px solid #16a34a'
      }}>
        <h3 style={{ color: '#16a34a', margin: '0 0 0.5rem 0' }}>✅ Debug Info:</h3>
        <p><strong>Product ID:</strong> {product.id}</p>
        <p><strong>Product Name:</strong> {product.name}</p>
        <p><strong>Category:</strong> {product.category?.name}</p>
        <p><strong>Price:</strong> {product.price}</p>
        <p><strong>Stock:</strong> {product.stock}</p>
      </div> */}

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
            <span className="breadcrumb-current">{product.name}</span>
          </li>
        </ol>
      </nav>

      <div className="product-detail-grid">
        {/* Product Image */}
        <div className="product-image-section">
          <div className="product-main-image">
            <img
              src={ImageService.getFinalImageUrl(product.imageUrl, product.name, product.category.name)}
              alt={product.name}
              onError={(e) => {
                // Nếu hình ảnh lỗi, sử dụng placeholder
                const target = e.target as HTMLImageElement;
                target.src = ImageService.getPlaceholderImage();
              }}
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="product-info-section">
          <div>
            <h1 className="product-title">{product.name}</h1>
            <div className="product-price-section">
              <span className="product-price">{formatPrice(product.price)}</span>
              <span className={`product-stock-badge ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                {product.stock > 0 ? 'Còn hàng' : 'Hết hàng'}
              </span>
            </div>
            <p className="product-category-info">
              <strong>Danh mục:</strong> {product.category.name}
            </p>
          </div>

          {product.description && (
            <div className="product-description">
              <h3>Mô tả sản phẩm</h3>
              <p>{product.description}</p>
            </div>
          )}

          <div className="product-actions">
            <div className="quantity-section">
              <span className="quantity-label">Số lượng:</span>
              <div className="quantity-controls">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  className="quantity-button"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                  min="1"
                  max={product.stock}
                  className="quantity-input"
                />
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= product.stock}
                  className="quantity-button"
                >
                  +
                </button>
              </div>
              <span className="quantity-stock">
                Còn {product.stock} sản phẩm
              </span>
            </div>

            <div className="action-buttons">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="btn btn-primary"
              >
                {product.stock > 0 ? 'Thêm vào giỏ hàng' : 'Hết hàng'}
              </button>
              <button className="btn btn-secondary">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="product-details">
            <div className="product-details-grid">
              <div className="product-detail-item">
                <span className="product-detail-label">Mã sản phẩm:</span>
                <span className="product-detail-value">#{product.id}</span>
              </div>
              <div className="product-detail-item">
                <span className="product-detail-label">Tình trạng:</span>
                <span className="product-detail-value">{product.stock > 0 ? 'Còn hàng' : 'Hết hàng'}</span>
              </div>
              <div className="product-detail-item">
                <span className="product-detail-label">Ngày tạo:</span>
                <span className="product-detail-value">{new Date(product.createdAt).toLocaleDateString('vi-VN')}</span>
              </div>
              <div className="product-detail-item">
                <span className="product-detail-label">Cập nhật:</span>
                <span className="product-detail-value">{new Date(product.updatedAt).toLocaleDateString('vi-VN')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
