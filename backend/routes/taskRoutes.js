const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskControllers");
const authMiddleware = require("../middlerawe/authMiddleware");

router.get(
  "/my-tasks",
  authMiddleware.authMiddleware,
  taskController.getMyTasks
);

router.get(
  "/:taskId",
  authMiddleware.authMiddleware,
  taskController.getTaskById
);
router.get(
  "/:projectId",
  authMiddleware.authMiddleware,
  taskController.showProjectTasks
);

router.post(
  "/",
  authMiddleware.authMiddleware,
  authMiddleware.requireAdmin,
  taskController.addTask
);

router.put("/:id", authMiddleware.authMiddleware, taskController.updateTask);

router.delete(
  "/:id",
  authMiddleware.authMiddleware,
  authMiddleware.requireAdmin,
  taskController.deleteTask
);

module.exports = router;
