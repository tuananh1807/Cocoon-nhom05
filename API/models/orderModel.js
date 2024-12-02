const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true, // Fixed typo here
      },
      orderId: { type: String, required: true, unique: true },
      userInfo: {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true },
      },
      products: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products',
            required: true, // Ensure every product has an ID
          },
          quantity: { type: Number, required: true },
          total: { type: Number, required: true },
          _id: false,
        },
      ],
      totalPrice: { type: Number, required: true, min: 0 },
      status: { type: String, default: 'pending' },
      paymentMethod: { type: String, default: 'Unknown' }, // Made it optional with a default value
      transactionNo: { type: String, unique: true, sparse: true },
      paymentDate: { type: Date, default: null },
    },
    {
      timestamps: true, 
    }
  );

const Order = mongoose.model('orders', orderSchema);

module.exports = Order;
