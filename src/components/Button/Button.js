function Button({children, section}) {
  return (
    <li className={`button button_${section}`}>{children}</li>
  )
}

export default Button;