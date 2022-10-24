import React from "react";
import { Link } from "react-router-dom";
import Navigation from '../Navigation/Navigation'

function Header() {
  const loggedIn = true;
  return (
    <header className="header">
      <Link to='/' className="header__logo"></Link>
      {loggedIn ?<Navigation />:<></>}
      <div className="header__buttons">
        {loggedIn ?
          <Link to='/profile' className='header__profile'>Аккаунт<div className="header__profile-icon"></div></Link>
          : <><Link to='/register' className='header__register'>Регистрация</Link>
            <Link to='/login' className='header__login'>Войти</Link></>}
      </div>
      <button type="button" className="header__burger-menu"></button>
    </header>
  )
}

export default Header;