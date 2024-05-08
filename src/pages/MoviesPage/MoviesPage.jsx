import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";
import { getSearchMovie } from "../../movies-api";
import SearchForm from "../../components/SearchForm/SearchForm";
import toast, { Toaster } from "react-hot-toast";
import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const queryParam = searchParams.get("query") ?? "";

  const searchMovieFilter = (newQuery) => {
    searchParams.set("query", newQuery);
    setSearchParams(searchParams);
    setQuery(newQuery);
  };

  useEffect(() => {
    async function fetchSearchMovie() {
      try {
        setError(false);
        setIsLoading(true);
        const data = await getSearchMovie(queryParam);
        if (data.total_results === 0 && query !== "") {
          toast.error("No matches");
        } else {
          setMovies(data.results);
        }
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSearchMovie();
  }, [queryParam, query]);

  return (
    <div className={css.container}>
      <SearchForm onSearch={searchMovieFilter} />
      {error && <b>Ups, something wrong...</b>}
      {isLoading && <b>Loading...</b>}
      {movies.length > 0 && <MovieList movies={movies} />}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
