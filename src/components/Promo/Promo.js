import Title from '../Title/Title';
import './Promo.css';
import NavTab from '../NavTab/NavTab';

function Promo() {
  return (
    <section className="promo">
      <Title section="promo">Учебный проект студента факультета Веб-разработки.</Title>
      <NavTab />
    </section>
  )
}

export default Promo;