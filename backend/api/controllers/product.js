const Product = require('../models/product');
const { validationResult } = require('express-validator')

exports.addProduct = async (req, res) => {
    const { name, description, category, price, quantiry, image } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    if (!req.isAuth) {
        return res.status(403).json({ message: "unauthenticated" })
    }
    try {
        const newProduct = new Product({ name, description, category, price, quantiry, image })
        const savedProduct = await newProduct.save()
        res.status(200).json({ message: savedProduct })
    } catch (error) {
        res.status(500).json({ errors: error.message })
    }
}