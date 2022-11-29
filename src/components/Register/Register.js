import Input from "../Input/Input";
import PageWithForm from "../PageWithForm/PageWithForm";
import PopupWithError from "../PopupWithError/PopupWithError";
import React from "react";
import useFormWithValidate from "../../utils/useFormWithValidate";

function Register({ onSubmit, infoMessage, onClosePopup }) {
  const validate = useFormWithValidate();

  function handlerFormSubmit(evt) {
    evt.preventDefault();
    onSubmit(validate.values)
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
        onSubmit={handlerFormSubmit}
        isFormValid={validate.isFormValid}>
        <Input
          type="text"
          name="name"
          label="Имя"
          isValid={validate.isValid.name}
          autoFocus={true}
          value={validate.values.name}
          onChange={validate.handleChange}
          error={validate.errors.name}
          minSymbol={2}
          maxSymbol={30}
        />
        <Input
          type="email"
          name="email"
          label="E-mail"
          isValid={validate.isValid.email}
          value={validate.values.email}
          onChange={validate.handleChange}
          error={validate.errors.email}
        />
        <Input
          type="password"
          name="password"
          label="Пароль"
          isValid={validate.isValid.password}
          value={validate.values.password}
          onChange={validate.handleChange}
          error={validate.errors.password}
        />
      </PageWithForm>
      <PopupWithError infoMessage={infoMessage} onClose={onClosePopup} />
    </>
  )
}

export default Register;

