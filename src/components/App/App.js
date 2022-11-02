import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import { Route, Switch } from "react-router-dom";
import Movies from '../Movies/Movies';
import { testCards } from '../../utils/testCards';
// import SavedMovies from '../SavedMovies/SavedMovies';
// import Register from '../Register/Register';
// import Login from '../Login/Login';
// import Profile from '../Profile/Profile';

const isFoundCards = testCards;

function App() {
  return (
    <div className="page">
      <Header />
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/movies">
          <Movies cards = {isFoundCards}/>
        </Route>
      </Switch>
      <Footer />
      {/* 
      <SavedMovies/>
      
      <Register/>
      <Login/>
      <Profile/>     */}
    </div>
  );
}

export default App;
