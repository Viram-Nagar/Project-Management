const express = require("express");
const route = express.Router();
const authMiddleware = require("../middlerawe/authMiddleware");
const commentController = require("../controllers/commentControllers");

route.post(
  "/:taskId",
  authMiddleware.authMiddleware,
  commentController.addComment
);

route.get(
  "/:taskId",
  authMiddleware.authMiddleware,
  commentController.fetchCommentsByTask
);

module.exports = route;
