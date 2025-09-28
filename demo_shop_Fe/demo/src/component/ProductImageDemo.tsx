import React from 'react';
import { ImageService } from '../services/imageService';

const ProductImageDemo: React.FC = () => {
  const demoProducts = [
    { name: 'Laptop Gaming', category: 'Electronics' },
    { name: 'iPhone 15', category: 'Electronics' },
    { name: 'iPad Pro', category: 'Electronics' },
    { name: 'AirPods Pro', category: 'Electronics' },
    { name: 'Apple Watch', category: 'Electronics' },
    { name: 'DSLR Camera', category: 'Electronics' },
    { name: 'T-Shirt Cotton', category: 'Clothing' },
    { name: 'Running Shoes', category: 'Clothing' },
    { name: 'Programming Book', category: 'Books' },
    { name: 'Unknown Product', category: 'Unknown' },
  ];

  return (
    <div className="container" style={{ padding: '2rem' }}>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Demo Hình Ảnh Sản Phẩm</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {demoProducts.map((product, index) => (
          <div key={index} className="card">
            <div className="product-image-container">
              <img
                src={ImageService.getFinalImageUrl(undefined, product.name, product.category)}
                alt={product.name}
                className="product-image"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = ImageService.getPlaceholderImage();
                }}
              />
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-category">{product.category}</p>
              <p className="text-sm text-gray-500 mt-2">
                Image: {ImageService.getFinalImageUrl(undefined, product.name, product.category)}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-6 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Cách hoạt động:</h2>
        <ul className="space-y-2 text-gray-700">
          <li>• <strong>Theo tên sản phẩm:</strong> Tìm kiếm từ khóa trong tên sản phẩm (laptop, phone, shirt, book, etc.)</li>
          <li>• <strong>Theo danh mục:</strong> Nếu không tìm thấy theo tên, sử dụng hình ảnh theo danh mục</li>
          <li>• <strong>Fallback:</strong> Nếu không tìm thấy, sử dụng hình ảnh mặc định (laptop)</li>
          <li>• <strong>Error handling:</strong> Nếu hình ảnh lỗi, tự động chuyển về placeholder</li>
        </ul>
      </div>
    </div>
  );
};

export default ProductImageDemo;
