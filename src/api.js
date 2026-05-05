// OMDb API helper
// Get your free API key at: https://www.omdbapi.com/apikey.aspx
// Then replace 'YOUR_API_KEY' below

const API_KEY = 'YOUR_API_KEY';
const BASE_URL = 'https://www.omdbapi.com/';

export async function searchMovies(query, page = 1) {
  const res = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=movie&page=${page}`
  );
  const data = await res.json();
  if (data.Response === 'False') throw new Error(data.Error);
  return data; // { Search: [...], totalResults: "42" }
}

export async function getMovieDetails(imdbID) {
  const res = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`
  );
  const data = await res.json();
  if (data.Response === 'False') throw new Error(data.Error);
  return data;
}
