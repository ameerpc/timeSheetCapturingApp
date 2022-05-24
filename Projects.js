const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema({
    projectName: { type: String, required: true, unique: true },
    projectDescription: { type: String },
    owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    startDate: { type: Date, required: true},
    endDate: { type: Date, required: true},
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task'}]
})

module.exports = mongoose.model('Project', ProjectSchema)