class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;

  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}. ${res.body.message}`);
  }

  signup(userData) {
    return fetch(`${this._baseUrl}signup`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
        password: userData.password,
      })
    }).then(this._checkResponse)
  }

  signout() {
    return fetch(`${this._baseUrl}signout`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
    }).then(this._checkResponse)
  }

  signin(userData) {
    return fetch(`${this._baseUrl}signin`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
      })
    }).then(this._checkResponse)
  }

  getUser() {
    return fetch(`${this._baseUrl}users/me`, {
      headers: this._headers,
      credentials: "include"
    }).then(this._checkResponse);
  }

  changeUserData(newName, newEmail) {
    return fetch(`${this._baseUrl}users/me`, {
      method: "PATCH",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        name: newName,
        email: newEmail,
      })
    }).then(this._checkResponse)
  }

  getSavedFilms(){
    return fetch(`${this._baseUrl}movies`, {
      headers: this._headers,
      credentials: "include"
    }).then(this._checkResponse);
  }

  saveFilm(card) {
    return fetch(`${this._baseUrl}movies`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        country: card.country,
        director: card.director,
        duration: card.duration,
        year: card.year,
        description: card.description,
        image: `https://api.nomoreparties.co${card.image.url}`,
        trailerLink: card.trailerLink,
        nameRU: card.nameRU,
        nameEN: card.nameEN,
        thumbnail: `https://api.nomoreparties.co${card.image.formats.thumbnail.url}`,
        movieId: card.id,
      })
    }).then(this._checkResponse)
  }

  deleteFilm(cardId) {
    return fetch(`${this._baseUrl}movies/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
      credentials: "include",
    }).then(this._checkResponse)
  }
}
  const mainApi = new MainApi({
    baseUrl: "http://localhost:3001/",
    //baseUrl: "https://api.movies.leliya.nomoredomains.icu/",
    headers: {
      "Content-Type": "application/json",

    },
  });

export default mainApi;