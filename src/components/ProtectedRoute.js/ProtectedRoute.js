import React from "react";
import { Route, Redirect } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";


const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    <Route>
      {() =>
        props.loggedIn ?
          <>
            <Header loggedIn={props.loggedIn} />
            <Component {...props} />
            <Route path='/movies'>
              <Footer />
            </Route>
            <Route path='/saved-movies'>
              <Footer />
            </Route>
          </> :
          <Redirect to="/" />
      }
    </Route>
  );
};

export default ProtectedRoute; 