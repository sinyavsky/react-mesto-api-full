function InfoTooltip({isOpen, onClose, success}) {

  const popupClass = isOpen ?
    `popup popup_type_tooltip popup_opened` :
    `popup popup_type_tooltip`;

  return (
    <div className={popupClass}>
      <div className="popup__container">
        <button className="popup__close" title="Закрыть" aria-label="Закрыть" type="button" onClick={onClose}></button>
        <div className="popup__content">
          {success ?
            (<div class="tooltip tooltip_type_good">Вы успешно зарегистрировались!</div>) :
            (<div class="tooltip tooltip_type_bad">Что-то пошло не так! Попробуйте еще раз.</div>)
          }
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;