const Task = require("../models/task");
const { validationResult } = require("express-validator");

exports.getTasksPage = (req, res, next) => {
  Task.find({ userId: req.user._id })
    .then((tasks) => {
      res.render("pages/tasks", {
        title: "TASKS PAGE",
        path: "/tasks",
        tasks,
      });
    })
    .catch((err) => {
      console.log(err);
      error.status = 500;
      return next(error);
    });
};

exports.getAddTaskPage = (req, res, next) => {
  res.render("pages/add-task", {
    title: "ADD TASK PAGE",
    path: "/tasks/add-task-page",
    errorMessage: req.flash("error"),
    oldInput: { title: "", imageUrl: "", description: "" },
  });
};

exports.postAddTask = (req, res, next) => {
  const { title, description } = req.body;
  const image = req.file;
  let imageUrl = null;
  if (image) {
    imageUrl = image.path.replace("public\\","");
  }

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    req.flash("error", errors.array()[0].msg);
    return res.render("pages/add-task", {
      title: "ADD TASK PAGE",
      path: "/tasks/add-task-page",
      errorMessage: req.flash("error"),
      oldInput: { title, imageUrl, description },
    });
  }
  const task = new Task({
    title: title,
    imageUrl: imageUrl,
    description: description,
    userId: req.user._id,
  });
  task
    .save()
    .then(() => res.redirect("/tasks"))
    .catch((err) => {
      console.log(err);
      error.status = 500;
      return next(error);
    });
};

exports.getEditTaskPage = (req, res, next) => {
  const taskId = req.params.taskId;
  Task.findOne({ _id: taskId, userId: req.user._id })
    .then((task) => {
      if (!task) {
        return res.redirect("/tasks");
      }
      res.render("pages/edit-task", {
        title: "EDIT TASK PAGE",
        path: "",
        task: task,
        errorMessage: req.flash("error"),
      });
    })
    .catch((err) => {
      console.log(err);
      error.status = 500;
      return next(error);
    });
};

exports.postEditTask = async (req, res, next) => {
  const taskId = req.params.taskId;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const task = await Task.findById(taskId);
    req.flash("error", errors.array()[0].msg);

    return res.render("pages/edit-task", {
      title: "EDIT TASK PAGE",
      path: "",
      task: task,
      errorMessage: req.flash("error"),
    });
  }
  Task.findOneAndUpdate(
    { _id: taskId, userId: req.user._id },
    {
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      userId: req.user._id,
    }
  )
    .then(() => res.redirect("/tasks"))
    .catch((err) => {
      console.log(err);
      error.status = 500;
      return next(error);
    });
};

exports.postDeleteTask = (req, res, next) => {
  const taskId = req.body.taskId;
  Task.findOneAndDelete({ _id: taskId, userId: req.user._id })
    .then(() => res.redirect("/tasks"))
    .catch((err) => {
      console.log(err);
      error.status = 500;
      return next(error);
    });
};
