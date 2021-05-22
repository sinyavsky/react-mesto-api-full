class Auth {

  constructor({baseUrl}) {
    this.baseUrl = baseUrl;
  }

  signUp = ({email, password}) => {
    return fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
    .then(this.checkResponse);
  };

  signIn = ({email, password}) => {  
    return fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
    .then(this.checkResponse);
  };

  getData = token => {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      mode: 'no-cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${token}`
      }
    })
    .then(this.checkResponse);
  }

  checkResponse = res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.statusText}`);
}

const auth = new Auth({ baseUrl: 'https://api.mesto.sinyavsky.com' }); 

export default auth;