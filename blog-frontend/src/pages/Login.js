import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const Login = ({ onLogin }) => {  // Accept onLogin prop
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/jwt/create/', {
        username,
        password
      });
      localStorage.setItem('accessToken', res.data.access);
      localStorage.setItem('refreshToken', res.data.refresh);
      setIsLoggedIn(true);
      onLogin();  // 🔥 Notify parent that login was successful
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  return (
    <form
      onSubmit={handleLogin}
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
        margin: '100px auto',
        gap: '1rem',
      }}
    >
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        style={{
          padding: '12px',
          fontSize: '16px',
          borderRadius: '5px',
          border: '1px solid #ccc',
        }}
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        style={{
          padding: '12px',
          fontSize: '16px',
          borderRadius: '5px',
          border: '1px solid #ccc',
        }}
      />
      <button
        type="submit"
        style={{
          padding: '12px',
          fontSize: '16px',
          backgroundColor: '#4caf50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Login
      </button>
    </form>
  );  
};

export default Login;
