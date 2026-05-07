import React, { useState, useEffect, useRef } from 'react';
import { searchMovies } from "../services/movieApi";
import MovieCard from '../components/MovieCard';
import SkeletonCard from '../components/SkeletonCard';
import './Home.css';

function Home() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const [searchHistory, setSearchHistory] = useState(
  JSON.parse(localStorage.getItem("searchHistory")) || []
);
  const debounceRef = useRef(null);

  const fetchMovies = async (searchQuery, pageNum = 1) => {
    if (!searchQuery.trim()) {
      setMovies([]);
      setError('');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const data = await searchMovies(searchQuery, pageNum);
      if (pageNum === 1) {
        setMovies(data.Search || []);
      } else {
        setMovies((prev) => [...prev, ...(data.Search || [])]);
      }
      setTotalResults(parseInt(data.totalResults, 10) || 0);

      if (searchQuery && pageNum === 1) {
  const updatedHistory = [
    searchQuery,
    ...searchHistory.filter(
      (item) => item.toLowerCase() !== searchQuery.toLowerCase()
    ),
  ].slice(0, 5);

  setSearchHistory(updatedHistory);
  localStorage.setItem(
    "searchHistory",
    JSON.stringify(updatedHistory)
  );
}
    } catch (err) {
      setError("Failed to fetch movies. Try again.");
      if (pageNum === 1) setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  // Debounced search as user types
  useEffect(() => {
    clearTimeout(debounceRef.current);
    setPage(1);
    debounceRef.current = setTimeout(() => {
      fetchMovies(query, 1);
    }, 500);
    return () => clearTimeout(debounceRef.current);
  }, [query]);
  

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMovies(query, nextPage);
  };

  const filteredMovies = movies.filter((movie) => {
  if (filter === "all") return true;
  return movie.Type === filter;
});
  const hasMore = totalResults > 0 && movies.length < totalResults;

  return (
    <div className="home">
      <div className="hero">
        <h1 className="hero-title">Find Your Next Favorite Film</h1>
        <p className="hero-sub">Search from millions of movies worldwide</p>
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search movies... e.g. Inception, RRR, Interstellar"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          {query && (
            <button className="clear-btn" onClick={() => setQuery('')}>✕</button>
          )}
        </div>
      </div>
      {searchHistory.length > 0 && (
  <div className="search-history">
    {searchHistory.map((item, index) => (
      <button
        key={index}
        className="history-chip"
        onClick={() => setQuery(item)}
      >
        {item}
      </button>
    ))}
  </div>
)}
<div className="filter-buttons">
  <button
    className={filter === "all" ? "active-filter" : ""}
    onClick={() => setFilter("all")}
  >
    All
  </button>

  <button
    className={filter === "movie" ? "active-filter" : ""}
    onClick={() => setFilter("movie")}
  >
    Movies
  </button>

  <button
    className={filter === "series" ? "active-filter" : ""}
    onClick={() => setFilter("series")}
  >
    Series
  </button>
</div>

      {!query && !loading && (
        <div className="empty-state">
          <p>🎥 Type a movie name to get started</p>
        </div>
      )}

      {error && <p className="error-msg">⚠️ {error}</p>}

      {movies.length > 0 && (
        <>
          <p className="results-count">{totalResults} results for "{query}"</p>
          <div className="movies-grid">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        </>
      )}

      {!loading && !error && query && movies.length === 0 && (
  <div className="no-results">
    <p>😢 No movies found for "{query}"</p>
  </div>
)}

      {loading && (
  <div className="movies-grid">
    {[1, 2, 3, 4, 5, 6].map((item) => (
      <SkeletonCard key={item} />
    ))}
  </div>
)}

      {!loading && hasMore && movies.length > 0 && (
        <div className="load-more-wrap">
          <button className="load-more-btn" onClick={handleLoadMore}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
