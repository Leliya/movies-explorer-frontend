import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import './SavedMovies.css';

function SavedMovies({ cards }) {
  return (
    <main className="saved-movies">
      <SearchForm />
      <MoviesCardList cards={cards} />
    </main>
  )
}

export default SavedMovies;