const Post = require("../models/post");

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "failed to fetch posts" });
  }
};

exports.getSinglePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findOne({ _id: id, userId: req.userId });
    if (!post) {
      return res.status(404).json({ error: `post not found: ${id}` });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: `failed to fetch post with id: ${id}` });
  }
};

exports.createPost = async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "content and title are required" });
  }

  try {
    const newPost = new Post({ title, content, userId: req.userId });
    await newPost.save();

    const io = req.app.get("io");
    io.emit("newPost", {
      _id: newPost._id,
      content: newPost.content,
      title: newPost.title,
      userId: newPost.userId,
    });
    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    res.status(500).json({ error: "failed to create post" });
  }
};

exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "content and title are required" });
  }

  try {
    const post = await Post.findOne({ _id: id, userId: req.userId });
    if (!post) {
      return res.status(404).json({ error: `post not found: ${id}` });
    }
    post.title = title;
    post.content = content;
    await post.save();
    res.status(200).json({ message: "Post updated successfully", post });
  } catch (error) {
    res.status(500).json({ error: "failed to update post" });
  }
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findOne({ _id: id, userId: req.userId });
    if (!post) {
      return res.status(404).json({ error: `post not found: ${id}` });
    }

    await post.deleteOne();
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "failed to delete post" });
  }
};
