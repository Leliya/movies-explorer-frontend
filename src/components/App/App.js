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
//import PageNotFound from '../PageNotFound/PageNotFound';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi'
import './App.css';
import DetectCurrentWidth from "../../utils/detectWidth";


function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({ name: "", email: "" });
  const [allFilms, setAllFilms] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [cardRender, changeCardRender] = React.useState({ start: 12, step: 3 });
  const [dataRegister, changeDataRegister] = React.useState({ name: "", email: "", password: "" });
  const [dataLogin, changeDataLogin] = React.useState({ email: "", password: "" });
  const [savedFilms, setSavedFilms] = React.useState([]);

  const [dataSearch, setDataSearch] = React.useState({ request: '', films: [], isShortFilms: false });
  const [dataSearchSaveFilms, setDataSearchSaveFilms] = React.useState({ request: '', films: [], isShortFilms: false });

  const width = DetectCurrentWidth()
  const history = useHistory();

  React.useEffect(() => {
    mainApi.getUser()
      .then((userInfo) => {
        setLoggedIn(true)
        setCurrentUser(userInfo)
        Redirect('/movies')
      })
      .catch((err) => console.log(err))
  }, [history]
  )

  React.useEffect(() => {
    moviesApi.getFilms()
      .then((films) => {
        setAllFilms(films);
      })
      .catch((err) => console.log(err))
  }, []
  )

  // React.useEffect(() => {
  //   if (localStorage.getItem('resultFilms')) {
  //     setResultFilms(JSON.parse(localStorage.getItem('resultFilms')))
  //     setShortFilms(JSON.parse(localStorage.getItem('isShortFilms')))
  //     setRequest(localStorage.getItem('request'))
  //   }

  //   return(()=>{
  //     setResultFilms([])
  //     setShortFilms(false)
  //     setRequest('')
  //   })
  // }, []
  // )

  React.useEffect(() => {
    mainApi.getSavedFilms()
      .then((films) => {
        setSavedFilms(films)
        //localStorage.setItem('savedFilms', JSON.stringify(films));
        //dataSearchSaveFilms({ ...dataSearchSaveFilms, films: films })
      })
      .catch((err) => console.log(err))
  }, []
  )

  function handlerChangeDataSearch(newDatatSearch) {
    setDataSearch(newDatatSearch)
  }

  function handlerChangeRequest(req) {
    setDataSearch({ ...dataSearch, request: req })
  }

  function handlerCheckbox() {
    setDataSearch({ ...dataSearch, isShortFilms: !dataSearch.isShortFilms });
  }

  function handlerChangeSearchSavedFilms(newDatatSearch) {
    setDataSearchSaveFilms(newDatatSearch)
  }

  function handlerChangeRequestSaveFilms(req) {
    setDataSearchSaveFilms({ ...dataSearchSaveFilms, request: req })
  }

  function handlerCheckboxSaveFilms() {
    setDataSearchSaveFilms({ ...dataSearchSaveFilms, isShortFilms: !dataSearchSaveFilms.isShortFilms });
  }



  function filterFilms(films, request, checkbox) {
    return films.filter((film) => {
      return checkbox ?
        film.nameRU.toLowerCase().includes(request.toLowerCase()) && film.duration < 40 : film.nameRU.toLowerCase().includes(request.toLowerCase())
    })

  }

  function handlerChangeRegister(name, value) {
    changeDataRegister({ ...dataRegister, [name]: value, })
  }

  function handlerSubmitRegister() {
    mainApi.signup(dataRegister)
  }

  function handlerChangeLogin(name, value) {
    changeDataLogin({ ...dataLogin, [name]: value, })
  }



  function handlerSubmitLogin() {
    mainApi.signin(dataLogin)
      .then(() => {
        setLoggedIn(true)
        history.push('/movies')
      })
  }

  function handlerSubmitSearchForm() {
    setIsLoading(true)
    changeCardRender({ start: width > 900 ? 12 : width > 600 ? 8 : 5, step: width > 900 ? 3 : 2 });

    const filmPromise = new Promise((res, rej) => {
      //const filteredFilms = filterFilms(request)
      res(filterFilms(allFilms, dataSearch.request, dataSearch.isShortFilms))
    })
    filmPromise.then((res) => {
      //setResultFilms(res)
      //setCurrentCards(res)
      setDataSearch({ ...dataSearch, films: res })
      localStorage.setItem('prevSearch', JSON.stringify(dataSearch));

      // localStorage.setItem('request', request);
      // localStorage.setItem('resultFilms', JSON.stringify(res));
      // localStorage.setItem('isShortFilms', isShortFilms);
      //setRequest('')
    })
      .finally(() => setIsLoading(false))
      .catch((err) => console.log(err))
  }

  function handlerFilterSavedFilm() {
    setDataSearchSaveFilms({
      ...dataSearchSaveFilms,
      films: filterFilms(
        savedFilms,
        dataSearchSaveFilms.request,
        dataSearchSaveFilms.isShortFilms)
    })
  }

  function handlerSubmitChangeUserinfo(newName, newEmail) {
    mainApi.changeUserData(newName, newEmail).then((data) => {
      setCurrentUser({ name: data.name, email: data.email })
    }).catch((err) => console.log(err))
  }

  function handlerSignout() {
    mainApi.signout()
      .then(() => {
        setLoggedIn(false)
        // setResultFilms([]);
        // setShortFilms(false);

        Redirect('/');
        localStorage.clear();
      }).catch((err) => console.log(err))
  }

  function handlerSaveFilm(card) {
    //setIsLoading(true)
    mainApi.saveFilm(card).then((res) => {
      setSavedFilms((films) => [...films, res])
      // localStorage.setItem('savedFilms', JSON.stringify(savedFilms));
    }).catch((err) => console.log(err))
    //.finally(() => setIsLoading(false))
  }

  function handlerDeleteFilm(cardId) {
    mainApi.deleteFilm(cardId).then(() => {
      setSavedFilms(savedFilms.filter((film) => film._id !== cardId))
      //localStorage.setItem('savedFilms', JSON.stringify(savedFilms));
    }).catch((err) => console.log(err))
  }

  return (
    <div className="page">
      <Switch>
        <Route exact path="/signup">
          <Register dataRegister={dataRegister} onChange={handlerChangeRegister} onSubmit={handlerSubmitRegister} />
        </Route>
        <Route exact path="/signin">
          <Login dataLogin={dataLogin} onChange={handlerChangeLogin} onSubmit={handlerSubmitLogin} />
        </Route>
        <CurrentUserContext.Provider value={currentUser}>
          <Switch>

            <Route exact path="/profile">
              <Header loggedIn={loggedIn} />
              <Profile userName={currentUser.name} email={currentUser.email} onSubmit={handlerSubmitChangeUserinfo} onSignout={handlerSignout} />
            </Route>
            <Route>
              <Header loggedIn={loggedIn} />
              <Switch>
                <Route exact path="/">
                  <Main />
                </Route>
                <Route exact path="/movies">
                  <Movies
                    dataSearch={dataSearch}
                    //cards={dataSearch.films}
                    savedFilms={savedFilms}
                    onSubmit={handlerSubmitSearchForm}
                    //checkbox={dataSearch.isShortFilms}
                    onCheck={handlerCheckbox}
                    isLoading={isLoading}
                    cardRender={cardRender}
                    onSaveFilm={handlerSaveFilm}
                    onDelete={handlerDeleteFilm}
                    onChangeRequest={handlerChangeRequest}
                    onChangeDataSearch={handlerChangeDataSearch}
                  //request={dataSearch.request}
                  //checkbox={currentChecked}
                  //width={width}
                  />
                </Route>
                <Route exact path="/saved-movies">
                  <SavedMovies
                    dataSearchSaveFilms={dataSearchSaveFilms}
                    savedFilms={savedFilms}
                    allCards={dataSearch.films}
                    onSubmit={handlerFilterSavedFilm}
                    onDelete={handlerDeleteFilm}
                    //checkbox={isShortFilms}
                    onCheck={handlerCheckboxSaveFilms}
                    onChangeRequest={handlerChangeRequestSaveFilms}
                    onChangeDataSearch={handlerChangeSearchSavedFilms}
                  //request={request} 
                  />
                </Route>
                {/* <Route path="*">
                  <PageNotFound />
                </Route> */}
              </Switch>
              <Footer />
            </Route>
          </Switch>
        </CurrentUserContext.Provider>
      </Switch>
    </div>
  );
}

export default App;
