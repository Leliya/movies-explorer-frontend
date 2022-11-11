import './SectionTitle.css';

function SectionTitle({ children, section }) {
  return (
    <h2 className={`section-title section-title_${section}`}>{children}</h2>
  )
}

export default SectionTitle;
