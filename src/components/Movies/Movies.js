import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function Movies({cards}) {
  return (
    <main className="main">
      <SearchForm />
      <MoviesCardList cards={cards}/>
    </main>
  )
}

export default Movies;