import { Link } from "react-router-dom";
import css from './NotFoundPage.module.css'


export default function NotFoundPage() {
  return (
    <div className={css.container}>
      <p>Sorry! Page is not found</p>
      <p>
        Please visit our <Link to="/">Home page</Link>
      </p>
    </div>
  );
}
