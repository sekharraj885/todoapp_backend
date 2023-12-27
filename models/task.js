
const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required:true,
  },
  title: {
    type: String,
    required: [true, "Title is required."],
    trim: true,
    maxlength: [100, "Title cannot exceed 100 characters."],
  },
  category: {
    type: String,
    enum: ['Study', 'Health', 'Work', 'Shopping', 'Personal', 'Fitness']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, "Description cannot exceed 500 characters."],
  },
  dueDate: {
    type: Date,
    required: [true, "Due date is required."],
    min: [new Date(), "Due date must be in the future."],
  },
  priority: {
    type: String,
    enum: ["High", "Medium", "Low"],
    default: "Medium",
  },
  status: {
    type: String,
    enum: ["To Do", "In Progress", "Completed"],
    default: "To Do",
  }, 
  completionDate: {
    type: Date,
  },
})


const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;