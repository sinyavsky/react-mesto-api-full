const mongoose = require('mongoose');
const { MIN_CARD_NAME_LEN, MAX_CARD_NAME_LEN } = require('../utils/constants');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: MIN_CARD_NAME_LEN,
    maxlength: MAX_CARD_NAME_LEN,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /^https?:\/\/[www.]?[a-z0-9а-яё\-.]*[\w\-.~:/?#[\]@!$&'()*+,;=]*$/i.test(v),
      message: 'Неправильный формат ссылки на картинку',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  }],
  createdAt: {
    type: Date,
    default: Date.now(),
  },

});

module.exports = mongoose.model('card', cardSchema);
