import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { getMovieId } from "../../movies-api";
import { useState } from "react";
import css from "./MovieDetailsPage.module.css";
import { NavLink, Outlet } from "react-router-dom";
import { Suspense } from "react";

export default function MovieDetailsPage() {
  const { movieId } = useParams();

  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();
  const backLinkURLRef = useRef(location.state ?? "/");

  useEffect(() => {
    async function fetchMovie() {
      try {
        setError(false);
        setIsLoading(true);
        const data = await getMovieId(movieId);
        setMovie(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovie();
  }, [movieId]);
  return (
    <div>
      {error && <p>Ups, something wrong. Check the address</p>}
      {isLoading && <b>Loading...</b>}
      {movie && (
        <div>
          <div className={css.btn}>
            <Link to={backLinkURLRef.current}>Go back</Link>
          </div>

          <div className={css.cardMovie}>
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
            />
            <div>
              <div className={css.title}>
                <h2>{movie.title}</h2>
                <h2>({movie.release_date.slice(0, 4)})</h2>
              </div>

              <p>User score: {Math.round(movie.vote_average * 10)}%</p>
              <h3>Overview</h3>
              <p>{movie.overview}</p>
              <h4>Genres</h4>
              <ul className={css.genres}>
                {movie.genres.map((genre) => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <ul className={css.info}>
        Additional information
        <li>
          <NavLink to="cast">Cast</NavLink>
        </li>
        <li>
          <NavLink to="reviews">Reviews</NavLink>
        </li>
      </ul>

      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </div>
  );
}
