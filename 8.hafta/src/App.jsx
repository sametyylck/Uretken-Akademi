// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Cart from './Cart';
import Login from './Login';
import Register from './Register';

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const addToCart = (product) => {
    setCartCount(cartCount + 1);
    setCartItems([...cartItems, { id: product.id, name: product.name, price: product.price }]);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    return <Navigate to="/" />;
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    return <Navigate to="/" />;
  };

  const handleRegister = (username, password) => {
    console.log(`Yeni kullanıcı kaydedildi: ${username}`);
    return <Navigate to="/login" />;
  };

  useEffect(() => {
    const userCart = JSON.parse(localStorage.getItem('userCart')) || [];
    setCartItems(userCart);
  }, []);

  return (
    <Router>
      <Navbar cartCount={cartCount} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={<Home addToCart={addToCart} cartItems={cartItems} setCartCount={setCartCount} />}
        />
        <Route
          path="/cart"
          element={<Cart cartItems={cartItems} cartCount={cartCount} />}
        />
        <Route
          path="/login"
          element={<Login handleLogin={handleLogin} />}
        />
        <Route
          path="/register"
          element={<Register handleRegister={handleRegister} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
