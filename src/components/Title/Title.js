function Title({children, section}) {
  return (
    <h1 className={`title title_${section}`}>{children}</h1>
  )
}

export default Title;