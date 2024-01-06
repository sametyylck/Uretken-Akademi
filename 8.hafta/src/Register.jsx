// Register.js
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const Register = ({ handleRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kullanıcı adı ve şifre kontrolü
    if (!username || !password) {
      alert('Kullanıcı adı ve şifre boş olamaz!');
      return;
    }

    // Yeni kullanıcı kaydetme işlemi
    handleRegister(username, password);
    setIsRegistered(true);
  };

  if (isRegistered) {
    // Kullanıcı kayıt olduktan sonra giriş sayfasına yönlendir
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      <h2>Kayıt Ol</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="btn btn-primary">Kayıt Ol</button>
      </form>
    </div>
  );
};

export default Register;
