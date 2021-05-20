import logo from '../images/logo.svg';


function Header() {
  return (
    <header className="header">
      <a href="index.html">
        <img src={logo} alt="Место" className="header__logo" />
      </a>
    </header>
  );
}

export default Header;