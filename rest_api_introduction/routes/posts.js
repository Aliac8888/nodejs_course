const express = require("express");
const Router = express.Router();
const postController = require("../controllers/postController")

Router.get("/", postController.getPosts);

Router.post("/create", postController.createPost);

module.exports = Router;
