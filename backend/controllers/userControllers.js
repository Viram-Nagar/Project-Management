require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
require("dotenv").config();

module.exports.postSignupDetails = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (await User.findOne({ email })) {
    return res.status(400).json({ message: "Email already exist" });
  }

  const newUser = await new User({ name, email, password, role }).save();

  const token = jwt.sign(
    {
      _id: newUser._id,
      role: newUser.role,
      name,
      email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "9h" }
  );

  // res.cookie("token", token, {
  //   httpOnly: true,
  //   secure: true,
  //   sameSite: "none",
  //   maxAge: 9 * 60 * 60 * 1000,
  // });

  return res.json({ user: { name, email, role, _id: newUser._id }, token });
};

module.exports.postLoginDetails = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  const user = await User.findOne({ email });

  if (!user) {
    return res.json({ message: "User not Found" });
  }

  const isMatching = await user.comparePassword(password);
  // const isMatching = (await user.password) === password;

  if (!isMatching) {
    return res.json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    {
      _id: user._id,
      role: user.role,
      name: user.name,
      email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "9h" }
  );

  // res.cookie("token", token, {
  //   httpOnly: true,
  //   secure: true,
  //   sameSite: "none",
  //   maxAge: 9 * 60 * 60 * 1000,
  // });

  return res.json({
    user: { name: user.name, _id: user._id, role: user.role, email },
    token,
  });
};

module.exports.currentLoggedinUser = async (req, res, next) => {
  const { _id } = req.user;

  const user = await User.findById(_id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  next();
};

module.exports.fetchUserForAdmin = async (req, res, next) => {
  const users = await User.find({});

  const usersData = users.map((user) => ({
    name: user.name,
    email: user.email,
    role: user.role,
    id: user._id,
  }));

  res.json(usersData);
};

module.exports.logOut = async (req, res, next) => {
  // res.clearCookie("token", {
  //   httpOnly: true,
  //   sameSite: "none",
  //   secure: true,
  //   path: "/",
  // });
  res.json({ message: "Logged out successfully" });
};
