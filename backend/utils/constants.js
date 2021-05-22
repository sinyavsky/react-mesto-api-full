const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.JWT_SECRET = NODE_ENV === 'production' ? JWT_SECRET : 'dev-mode-key-7353d7afad7e3ea4ea893c376960dc95b86d684b5bc1d04c12629449f80da3ac';

// т.к. эти значения у нас и в схеме, и в валидаторе
module.exports.MIN_USER_PASSWORD_LEN = 8;
module.exports.MIN_USER_NAME_LEN = 2;
module.exports.MAX_USER_NAME_LEN = 30;
module.exports.MIN_USER_ABOUT_LEN = 2;
module.exports.MAX_USER_ABOUT_LEN = 30;

module.exports.MIN_CARD_NAME_LEN = 2;
module.exports.MAX_CARD_NAME_LEN = 30;
