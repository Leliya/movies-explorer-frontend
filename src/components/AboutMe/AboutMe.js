import SectionTitle from "../SectionTitle/SectionTitle";
import Title from "../Title/Title";
import Portfolio from "../Portfolio/Portfolio";
import photo from "../../images/aboutMe-image.jpeg"
import "./AboutMe.css"

function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <SectionTitle section="about-me">Студент</SectionTitle>
      <div className="about-me__bio">
        <Title section="about-me">Мария</Title>
        <p className="about-me__about">Фронтенд-разработчик, 30 лет</p>
        <p className="about-me__history">Живу в Самаре. Несмотря на образование клинического психолога,
          "технарь" до мозга костей. Несколько лет занималась подключением интернет-магазинов к Яндекс Маркету,
          но уже много лет мечтала стать веб-разработчиком. Верю, что смогу внести вклад в разработку IT-продуктов,
          которые сделают нашу жизнь лучше. Люблю варить кофе всякими разными методами, читать публицистику и не только.</p>
        <a className="about-me__github" href="https://github.com/Leliya" target="_blank" rel="noreferrer" lang="en">Github</a>
      </div>
      <img className="about-me__photo" src={photo} alt="Портрет"></img>
      <Portfolio />
    </section>
  )
}

export default AboutMe;