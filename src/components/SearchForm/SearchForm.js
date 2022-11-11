import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import './SearchForm.css'

function SearchForm() {
  // const isText = true;
  // const search = "";


  return (
    <form className="searchBar" name="searchBar" noValidate>
      <fieldset className="searchBar__box">
        <input className="searchBar__input" type="search" name="searchBar" placeholder="Фильм" required={true} ></input>
        <button className="searchBar__button" type="submit" name="Отправить"></button>
      </fieldset>
      <FilterCheckbox />
    </form>
  )
}

export default SearchForm;