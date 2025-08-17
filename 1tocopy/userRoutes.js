const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware.js');

const {
    registerUser,
    loginUser,
    currentUser
} = require('../controllers/userController');



router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/current').get(authMiddleware,currentUser);

module.exports = router;