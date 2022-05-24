// Projects.js
const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    taskName: { type: String, require:true, unique: true},
    projectName: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Project'},
    member: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})


module.exports = mongoose.model('Task', TaskSchema)