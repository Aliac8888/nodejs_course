const Task = require("../models/task");

exports.getTasksPage = (req, res, next) => {
  Task.getAll()
    .then(([tasks, columnData]) => {
      res.render("pages/tasks", { title: "TASKS PAGE", path: "/tasks", tasks });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getAddTaskPage = (req, res, next) => {
  res.render("pages/add-task", {
    title: "ADD TASK PAGE",
    path: "/tasks/add-task-page",
  });
};

exports.postAddTask = (req, res, next) => {
  const newTask = new Task(
    req.body.title,
    req.body.description,
    req.body.imageUrl
  );
  newTask
    .save()
    .then(() => {
      res.redirect("/tasks");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEditTaskPage = (req, res, next) => {
  const taskId = req.params.taskId;
  Task.findById(taskId)
    .then(([task]) => {
      res.render("pages/edit-task", {
        title: "EDIT TASK PAGE",
        path: "",
        task: task[0],
      });
    })
    .catch((err) => console.log(err));
};

exports.postEditTask = async (req, res, next) => {
  const taskId = req.params.taskId;
  Task.findById(taskId)
    .then(([task])=>{
      if (task[0]) {
        Task.updateTask(
          taskId,
          req.body.title,
          req.body.description,
          req.body.imageUrl
        )
          .then((result) => {
            res.redirect("/tasks");
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
};

exports.postDeleteTask = (req, res, next) => {
  const taskId = req.body.taskId;
  Task.findById(taskId)
    .then(([task]) => {
      if (task[0]) {
        Task.deleteTask(taskId)
          .then((result) => {
            res.redirect("/tasks");
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
};
