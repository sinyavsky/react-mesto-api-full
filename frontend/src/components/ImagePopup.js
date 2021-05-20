function ImagePopup({card, onClose}) {

  if (!card) {
    card.link = '';
    card.name = '';
  }

  const classList = card.link ?
    'popup popup_type_picture popup_opened' :
    'popup popup_type_picture';  

  return (
    <div className={classList}>
      <div className="popup__container popup__container_type_picture">
        <button className="popup__close" title="Закрыть" aria-label="Закрыть" type="button" onClick={onClose}></button>
        <div className="popup__content">
          <img src={card.link} alt={card.name} className="popup__picture" />
          <p className="popup__picture-name">{card.name}</p>
        </div>
      </div>
    </div>
  );
}

export default ImagePopup;