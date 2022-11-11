import React from "react";
import { Link, useHistory } from "react-router-dom";
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
      <Link className="page-not-found__back" onClick={goBack}>Назад</Link>
    </div>
  )
}

export default PageNotFound;