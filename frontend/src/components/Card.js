import { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js';


function Card({card, onCardClick, onCardLike, onCardDelete}) {

  const currentUser = useContext(CurrentUserContext);

  const handleClick = () => {
    onCardClick(card);
  }

  const handleLike = () => {
    onCardLike(card);
  }

  const handleDelete = () => {
    onCardDelete(card);
  }

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeClassName = `card__like ${isLiked ? 'card__like_active' : ''}`; 

  return (
    <li className="card-list__item">
      <figure className="card">
        {isOwn && <button className="card__remove" type="button" aria-label="Удалить" onClick={handleDelete}></button>}        
        <img src={card.link} alt={card.name} className="card__picture" onClick={handleClick} />
        <figcaption className="card__description">
          <h2 className="card__name">{card.name}</h2>
          <button className={cardLikeClassName} onClick={handleLike} type="button" aria-label="Нравится"></button>
        </figcaption>
      </figure>
    </li>
  );
}

export default Card;