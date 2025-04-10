import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Signup from './pages/Signup';
import Login from './pages/Login';
import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import BlogDetail from './pages/BlogDetail';
import EditBlog from './pages/EditBlog'; 
import NavBar from './components/NavBar';
import PrivateRoute from './PrivateRoute';
import { refreshToken } from './Auth';
import './App.css';

function App() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // ✅ New state

  useEffect(() => {
    const checkAuth = async () => {
      const refreshed = await refreshToken();
      setIsAuthenticated(refreshed);
      setLoading(false); // ✅ Stop loading after check
    };

    checkAuth();
  }, []);

  useEffect(() => {
    document.body.classList.remove('logged-in', 'logged-out');
    document.body.classList.add(isAuthenticated ? 'logged-in' : 'logged-out');
  }, [isAuthenticated]);  

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate('/');
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsAuthenticated(false);
    navigate('/login');
  };

  if (loading) return <div>Loading...</div>; // ✅ Prevent early render

  return (
    <div className="App">
      <NavBar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        {/* ✅ Use PrivateRoute here */}
        <Route
          path="/create"
          element={
            <PrivateRoute>
              <BlogForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <PrivateRoute>
              <EditBlog />
            </PrivateRoute>
          }
        />
        <Route path="/blog/:id" element={<BlogDetail />} />
      </Routes>
    </div>
  );
}

export default App;
