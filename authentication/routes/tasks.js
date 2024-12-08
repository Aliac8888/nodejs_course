const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const isAuth = require("../middlewares/isAuth");

router.get("/",taskController.getTasksPage);

router.get("/add-task-page", isAuth, taskController.getAddTaskPage);

router.post("/add-task", isAuth, taskController.postAddTask);

router.get("/edit/:taskId", isAuth, taskController.getEditTaskPage);

router.post("/edit-task/:taskId", isAuth, taskController.postEditTask);

router.post("/delete", isAuth, taskController.postDeleteTask);

module.exports = router;
