import SectionTitle from "../SectionTitle/SectionTitle"

function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <SectionTitle section="about-project">О проекте</SectionTitle>
      <div className="about-project__stage">
        <h3 className="about-project__subtitle">Дипломный проект включал 5 этапов</h3>
        <p className="about-project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
      </div>
      <div className="about-project__duration">
        <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
        <p className="about-project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
      </div>
      <div className="about-project__track">
        <p className="about-project__track-back">1 неделя</p>
        <p className="about-project__caption">Back-end</p>
        <p className="about-project__track-front">4 недели</p>
        <p className="about-project__caption">Front-end</p>
      </div>
    </section>
  )
} 

export default AboutProject;