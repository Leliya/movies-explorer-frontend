import React from "react";
import { Route } from 'react-router-dom';
import './MoviesCard.css';

function MoviesCard({ card, onSaveFilm, onDelete, cardsArrayCheck }) {
  const [isSaved, setIsSaved] = React.useState(false)

  React.useEffect(() => {
    function checkStateCard() {
      return cardsArrayCheck.some((film) => card.id === film.movieId)
    }
    function checkStateSaveCard() {
      return cardsArrayCheck.some((film) => card.movieId === film.id)
    }
    card.id ? setIsSaved(checkStateCard()) : setIsSaved(checkStateSaveCard())
    return (() => setIsSaved(false))
  }, [cardsArrayCheck, card])

  const cardImage = card.image.url ? `https://api.nomoreparties.co${card.image.url}` : card.image;

  const cardDuration = `${Math.floor(card.duration / 60)}ч ${Math.floor(card.duration % 60)}м`;

  function handlerOnSave() {
    onSaveFilm(card)
  }

  function handlerOnDelete() {
    if (card._id){
    onDelete(card._id)}
    else{
      let filmForDelete=cardsArrayCheck.find((savedFilms)=>card.id===savedFilms.movieId)
      onDelete(filmForDelete._id)
    }
  }


  return (
    <article className="card">
      <div className="card__overlay">
        {<>
          <Route path="/movies">
            {isSaved ?
              <div className="card__saved"  onClick={handlerOnDelete}></div> :
              <button className="card__button" type="button" onClick={handlerOnSave}>
                Сохранить
              </button>}
          </Route>
          <Route path="/saved-movies">
            {/* {isSaved ?
              <></> : */}
            <button className="card__button card__button_delete" type="button" aria-label='Удалить фильм' onClick={handlerOnDelete}>
            </button>
             {/* } */}
          </Route>
        </>
        }
        <a className="card__link" href={card.trailerLink} target="_blank" rel="noreferrer">
          <img className="card__image" src={cardImage} alt={`Кадр из фильма "${card.nameRU}"`} />
        </a>
      </div>
      {/* {isSaved ? <div className="card__saved"></div> : <></>} */}
      <h3 className="card__title">{card.nameRU}</h3>
      <span className="card__duration">{cardDuration}</span>
    </article>
  )
}

export default MoviesCard;
