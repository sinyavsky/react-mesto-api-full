import { useState } from 'react';
import { Link } from 'react-router-dom';


function Register({onRegister}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = e => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();  
    onRegister({email, password});
  }

  return (
    <main className="page__container auth-form">
      <h1 className="auth-form__heading">Регистрация</h1>
      <form className="auth-form__form" onSubmit={handleSubmit}>
        <fieldset className="auth-form__fieldset">
          <input type="email" placeholder="E-mail" className="auth-form__input" required  onChange={handleEmailChange}/>
          <input type="password" placeholder="Пароль" className="auth-form__input" required minLength="6" onChange={handlePasswordChange} />
        </fieldset>
        <fieldset className="auth-form__fieldset">
          <button type="submit" className="auth-form__button">Зарегистрироваться</button>
          <Link to="/signin" className="auth-form__login-link">Уже зарегистрированы? Войти</Link>
        </fieldset>
      </form>
    </main>
  );
}

export default Register;