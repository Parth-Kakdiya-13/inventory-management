const Customer = require('../models/customer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator')

exports.postSignup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    const { name, email, password, phone, address } = req.body;
    try {
        const customer = await Customer.findOne({ email: email })
        if (customer) {
            return res.status(401).json({ message: "user already exist" })
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        const newCustomer = new Customer({
            name, email, password: hashedPassword, phone, address
        })
        await newCustomer.save();
        res.status(200).json({ message: newCustomer })
    } catch (error) {
        res.status(500).json({ errors: error.message })
    }
}

exports.postLogin = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    const { email, password } = req.body;
    try {

        const user = await Customer.findOne({ email: email });
        if (!user) {
            return res.status(403).json({ message: "Invalid Credentials" })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(403).json({ message: "Invalid Credentials" })
        }
        const token = jwt.sign({ email: user.email, userId: user._id.toString() }, process.env.JWT_SECRET);
        res.status(200).json({ token: token, userId: user._id.toString() })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}