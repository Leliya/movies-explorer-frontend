import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import './Movies.css'

// function Movies({ cards, saveCards, onSubmit, onCheck, isLoading, cardRender, checkbox, saveFilm, onChangeRequest, request}) {
function Movies({ dataSearch, savedFilms, onSubmit, onCheck, isLoading, cardRender, checkbox, onSaveFilm, onDelete, onChangeRequest, onChangeDataSearch }) {

  const [visibleCards, setVisibleCards] = React.useState([]);

  React.useEffect(() => {
    if (localStorage.getItem('prevSearch')) {
      onChangeDataSearch(JSON.parse(localStorage.getItem('prevSearch')))
    }

    // return(()=>{
    //   setDataSearch({ request: '', films: [], isShortFilms: false })
    // })
  }, []
  )

  // React.useEffect(() => {
  //   onChangeRequest(localStorage.getItem('request'))
  // }, [onChangeRequest])

  React.useEffect(() => {
    setVisibleCards(dataSearch.films.slice(0, cardRender.start));
  }, [dataSearch, cardRender])

  function renderMoreCards() {
    let newCards = dataSearch.films.slice(visibleCards.length, visibleCards.length + cardRender.step)
    setVisibleCards((renderedCards) => [...renderedCards, ...newCards])
  }

  return (
    <main className="movies">
      <SearchForm onSubmit={onSubmit} checkbox={dataSearch.isShortFilms} onCheck={onCheck} onChangeRequest={onChangeRequest} request={dataSearch.request} />
      {isLoading ?
        <Preloader /> :
        <>
          <MoviesCardList cardsArrayMain={visibleCards} onSaveFilm={onSaveFilm} cardsArrayCheck={savedFilms} onDelete={onDelete}/>
          {visibleCards.length !== dataSearch.films.length ? <button type="button" className="movies__button" onClick={renderMoreCards}>Ещё</button> :
            <></>}
        </>}
    </main>
  )
}

export default Movies;