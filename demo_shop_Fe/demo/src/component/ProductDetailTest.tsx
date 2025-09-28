import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetailTest: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div style={{ padding: '2rem', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <h1>Product Detail Test Page</h1>
      <p>Product ID: {id}</p>
      <p>URL: {window.location.href}</p>
      <p>Pathname: {window.location.pathname}</p>
      
      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: 'white', borderRadius: '8px' }}>
        <h2>Debug Info:</h2>
        <ul>
          <li>useParams id: {id}</li>
          <li>Current URL: {window.location.href}</li>
          <li>Current Path: {window.location.pathname}</li>
          <li>Hash: {window.location.hash}</li>
          <li>Search: {window.location.search}</li>
        </ul>
      </div>
    </div>
  );
};

export default ProductDetailTest;
