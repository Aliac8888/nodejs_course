const express = require("express");
const postController = require('../controllers/postController');
const router = express.Router();

router.get("/", postController.getAllPosts);

router.get("/:id", postController.getSinglePost);

router.put("/:id", postController.updatePost);

router.delete("/delete/:id", postController.deletePost);

router.post("/create", postController.createPost);

module.exports = router;