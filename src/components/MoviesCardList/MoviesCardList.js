import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({cards}) {
  return (
    <>
    <ul className="cardList">
      {cards.length===0?<></>:
      cards.map((item) => 
      <MoviesCard 
      card ={item}
      key={item.id}
      />
      )}
    </ul>
    <button type="button" className="cardList__button">Ещё</button>
    </>
  )
}

export default MoviesCardList;