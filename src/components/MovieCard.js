import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import './MovieCard.css';

const PLACEHOLDER = 'https://via.placeholder.com/300x450/1a1a24/8888a8?text=No+Poster';

function MovieCard({ movie }) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorited = isFavorite(movie.imdbID);

  const handleFav = (e) => {
    e.preventDefault(); // Don't navigate to detail page
    if (favorited) {
      removeFavorite(movie.imdbID);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <Link to={`/movie/${movie.imdbID}`} className="movie-card">
      <div className="card-poster">
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : PLACEHOLDER}
          alt={movie.Title}
          loading="lazy"
        />
        <button
          className={`fav-btn ${favorited ? 'favorited' : ''}`}
          onClick={handleFav}
          title={favorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          {favorited ? '❤️' : '🤍'}
        </button>
      </div>
      <div className="card-info">
        <h3 className="card-title">{movie.Title}</h3>
        <span className="card-year">{movie.Year}</span>
      </div>
    </Link>
  );
}

export default MovieCard;
