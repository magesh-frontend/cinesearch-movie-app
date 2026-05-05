import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails } from "../services/movieApi";
import { useFavorites } from '../context/FavoritesContext';
import './MovieDetail.css';

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="detail-error">⚠️ {error}</p>;
  if (!movie) return null;

  const favorited = isFavorite(movie.imdbID);
  const handleFav = () => {
    const minimal = {
      imdbID: movie.imdbID,
      Title: movie.Title,
      Year: movie.Year,
      Poster: movie.Poster,
    };
    favorited ? removeFavorite(movie.imdbID) : addFavorite(minimal);
  };

  const rating = movie.imdbRating !== 'N/A' ? movie.imdbRating : null;

  return (
    <div className="detail">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="detail-content">
        <div className="detail-poster">
          <img
            src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450/1a1a24/8888a8?text=No+Poster'}
            alt={movie.Title}
          />
        </div>

        <div className="detail-info">
          <div className="detail-meta-top">
            {movie.Genre && movie.Genre.split(',').map((g) => (
              <span key={g} className="genre-tag">{g.trim()}</span>
            ))}
          </div>

          <h1 className="detail-title">{movie.Title}</h1>

          <div className="detail-stats">
            <span className="stat">{movie.Year}</span>
            {movie.Runtime !== 'N/A' && <span className="stat">{movie.Runtime}</span>}
            {movie.Rated !== 'N/A' && <span className="stat">{movie.Rated}</span>}
          </div>

          {rating && (
            <div className="rating-box">
              <span className="star">⭐</span>
              <span className="rating-value">{rating}</span>
              <span className="rating-max">/10</span>
              {movie.imdbVotes !== 'N/A' && (
                <span className="rating-votes">({movie.imdbVotes} votes)</span>
              )}
            </div>
          )}

          {movie.Plot !== 'N/A' && (
            <p className="detail-plot">{movie.Plot}</p>
          )}

          <div className="detail-credits">
            {movie.Director !== 'N/A' && (
              <div className="credit">
                <span className="credit-label">Director</span>
                <span>{movie.Director}</span>
              </div>
            )}
            {movie.Actors !== 'N/A' && (
              <div className="credit">
                <span className="credit-label">Cast</span>
                <span>{movie.Actors}</span>
              </div>
            )}
            {movie.Language !== 'N/A' && (
              <div className="credit">
                <span className="credit-label">Language</span>
                <span>{movie.Language}</span>
              </div>
            )}
          </div>

          <button className={`fav-detail-btn ${favorited ? 'is-fav' : ''}`} onClick={handleFav}>
            {favorited ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
