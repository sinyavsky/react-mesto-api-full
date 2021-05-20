import { useState} from 'react';
import PopupWithForm from './PopupWithForm.js';


function AddPlacePopup({isOpen, onClose, onAddPlace}) {

  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  const handleNameChange = e => {
    setName(e.target.value);
  }

  const handleLinkChange = e => {
    setLink(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();  
    onAddPlace({
      name: name,
      link: link
    });
  }

  return (
    <PopupWithForm
        name="place"
        title="Новое место"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
      >

        <fieldset className="popup__fieldset">
          <label className="popup__label">
            <input type="text" className="popup__input popup__input_type_place-name" placeholder="Название"
              name="place_name" id="place-name-input" required minLength="2" maxLength="30" value={name} onChange={handleNameChange}/>
            <span className="popup__error place-name-input-error"></span>
          </label>
          <label className="popup__label">
            <input type="url" className="popup__input popup__input_type_place-pic" placeholder="Ссылка на картинку"
              name="place_pic" id="place-pic-input" required value={link} onChange={handleLinkChange} />
            <span className="popup__error place-pic-input-error"></span>
          </label>
        </fieldset>

      </PopupWithForm>
  );
}

export default AddPlacePopup;