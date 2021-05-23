const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SkillSchema = new Schema({
    name: String,
    created_at: Number,
    updated_at: Number
});

module.exports = mongoose.model('Skill', SkillSchema);