require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product')
const customerRoutes = require('./routes/customer')
const orderRoutes = require('./routes/order')

const app = express();

app.use(express.json())

app.use(cors({
    origin: "",
    methods: ["GET", "POST", "PUT", "DELETE"],
}))

app.use('/admin', userRoutes)
app.use('/product', productRoutes)
app.use('/customer', customerRoutes)
app.use('/order', orderRoutes)

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("db connected")
}).catch((error) => {
    console.log(error.message)
})










app.listen(3000, () => {
    console.log('Server is running on port 3000');
});;