import { Link, useLocation } from 'react-router-dom';
import logo from '../images/logo.svg';


function Header({loggedIn, userEmail, onLogout}) {
  const currentPath = useLocation().pathname;

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="Место" className="header__logo" />
      </Link>

      { loggedIn ?
        ( <div className="header__personal">
            <span className="header__username">{userEmail}</span>
            <button className="header__logout" onClick={onLogout}>Выйти</button>
        </div>
        ):
        (currentPath === '/signin' ?
          <Link to="/signup" className="header__auth-link">Регистрация</Link> :
          <Link to="/signin" className="header__auth-link">Войти</Link> 
        )
      }
    </header>
  );
}

export default Header;