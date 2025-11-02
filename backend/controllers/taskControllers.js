const { getIo } = require("../socket");
const Task = require("../models/TaskModel");
const User = require("../models/UserModel");
const Project = require("../models/projectModel");
const Comments = require("../models/CommentModel");

// taskController.js
exports.getMyTasks = async (req, res) => {
  try {
    const userId = req.user._id; // assuming you use auth middleware

    const tasks = await Task.find({ assignedTo: userId })
      .populate("project", "name") // populate project name
      .populate("assignedTo", "_id role name email"); // optional

    getIo().to(userId).emit("tasks:user", tasks);

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching my tasks:", error);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

/////////////////
module.exports.showProjectTasks = async (req, res) => {
  const { projectId } = req.params;
  const tasks = await Task.find({ project: projectId }).populate("assignedTo");
  res.json(tasks);
};

///////////////////////
module.exports.addTask = async (req, res) => {
  const { title, description, dueDate, assignedTo, projectId, createdBy } =
    req.body;

  const project = await Project.findById(projectId);

  // console.log(project);
  // console.log(project.members.includes(assignedTo));

  const membersId = project.members.map((userId) => userId.toString());

  assignedTo.forEach((id) => {
    if (!membersId.includes(id)) {
      return res.json({ message: "User not in project" });
    }
  });

  const saveTask = new Task({
    title,
    project: projectId,
    description,
    dueDate,
    status: "Todo",
    createdBy,
  });
  saveTask.assignedTo.push(...assignedTo);

  const updatedproject = await Project.findByIdAndUpdate(
    projectId,
    { $push: { tasks: saveTask._id } },
    { new: true }
  );
  await saveTask.save();

  newTask = await Task.findById(saveTask._id).populate(
    "assignedTo",
    "name email _id role"
  );

  getIo().to(projectId).emit("task:added", newTask);

  res.json({ message: "New Task Added", newTask });
};

//////////////////////
module.exports.getTaskById = async (req, res) => {
  const { taskId } = req.params;

  const user = await User.findById(req.user._id);
  // console.log(req.user);
  const task = await Task.findById(taskId).populate(
    "assignedTo",
    "name email role"
  );

  res.json(task);
};

/////////////////////////
module.exports.updateTask = async (req, res) => {
  const { id } = req.params;

  const { title, description, dueDate, status, removeMemberId, assignedTo } =
    req.body;

  const user = req.user;

  const task = await Task.findById(id).populate(
    "assignedTo",
    "_id name role email"
  );

  const project = await Project.findById(task.project);

  if (user._id === project.admin.toString()) {
    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.dueDate = dueDate ?? task.dueDate;

    if (assignedTo?.length) {
      task.assignedTo.push(
        ...assignedTo.filter((a) => !task.assignedTo.includes(a))
      );
    }
  }

  task.status = status ?? task.status;

  if (removeMemberId) {
    task.assignedTo = task.assignedTo.filter(
      (member) => member._id.toString() !== removeMemberId
    );
  }

  await task.save();

  const taskDetails = await Task.findById(id)
    .populate("assignedTo", "_id name role email")
    .populate("project", "_id name");

  // const taskDetails = await task
  //   .populate("assignedTo", "_id name role email")
  //   .populate("project", "_id name");

  getIo().to(task._id.toString()).emit("task:updated", taskDetails);
  getIo().to(task.project.toString()).emit("task:updated", taskDetails);
  getIo().to(user._id).emit("tasks:updated", taskDetails);

  if (removeMemberId) {
    getIo().to(removeMemberId).emit("task:remove", task);
  }

  assignedTo?.forEach((memberId) =>
    getIo().to(memberId).emit("task:assigned", task)
  );

  res.json(task);
};

///////////////////////
module.exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  const task = await Task.findById(id);
  await Comments.deleteMany({ task: id });
  await Task.findByIdAndDelete(id);

  getIo().to(task.project.toString()).emit("task:deleted", id);

  res.json({ message: "Task deleted!" });
};
