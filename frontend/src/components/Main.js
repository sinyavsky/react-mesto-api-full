import { useContext } from 'react';
import Card from './Card.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';


function Main({cards, onCardClick, onCardLike, onCardDelete, onAddPlace, onEditAvatar, onEditProfile}) {

  const currentUser = useContext(CurrentUserContext); 

  return (
    <main className="page__container">
      <section className="profile">
        <div className="profile__user">
          <button className="profile__ava-edit" type="button" aria-label="Изменить аватар" title="Изменить аватар" onClick={onEditAvatar}>
            <img src={currentUser.avatar} alt="Фото профиля" className="profile__ava" />
          </button>
          <div className="profile__info">
            <div className="profile__name-wrap">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button className="profile__edit" title="Редактировать профиль" aria-label="Редактировать профиль"
                type="button" onClick={onEditProfile}></button>
            </div>
            <p className="profile__bio">{currentUser.about}</p>
          </div>
        </div>
        <button className="profile__add" type="button" aria-label="Добавить фото" onClick={onAddPlace}></button>
      </section>
      <section className="cards" aria-label="Фотографии мест">
        <ul className="cards__list">
          {
            cards.map((card) => (
              <Card card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} key={card._id} />
            ))
          }
        </ul>
      </section>
    </main>
  );
}

export default Main;