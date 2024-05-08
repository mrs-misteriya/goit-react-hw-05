import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getReviews } from "../../movies-api";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();

  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchReviews() {
      try {
        setError(false);
        setIsLoading(true);
        const data = await getReviews(movieId);
        setReviews(data.results);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchReviews();
  }, [movieId]);

  return (
    <div>
      {error && <b>Ups, something wrong...</b>}
      {isLoading && <b>Loading reviews...</b>}
      {reviews.length === 0 && <p>We don't have any reviews for this movie.</p>}
      {reviews.length > 0 && (
        <ul className={css.list}>
          {reviews.map((review) => (
            <li key={review.id}>
              <h4 className={css.author}>Author: {review.author}</h4>
              <p className={css.content}>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
