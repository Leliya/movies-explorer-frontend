import MoviesCard from "../MoviesCard/MoviesCard";
import PopupWithError from "../PopupWithError/PopupWithError";
import './MoviesCardList.css';

function MoviesCardList({ cardsArrayMain,
  onSaveFilm,
  cardsArrayCheck,
  onDelete,
  infoMessage,
  onClosePopup }) {
  return (
    <>
      <PopupWithError infoMessage={infoMessage} onClose={onClosePopup} />
      {cardsArrayMain.length === 0 ? <div className="cardList__empty"><span className="cardList__notFound">Ничего не найдено</span></div> :
        <ul className="cardList">
          {cardsArrayMain.map((item) =>
            < MoviesCard
              card={item}
              key={item.id || item._id}
              onSaveFilm={onSaveFilm}
              cardsArrayCheck={cardsArrayCheck}
              onDelete={onDelete}
            />
          )}
        </ul>}
    </>
  )
}

export default MoviesCardList;