const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    categoryId: { type: String },
    imageUrl: { type: String },
});

const Product = mongoose.model('products', productSchema);

module.exports = Product;

// db.products.updateMany({}, { $unset: { productId: "", anotherField: "" } });
