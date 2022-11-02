function Title({ children, section }) {
  return (
    section === "promo" ? 
    <h1 className={`title title_${section}`}>{children}</h1> :
    <h3 className={`title title_${section}`}>{children}</h3>
  )
}

export default Title;