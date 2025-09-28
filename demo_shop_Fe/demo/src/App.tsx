import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './component/Header';
import Footer from './component/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import CategoryProducts from './pages/CategoryProducts';
import Categories from './pages/Categories';
import ProductImageDemo from './component/ProductImageDemo';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/products/category/:categoryId" element={<CategoryProducts />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/demo-images" element={<ProductImageDemo />} />
              </Routes>
            </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App
