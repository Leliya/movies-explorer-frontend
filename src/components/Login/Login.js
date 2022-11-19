import Input from "../Input/Input";
import PageWithForm from "../PageWithForm/PageWithForm";


function Login({onChange, onSubmit}) {

  function handlerChange(evt) {

    onChange(evt.target.name,evt.target.value)
  }

  function handlerFormSubmit(evt) {
    evt.preventDefault();
    onSubmit()
  }

  
  return (
    <PageWithForm
      title="Рады видеть!" 
      name="login" 
      buttonName="Войти" 
      caption="Ещё не зарегистрированы?" 
      path="/signup" 
      link="Регистрация" 
      onSubmit={handlerFormSubmit}>
      <Input type="email" name="email" label="E-mail" isValid={true} autoFocus={true} onChange={handlerChange}/>
      <Input type="password" name="password" label="Пароль" isValid={true} onChange={handlerChange}/>
    </PageWithForm>
  )
}

export default Login;