// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLoginClick = () => {
    // Giriş yapıldığında anasayfaya yönlendir
    handleLogin();
    navigate('/');
  };

  return (
    <div>
      <h2>Giriş Yap</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Kullanıcı Adı:</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Şifre:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleLoginClick}>
          Giriş Yap
        </button>
      </form>
    </div>
  );
};

export default Login;
