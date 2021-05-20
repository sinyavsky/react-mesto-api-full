import { useRef } from 'react';
import PopupWithForm from './PopupWithForm.js';


function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {

  const avatarRef = useRef('');

  const handleSubmit = e => {
    e.preventDefault();  
    onUpdateAvatar(avatarRef.current.value);
  }

  return (
    <PopupWithForm 
        name="avatar"
        title="Обновить аватар"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
      >

        <fieldset className="popup__fieldset">
          <label className="popup__label">
            <input type="url" className="popup__input popup__input_type_avatar" placeholder="Ссылка на аватар"
              name="avatar" id="avatar-input" required ref={avatarRef} />
            <span className="popup__error avatar-input-error"></span>
          </label>
        </fieldset>

      </PopupWithForm>
  );
}

export default EditAvatarPopup;