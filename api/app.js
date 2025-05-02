require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const serverless = require('serverless-http');

const userRoutes = require('../routes/user');
const productRoutes = require('../routes/product');
const customerRoutes = require('../routes/customer');
const orderRoutes = require('../routes/order');

const app = express();

app.use(express.json());

app.use(cors({
    origin: "*",  // Allow all origins (you can replace "*" with specific domains if needed)
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.get('/', (req, res) => {
    res.send("testing");
});

app.use('/admin', userRoutes);
app.use('/product', productRoutes);
app.use('/customer', customerRoutes);
app.use('/order', orderRoutes);

// Ensure a single database connection is reused across invocations
let isConnected = false;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        if (!isConnected) {
            console.log("DB connected");
            isConnected = true;
        }
    })
    .catch((error) => {
        console.error(error.message);
    });

module.exports.handler = serverless(app);  // Wrap the app for serverless deployment
