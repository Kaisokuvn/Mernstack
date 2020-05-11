const router = require("express-promise-router")();
const Excercise = require("../models/Excercise");

router.route("/").get(async (req, res, next) => {
  const users = await Excercise.find({});
  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
});

router.route("/add").post(async (req, res, next) => {
  const newEx = {
    username: req.body.username,
    excercise: req.body.excercise,
    description: req.body.description,
    duration: Number(req.body.duration),
    date: Date.parse(req.body.date),
  };
  const newExcercise = new Excercise(newEx);
  await newExcercise.save();
  return res.status(201).json({
    success: true,
    data: newExcercise,
  });
});

module.exports = router;
