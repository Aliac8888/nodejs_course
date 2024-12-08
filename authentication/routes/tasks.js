const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const isAuth = require("../middlewares/isAuth");
const csrfConfig = require("../helpers/csrfConfig");

router.get("/", taskController.getTasksPage);

router.get("/add-task-page", isAuth, taskController.getAddTaskPage);

router.post(
  "/add-task",
  isAuth,
  csrfConfig.doubleCsrfProtection,
  csrfConfig.csrfErrorHandler,
  taskController.postAddTask
);

router.get("/edit/:taskId", isAuth, taskController.getEditTaskPage);

router.post(
  "/edit-task/:taskId",
  isAuth,
  csrfConfig.doubleCsrfProtection,
  taskController.postEditTask
);

router.post(
  "/delete",
  isAuth,
  csrfConfig.doubleCsrfProtection,
  taskController.postDeleteTask
);

module.exports = router;
