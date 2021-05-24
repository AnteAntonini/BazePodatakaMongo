const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User'},
    description: String,
    rating: Number,
    created_at: Number,
    updated_at: Number
});

module.exports = mongoose.model('Review', ReviewSchema);