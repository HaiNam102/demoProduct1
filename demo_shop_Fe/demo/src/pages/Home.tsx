import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Chào mừng đến với Coffee Shop
            </h1>
            <p className="hero-subtitle">
              Khám phá thế giới cà phê phong phú với chất lượng thượng hạng
            </p>
            <div className="hero-buttons">
              <Link to="/products" className="btn btn-primary btn-large">
                Xem sản phẩm
              </Link>
              <Link to="/categories" className="btn btn-secondary btn-large">
                Danh mục
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-header">
            <h2 className="features-title">Tại sao chọn chúng tôi?</h2>
            <p className="features-subtitle">Những lý do khiến bạn tin tưởng vào sản phẩm của chúng tôi</p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon feature-icon-quality">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="feature-title">Chất lượng cao</h3>
              <p className="feature-description">
                Tất cả sản phẩm đều được kiểm tra kỹ lưỡng để đảm bảo chất lượng tốt nhất
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon feature-icon-price">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="feature-title">Giá cả hợp lý</h3>
              <p className="feature-description">
                Cung cấp sản phẩm với mức giá cạnh tranh và phù hợp với ngân sách
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon feature-icon-delivery">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="feature-title">Giao hàng nhanh</h3>
              <p className="feature-description">
                Dịch vụ giao hàng nhanh chóng và đáng tin cậy trên toàn quốc
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">
              Sẵn sàng khám phá?
            </h2>
            <p className="cta-subtitle">
              Bắt đầu hành trình mua sắm của bạn ngay hôm nay
            </p>
            <Link to="/products" className="btn btn-primary btn-large">
              Xem tất cả sản phẩm
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
