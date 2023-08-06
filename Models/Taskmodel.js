const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Incomplete', 'Completed'],
    default: 'Incomplete',
  },
  dueDate: {
    type: Date,
  },
});

// Create and export the Task model based on the schema
module.exports = mongoose.model('Task', taskSchema);
