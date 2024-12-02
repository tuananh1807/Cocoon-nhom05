const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryId: { type: String, required: true, unique: true, },
    categoryName: { type: String, required: true, },
    image: { type: String, required: false, }
});

module.exports = mongoose.model('categories', categorySchema);
