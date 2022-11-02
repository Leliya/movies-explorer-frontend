import SectionTitle from "../SectionTitle/SectionTitle";
import Title from "../Title/Title";
import Portfolio from "../Portfolio/Portfolio";
import photo from "../../images/aboutMe-image.png"

function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <SectionTitle section="about-me">Студент</SectionTitle>
      <div className="about-me__bio">
        <Title section="about-me">Мария</Title>
        <p className="about-me__about">Фронтенд-разработчик, 30 лет</p>
        <p className="about-me__history">Я родился и живу в Саратове, закончил факультет экономики СГУ.
          У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить.
          С 2015 года работал в компании «СКБ Контур».
          После того, как прошёл курс по веб-разработке,
          начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
        <a className="about-me__github" href="https://github.com/Leliya" target="_blank" rel="noreferrer">Github</a>
      </div>
      <img className="about-me__photo" src={photo} alt="Портрет"></img>
      <Portfolio />
    </section>
  )
}

export default AboutMe;