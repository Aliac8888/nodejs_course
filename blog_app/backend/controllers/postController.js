exports.getAllPosts = async (req, res) => {
  try {
    const posts = [
      { id: 1, title: "post 1", content: "content 1" },
      { id: 2, title: "post 2", content: "content 2" },
    ];
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "failed to fetch posts" });
  }
};
