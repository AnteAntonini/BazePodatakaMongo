const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new Schema({
    skill: { type: [Schema.Types.ObjectId], ref: 'Skill'},
    title: String,
    description: String,
    finished: Number,
    in_progress: Number
});

module.exports = mongoose.model('Job', JobSchema);