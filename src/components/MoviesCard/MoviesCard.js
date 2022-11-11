import { Route } from 'react-router-dom';
import './MoviesCard.css';

function MoviesCard({ card }) {
  const cardImage = `https://api.nomoreparties.co${card.image.url}`;

  const cardDuration = `${Math.floor(card.duration / 60)}ч ${Math.floor(card.duration % 60)}м`;

  const isSaved = false;

  return (
    <article className="card">
      <div className="card__overlay">
        {<>
          <Route path="/movies">
            {isSaved ?
              <></> :
              <button className="card__button" type="button">
                Сохранить
              </button>}
          </Route>
          <Route path="/saved-movies">
            {isSaved ?
              <></> :
              <button className="card__button card__button_delete" type="button" aria-label='Удалить фильм'>
              </button>}
          </Route>
        </>
        }
        <a className="card__link" href={card.trailerLink} target="_blank" rel="noreferrer">
          <img className="card__image" src={cardImage} alt={`Кадр из фильма "${card.nameRU}"`} />
        </a>
      </div>
      {isSaved ? <div className="card__saved"></div> : <></>}
      <h3 className="card__title">{card.nameRU}</h3>
      <span className="card__duration">{cardDuration}</span>
    </article>
  )
}

export default MoviesCard;
