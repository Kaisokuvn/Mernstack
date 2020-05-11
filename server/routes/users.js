const router = require("express-promise-router")();
const User = require("../models/User");

router.route("/").get(async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
});

router.route("/add").post(async (req, res, next) => {
  const { username } = req.body;
  const newUser = new User({ username: username });
  await newUser.save();
  return res.status(201).json({
    success: true,
    data: newUser,
  });
});

module.exports = router;