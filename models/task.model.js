const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: [true, 'Please provide a task.'],
        maxlength: 100
    },
    description: {
        type: String,
        required: false,
        maxlength: 150
    },
    label: {
        type: String,
        enum: ['urgent', 'important', 'medium', 'low'],
        default: 'important'
    },
    status: {
        type: String,
        enum: ['To Do', 'doing', 'pending', 'finished'],
        default: 'To Do'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user']
    },
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);