const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");
const authantication = require("../middlerawe/authMiddleware");

// router.get("/signup", (req, res, next) => {
//   res.json({ message: "signup get page" });
// });

router.post("/signup", userController.postSignupDetails);

// router.get("/login", (req, res, next) => {
//   res.json({ message: "login get page" });
// });

router.post("/login", userController.postLoginDetails);

router.get(
  "/user",
  authantication.authMiddleware,
  authantication.requireAdmin,
  userController.fetchUserForAdmin
);

// router.get(
//   "/admin",
//   authantication.authMiddleware,
//   authantication.requireAdmin,
//   userController.currentLoggedinUser
// );

router.get("/logout", userController.logOut);

module.exports = router;
