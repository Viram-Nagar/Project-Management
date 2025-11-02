const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  dueDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["Todo", "In Progress", "Done"],
    default: "Todo",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  assignedTo: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  project: {
    type: Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Task = mongoose.model("Task", taskSchema);

// const addTask = new Task({
//   title: "Code",
//   description: "Do coding 1 hour",
//   dueDate: new Date("2025-10-10"),
//   status: "todo",
// });

// addTask.save();

module.exports = Task;
