const { celebrate, Joi } = require('celebrate');
const {
  MIN_USER_PASSWORD_LEN,
  MIN_USER_NAME_LEN,
  MAX_USER_NAME_LEN,
  MIN_USER_ABOUT_LEN,
  MAX_USER_ABOUT_LEN,
  MIN_CARD_NAME_LEN,
  MAX_CARD_NAME_LEN,
} = require('../utils/constants');

const MONGO_ID_LEN = 24;

// пользователи

module.exports.validateCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(MIN_USER_PASSWORD_LEN),
    name: Joi.string().required().min(MIN_USER_NAME_LEN).max(MAX_USER_NAME_LEN),
    about: Joi.string().required().min(MIN_USER_ABOUT_LEN).max(MAX_USER_ABOUT_LEN),
    avatar: Joi.string().uri().required(),
  }),
});

module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(MIN_USER_PASSWORD_LEN),
  }),
});

module.exports.validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(MIN_USER_NAME_LEN).max(MAX_USER_NAME_LEN),
    about: Joi.string().required().min(MIN_USER_ABOUT_LEN).max(MAX_USER_ABOUT_LEN),
  }),
});

module.exports.validateUpdateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().uri().required(),
  }),
});

module.exports.validateGetUser = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().alphanum().length(MONGO_ID_LEN),
  }),
});

// карточки

module.exports.validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(MIN_CARD_NAME_LEN).max(MAX_CARD_NAME_LEN),
    link: Joi.string().required().uri(),
  }),
});

module.exports.validateDeleteCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum().length(MONGO_ID_LEN),
  }),
});

module.exports.validateAddCardLike = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum().length(MONGO_ID_LEN),
  }),
});

module.exports.validateDeleteCardLike = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum().length(MONGO_ID_LEN),
  }),
});
