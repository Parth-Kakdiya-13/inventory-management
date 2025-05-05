const Product = require('../models/product');
const { validationResult } = require('express-validator')

exports.addProduct = async (req, res) => {
    const { productName, description, category, subCategory, price, quantity, image } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    if (!req.isAuth) {
        return res.status(403).json({ message: "unauthenticated" })
    }
    try {
        const newProduct = new Product({ productName, description, category, subCategory, price, quantity, image })
        const savedProduct = await newProduct.save()
        res.status(200).json({ message: savedProduct })
    } catch (error) {
        res.status(500).json({ errors: error.message })
    }
}

exports.getProductByCategory = async (req, res) => {
    try {
        // if (!req.isAuth) {
        //     return res.status(403).json({ message: "Not Authenticated" })
        // }
        const category = req.params.category;

        const product = await Product.find({ category: category })

        if (!product) {
            return res.status(404).json({ message: "product not found." })
        }

        res.status(200).json({ success: true, message: "data fetch successfull", product: product })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}