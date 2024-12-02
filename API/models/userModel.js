const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: {
        type: String,
        required: function () {
          // Phone is required if neither facebookId nor googleId is present
          return !this.facebookId && !this.googleId;
        },
    },
    address: {
        type: String,
        required: function () {
          // Address is required if neither facebookId nor googleId is present
          return !this.facebookId && !this.googleId;
        },
    },
    facebookId: { type: String },
    googleId: { type: String },
    gender: { type: String, enum: ['male', 'female', 'other'], default: 'other' }, // Không bắt buộc
    birthday: { type: Date }, // Không bắt buộc
});

const User = mongoose.model('users', userSchema);

module.exports = User;
