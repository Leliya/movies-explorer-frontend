import MoviesCard from "../MoviesCard/MoviesCard";
import './MoviesCardList.css';

function MoviesCardList({ cards }) {
  return (
    cards.length === 0 ? <div className="cardList__empty"><span className="cardList__notFound">Фильмы не найдены</span></div> :
      <ul className="cardList">
        {cards.map((item) =>
          <MoviesCard
            card={item}
            key={item.id}
          />
        )}
      </ul>
  )
}

export default MoviesCardList;