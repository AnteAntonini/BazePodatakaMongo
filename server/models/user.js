const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    github: String,
    password: String,
    likedin: String,
    facebook: String,
    instagram: String,
    created_at: Number,
    is_recruiter: Boolean,
    updated_at: Number
});

module.exports = mongoose.model('User', UserSchema);