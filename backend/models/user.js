const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/unauthorized-err');
const {
  MIN_USER_PASSWORD_LEN,
  MIN_USER_NAME_LEN,
  MAX_USER_NAME_LEN,
  MIN_USER_ABOUT_LEN,
  MAX_USER_ABOUT_LEN,
} = require('../utils/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: MIN_USER_PASSWORD_LEN,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: MIN_USER_NAME_LEN,
    maxlength: MAX_USER_NAME_LEN,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    required: true,
    minlength: MIN_USER_ABOUT_LEN,
    maxlength: MAX_USER_ABOUT_LEN,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    required: true,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: { // можно было загуглить более чёткий шаблон, но собираю самостоятельно, по брифу
      // ^https?:\/\/ - начинается с http:// или https://
      // [www.]? - www. — это необязательная группа
      // [a-z0-9а-яё\-.]* - к домену требований не было, указываю так
      // [\w\-.~:/?#[\]@!$&'()*+,;=]* - путь
      // $ - конец строки
      validator: (v) => /^https?:\/\/[www.]?[a-z0-9а-яё\-.]*[\w\-.~:/?#[\]@!$&'()*+,;=]*$/i.test(v),
      message: 'Неправильный формат ссылки на аватар',
    },
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
