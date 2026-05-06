import axios from "axios";

const BASE_URL = "https://www.omdbapi.com/";
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export const searchMovies = async (query, page = 1) => {
  const response = await axios.get(BASE_URL, {
    params: {
      apikey: API_KEY,
      s: query,
      type: "movie",
      page,
    },
  });

  if (response.data.Response === "False") {
    throw new Error(response.data.Error);
  }

  return response.data;
};

export const getMovieDetails = async (id) => {
  const response = await axios.get(BASE_URL, {
    params: {
      apikey: API_KEY,
      i: id,
      plot: "full",
    },
  });

  return response.data;
};