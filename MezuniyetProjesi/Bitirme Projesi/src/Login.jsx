import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import RegisterForm from './RegisterForm';

const Login = ({ onLogin }) => {
  const [kullanici_adi, setUsername] = useState('');
  const [sifre, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://localhost:7223/api/Login/login', {
        kullanici_adi,
        sifre,
      });

      // Başarılı giriş
      setError('');
      onLogin(); // Navbar'ı aktif hale getir
      navigate('/Stok'); // Stok sayfasına yönlendir
    } catch (error) {
      // Hatalı giriş
      setError('Kullanıcı adı veya şifre yanlış.');
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input type="text" value={kullanici_adi} onChange={(e) => setUsername(e.target.value)} className="form-control" />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" value={sifre} onChange={(e) => setPassword(e.target.value)} className="form-control" />
        </div>

        <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>

        <div className="text-center">
          <p>Not a member? <Link to="/register">Register</Link></p>
          <p>or sign up with:</p>
          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-facebook-f"></i>
          </button>

          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-google"></i>
          </button>

          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-twitter"></i>
          </button>

          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-github"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
