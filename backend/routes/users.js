const router = require('express').Router();
const { validateUpdateUser, validateUpdateUserAvatar, validateGetUser } = require('../middlewares/validators');
const {
  getUsers,
  getUser,
  getCurrentUser,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.patch('/me', validateUpdateUser, updateUser);
router.patch('/me/avatar', validateUpdateUserAvatar, updateUserAvatar);
router.get('/:userId', validateGetUser, getUser);

module.exports = router;
