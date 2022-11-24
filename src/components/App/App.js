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
import { 
  DEFAULT_MESSAGE, 
  SUCCESS_CHANGE_MESSAGE, 
  REQUEST_EMPTY_MESSAGE, 
  ERROR_AUTH, 
  ERROR_DATA_AUTH, 
  RENDER_WIDTH,
  RENDER_START,
  RENDER_STEP,
  FILM_SHORT
 } from '../../utils/const';


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
  const [infoMessage, setInfoMessage] = React.useState({ message: '', status: true, isOpen: false });


  React.useEffect(() => {
    setAllFilms(JSON.parse(localStorage.getItem("beatfilms")))
  }, [history])

  React.useEffect(() => {
    changeCardRender({ 
      start: width > RENDER_WIDTH.max ? 
      RENDER_START.max 
      : width > RENDER_WIDTH.min ? 
      RENDER_START.mid 
      : RENDER_START.min, step: width > RENDER_WIDTH.max ? RENDER_STEP.max : RENDER_STEP.min });
  }, [width])

  // React.useEffect(() => {
  //   setInfoMessage({ message: '', status: true, isOpen: false });
  // }, [history])

  React.useEffect(() => {
    mainApi.getUser()
      .then((userInfo) => {
        setLoggedIn(true)
        setCurrentUser(userInfo)
      })
      .catch(() => {
        Redirect('/')
      })
      .finally(() => setIsChecked(true))

    return (() => setIsChecked(false))
  }, [loggedIn])

  // React.useEffect(() => {
  //   if (loggedIn) {
  //     moviesApi.getFilms()
  //       .then((films) => {
  //         setAllFilms(films);
  //       })
  //       .catch(() => setInfoMessage({ message: DEFAULT_MESSAGE, status: true }))
  //   }
  // }, [loggedIn])



  React.useEffect(() => {
    if (loggedIn) {
      mainApi.getSavedFilms()
        .then((films) => {
          setSavedFilms(films)
        })
        .catch((err) => checkAuth(err) && setInfoMessage({ message: err.message, status: false, isOpen: false }))
    }
  }, [loggedIn])

  function checkAuth(res) {
    if (res === 401) {
      setInfoMessage({ message: ERROR_AUTH, status: false, isOpen: true })
      setTimeout(() => {
        localStorage.clear();
        clearInfoMessage()
        setDataSearch({ request: '', films: [], isShortFilms: false });
        setSavedFilms([]);
        setLoggedIn(false)
        Redirect('/');
      }, 2000)
      return true
    }
    return false
  }

  function filterFilms(films, request, checkbox) {
    return films.filter((film) => {
      return checkbox ?
        film.nameRU.toLowerCase().includes(request.toLowerCase()) && film.duration < FILM_SHORT : film.nameRU.toLowerCase().includes(request.toLowerCase())
    })
  }

  function handlerChangeDataSearch(newDataSearch) {
    setDataSearch(newDataSearch)
  }

  function handlerChangeRequest(req) {
    setDataSearch({ ...dataSearch, request: req })
  }

  function handlerCheckbox() {
    if (allFilms) {
      const newStateShortFilms = filterFilms(allFilms, dataSearch.request, !dataSearch.isShortFilms)
      setDataSearch({ ...dataSearch, films: newStateShortFilms, isShortFilms: !dataSearch.isShortFilms });
      localStorage.setItem('prevSearch', JSON.stringify({ ...dataSearch, films: newStateShortFilms, isShortFilms: !dataSearch.isShortFilms }))
    }
    else {
      setDataSearch({ ...dataSearch, isShortFilms: !dataSearch.isShortFilms });
      localStorage.setItem('prevSearch', JSON.stringify({ ...dataSearch, isShortFilms: !dataSearch.isShortFilms }))
    }
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
    clearInfoMessage()
    if (!dataSearch.request) {
      setInfoMessage({ message: REQUEST_EMPTY_MESSAGE, status: false, isOpen: true })
      setTimeout(() => setInfoMessage({ message: REQUEST_EMPTY_MESSAGE, status: false, isOpen: false }), 3000)
      return
    }
    setIsLoading(true)
    const filmPromise = new Promise((res, rej) => {
      if (!localStorage.getItem("beatfilms")) {
        moviesApi.getFilms()
          .then((films) => {
            setAllFilms(films)
            localStorage.setItem('beatfilms', JSON.stringify(films))
            return res(filterFilms(films, dataSearch.request, dataSearch.isShortFilms))
          })
      } else {
        return res(filterFilms(allFilms, dataSearch.request, dataSearch.isShortFilms))
      }
    })
    filmPromise.then((res) => {
      setDataSearch({ ...dataSearch, films: res })
      localStorage.setItem('prevSearch', JSON.stringify({ ...dataSearch, films: res }))
    })
      .finally(() => setIsLoading(false))
      .catch((err) => checkAuth(err) && setInfoMessage({ message: DEFAULT_MESSAGE, status: false, isOpen: false }))
  }

  function handlerFilterSavedFilm() {
    clearInfoMessage()
    if (!dataSearchSaveFilms.request) {
      setInfoMessage({ message: REQUEST_EMPTY_MESSAGE, status: false, isOpen: true })
      //setTimeout(()=>setInfoMessage({ message: REQUEST_EMPTY_MESSAGE, status: false, isOpen: false }), 3000)
      return
    }
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
      .catch((err) => checkAuth(err) && setInfoMessage({ message: err.message, status: false, isOpen: false }))
      .finally(() => setIsLoading(false))

  }

  function handlerSaveFilm(card) {
    mainApi.saveFilm(card).then((res) => {
      setSavedFilms((films) => [...films, res])
    }).catch((err) => checkAuth(err))
  }

  function handlerDeleteFilm(cardId) {
    mainApi.deleteFilm(cardId).then(() => {
      setSavedFilms(savedFilms.filter((film) => film._id !== cardId))
    }).catch((err) => checkAuth(err))
  }


  function handlerSubmitRegister(dataRegister) {
    mainApi.signup(dataRegister).then(() => {
      setCurrentUser(dataRegister)
      handlerSubmitLogin({ email: dataRegister.email, password: dataRegister.password })
    }
    ).catch((err) => {
      setInfoMessage({ message: err.message, status: false, isOpen: true })
      setTimeout(() => clearInfoMessage(), 1500)
    })
  }

  function handlerSubmitLogin(dataLogin) {
    mainApi.signin(dataLogin)
      .then(() => {
        setLoggedIn(true)
        history.push('/movies')
      }).catch((err) => {
        err === 401 ? setInfoMessage({ message: ERROR_DATA_AUTH, status: false, isOpen: true }) :
          setInfoMessage({ message: err.message, status: false, isOpen: true })
        setTimeout(() => clearInfoMessage(), 1500)
      })
      .finally(() => setIsChecked(true))
  }

  function handlerSubmitChangeUserinfo(newUserInfo) {
    mainApi.changeUserData(newUserInfo).then(() => {
      setCurrentUser(newUserInfo)
      setInfoMessage({ message: SUCCESS_CHANGE_MESSAGE, status: true, isOpen: true })
      setTimeout(() => clearInfoMessage(), 3000)

    }).catch((err) => {
      setInfoMessage({ message: err.message, status: false, isOpen: true })
      setTimeout(() => clearInfoMessage(), 1500)
    })
  }

  function handlerSignout() {
    mainApi.signout()
      .then(() => {
        setLoggedIn(false)
        setDataSearch({ request: '', films: [], isShortFilms: false });
        localStorage.clear();
        Redirect('/');
      }).catch((err) => setInfoMessage({ message: err.message, status: false, isOpen: false }))
  }

  function clearInfoMessage() {
    setInfoMessage({ message: '', status: true, isOpen: false })
  }

  return (
    <div className="page">
      <Switch>
        <Route exact path="/signup">
          {loggedIn ? <Redirect to='/movies' /> : <Register
            onSubmit={handlerSubmitRegister}
            infoMessage={infoMessage}
            onClosePopup={clearInfoMessage} />}
        </Route>
        <Route exact path="/signin">
          {loggedIn ? <Redirect to='/movies' /> : <Login
            onSubmit={handlerSubmitLogin}
            infoMessage={infoMessage}
            onClosePopup={clearInfoMessage} />}
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
                onClosePopup={clearInfoMessage}
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
                onClosePopup={clearInfoMessage}
              /> : <Preloader />}
            <ProtectedRoute
              exact
              path="/profile"
              loggedIn={loggedIn}
              component={Profile}
              onSubmit={handlerSubmitChangeUserinfo}
              onSignout={handlerSignout}
              infoMessage={infoMessage}
              onClosePopup={clearInfoMessage}
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
