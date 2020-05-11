const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const excerciseSchema = new Schema(
  {
    username: [{ type: Schema.Types.ObjectId, ref: "User" }],
    excercise: { type: String, require: true },
    description: { type: String, require: true },
    duration: { type: Date, required: true },
    date: { type: Date, required: true },

    createAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Excercise = mongoose.model("Excercise", excerciseSchema);

module.exports = Excercise;
