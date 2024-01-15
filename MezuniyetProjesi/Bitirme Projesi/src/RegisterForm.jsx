import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [kullanici_adi, setUsername] = useState('');
  const [Ad, setFirstName] = useState('');
  const [Soyad, setLastName] = useState('');
  const [sifre, setPassword] = useState('');
  const [Telefon, setPhone] = useState('');
  const [result, setResult] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://localhost:7223/api/Login/register', {
        kullanici_adi,
        Ad,
        Soyad,
        role_id: 1,
        sifre,
        Telefon,
      });

      setResult(`Registration successful! Response: ${JSON.stringify(response.data)}`);
      navigate('/Login');
    } catch (error) {
      setResult(`Registration failed! Error: ${error.message}`);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Username:</label>
          <input type="text" className="form-control" value={kullanici_adi} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">First Name:</label>
          <input type="text" className="form-control" value={Ad} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Last Name:</label>
          <input type="text" className="form-control" value={Soyad} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Password:</label>
          <input type="password" className="form-control" value={sifre} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone:</label>
          <input type="text" className="form-control" value={Telefon} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
      <div className="mt-3">{result}</div>
    </div>
  );
};

export default RegisterForm;
