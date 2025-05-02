const express = require('express');
const userController = require('../controllers/User');
const signupValidator = require('../middlewares/userValidator')
const loginValidator = require('../middlewares/userValidator')

const router = express.Router();

router.post('/signup', signupValidator.signupValidator, userController.postSignup);
router.post('/login', loginValidator.loginValidator, userController.postLogin);

module.exports = router