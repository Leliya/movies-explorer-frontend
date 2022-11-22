import './PopupWithError.css'

function PopupWithError({ infoMessage, onClose }) {
  return (
    <div className={`popup ${infoMessage.message ? "popup_opened" : ""}`}>
      <div className={`popup__container ${infoMessage.status ? "popup__container_message" : "popup__container_error"}`}>
        <button className="popup__button-close" type="button" aria-label="Закрыть сообщение" onClick={onClose}></button>
        <p className="popup__message">{infoMessage.message}</p></div>
    </div>
  )
}

export default PopupWithError;