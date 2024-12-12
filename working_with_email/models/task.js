const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  imageUrl: String,
  userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
