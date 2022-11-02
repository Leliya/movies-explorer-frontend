function Portfolio() {
  return (
    <div className="portfolio">
      <h4 className="portfolio__header">Портфолио</h4>
      <ul className="portfolio__links">
        <li className="portfolio__item"><a className="portfolio__link" href="https://github.com/Leliya/how-to-learn" target="_blank" rel="noreferrer">Статичный сайт</a><div className="portfolio__icon-link"></div></li>
        <li className="portfolio__item"><a className="portfolio__link" href="https://github.com/Leliya/russian-travel" target="_blank" rel="noreferrer">Адаптивный сайт</a><div className="portfolio__icon-link"></div></li>
        <li className="portfolio__item"><a className="portfolio__link" href="https://leliya.mesto.nomoredomains.icu/" target="_blank" rel="noreferrer">Одностраничное приложение</a><div className="portfolio__icon-link"></div></li>
      </ul>
    </div>
  )
}

export default Portfolio;