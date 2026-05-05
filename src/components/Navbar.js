import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import './Navbar.css';

function Navbar() {
  const { favorites } = useFavorites();
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        🎬 CineSearch
      </Link>
      <div className="navbar-links">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
          Home
        </Link>
        <Link to="/favorites" className={location.pathname === '/favorites' ? 'active' : ''}>
          Favorites
          {favorites.length > 0 && (
            <span className="fav-count">{favorites.length}</span>
          )}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
