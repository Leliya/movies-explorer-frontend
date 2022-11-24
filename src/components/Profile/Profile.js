import React from 'react';
import { Link } from "react-router-dom";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Profile.css'
import useFormWithValidate from "../../utils/useFormWithValidate";
import PopupWithError from '../PopupWithError/PopupWithError';

function Profile({ onSubmit, onSignout, infoMessage, onClosePopup }) {
  const currentUser = React.useContext(CurrentUserContext);
  const validate = useFormWithValidate();

  // React.useEffect(() => validate.resetForm(), [])

  function handlerSubmit(evt) {
    evt.preventDefault()
    if (!validate.values.name) {
      validate.values.name = currentUser.name
    } else if (!validate.values.email) {
      validate.values.email = currentUser.email
    }
    onSubmit(validate.values)
  }

  return (
    <main className="profile">
      <div className="profile__container">
        <h2 className="profile__title">Привет, {currentUser.name}!</h2>
        <form className="profile__form" name="profile" id="profile" onSubmit={handlerSubmit}>
          <label className="profile__label" htmlFor='name'>
            Имя
            <input
              className={validate.isValid.name ? "profile__input" : "profile__input profile__input_error"}
              value={validate.values.name?validate.values.name:currentUser.name}
              name="name"
              id="name"
              minLength={2}
              maxLength={30}
              type="text"
              autoFocus={true}
              onChange={validate.handleChange}
              //placeholder={currentUser.name}
              placeholder="Введите имя пользователя"
            >
            </input>
            {validate.isValid.name ? <></> : <span className="profile__input-error">
              {validate.errors.name}
            </span>}
          </label>
          <label className="profile__label" htmlFor='email' lang="en">
            E-mail
            <input
              className={validate.isValid.email ? "profile__input" : "profile__input profile__input_error"}
              value={validate.values.email || currentUser.name}
              name="email"
              id="email"
              type="email"
              onChange={validate.handleChange}
              placeholder="Введите email"
            >
            </input>
            {validate.isValid.email ? <></> : <span className="profile__input-error">
              {validate.errors.email}
            </span>}
          </label>
        </form>
        <div className="profile__buttons">
          <button
            className="profile__button"
            type="submit"
            form="profile"

            disabled={validate.isButtonDisable ? !(validate.values.name !== currentUser.name || validate.values.email !== currentUser.email) : true}>
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