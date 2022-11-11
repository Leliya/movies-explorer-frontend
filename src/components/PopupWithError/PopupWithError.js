import './PopupWithError.css'

function PopupWithError({ message, isOpen, onClose }) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className='popup__container'>
        <button className="popup__button-close" type="button" aria-label="Закрыть сообщение" onClick={onClose}></button>
        <p className="popup__message">{message}</p></div>
    </div>
  )
}

export default PopupWithError;