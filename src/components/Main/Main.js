import React from 'react';
import Promo from '../Promo/Promo'
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import './Main.css';
import { useLocation } from "react-router-dom";



function Main() {
  const { pathname, hash, key } = useLocation();

  React.useEffect(() => {
    setTimeout(() => {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 0);
  }, [pathname, hash, key]);


  return (
    <main className="main">
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
    </main>
  )
}

export default Main;