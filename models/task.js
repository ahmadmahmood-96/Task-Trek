const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
  email: String,
  todos: [{
    title: String,
    description: String,
    completed: Boolean,
    dateCreated: Date,
    dateToFinish: Date,
    dateCompleted: Date
  }]
});
module.exports = mongoose.model('Task', taskSchema);