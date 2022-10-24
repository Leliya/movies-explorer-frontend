import React from 'react';
import { Link } from 'react-router-dom';
import Title from '../Title/Title';
import Buttons from '../Buttons/Buttons';
import Button from '../Button/Button';

function Promo() {
  return (
    <section className="promo">
      <Title section="promo">Учебный проект студента факультета Веб-разработки.</Title>
      <Buttons section="promo">
        <Button section="promo"><Link to={{pathname: '/', hash: '#about-project'}} className="button__link button__link_promo">О проекте</Link></Button>
        <Button section="promo"><Link to={{pathname: '/', hash: '#techs'}} className="button__link button__link_promo">Технологии</Link></Button>
        <Button section="promo"><Link to={{pathname: '/', hash: '#about-me'}} className="button__link button__link_promo">Студент</Link></Button>
      </Buttons>
    </section>
  )
}

export default Promo;