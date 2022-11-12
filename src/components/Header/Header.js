import React from "react";
import { Link } from "react-router-dom";
import Navigation from '../Navigation/Navigation'
import Logo from "../Logo/Logo";
import './Header.css';

function Header() {
  // Временный код для проверки состояния
  const loggedIn = true;

  const [isMenuOpened, setMenuOpened] = React.useState(false);

  function isClose() {
    setMenuOpened(false);
  }

  function isOpen() {
    setMenuOpened(true);
  }
  //

  return (
    <header className="header">
      <Logo />
      {loggedIn ?
        <>
          <Navigation isMenuOpened={isMenuOpened} isClose={isClose} />
          {!isMenuOpened &&
            <button type="button" className="header__burger-button" aria-label="Открыть меню" onClick={isOpen} ></button>}
        </> :
        <div className="header__buttons">
          <Link to='/signup' className='header__register'>Регистрация</Link>
          <Link to='/signin' className='header__login'>Войти</Link>
        </div>}
    </header>
  )
}

export default Header;