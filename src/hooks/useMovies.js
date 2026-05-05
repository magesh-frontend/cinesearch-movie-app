import { useState } from "react";
import { searchMovies } from "../services/movieApi";

export const useMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMovies = async (query) => {
    try {
      setLoading(true);
      setError("");

      const data = await searchMovies(query);

      setMovies(data.Search || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    movies,
    loading,
    error,
    fetchMovies,
  };
};