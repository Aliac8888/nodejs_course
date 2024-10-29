const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

router.get("/",taskController.getTasksPage);

router.get("/add-task-page", taskController.getAddTaskPage);

router.post("/add-task", taskController.postAddTask);

module.exports = router;
