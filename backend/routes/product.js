const express = require('express');
const productController = require('../controllers/Product');
const productValidator = require('../middlewares/productValidator');
const isAuth = require('../middlewares/isAuth')


const router = express.Router();


router.post('/createProduct', isAuth, productValidator.productValidator, productController.addProduct)
router.get('/getProductByCategory/:category', productController.getProductByCategory)


module.exports = router;