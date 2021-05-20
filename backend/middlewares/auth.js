const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    next(new UnauthorizedError('Необходима авторизация'));
    return;
  }

  let payload;

  try {
    payload = jwt.verify(token, 'super-very-secret-keyyyyy'); // в след. спринте вынесем в .env
  } catch (err) {
    next(new UnauthorizedError('Некорректный jwt-токен'));
    return;
  }

  req.user = payload;
  next();
};
