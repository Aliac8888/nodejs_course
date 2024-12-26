const express = require("express");
const Router = express.Router();
const postController = require("../controllers/postController")

Router.get("/", postController.getPosts);

module.exports = Router;
