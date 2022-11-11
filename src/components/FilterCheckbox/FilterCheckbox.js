import React from "react";
import './FilterCheckbox.css'

function FilterCheckbox() {
  // Временный код для проверки состояния
  const [isShortFilms, setShortFilms] = React.useState(false);
  //
  function isFull() {
    setShortFilms(false);
  }

  function isShort() {
    setShortFilms(true);
  }
  return (
    <fieldset className="checkbox">
      <label className="checkbox__label" htmlFor="shortFilms" onClick={isShortFilms ? isFull : isShort}>Короткометражки</label>
      <input className="checkbox__button_hidden" type="checkbox" name="shortFilms" id="shortFilms" ></input>
      <div className={`checkbox__button ${isShortFilms ? "checkbox__button_active" : ""}`} type="button" name="Короткометражки" onClick={isShortFilms ? isFull : isShort}>
        <div className={`checkbox__button-toggle ${isShortFilms ? "checkbox__button-toggle_active" : ""}`}></div>
      </div>
    </fieldset>
  )
}

export default FilterCheckbox;