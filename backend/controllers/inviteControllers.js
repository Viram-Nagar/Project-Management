// routes/inviteRoutes.js
const express = require("express");
const Invite = require("../models/inviteModel");
const Project = require("../models/projectModel");
const User = require("../models/UserModel");
const { getIo } = require("../socket");
// const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// GET /api/invites
module.exports.getUserInvites = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log(req.user);
    // Find all invites where this user is the receiver
    const invites = await Invite.find({ receiver: userId })
      .populate("project", "name") // populate project name
      .populate("sender", "name email") // populate who sent the invite
      .sort({ createdAt: -1 }); // newest first

    res.json(invites);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/invites
module.exports.sendInviteRequest = async (req, res) => {
  try {
    const { projectId, email } = req.body;
    const senderId = req.user._id;
    const emails = email.replace(/\s+/g, "").split(",");
    console.log("email :");
    console.log(emails);
    // verify project & sender are admin
    const project = await Project.findById(projectId);
    if (!project) return res.json({ message: "Project not found" });

    if (project.admin.toString() !== senderId.toString()) {
      return res.json({ message: "Only admin can invite" });
    }
    console.log("Project Data :");
    console.log(project);
    // check if user exists
    // check if users exist
    const receiversId = await User.find({ email: { $in: emails } }, "_id");
    if (receiversId.length === 0) {
      return res.json({ message: "No matching users found" });
    }

    // check if any already members
    const existingMembers = receiversId.filter((receiver) =>
      project.members.includes(receiver._id)
    );
    if (existingMembers.length > 0) {
      return res.json({ message: "Some users are already in the project" });
    }

    // check if already invited
    const existingInvites = await Invite.find({
      project: projectId,
      receiver: { $in: receiversId.map((r) => r._id) },
      status: "pending",
    });
    if (existingInvites.length > 0) {
      return res.json({ message: "Some users already have pending invites" });
    }

    // create invites
    await Promise.all(
      receiversId.map((receiver) =>
        new Invite({
          project: projectId,
          sender: senderId,
          receiver: receiver._id,
        }).save()
      )
    );

    res.json({ message: "Invites sent successfully" });
  } catch (err) {
    console.error(err);
    res.json({ message: "Server error" });
  }
};

// PATCH /api/invites/:id
module.exports.requestStatus = async (req, res) => {
  try {
    const { status } = req.body; // accepted / rejected
    const userId = req.user._id;

    const invite = await Invite.findById(req.params.id);
    if (!invite) return res.status(404).json({ message: "Invite not found" });

    if (invite.receiver.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    invite.status = status;
    await invite.save();

    // if accepted, add to project
    if (status === "accepted") {
      await Project.findByIdAndUpdate(invite.project, {
        $addToSet: { members: userId },
      });
    }

    updatedProject = await Project.findById(invite.project)
      .populate("members", "_id name role email")
      .populate({
        path: "tasks",
        populate: { path: "assignedTo", select: "_id name email role" },
      });

    console.log(updatedProject);

    getIo()
      .to(invite.project.toString())
      .emit("project:updated", updatedProject);

    res.json({ message: `Invite ${status}`, invite });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
