import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import MovieCard from '../components/MovieCard';
import './Favorites.css';

function Favorites() {
  const { favorites } = useFavorites();

  return (
    <div className="favorites">
      <h2 className="fav-heading">Your Favorites</h2>

      {favorites.length === 0 ? (
        <div className="fav-empty">
          <p>❤️ No favorites yet.</p>
          <p>Search for movies and tap the heart icon to save them here.</p>
        </div>
      ) : (
        <div className="movies-grid">
          {favorites.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
