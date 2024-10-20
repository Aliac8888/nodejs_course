const express = require("express");
const router = express.Router();
const path = require("path");
const rootDir = require("../helpers/rootDir");

router.get("/add-task-page", (req, res, next) => {
   res.sendFile(path.join(rootDir, "views", "add-task.html"));
});

router.post("/add-task", (req, res, next) => {
  console.log(req.body.title);
  res.redirect("/");
});

module.exports = router;
