import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <nav className="menu">
      <NavLink to="/movies" activeClassName="menu_link-movies_active" className="menu_link-movies">Фильмы</NavLink>
      <NavLink to="/save-movies" activeClassName="menu_link-movies_active" className="menu_link-movies">Сохраненные фильмы</NavLink>
    </nav>
  )
}

export default Navigation;
