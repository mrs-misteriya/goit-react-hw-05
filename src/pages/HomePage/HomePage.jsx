import { useEffect, useState } from "react";
import { getMovies } from "../../movies-api";
import MovieList from "../../components/MovieList/MovieList";
import css from './HomePage.module.css'

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setError(false);
        setIsLoading(true);
        const data = await getMovies();
        setMovies(data.results);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovies();
  }, []);

  return (
    <div className={css.container}>
      <h2>Trending today</h2>
      {error && <b>Ups, something wrong...</b>}
      {isLoading && <b>Loading...</b>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}
