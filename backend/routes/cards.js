const router = require('express').Router();
const {
  validateCreateCard, validateDeleteCard, validateAddCardLike, validateDeleteCardLike,
} = require('../middlewares/validators');
const {
  getCards, createCard, deleteCard, addCardLike, deleteCardLike,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', validateCreateCard, createCard);
router.delete('/:cardId', validateDeleteCard, deleteCard);
router.put('/:cardId/likes', validateAddCardLike, addCardLike);
router.delete('/:cardId/likes', validateDeleteCardLike, deleteCardLike);

module.exports = router;
