import React from 'react';
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import './SavedMovies.css';

//function SavedMovies({ cards, allCards, onDelete, onSubmit, checkbox, onCheck, onChangeRequest, request }) {
function SavedMovies({ 
  dataSearchSaveFilms, 
  savedFilms, 
  allCards, 
  onDelete, 
  onSubmit, 
  onCheck, 
  onChangeRequest,
  onChangeDataSearch}) {


   React.useEffect(() => {
    onChangeDataSearch({ request: '', films: savedFilms, isShortFilms: false})
  }, [savedFilms])

  return (
    <main className="saved-movies">
      <SearchForm 
      onSubmit={onSubmit} 
      checkbox={dataSearchSaveFilms.isShortFilms} 
      onCheck={onCheck} 
      onChangeRequest={onChangeRequest} 
      request={dataSearchSaveFilms.request}/>
      <MoviesCardList 
      cardsArrayMain={dataSearchSaveFilms.films} 
      cardsArrayCheck={allCards} 
      onDelete={onDelete}/>
    </main>
  )
}

export default SavedMovies;