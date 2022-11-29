import React from "react";
import { useHistory } from "react-router-dom";
import './PageNotFound.css'


function PageNotFound() {

  const history = useHistory();
  const goBack = () => {
    history.goBack()
  }
  
  return (
    <div className="page-not-found">
      <p className="page-not-found__code">404</p>
      <p className="page-not-found__status">Страница не найдена</p>
      <button className="page-not-found__back" onClick={goBack}>Назад</button>
    </div>
  )
}

export default PageNotFound;