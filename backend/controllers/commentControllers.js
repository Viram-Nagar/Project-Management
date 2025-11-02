const { getIo } = require("../socket");
const Comment = require("../models/CommentModel");
const User = require("../models/UserModel");
const Task = require("../models/TaskModel");

module.exports.addComment = async (req, res) => {
  const { text, taskId, createdBy } = req.body;
  console.log(req.user);
  const newComment = new Comment({
    text,
    task: taskId,
    user: createdBy,
  });

  await newComment.save();
  const comment = await newComment.populate("user", "name email");
  console.log(comment);
  getIo().to(taskId).emit("comment:added", comment);

  res.json({ message: newComment });
};

module.exports.fetchCommentsByTask = async (req, res) => {
  const { taskId } = req.params;
  const allComments = await Comment.find({ task: taskId })
    .populate("user", "name email")
    .populate("task", "_id");

  // getIo().to(taskId).emit("comment:all", allComments);

  res.json(allComments);
};
