// import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import './MoviesCardList.css';

function MoviesCardList({ cardsArrayMain, onSaveFilm, cardsArrayCheck, onDelete }) {
  // const [ isSave, setIsSave ] = React.useState(false)

  return (
    cardsArrayMain.length === 0 ? <div className="cardList__empty"><span className="cardList__notFound">Фильмы не найдены</span></div> :
      <ul className="cardList">
        {cardsArrayMain.map((item) => 
          // saveCards.forEach((film) => {
          //   if (item.id === film.movieId) {
          //     setIsSave(true)
          //   }
          // })

          // return 
          < MoviesCard
            card={item}
            key={item.id || item._id}
            onSaveFilm={onSaveFilm}
            //isSave={isSave}
            cardsArrayCheck={cardsArrayCheck}
            onDelete={onDelete}
          />
        
        )}
      </ul>
  )
}

export default MoviesCardList;