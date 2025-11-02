const express = require("express");
const router = express.Router();
const inviteController = require("../controllers/inviteControllers");
const authController = require("../middlerawe/authMiddleware");

router.get("/", authController.authMiddleware, inviteController.getUserInvites);

router.post(
  "/",
  authController.authMiddleware,
  inviteController.sendInviteRequest
);

router.patch(
  "/:id",
  authController.authMiddleware,
  inviteController.requestStatus
);

module.exports = router;
