const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    description: String,
    rating: Number,
    created_at: Number,
    updated_at: Number
});

module.exports = mongoose.model('Review', ReviewSchema);