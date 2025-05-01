const express = require('express');
const createProduct = require('../controllers/Product');
const productValidator = require('../middlewares/productValidator');
const isAuth = require('../middlewares/isAuth')


const router = express.Router();


router.post('/createProduct', isAuth, productValidator.productValidator, createProduct.addProduct)


module.exports = router;