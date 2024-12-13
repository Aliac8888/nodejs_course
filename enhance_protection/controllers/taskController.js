const Task = require("../models/task");

exports.getTasksPage = (req, res, next) => {
  Task.find({ userId: req.user._id })
    .then((tasks) => {
      res.render("pages/tasks", {
        title: "TASKS PAGE",
        path: "/tasks",
        tasks,
      });
    })
    .catch((err) => console.log(err));
};

exports.getAddTaskPage = (req, res, next) => {
  res.render("pages/add-task", {
    title: "ADD TASK PAGE",
    path: "/tasks/add-task-page",
  });
};

exports.postAddTask = (req, res, next) => {
  const { title, imageUrl, description } = req.body;
  const task = new Task({
    title: title,
    imageUrl: imageUrl,
    description: description,
    userId: req.user._id,
  });
  task
    .save()
    .then(() => res.redirect("/tasks"))
    .catch((err) => console.log(err));
};

exports.getEditTaskPage = (req, res, next) => {
  const taskId = req.params.taskId;
  Task.findById(taskId)
    .then((task) => {
      res.render("pages/edit-task", {
        title: "EDIT TASK PAGE",
        path: "",
        task: task,
      });
    })
    .catch((err) => console.log(err));
};

exports.postEditTask = (req, res, next) => {
  const taskId = req.params.taskId;

  Task.findByIdAndUpdate(taskId, {
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    userId: req.user._id,
  })
    .then(() => res.redirect("/tasks"))
    .catch((err) => console.log(err));
};

exports.postDeleteTask = (req, res, next) => {
  const taskId = req.body.taskId;
  Task.findByIdAndDelete(taskId)
    .then(() => res.redirect("/tasks"))
    .catch((err) => console.log(err));
};
