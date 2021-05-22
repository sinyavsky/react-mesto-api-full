const getAuthToken = () => {
  return localStorage.getItem('token');
}

export {
  getAuthToken
};