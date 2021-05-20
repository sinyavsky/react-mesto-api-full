function PopupWithForm({name, title, children, isOpen, onClose, onSubmit}) {

  const popupClass = isOpen ?
    `popup popup_type_${name} popup_opened` :
    `popup popup_type_${name}`;

  return (
    <div className={popupClass}>
      <div className="popup__container popup__container_type_form">
        <button className="popup__close" title="Закрыть" aria-label="Закрыть" type="button" onClick={onClose}></button>
        <div className="popup__content">
          <form className="popup__form popup__form_type_profile" name="edit-profile" onSubmit={onSubmit} noValidate>
            <h2 className="popup__heading">{title}</h2>
            {children}
            <button type="submit" className="popup__submit">Сохранить</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PopupWithForm;