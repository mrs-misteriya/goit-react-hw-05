import { useEffect, useState } from "react";
import { getCast } from "../../movies-api";
import { useParams } from "react-router-dom";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();

  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchCast() {
      try {
        setError(false);
        setIsLoading(true);
        const data = await getCast(movieId);
        setCast(data.cast);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCast();
  }, [movieId]);

  return (
    <div>
      {error && <b>Ups, something wrong...</b>}
      {isLoading && <b>Loading...</b>}
      {cast.length > 0 && (
        <ul className={css.list}>
          {cast.map((actor) => (
            <li key={actor.credit_id}>
              <img
                src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
                alt="actor's photo"
              />
              <p className={css.actor}>{actor.name}</p>
              <p className={css.character}>Character: {actor.character}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
