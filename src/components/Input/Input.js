import './Input.css';

function Input({ type, name, label, isValid, autoFocus, onChange, error, minSymbol, maxSymbol }) {
  return (
    <div className="field">
      <label className="field__label" htmlFor={`input-${name}`}>{label}</label>
      <input
        className={isValid ? "field__input" : "field__input field__input_error"}
        name={name}
        type={type}
        id={`input-${name}`}
        autoFocus={autoFocus}
        required={true}
        onChange={onChange}
        minLength={minSymbol}
        maxLength={maxSymbol}>
      </input>
      {isValid ? <></> : <span className={`field__input-error ${name}-input-error`}>
       {error}
      </span>}
    </div>
  )
}

export default Input;