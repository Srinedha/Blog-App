// src/components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = ({ isAuthenticated, onLogout }) => (
  <nav className="navbar">
    <div className="navbar-left">
      <Link to="/" className="nav-link">Home</Link>

      {/* Show Create Blog only when logged in */}
      {isAuthenticated && (
        <Link to="/create" className="nav-link">Create Blog</Link>
      )}
    </div>

    <div className="navbar-right">
      {/* Always show Admin */}
      <button
        onClick={() => window.open('http://localhost:8000/admin/', '_blank')}
        className="nav-button"
      >
        Admin
      </button>

      {/* Show only when logged in */}
      {isAuthenticated && (
        <>
          <button
            onClick={() => window.open('http://localhost:8000/api/blogs/', '_blank')}
            className="nav-button"
          >
            Blog API
          </button>
          <button
            onClick={() => window.open('http://localhost:8000/auth/users/', '_blank')}
            className="nav-button"
          >
            Register API
          </button>
        </>
      )}

      {/* Login or Logout */}
      {isAuthenticated ? (
        <button onClick={onLogout} className="logout-button">Logout</button>
      ) : (
        <Link to="/login" className="nav-link">Login</Link>
      )}
    </div>
  </nav>
);

export default NavBar;
