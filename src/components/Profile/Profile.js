import React from 'react';
import { Link } from "react-router-dom";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Profile.css'
import PopupWithError from '../PopupWithError/PopupWithError';
import { regExpName } from '../../utils/regExp';
import { MESSAGE_ERROR_EMAIL, MESSAGE_ERROR_NAME, MESSAGE_ERROR_IDENTIC } from '../../utils/const'

function Profile({ onSubmit, onSignout, infoMessage, onClosePopup, isLoading }) {
  const validator = require("email-validator");
  const currentUser = React.useContext(CurrentUserContext);
  const [userInfo, setUserInfo] = React.useState({ name: currentUser.name, email: currentUser.email });
  const [isValid, setIsValid] = React.useState({ name: false, email: false });
  const [errors, setErrors] = React.useState({ name: '', email: '' });
  const [isButtonDisable, setIsButtonDisable] = React.useState(true);

//   React.useEffect(() =>{
//     setIsValid({ name: true, email: true })
// }, [])

React.useEffect(() =>{
  setIsButtonDisable(!(isValid.name&&isValid.email))
}, [isValid])


  function handleChange(evt) {
    const target = evt.target;
    const name = target.name;
    const value = target.value;
    const isNonIdentic = value !== currentUser[name]
    setUserInfo({ ...userInfo, [name]: value })
    setIsValid({ ...isValid, [name]: validate(target, name, value, isNonIdentic) })
    setErrors({ ...errors, [name]: target.validationMessage || (!isNonIdentic ? MESSAGE_ERROR_IDENTIC : name === 'name' ? MESSAGE_ERROR_NAME : MESSAGE_ERROR_EMAIL) })
  }

  const validate = (target, name, value, isNonIdentic) => {
    return name === 'name' ? target.validity.valid && isNonIdentic && value && !regExpName.test(value) :
      target.validity.valid && isNonIdentic && value && validator.validate(value)
  }

  function handlerSubmit(evt) {
    evt.preventDefault()
    onSubmit(userInfo)
  }

  return (
    <main className="profile">
      <div className="profile__container">
        <h2 className="profile__title">Привет, {currentUser.name}!</h2>
        <form className="profile__form" name="profile" id="profile" onSubmit={handlerSubmit}>
          <label className="profile__label" htmlFor='name'>
            Имя
            <input
              className="profile__input"
              value={userInfo.name || ''}
              name="name"
              id="name"
              minLength={2}
              maxLength={30}
              type="text"
              autoFocus={true}
              onChange={handleChange}
              disabled={isLoading}
              placeholder="Введите имя пользователя"
            >
            </input>
            {isValid.name ? <></> : <span className="profile__input-error">
              {errors.name}
            </span>}
          </label>
          <label className="profile__label" htmlFor='email' lang="en">
            E-mail
            <input
              className="profile__input"
              value={userInfo.email || ''}
              name="email"
              id="email"
              type="email"
              onChange={handleChange}
              disabled={isLoading}
              placeholder="Введите email"
            >
            </input>
            {isValid.email ? <></> : <span className="profile__input-error">
              {errors.email}
            </span>}
          </label>
        </form>
        <div className="profile__buttons">
          <button
            className="profile__button"
            type="submit"
            form="profile"
            disabled={isButtonDisable || isLoading}
          >
            Редактировать
          </button>
          <Link className="profile__exit" to="/" onClick={onSignout}>Выйти из аккаунта</Link>
        </div>
      </div>
      <PopupWithError infoMessage={infoMessage} onClose={onClosePopup} />
    </main>
  )
}

export default Profile;