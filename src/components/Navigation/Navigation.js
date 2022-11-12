import { NavLink, Link } from "react-router-dom";
import React from "react";
import './Navigation.css';

function Navigation({ isMenuOpened, isClose }) {
  //   const [isMenuOpened, setMenuOpened] = React.useState(false);

  // function isClose() {
  //   setMenuOpened(false);
  // }

  // function isOpen() {
  //   setMenuOpened(true);
  // }

  return (
    <nav className={`menu ${isMenuOpened ? "menu_opened" : ""}`}>
      {isMenuOpened ? <button className="menu__button-close" type="button" aria-label="Закрыть меню" onClick={isClose}></button>
        : <></>}
      <ul className={`menu__links ${isMenuOpened ? "menu__links_opened" : ""}`}>
        {isMenuOpened ?
          <NavLink
            exact to='/'
            activeClassName={`menu__link_active ${isMenuOpened ? "menu__link_active_opened" : ""}`}
            className={`menu__link ${isMenuOpened ? "menu__link_opened" : ""}`}>
            Главная
          </NavLink> : <></>}
        <NavLink
          to="/movies"
          activeClassName={`menu__link_active ${isMenuOpened ? "menu__link_active_opened" : ""}`}
          className={`menu__link ${isMenuOpened ? "menu__link_opened" : ""}`}>
          Фильмы
        </NavLink>
        <NavLink
          to="/saved-movies"
          activeClassName={`menu__link_active ${isMenuOpened ? "menu__link_active_opened" : ""}`}
          className={`menu__link ${isMenuOpened ? "menu__link_opened" : ""}`}>
          Сохраненные фильмы
        </NavLink>
      </ul>
      <Link
        to='/profile'
        className={`menu__profile ${isMenuOpened ? "menu__profile_opened" : ""}`}>
        Аккаунт
        <div className="menu__profile-icon"></div>
      </Link>
    </nav>
  )
}

export default Navigation;
