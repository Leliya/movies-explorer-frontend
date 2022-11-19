class MoviesApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }


  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}. ${res.body.message}`);
  }

  getFilms = () => {
    return fetch(this._baseUrl)
      .then(this._checkResponse)
  }

}

const moviesApi = new MoviesApi({
  baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
  headers: {
    "Content-Type": "application/json",
  },
});

export default moviesApi;