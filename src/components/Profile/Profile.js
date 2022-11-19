import React from 'react';
import { Link } from "react-router-dom";
import './Profile.css'

function Profile({ userName, email, onSubmit, onSignout }) {
  // Временный код для проверки состояния
  const [isDisable, setIsDisabled] = React.useState(true);
  const [nameInput, setName] = React.useState(userName);
  const [emailInput, setEmail] = React.useState(email);
  //const inputElement = React.useRef(null);

  React.useEffect(() => {
    setName(userName);
    setEmail(email);
  }, [userName, email])

  function handleChangeName(evt) {
    setName(evt.target.value)
  }

  function handleChangeEmail(evt) {
    setEmail(evt.target.value)
  }

  function isEdit() {
    setIsDisabled(!isDisable);
    // if (isDisable === false) {
    //   inputElement.current.focus()
    // }
  }

  function handlerSubmit(evt) {
    evt.preventDefault()
    onSubmit(nameInput, emailInput)
    //setIsDisabled(true);
  }

  return (
    <main className="profile">
      <div className="profile__container">
        <h2 className="profile__title">Привет, {userName}!</h2>
        <form className="profile__form" name="profile" id="profile" onSubmit={handlerSubmit}>
          <label className="profile__label" htmlFor='name'>
            Имя
            <input
              className="profile__input"
              value={nameInput}
              name="name"
              id="name"
              minLength={2}
              maxLength={30}
              type="text"
              disabled={isDisable && true}
              autoFocus={true}
              onChange={handleChangeName}
            //ref={inputElement}
            >
            </input>
          </label>
          <label className="profile__label" htmlFor='email' lang="en">
            E-mail
            <input
              className="profile__input"
              value={emailInput}
              name="email"
              id="email"
              type="email"
              disabled={isDisable && true}
              onChange={handleChangeEmail}
            >
            </input>
          </label>
        </form>
        <div className="profile__buttons">
          {isDisable ?
            <button
              className="profile__button"
              type="submit"
              form="profile"
              onClick={isEdit}>
              Редактировать
            </button>
            : <button
            className="profile__button profile__button_edit"
            type="button"
            form="profile"
            onClick={isEdit}>
            Сохранить
          </button>}
          <Link className="profile__exit" to="/" onClick={onSignout}>Выйти из аккаунта</Link>
        </div>
      </div>
    </main>
  )
}

export default Profile;