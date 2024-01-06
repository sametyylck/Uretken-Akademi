// Cart.js
import React, { useEffect, useState } from 'react';

const Cart = ({ userId, cartItems, setCartItems }) => {
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
    // localStorage'e güncellenmiş sepet bilgilerini kaydet
    localStorage.setItem(userId, JSON.stringify(updatedCart));
  };

  return (
    <div className="container">
      <h2>Sepet</h2>
      <p>Sepetinizde {cartItems.length} ürün bulunmaktadır.</p>
      {cartItems.length === 0 ? (
        <p>Sepetiniz boş.</p>
      ) : (
        <div>
          <ul className="list-group">
            {cartItems.map((item) => (
              <li key={item.id} className="list-group-item">
                <div className="row align-items-center">
                  <div className="col-md-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="img-fluid rounded"
                      style={{ maxWidth: '100px', maxHeight: '100px', width: '100%', height: 'auto' }}
                    />
                  </div>
                  <div className="col-md-3">
                    <h5>{item.name}</h5>
                    <p>{item.description}</p>
                  </div>
                  <div className="col-md-2">
                    <p>Fiyat: {item.price} TL</p>
                  </div>
                  <div className="col-md-2">
                    <p>Miktar: {item.quantity}</p>
                  </div>
                  <div className="col-md-2">
                    <p>Toplam: {item.price * item.quantity} TL</p>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      Sil
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <p>Toplam Fiyat: {totalPrice} TL</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
