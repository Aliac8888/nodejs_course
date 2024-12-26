const express = require("express");

const app = express();
const port = 8080;

const postRoutes = require("./routes/posts");

app.use("/posts", postRoutes);

app.listen(port, () => {
  console.log(`app started on port ${port}`);
});
