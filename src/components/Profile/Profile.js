import React from 'react';
import { Link } from "react-router-dom";
import './Profile.css'

function Profile({ userName }) {
  // Временный код для проверки состояния
  const [isDisable, setIsDisabled] = React.useState(true);
  const [name, setName] = React.useState("Мария");
  const [email, setEmail] = React.useState("pochta@yandex.ru");
  //const inputElement = React.useRef(null);

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
  //
  return (
    <main className="profile">
      <div className="profile__container">
        <h2 className="profile__title">Привет, {userName}!</h2>
        <form className="profile__form" name="profile" id="profile" noValidate={true}>
          <label className="profile__label" htmlFor='name'>
            Имя
            <input
              className="profile__input"
              value={name}
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
              value={email}
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
          <button
            className={`profile__button ${isDisable ? "" : "profile__button_edit"}`}
            type={isDisable ? "button" : "submit"}
            onClick={isEdit}
            form="login">
            {isDisable ? "Редактировать" : "Сохранить"}
          </button>
          <Link className="profile__exit" to="/signin">Выйти из аккаунта</Link>
        </div>
      </div>
    </main>
  )
}

export default Profile;