function Buttons({children, section}) {
  return (
    <ul className={`buttons buttons_${section}`}>
      {children}
    </ul>
  )
}

export default Buttons;