const express = require('express');
const orderController = require('../controllers/order');

const router = express.Router();


router.post('/creteOrder', orderController.createOrder)


module.exports = router;