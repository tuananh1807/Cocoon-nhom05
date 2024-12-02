// const mongoose = require('mongoose');

// const orderItemSchema = new mongoose.Schema({
//     productRef: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
//     productId: { type: Number, required: true, ref: 'Product' },
//     orderId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Order' },
//     quantity: { type: Number, required: true },
//     price: { type: mongoose.Decimal128, required: true },
//     subtotal: { type: mongoose.Decimal128, required: true },
//     createdAt: { type: Date, default: Date.now },
//     updatedAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('OrderItem', orderItemSchema);

const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    productRef: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
    productId: { type: Number, required: true, ref: 'Product' },
    orderId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Order' },
    quantity: { type: Number, required: true },
    price: { type: mongoose.Decimal128, required: true },
    subtotal: { type: mongoose.Decimal128, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('OrderItem', orderItemSchema);



