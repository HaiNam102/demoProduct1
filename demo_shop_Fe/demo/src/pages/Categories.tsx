import React from 'react';
import { Link } from 'react-router-dom';

const Categories: React.FC = () => {
  return (
    <div className="categories-page">
      <div className="container">
        <div className="categories-header">
          <h1 className="categories-title">Danh mục sản phẩm</h1>
          <p className="categories-subtitle">Khám phá sản phẩm theo từng danh mục</p>
        </div>
        
        <div className="categories-content">
          <div className="empty-state">
            <div className="empty-state-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="empty-state-title">Tính năng đang phát triển</h3>
            <p className="empty-state-message">
              Trang danh mục sẽ sớm được cập nhật với đầy đủ tính năng.
            </p>
            <Link to="/products" className="btn btn-primary">
              Xem tất cả sản phẩm
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
