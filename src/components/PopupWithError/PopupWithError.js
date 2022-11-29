import './PopupWithError.css'

function PopupWithError({ infoMessage, onClose }) {
  function cancelClose(evt) {
    evt.stopPropagation();
  }

  return (
    <div className={`popup ${infoMessage.isOpen ? "popup_opened" : ""}`} onClick={onClose}>
      <div className={`popup__container ${infoMessage.status ? "popup__container_message" : "popup__container_error"}`} onClick={cancelClose}>
        <button className="popup__button-close" type="button" aria-label="Закрыть сообщение" onClick={onClose}></button>
        <p className="popup__message">{infoMessage.message}</p></div>
    </div>
  )
}

export default PopupWithError;