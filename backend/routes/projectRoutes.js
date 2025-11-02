const express = require("express");
const router = express.Router();
const projectControllers = require("../controllers/projectControllers");
const authMiddleware = require("../middlerawe/authMiddleware");

router.get("/", authMiddleware.authMiddleware, projectControllers.allProjects);

router.post(
  "/",
  authMiddleware.authMiddleware,
  projectControllers.createProject
);

router.get(
  "/:projectId",
  authMiddleware.authMiddleware,
  projectControllers.projectInfo
);

router.put(
  "/:projectId",
  authMiddleware.authMiddleware,
  projectControllers.updateProject
);

router.delete(
  "/:id",
  authMiddleware.authMiddleware,
  projectControllers.deleteProject
);

module.exports = router;
