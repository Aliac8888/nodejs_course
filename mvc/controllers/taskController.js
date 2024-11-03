const Task = require("../models/task");

exports.getTasksPage = async (req, res, next) => {
  const tasks = await Task.getAll();
  res.render("pages/tasks", { title: "TASKS PAGE", path: "/tasks", tasks });
};

exports.getAddTaskPage = (req, res, next) => {
  res.render("pages/add-task", {
    title: "ADD TASK PAGE",
    path: "/tasks/add-task-page",
  });
};

exports.postAddTask = async (req, res, next) => {
  const newTask = new Task(req.body.title, req.body.description, req.body.imageUrl);
  const result = await newTask.save();
  console.log(result);

  res.redirect("/tasks");
};
