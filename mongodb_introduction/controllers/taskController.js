const Task = require("../models/task");

// exports.getTasksPage = (req, res, next) => {
//   req.user
//     .getTasks()
//     .then((tasks) => {
//       res.render("pages/tasks", { title: "TASKS PAGE", path: "/tasks", tasks });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

exports.getAddTaskPage = (req, res, next) => {
  res.render("pages/add-task", {
    title: "ADD TASK PAGE",
    path: "/tasks/add-task-page",
  });
};

exports.postAddTask = (req, res, next) => {
  // req.user
  //   .createTask({
  //     title: req.body.title,
  //     description: req.body.description,
  //     imageUrl: req.body.imageUrl,
  //   })
  //   .then(() => {
  //     res.redirect("/tasks");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  const task = new Task(
    req.body.title,
    req.body.description,
    req.body.imageUrl
  );
  task.save();
  res.redirect("/tasks");
};

// exports.getEditTaskPage = (req, res, next) => {
//   const taskId = req.params.taskId;
//   Task.findByPk(taskId)
//     .then((task) => {
//       res.render("pages/edit-task", {
//         title: "EDIT TASK PAGE",
//         path: "",
//         task: task,
//       });
//     })
//     .catch((err) => console.log(err));
// };

// exports.postEditTask = (req, res, next) => {
//   const taskId = req.params.taskId;
//   Task.update(
//     {
//       title: req.body.title,
//       description: req.body.description,
//       imageUrl: req.body.imageUrl,
//     },
//     { where: { id: taskId } }
//   )
//     .then((result) => {
//       res.redirect("/tasks");
//     })
//     .catch((err) => console.log(err));
// };

// exports.postDeleteTask = (req, res, next) => {
//   const taskId = req.body.taskId;
//   Task.destroy({ where: { id: taskId } })
//     .then(() => res.redirect("/tasks"))
//     .catch((err) => console.log(err));
// };
