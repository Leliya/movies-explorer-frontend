import Input from "../Input/Input";
import PageWithForm from "../PageWithForm/PageWithForm";
import PopupWithError from "../PopupWithError/PopupWithError";
import React from "react";

function Register() {
  const [isOpenPopup, setIsOpenPopup] = React.useState(true)

  function handlerClosePopup() {
    setIsOpenPopup(false)
  }

  return (
    <>
      <PageWithForm
        title="Добро пожаловать!" name="register" buttonName="Зарегистрироваться" caption="Уже зарегистрированы?" path="/signin" link="Войти">
        <Input type="text" name="name" label="Имя" isValid={true} autoFocus={true} />
        <Input type="email" name="email" label="E-mail" isValid={true} />
        <Input type="password" name="password" label="Пароль" isValid={false} />

      </PageWithForm>
      <PopupWithError message="Кажется что-то пошло не так, попробуйте еще раз" isOpen={isOpenPopup} onClose={handlerClosePopup} />
    </>
  )
}

export default Register;

