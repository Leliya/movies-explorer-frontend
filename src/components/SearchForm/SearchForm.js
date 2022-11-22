import React from 'react';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import './SearchForm.css'

function SearchForm({ onSubmit, checkbox, onCheck, onChangeRequest, request }) {
  function handlerChange(evt) {
    onChangeRequest(evt.target.value);
  }

  function handlerSubmit(evt) {
    evt.preventDefault();
    onSubmit();
  }

  return (
    <form className="searchBar" name="searchBar" onSubmit={handlerSubmit}>
      <fieldset className="searchBar__box">
        <input
          className="searchBar__input"
          type="search"
          name="searchBar"
          placeholder="Фильм"
          required={true}
          value={request}
          onChange={handlerChange}>
        </input>
        <button className="searchBar__button" type="submit" name="Отправить" disabled={!request}></button>
      </fieldset>
      <FilterCheckbox checkbox={checkbox} onCheck={onCheck} />
    </form>
  )
}

export default SearchForm;