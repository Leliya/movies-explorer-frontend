import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
  const isText = false;
  const search = "";
  

  return (
    <form className="searchBar" name="searchBar"  noValidate>
      <fieldset className="searchBar__box">
      {/* <input className="search__input" type="search" name="search" placeholder="Фильм" required="true" value={search||""}></input> */}
      <input className="searchBar__input" type="search" name="searchBar" placeholder="Фильм" required={true} ></input>
      {isText ? <button className="searchBar__reset" type="reset" name="Сбросить техт"></button> : <></>}
      <button className="searchBar__button" type="submit" name="Отправить"></button>
      {/* <span className="search__input-error"></span> */}
      </fieldset>
      <FilterCheckbox />
    </form>
  )
}

export default SearchForm;