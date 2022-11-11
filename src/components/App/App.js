import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import { Route, Switch } from "react-router-dom";
import Movies from '../Movies/Movies';
import { testCards } from '../../utils/testCards';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';
import './App.css';
// Временный код для проверки рендера карточек

const isFoundCards = testCards;
const isSavedCards = testCards;
//

function App() {
  return (
    <div className="page">
      <Switch>
        <Route exact path="/signup">
          <Register />
        </Route>
        <Route exact path="/signin">
          <Login />
        </Route>
        <Switch>
          <Route exact path="/profile">
            <Header />
            <Profile userName={"Мария"} email={"pochta@yandex.ru"} />
          </Route>
          <Route>
            <Header />
            <Switch>
              <Route exact path="/">
                <Main />
              </Route>
              <Route exact path="/movies">
                <Movies cards={isFoundCards} />
              </Route>
              <Route exact path="/saved-movies">
                <SavedMovies cards={isSavedCards} />
              </Route>
              <Route path="*">
                <PageNotFound />
              </Route>
            </Switch>
            <Footer />
          </Route>
        </Switch>
      </Switch>
    </div>
  );
}

export default App;
