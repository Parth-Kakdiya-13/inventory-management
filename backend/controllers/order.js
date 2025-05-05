const Order = require('../models/Order');
const { v4: uuidv4 } = require('uuid');
const Customer = require('../models/customer');

exports.createOrder = async (req, res) => {
    const orderNumber = `ORD-${uuidv4().slice(0, 8).toUpperCase()}`;

    const { customer, customerId, items, totalAmount } = req.body;

    try {
        // const customer = await Customer.findById(customerId);
        // if (!customer) {
        //     return res.status(400).json({ message: "Customer not found" });
        // }

        const newOrder = new Order({
            orderNumber,
            // customer: customer._id,
            customer,
            items,
            totalAmount
        });

        await newOrder.save();

        res.status(201).json({ message: "Order created successfully", order: newOrder });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};
