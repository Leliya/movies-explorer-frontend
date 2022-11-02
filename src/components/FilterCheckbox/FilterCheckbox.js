function FilterCheckbox() {
  const isShortFilms = true;
  //const isShortFilms = false;
  return (
    <fieldset className="checkbox">
      <label className="checkbox__label">Короткометражки</label>
      <input className="checkbox__button_hidden" type="checkbox" name="Короткометражки"></input>
      <div className={`checkbox__button ${isShortFilms? "checkbox__button_active":""}`} type="button" name="Короткометражки">
        <div className={`checkbox__button-toggle ${isShortFilms? "checkbox__button-toggle_active":""}`}></div>
      </div>
    </fieldset>
  )
}

export default FilterCheckbox;