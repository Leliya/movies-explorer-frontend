import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import './Movies.css'

function Movies({ cards }) {
  // Временный код для проверки состояния
  const isSearch = false;
  const testCardsEmpty = [];
  //
  return (
    <main className="movies">
      <SearchForm />
      {isSearch ?
        <Preloader /> :
        <>
          <MoviesCardList cards={testCardsEmpty} />
          {cards > 0 ? <button type="button" className="movies__button">Ещё</button> : 
          <></>}
          </>}
        </main>
  )
}

      export default Movies;