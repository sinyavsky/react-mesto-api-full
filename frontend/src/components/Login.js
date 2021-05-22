import { useState } from 'react';


function Login({ onLogin }) {

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
    onLogin({email, password});
  }

  return (
    <main className="page__container auth-form">
      <h1 className="auth-form__heading">Вход</h1>
      <form className="auth-form__form" onSubmit={handleSubmit}>
        <fieldset className="auth-form__fieldset">
          <input type="email" placeholder="E-mail" className="auth-form__input" required onChange={ handleEmailChange } />
          <input type="password" placeholder="Пароль" className="auth-form__input" required minLength="6" onChange={ handlePasswordChange }/>
        </fieldset>
        <button type="submit" className="auth-form__button">Войти</button>
      </form>
    </main>
  );
}

export default Login;