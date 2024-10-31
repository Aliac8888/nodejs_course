const Task = require("../models/task");

exports.getTasksPage = (req, res, next) => {
  const tasks = Task.getAll();
  res.render("pages/tasks", { title: "TASKS PAGE", tasks });
};

exports.getAddTaskPage = (req, res, next) => {
  res.render("pages/add-task", { title: "ADD TASK PAGE" });
};

exports.postAddTask = async (req, res, next) => {
  const newTask = new Task(req.body.title);
  const result = await newTask.save();
  console.log(result);
  
  res.redirect("/tasks");
};
