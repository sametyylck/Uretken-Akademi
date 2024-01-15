import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Stok from './Stok';
import Marka from './Marka';
import Kategori from './Kategori';
import Departman from './Departman';
import Login from './Login';
import meram from './meram.jpg';  
import RegisterForm from './RegisterForm';


const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  // Sayfa yüklendiğinde, çerezlerdeki giriş durumunu kontrol et
  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    if (storedLoginStatus === 'true') {
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setLoggedIn(true);
    // Çerezlere giriş durumunu kaydet
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setLoggedIn(false);
    // Çerezlere giriş durumunu kaydet
    localStorage.setItem('isLoggedIn', 'false');
  };

  return (
    <Router>
      <div>
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
          <Link className="navbar-brand" to="/">
              <img src={meram} alt="Meram Logo" height="70" />
            </Link>
            <Link className="navbar-brand" to="/">E Meram Belediyecilik</Link>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                {isLoggedIn && (
                  <>
                    <li className="nav-item"><Link className="nav-link" to="/stok">Stok</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/marka">Marka</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/kategori">Kategori</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/departman">Departman</Link></li>
                  </>
                )}
              </ul>
              {isLoggedIn ? (
                <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
              ) : (
                <Link className="btn btn-outline-primary" to="/login">Login</Link>

              )}
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Navigate to={isLoggedIn ? '/stok' : '/login'} />} />
          <Route path="/register" element={<RegisterForm />} />
         
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          {isLoggedIn && (
            <>
              <Route path="/stok" element={<Stok />} />
              <Route path="/marka" element={<Marka />} />
              <Route path="/kategori" element={<Kategori />} />
              <Route path="/departman" element={<Departman />} />
            </>
          )}
          {/* Diğer route'lar */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;