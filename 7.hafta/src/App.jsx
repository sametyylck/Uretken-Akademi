import React, { useState } from 'react';
import './App.css'; // Stil dosyasını import et

const App = () => {
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleRegister = () => {
    if (registerUsername && registerPassword) {
      const isUsernameTaken = registeredUsers.some(user => user.username === registerUsername);

      if (isUsernameTaken) {
        alert('Bu kullanıcı adı zaten alınmış. Lütfen başka bir kullanıcı adı seçin.');
      } else {
        const newUser = { username: registerUsername, password: registerPassword };
        setRegisteredUsers([...registeredUsers, newUser]);
        setLoggedIn(true);
        localStorage.setItem('registeredUsers', JSON.stringify([...registeredUsers, newUser]));

        // Inputları temizle
        setRegisterUsername('');
        setRegisterPassword('');
      }
    }
  };

  const handleLogin = () => {
    if (loginUsername && loginPassword) {
      const user = registeredUsers.find(
        (u) => u.username === loginUsername && u.password === loginPassword
      );
      if (user) {
        setLoggedIn(true);

        // Inputları temizle
        setLoginUsername('');
        setLoginPassword('');
      } else {
        alert('Geçersiz kullanıcı adı veya şifre.');
      }
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <div className="container">
      {loggedIn ? (
        <div>
          <h2>Hoş Geldiniz, {loginUsername}!</h2>
          <button onClick={handleLogout}>Çıkış Yap</button>
        </div>
      ) : (
        <div>
          <div>
            <h2>Kayıt Ol</h2>
            <form>
              <label>
                Kullanıcı Adı:
                <input
                  type="text"
                  value={registerUsername}
                  onChange={(e) => setRegisterUsername(e.target.value)}
                />
              </label>
              <br />
              <label>
                Şifre:
                <input
                  type="password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                />
              </label>
              <br />
              <button type="button" onClick={handleRegister}>
                Kayıt Ol
              </button>
            </form>
          </div>
          <div>
            <h2>Giriş Yap</h2>
            <form>
              <label>
                Kullanıcı Adı:
                <input
                  type="text"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                />
              </label>
              <br />
              <label>
                Şifre:
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </label>
              <br />
              <button type="button" onClick={handleLogin}>
                Giriş Yap
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
