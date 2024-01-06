// Home.js
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const Home = ({ addToCart, cartItems, setCartCount }) => {
  const [quantity, setQuantity] = useState(1);

  const products = [
    { id: 1, name: 'Ürün 1', description: 'Açıklama 1', price: 50, image: 'https://placekitten.com/200/300' },
    { id: 2, name: 'Ürün 2', description: 'Açıklama 2', price: 75, image: 'https://placekitten.com/200/301' },
    { id: 3, name: 'Ürün 3', description: 'Açıklama 3', price: 100, image: 'https://placekitten.com/200/302' },
    { id: 4, name: 'Ürün 4', description: 'Açıklama 4', price: 120, image: 'https://placekitten.com/200/303' },
    { id: 5, name: 'Ürün 5', description: 'Açıklama 5', price: 150, image: 'https://placekitten.com/200/304' },
  ];

  const isProductInCart = (productId) => {
    return cartItems && cartItems.some((item) => item.id === productId);
  };

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value, 10));
  };

  const handleAddToCart = (product) => {
    if (isProductInCart(product.id)) {
      return;
    }

    addToCart(product);
    setCartCount((prevCount) => prevCount + 1);
  };

  const getButtonDisabledStatus = (productId) => {
    return isProductInCart(productId);
  };

  return (
    <div className="container">
      <h2>Anasayfa</h2>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card">
              <img src={product.image} className="card-img-top" alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">Fiyat: {product.price} TL</p>
                <div className="input-group mb-3">
                  <input
                    type="number"
                    className="form-control"
                    value={quantity}
                    onChange={handleQuantityChange}
                    min="1"
                  />
                  <button
                    type="button"
                    className="btn btn-primary add-to-cart-button"
                    onClick={() => handleAddToCart({ ...product, quantity })}
                    disabled={getButtonDisabledStatus(product.id)}
                  >
                    {isProductInCart(product.id) ? 'Sepete Eklendi' : 'Sepete Ekle'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
