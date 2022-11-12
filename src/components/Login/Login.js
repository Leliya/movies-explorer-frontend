import Input from "../Input/Input";
import PageWithForm from "../PageWithForm/PageWithForm";


function Login() {
  return (
    <PageWithForm
      title="Рады видеть!" name="login" buttonName="Войти" caption="Ещё не зарегистрированы?" path="/signup" link="Регистрация">
      <Input type="email" name="email" label="E-mail" isValid={true} autoFocus={true} />
      <Input type="password" name="password" label="Пароль" isValid={true} />
    </PageWithForm>
  )
}

export default Login;