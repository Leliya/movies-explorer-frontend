import SectionTitle from "../SectionTitle/SectionTitle"
import Title from "../Title/Title"
import Button from "../Button/Button"
import Buttons from "../Buttons/Buttons"
import './Techs.css';

function Techs() {
  return (
    <section className="techs" id={"techs"}>
      <SectionTitle section="techs">Технологии</SectionTitle>
      <div className="techs__container">
        <Title section="techs">7 технологий</Title>
        <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      </div>
      <Buttons section="techs">
        <Button section="techs"><p className="button__link button__link_techs" lang="en">HTML</p></Button>
        <Button section="techs"><p className="button__link button__link_techs" lang="en">CSS</p></Button>
        <Button section="techs"><p className="button__link button__link_techs" lang="en">JS</p></Button>
        <Button section="techs"><p className="button__link button__link_techs" lang="en">React</p></Button>
        <Button section="techs"><p className="button__link button__link_techs" lang="en">Git</p></Button>
        <Button section="techs"><p className="button__link button__link_techs" lang="en">Express.js</p></Button>
        <Button section="techs"><p className="button__link button__link_techs" lang="en">mongoDB</p></Button>
      </Buttons>
    </section>
  )
}

export default Techs;
