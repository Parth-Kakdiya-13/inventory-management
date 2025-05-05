const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer');
const customerValidator = require('../middlewares/customerValidator')


router.post('/signup', customerValidator.customerValidator, customerController.postSignup)
router.post('/login', customerValidator.loginValidator, customerController.postLogin)

module.exports = router;
