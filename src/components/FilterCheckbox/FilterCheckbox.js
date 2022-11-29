import React from "react";
import './FilterCheckbox.css'

function FilterCheckbox({ checkbox, onCheck }) {

  return (
    <fieldset className="checkbox">
      <label className="checkbox__label" htmlFor="shortFilms" >Короткометражки</label>
      <input className="checkbox__button_hidden" type="checkbox" name="shortFilms" id="shortFilms" checked={checkbox} onChange={onCheck}></input>
      <button className={`checkbox__button ${checkbox ? "checkbox__button_active" : ""}`} type="button" name="Короткометражки" onClick={onCheck}>
        <div className={`checkbox__button-toggle ${checkbox ? "checkbox__button-toggle_active" : ""}`}></div>
      </button>
    </fieldset>
  )
}

export default FilterCheckbox;