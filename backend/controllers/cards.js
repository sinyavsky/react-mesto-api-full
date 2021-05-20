const Card = require('../models/card');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');
const NotFoundError = require('../errors/not-found-err');
const InternalServerError = require('../errors/internal-server-err');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => next(new InternalServerError('На сервере произошла ошибка')));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const { _id } = req.user;
  Card.create({ name, link, owner: _id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`Переданы некорректные данные при создании карточки: ${err.message}`));
      } else {
        next(new InternalServerError('На сервере произошла ошибка'));
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  // мб стоит вынести этот код в метод модели, типа deleteIfOwner
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Карточка с указанным _id не найдена'));
        return;
      }
      if (card.owner.toString() !== req.user._id) {
        next(new ForbiddenError('Это не ваша карточка, её нельзя удалить'));
        return;
      }
      // возможно есть способ удалить сразу card, которую уже получили выше
      // но пока делаю доп. вызов findByIdAndRemove
      Card.findByIdAndRemove(req.params.cardId)
        .then((cardToRemove) => {
          if (cardToRemove) {
            res.send(cardToRemove);
          } else {
            next(new NotFoundError('Карточка с указанным _id не найдена'));
          }
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') { // неверный формат _id
        next(new BadRequestError('Передан _id в неверном формате'));
        return;
      }
      next(new InternalServerError('На сервере произошла ошибка'));
    });
};

module.exports.addCardLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        next(new NotFoundError('Карточка с указанным _id не найдена'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') { // неверный формат _id
        next(new BadRequestError('Передан _id в неверном формате'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError(`Переданы некорректные данные для постановки лайка: ${err.message}`));
      } else {
        next(new InternalServerError('На сервере произошла ошибка'));
      }
    });
};

module.exports.deleteCardLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        next(new NotFoundError('Карточка с указанным _id не найдена'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') { // неверный формат _id
        next(new BadRequestError('Передан _id в неверном формате'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError(`Переданы некорректные данные для снятия лайка: ${err.message}`));
      } else {
        next(new InternalServerError('На сервере произошла ошибка'));
      }
    });
};
