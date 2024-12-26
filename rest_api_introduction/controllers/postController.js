exports.getPosts = (req, res, next) => {
  return console.log("send posts");
};

exports.createPost = (req, res, next) => {
  const { title, content } = req.body;

  //logic for inserting post in db

  return res.status(201).json({
    message: "post created successfully",
    post: { title, content, createdAt: Date.now() },
  });
};
