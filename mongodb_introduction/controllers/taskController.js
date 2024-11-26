const Task = require("../models/task");

exports.getTasksPage = (req, res, next) => {
  Task.findAll()
    .then((tasks) => {
      res.render("pages/tasks", { title: "TASKS PAGE", path: "/tasks", tasks });
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
  const task = new Task(
    req.body.title,
    req.body.description,
    req.body.imageUrl
  );
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
  const task = new Task(
    req.body.title,
    req.body.description,
    req.body.imageUrl,
    taskId
  );
  task
    .save()
    .then(() => res.redirect("/tasks"))
    .catch((err) => console.log(err));
};

// exports.postDeleteTask = (req, res, next) => {
//   const taskId = req.body.taskId;
//   Task.destroy({ where: { id: taskId } })
//     .then(() => res.redirect("/tasks"))
//     .catch((err) => console.log(err));
// };
