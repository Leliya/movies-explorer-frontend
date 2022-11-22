import React from "react";
import Input from "../Input/Input";
import PageWithForm from "../PageWithForm/PageWithForm";
import useFormWithValidate from "../../utils/useFormWithValidate";
import PopupWithError from "../PopupWithError/PopupWithError";


function Login({ onSubmit, infoMessage, onClosePopup }) {
  const validate = useFormWithValidate();

  //React.useEffect(() => validate.resetForm(), [])

  function handlerFormSubmit(evt) {
    evt.preventDefault();
    onSubmit(validate.values)
  }

  return (
    <>
      <PageWithForm
        title="Рады видеть!"
        name="login"
        buttonName="Войти"
        caption="Ещё не зарегистрированы?"
        path="/signup"
        link="Регистрация"
        onSubmit={handlerFormSubmit}
        isFormValid={validate.isFormValid}>
        <Input
          type="email"
          name="email"
          label="E-mail"
          isValid={validate.isValid.email}
          value={validate.values.email}
          onChange={validate.handleChange}
          error={validate.errors.email} />
        <Input
          type="password"
          name="password"
          label="Пароль"
          isValid={validate.isValid.password}
          value={validate.values.password}
          onChange={validate.handleChange}
          error={validate.errors.password} />
      </PageWithForm>
      <PopupWithError infoMessage={infoMessage} onClose={onClosePopup} />
    </>
  )
}

export default Login;