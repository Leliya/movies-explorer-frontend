import React from 'react';
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import './SavedMovies.css';

function SavedMovies({
  dataSearchSaveFilms,
  savedFilms,
  allCards,
  onDelete,
  onSubmit,
  onCheck,
  onChangeRequest,
  onChangeDataSearch,
  infoMessage,
  onClosePopup
}) {


  React.useEffect(() => {
    onChangeDataSearch({ request: '', films: savedFilms, isShortFilms: false })
  }, [savedFilms])

  return (
    <main className="saved-movies">
      <SearchForm
        onSubmit={onSubmit}
        checkbox={dataSearchSaveFilms.isShortFilms}
        onCheck={onCheck}
        onChangeRequest={onChangeRequest}
        request={dataSearchSaveFilms.request} />
      <MoviesCardList
        cardsArrayMain={dataSearchSaveFilms.films}
        cardsArrayCheck={allCards}
        onDelete={onDelete}
        infoMessage={infoMessage}
        onClosePopup={onClosePopup} />
    </main>
  )
}

export default SavedMovies;