import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi'
import './App.css';
import DetectCurrentWidth from "../../utils/detectWidth";
import ProtectedRoute from '../ProtectedRoute.js/ProtectedRoute';
import Preloader from '../Preloader/Preloader';
import { DEFAULT_MESSAGE, SUCCESS_CHANGE_MESSAGE } from '../../utils/const';


function App() {
  const width = DetectCurrentWidth()
  const history = useHistory();
  const [cardRender, changeCardRender] = React.useState({ start: 12, step: 3 });
  const [isLoading, setIsLoading] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isChecked, setIsChecked] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({ name: "", email: "" });
  const [allFilms, setAllFilms] = React.useState([]);
  const [dataSearch, setDataSearch] = React.useState({ request: '', films: [], isShortFilms: false });
  const [savedFilms, setSavedFilms] = React.useState([]);
  const [dataSearchSaveFilms, setDataSearchSaveFilms] = React.useState({ request: '', films: [], isShortFilms: false });
  const [infoMessage, setInfoMessage] = React.useState({ message: '', status: true });


  React.useEffect(() => {
    changeCardRender({ start: width > 900 ? 12 : width > 600 ? 8 : 5, step: width > 900 ? 3 : 2 });
  }, [width])

  React.useEffect(() => {
    setInfoMessage({ message: '', status: true });
  }, [history])

  React.useEffect(() => {
    mainApi.getUser()
      .then((userInfo) => {
        setLoggedIn(true)
        setCurrentUser(userInfo)
      })
      .catch(() => {     
        Redirect('/')
      })
      .finally(()=>setIsChecked(true))
  }, [])

  React.useEffect(() => {
    if (loggedIn) {
      moviesApi.getFilms()
        .then((films) => {
          setAllFilms(films);
        })
        .catch(() => setInfoMessage({ message: DEFAULT_MESSAGE, status: true }))
    }
  }, [loggedIn])

  React.useEffect(() => {
    if (loggedIn) {
      mainApi.getSavedFilms()
        .then((films) => {
          setSavedFilms(films)
        })
        .catch((err) => setInfoMessage({ message: err.message, status: true }))
    }
  }, [loggedIn])

  function filterFilms(films, request, checkbox) {
    return films.filter((film) => {
      return checkbox ?
        film.nameRU.toLowerCase().includes(request.toLowerCase()) && film.duration < 40 : film.nameRU.toLowerCase().includes(request.toLowerCase())
    })
  }

  function handlerChangeDataSearch(newDataSearch) {
    setDataSearch(newDataSearch)
  }

  function handlerChangeRequest(req) {
    setDataSearch({ ...dataSearch, request: req })
  }

  function handlerCheckbox() {
    const newStateShortFilms = filterFilms(allFilms, dataSearch.request, !dataSearch.isShortFilms)
    setDataSearch({ ...dataSearch, films: newStateShortFilms, isShortFilms: !dataSearch.isShortFilms });
    localStorage.setItem('prevSearch', JSON.stringify({ ...dataSearch, films: newStateShortFilms, isShortFilms: !dataSearch.isShortFilms }))
  }

  function handlerChangeSearchSavedFilms(newDataSearch) {
    setDataSearchSaveFilms(newDataSearch)
  }

  function handlerChangeRequestSaveFilms(req) {
    setDataSearchSaveFilms({ ...dataSearchSaveFilms, request: req })
  }

  function handlerCheckboxSaveFilms() {
    const newStateShortFilms = filterFilms(savedFilms, dataSearchSaveFilms.request, !dataSearchSaveFilms.isShortFilms)
    setDataSearchSaveFilms({ ...dataSearchSaveFilms, films: newStateShortFilms, isShortFilms: !dataSearchSaveFilms.isShortFilms });
  }

  function handlerSubmitSearchForm() {
    setIsLoading(true)
    const filmPromise = new Promise((res, rej) => {
      return res(filterFilms(allFilms, dataSearch.request, dataSearch.isShortFilms))
    })
    filmPromise.then((res) => {
      setDataSearch({ ...dataSearch, films: res })
      localStorage.setItem('prevSearch', JSON.stringify({ ...dataSearch, films: res }))
    })
      .finally(() => setIsLoading(false))
      .catch(() => setInfoMessage({ message: DEFAULT_MESSAGE, status: true }))
  }

  function handlerFilterSavedFilm() {
    setIsLoading(true)
    const filmSavedPromise = new Promise((res, rej) => {
      return res(filterFilms(
        savedFilms,
        dataSearchSaveFilms.request,
        dataSearchSaveFilms.isShortFilms))
    })
    filmSavedPromise.then((res) => setDataSearchSaveFilms({
      ...dataSearchSaveFilms,
      films: res
    }))
      .catch((err) => setInfoMessage({ message: err.message, status: true }))
      .finally(() => setIsLoading(false))
  }
  function handlerSaveFilm(card) {
    mainApi.saveFilm(card).then((res) => {
      setSavedFilms((films) => [...films, res])
    }).catch(() => setInfoMessage({ message: DEFAULT_MESSAGE, status: false }))
  }

  function handlerDeleteFilm(cardId) {
    mainApi.deleteFilm(cardId).then(() => {
      setSavedFilms(savedFilms.filter((film) => film._id !== cardId))
    }).catch(() => setInfoMessage({ message: DEFAULT_MESSAGE, status: false }))
  }


  function handlerSubmitRegister(dataRegister) {
    mainApi.signup(dataRegister).then(() => {
      history.push('/movies')
      setCurrentUser(dataRegister)
      handlerSubmitLogin({email:dataRegister.email, password:dataRegister.password})
    }
    ).catch((err) => {setInfoMessage({ message: err.message, status: false })
    setTimeout(() => { setInfoMessage({ message: '', status: true }) }, 1500)})
  }

  function handlerSubmitLogin(dataLogin) {
    mainApi.signin(dataLogin)
      .then(() => {
        setLoggedIn(true)
        history.push('/movies')
      }).catch((err) => {
        setInfoMessage({ message: err.message, status: false })
        setTimeout(() => { setInfoMessage({ message: '', status: true }) }, 1500)})
  }

  function handlerSubmitChangeUserinfo(newUserInfo) {
    mainApi.changeUserData(newUserInfo).then(() => {
      setCurrentUser(newUserInfo)
      setInfoMessage({ message: SUCCESS_CHANGE_MESSAGE, status: true })
      setTimeout(() => { setInfoMessage({ message: '', status: true }) }, 3000)
    }).catch((err) => setInfoMessage({ message: err.message, status: false }))
  }

  function handlerSignout() {
    mainApi.signout()
      .then(() => {
        setLoggedIn(false)
        setDataSearch({ request: '', films: [], isShortFilms: false });
        localStorage.clear();
        Redirect('/');
      }).catch((err) => setInfoMessage({ message: err.message, status: false }))
  }

  function handlerClosePopup() {
    setInfoMessage({ message: '', status: true })
  }

  return (
    <div className="page">
      <Switch>
        <Route exact path="/signup">
        {loggedIn ?<Redirect to='/movies'/>:<Register
            onSubmit={handlerSubmitRegister}
            infoMessage={infoMessage}
            onClosePopup={handlerClosePopup} />}
        </Route>
        <Route exact path="/signin">
        {loggedIn ?<Redirect to='/movies'/>:<Login
            onSubmit={handlerSubmitLogin}
            infoMessage={infoMessage}
            onClosePopup={handlerClosePopup} />}
        </Route>
        <CurrentUserContext.Provider value={currentUser}>
          <Switch>
            <Route exact path="/">
              <Header loggedIn={loggedIn} />
              <Main />
              <Footer />
            </Route>
            {isChecked ? 
              <ProtectedRoute
                exact
                path="/movies"
                loggedIn={loggedIn}
                component={Movies}
                dataSearch={dataSearch}
                savedFilms={savedFilms}
                onSubmit={handlerSubmitSearchForm}
                onCheck={handlerCheckbox}
                isLoading={isLoading}
                cardRender={cardRender}
                onSaveFilm={handlerSaveFilm}
                onDelete={handlerDeleteFilm}
                onChangeRequest={handlerChangeRequest}
                onChangeDataSearch={handlerChangeDataSearch}
                infoMessage={infoMessage}
                onClosePopup={handlerClosePopup}
              /> 
              : <Preloader />} 
            {isChecked ?
              <ProtectedRoute
                exact
                path="/saved-movies"
                loggedIn={loggedIn}
                component={SavedMovies}
                dataSearchSaveFilms={dataSearchSaveFilms}
                savedFilms={savedFilms}
                allCards={dataSearch.films}
                onSubmit={handlerFilterSavedFilm}
                onDelete={handlerDeleteFilm}
                onCheck={handlerCheckboxSaveFilms}
                onChangeRequest={handlerChangeRequestSaveFilms}
                onChangeDataSearch={handlerChangeSearchSavedFilms}
                infoMessage={infoMessage}
                onClosePopup={handlerClosePopup}
              /> : <Preloader />}
            <ProtectedRoute
              exact
              path="/profile"
              loggedIn={loggedIn}
              component={Profile}
              onSubmit={handlerSubmitChangeUserinfo}
              onSignout={handlerSignout}
              infoMessage={infoMessage}
              onClosePopup={handlerClosePopup}
            />
            {isChecked ?
              <Route path="*">
                <PageNotFound />
              </Route>
              : <Preloader />}
          </Switch>
        </CurrentUserContext.Provider>
      </Switch>
    </div>
  );
}

export default App;
