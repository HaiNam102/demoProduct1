import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="header">
      <div className="container header-container">
        {/* Logo */}
        <Link to="/" className="header-logo">
          <div className="header-logo-icon">
            <span className="header-logo-initial">P</span>
          </div>
          <span className="header-logo-text">ProductShop</span>
        </Link>

        {/* Search Bar */}
        <div className="header-search">
            <div className="header-search-icon">
                {/* <svg
                  className="text-gray-400"
                  style={{ width: '1.25rem', height: '1.25rem' }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg> */}
            </div>
            <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="form-input header-search-input"
            />
        </div>

        {/* Navigation */}
        <nav className="header-nav">
          <Link
            to="/"
            className={`header-nav-link ${isActive('/') ? 'active' : ''}`}>
            Trang chủ
          </Link>
          <Link
            to="/products"
            className={`header-nav-link ${isActive('/products') ? 'active' : ''}`}>
            Sản phẩm
          </Link>
          <Link
            to="/categories"
            className={`header-nav-link ${isActive('/categories') ? 'active' : ''}`}>
            Danh mục
          </Link>
        </nav>

        {/* User Actions
        <div className="header-actions">
            <button className="header-action-button">
              <svg style={{ width: '1.5rem', height: '1.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
            <button className="header-action-button">
              <svg style={{ width: '1.5rem', height: '1.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                />
              </svg>
            </button>
        </div> */}

        {/* Mobile menu button */}
        <div className="md:hidden">
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <svg style={{ width: '1.5rem', height: '1.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
        </div>
      </div>
    </header>
  );
};

export default Header;