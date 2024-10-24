const express = require("express");
const router = express.Router();

router.get("/add-task-page", (req, res, next) => {
  res.render("pages/add-task", { title: "ADD TASK PAGE" });
});

router.post("/add-task", (req, res, next) => {
  console.log(req.body.title);
  res.redirect("/");
});

module.exports = router;
