import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";
import './PageWithForm.css';


function PageWithForm({ 
  title, 
  name, 
  children, 
  buttonName, 
  caption, 
  path, 
  link, 
  onSubmit, 
  isFormValid }) {
  return (
    <main className="page-with-form">
      <div className="page-with-form__container">
        <Logo />
        <h2 className="page-with-form__title">{title}</h2>
        <form className="page-with-form__form" name={name} id={name} onSubmit={onSubmit}>
          {children}
          <button className="page-with-form__button" type="submit" disabled={!isFormValid}>{buttonName}</button>
        </form>
        <span className="page-with-form__caption">{caption}<Link to={path} className="page-with-form__link">{link}</Link> </span>
      </div>
    </main>
  )
}

export default PageWithForm;