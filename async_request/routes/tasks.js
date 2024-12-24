const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const isAuth = require("../middlewares/isAuth");
const csrfConfig = require("../helpers/csrfConfig");
const { body } = require("express-validator");
const upload = require('../helpers/multerConfig');

router.get("/", isAuth, taskController.getTasksPage);

router.get("/add-task-page", isAuth, taskController.getAddTaskPage);

router.post(
  "/add-task",
  isAuth,
  upload.single("image"),
  csrfConfig.doubleCsrfProtection,
  csrfConfig.csrfErrorHandler,
  [
    body("title").trim().escape().notEmpty(),
    body("description").trim().escape(),
    body("imageUrl").trim().isURL().optional({ checkFalsy: true }),
  ],
  taskController.postAddTask
);

router.get("/edit/:taskId", isAuth, taskController.getEditTaskPage);

router.post(
  "/edit-task/:taskId",
  isAuth,
  csrfConfig.doubleCsrfProtection,
  [
    body("title").trim().escape().notEmpty(),
    body("description").trim().escape(),
    body("imageUrl").trim().isURL().optional({ checkFalsy: true }),
  ],
  taskController.postEditTask
);

router.delete(
  "/delete/:taskId",
  isAuth,
  csrfConfig.doubleCsrfProtection,
  taskController.deleteTask
);

module.exports = router;
