// models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    // sku: { type: String, unique: true },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 0 },
    // supplier: { type: String },
    image: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
