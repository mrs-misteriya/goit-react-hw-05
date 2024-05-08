import { NavLink } from "react-router-dom";

import css from "./Navigation.module.css";

export default function Navigation() {
  const buildLinkClass = ({ isActive }) => {
    return isActive && css.active;
  };

  return (
    <nav className={css.nav}>
      <NavLink to="/" className={buildLinkClass}>
        Home page
      </NavLink>
      <NavLink to="/movies" className={buildLinkClass}>
        Movies page
      </NavLink>
    </nav>
  );
}
