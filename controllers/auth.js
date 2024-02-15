const User = require("../models/User");
const ErrorResponse = require("../utils/ErrorEesponse");

// @URL     POST /api/auth/register
exports.register = async (req, res) => {
  const user = await User.create(req.body);
  res.status(200).json({
    success: true,
    token: user.getToken(),
    message: "User registered successfully !",
  });
};
// @URL     POST /api/auth/login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  // validate email and password
  if (!email || !password)
    throw new ErrorResponse(400, "Please provide Email and Password");
  // check for user
  const user = await User.findOne({ email });
  if (!user) throw new ErrorResponse(401, "Invalid credentials");
  // check password
  const isMatch = await user.matchPassword(password);
  if (!isMatch) throw new ErrorResponse(401, "Invalid credentials");
  res.status(200).json({
    success: true,
    token: user.getToken(),
    message: "User Loggedin successfully !",
  });
};

// @URL     ALL /api/auth/logout
exports.logout = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Remove token from browser data",
  });
};

// @URL     PUT /api/auth/details
exports.updateDetails = async (req, res) => {
  const fieldsToUpdate = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate(req.user._id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, data: user });
};

// @URL     PUT /api/auth/password
exports.updatePassword = async (req, res) => {
  const user = await User.findById(req.user._id);
  // check current password
  const currentPasswordMatch = await user.matchPassword(
    req.body.currentPassword,
  );
  // Throw error if not matched
  if (!currentPasswordMatch) throw new ErrorResponse(401, "Incorrect Password");

  // Update the password
  user.password = req.body.newPassword;
  // save to db
  await user.save();
  res.status(200).json({ success: true, data: user });
};