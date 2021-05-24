const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecruiterSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User'},
    title: String,
    location: String,
    created_at: Number,
    updated_at: Number
});

module.exports = mongoose.model('Recruiter', RecruiterSchema);