import { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';


function EditProfilePopup({isOpen, onClose, onUpdateUser}) {

  const currentUser = useContext(CurrentUserContext);  

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleNameChange = e => {
    setName(e.target.value);
  }

  const handleDescriptionChange = e => {
    setDescription(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();  
    onUpdateUser({
      name,
      about: description,
    });
  } 

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm
        name="profile"
        title="Редактировать профиль"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
      >

        <fieldset className="popup__fieldset">
          <label className="popup__label">
            <input type="text" className="popup__input popup__input_type_name" placeholder="Имя" name="user_name" id="user-name-input" required minLength="2" maxLength="40" value={name} onChange={handleNameChange}/>
            <span className="popup__error user-name-input-error"></span>
          </label>
          <label className="popup__label">
            <input type="text" className="popup__input popup__input_type_bio" placeholder="О себе" name="user_bio" id="user-bio-input" required minLength="2" maxLength="200" value={description} onChange={handleDescriptionChange} />
            <span className="popup__error user-bio-input-error"></span>
          </label>
        </fieldset>

      </PopupWithForm>
  );
}

export default EditProfilePopup;