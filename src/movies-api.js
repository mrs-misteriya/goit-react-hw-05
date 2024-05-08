
import axios from 'axios'


const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';

const options = {  
  headers: {
    accept: 'application/json',
    Authorization:'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyN2ZmYzY1MTNhNGEwNWQzOGNjN2Q3MzBjYmM5MGNjYiIsInN1YiI6IjY2MzM5ZjAxYWQ1OWI1MDEyNTZkNGM0YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.j00cFJ64qZ3aOX5syCC-ZJxIMcrVYoZp6NQ71UGmgEM'
  }
};

export const getMovies = async () => { 
  const response = await axios.get(url, options);
  return response.data;
}

const baseURL = 'https://api.themoviedb.org/3/';
axios.defaults.baseURL = baseURL;

export const getMovieId = async (movieId) => {
  const response = await axios.get(`movie/${movieId}`, options);
  return response.data;
}


export const getCast = async (movieId) => { 
  const response = await axios.get(`movie/${movieId}/credits?language=en-US`, options);
  return response.data;
}

export const getReviews = async (movieId) => { 
  const response = await axios.get(`movie/${movieId}/reviews?language=en-US`, options);
  return response.data;
}


export const fetchReviews = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/reviews?language=en-US&page=1`, options)
  return response.data
}

export const getSearchMovie = async (query) => {
  const response = await axios.get(`search/movie?query=${query}&include_adult=false&language=en-US&page=1`, options)
  return response.data;
}
 