import { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.js';
import Header from './Header.js';
import Login from './Login.js';
import Register from './Register.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import InfoTooltip from './InfoTooltip.js';
import api from '../utils/api.js';
import auth from '../utils/auth.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({name: '', about: ''});

  const history = useHistory();

  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const handleCardClick = card => {
    setSelectedCard(card);
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsTooltipOpen(false);
    setSelectedCard({});
  }

  const handleUpdateUser = userData => {
    api.patchUserInfo(userData)    
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  const handleUpdateAvatar = ava => {
    api.patchUserAvatar(ava)    
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  const handleAddPlaceSubmit = card => {
    api.postCard(card)    
      .then((result) => {
        setCards([result, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  const handleCardLike = card => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err));
  }
  
  const handleCardDelete = card => {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    api.getInitialCards()
      .then(result => {
        setCards(result);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    api.getUserInfo()
      .then(result => setCurrentUser(result))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    checkToken()
  }, []);

  useEffect(() => {
    if (loggedIn) {
      history.push('/');
    }
  }, [loggedIn]);

  const checkToken = () => {
    if(localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      auth.getData(token).then(({data}) => {
        if (data.email) {
          setLoggedIn(true);
          setUserEmail(data.email);
        }
      });
    }
  }

  const handleLogin = ({ email, password }) => {
    return auth.signIn({email, password})
      .then((data) => {
        if(data.token) {
          setLoggedIn(true);
          setUserEmail(email);
          localStorage.setItem('token', data.token);
          history.push('/');
        }
      })
      .catch((errorText) => {
        // в ТЗ нет инфы про обработку ошибок логина, пока делаю так
        console.log(errorText);
      });
  }

  const handleRegister = ({ email, password }) => {
    return auth.signUp({email, password})
      .then(({data}) => {
        if(data.email) {
          setRegisterSuccess(true);
          setIsTooltipOpen(true);        
        }
      })
      .catch(() => {
        setRegisterSuccess(false);
        setIsTooltipOpen(true); 
      });
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    history.push('/signin');
  }

  const closeTooltipPopup = () => {
    closeAllPopups();
    // если регистрация успешна - после закрытия попапа сразу редиректим к авторизации
    if(registerSuccess) {
      history.push('/signin');
    }
    
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header loggedIn={loggedIn} userEmail={userEmail} onLogout={handleLogout} />

      <Switch>
        <Route path="/signup">
          <Register onRegister={handleRegister}/>
        </Route>
        <Route path="/signin">
          <Login onLogin={handleLogin}/>
        </Route>
        <ProtectedRoute
          loggedIn={loggedIn}
          component={Main}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
      </Switch>      

      <Footer />

      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <PopupWithForm name="confirm" title="Вы уверены?" />
      {
        // не выношу его в компонент Register, т.к. мб в будущем тултип будет использоваться и для других целей
      }
      <InfoTooltip success={registerSuccess} onClose={closeTooltipPopup} isOpen={isTooltipOpen} />

    </CurrentUserContext.Provider>
  );
}

export default App;