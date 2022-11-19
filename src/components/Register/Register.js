import Input from "../Input/Input";
import PageWithForm from "../PageWithForm/PageWithForm";
import PopupWithError from "../PopupWithError/PopupWithError";
import React from "react";

function Register({ onSubmit, onChange, dataRegister }) {
  const [isOpenPopup, setIsOpenPopup] = React.useState(false)

  function handlerClosePopup() {
    setIsOpenPopup(false)
  }

  function handlerChange(evt) {

    onChange(evt.target.name,evt.target.value)
  }

  function handlerFormSubmit(evt) {
    evt.preventDefault();
    onSubmit()
  }

  return (
    <>
      <PageWithForm
        title="Добро пожаловать!"
        name="register"
        buttonName="Зарегистрироваться"
        caption="Уже зарегистрированы?"
        path="/signin"
        link="Войти"
        onSubmit={handlerFormSubmit}>
        <Input type="text" name="name" label="Имя" isValid={true} autoFocus={true} value={dataRegister.name} onChange={handlerChange} />
        <Input type="email" name="email" label="E-mail" isValid={true} value={dataRegister.email} onChange={handlerChange}/>
        <Input type="password" name="password" label="Пароль" isValid={false} value={dataRegister.password} onChange={handlerChange}/>
      </PageWithForm>
      <PopupWithError message="Кажется что-то пошло не так, попробуйте еще раз" isOpen={isOpenPopup} onClose={handlerClosePopup} />
    </>
  )
}

export default Register;

