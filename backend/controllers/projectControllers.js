const Comment = require("../models/CommentModel");
const Project = require("../models/projectModel");
const Task = require("../models/TaskModel");
const User = require("../models/UserModel");
const { getIo } = require("../socket");

module.exports.allProjects = async (req, res) => {
  const user = req.user;
  // console.log(user);
  const allProjects = await Project.find({ members: user._id })
    .populate("admin", "name")
    .populate("members", "name");

  res.json(allProjects);
};

module.exports.createProject = async (req, res) => {
  try {
    const { name, description, admin } = req.body;

    // const membersId = await User.find({ email: members });
    // console.log("invited members Id", membersId);

    const newProject = await new Project({
      name,
      description,
      admin,
      members: [admin],
    }).save();

    const io = getIo();
    const projectMembersId = admin;

    io.to(projectMembersId).emit("project:created", newProject);

    res.json(newProject);
  } catch (error) {
    console.log(error);
    res.json({ message: error.message });
  }
};

module.exports.projectInfo = async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId)
      .populate("members", "name email")
      .populate("admin", "name email")
      .populate({
        path: "tasks",
        populate: { path: "assignedTo", select: "name email role" },
      });

    res.json(project);
  } catch (error) {
    res.json({ messsage: error.message });
  }
};

module.exports.updateProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { name, description, removeMemberId } = req.body;

    const project = await Project.findById(projectId)
      .populate("members", "_id")
      .populate({
        path: "tasks",
        populate: { path: "assignedTo", select: "_id name role email" },
      });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (removeMemberId) {
      project.members = project.members.filter(
        (memberId) => memberId._id.toString() !== removeMemberId
      );

      await Task.updateMany(
        { project: projectId },
        { $pull: { assignedTo: removeMemberId } }
      );
    }

    if (name) project.name = name ?? project.name;
    if (project) project.description = description ?? project.description;

    const savedProject = await project.save();

    const updatedProject = await Project.findById(savedProject._id)
      .populate("members", "_id name role email")
      .populate({
        path: "tasks",
        populate: { path: "assignedTo", select: "_id name email role" },
      });

    updatedProject.members.forEach((member) =>
      getIo().to(member._id.toString()).emit("project:updated", updatedProject)
    );

    if (removeMemberId) {
      getIo().to(removeMemberId).emit("project:removed", {
        projectId,
        message: "You have been removed from this project by the admin",
      });
    }

    res.json(updatedProject);
  } catch (error) {
    console.log(error);
    res.json({ message: error.message });
  }
};

module.exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const tasks = await Task.find({ project: id }, "_id");
    const taskId = tasks.map((task) => task._id);

    const project = await Project.findById(id).populate("members", "_id");

    await Comment.deleteMany({ task: { $in: taskId } });
    await Task.deleteMany({ project: id });
    await Project.findByIdAndDelete(id);

    project.members.map((member) =>
      getIo().to(member._id.toString()).emit("project:deleted", id)
    );

    res.json({ message: "Project deleted succefully" });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message });
  }
};
