class Auth {

  constructor({baseUrl}) {
    this.baseUrl = baseUrl;
  }

  signUp = ({email, password}) => {
    return fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
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
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${token}`
      }
    })
    .then(this.checkResponse);
  }

  checkResponse = res => {
    if(res.ok) {
      return res.json();
    }
    return res.json().then(errorInfo => {
      const { message = 'Произошла неизвестная ошибка' } = errorInfo;      
      return Promise.reject(`Ошибка: ${message}`);     
    });
  }
}

const auth = new Auth({ baseUrl: 'https://api.mesto.sinyavsky.com' }); 

export default auth;