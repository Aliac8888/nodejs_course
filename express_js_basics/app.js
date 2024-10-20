const express = require("express");
const app = express();

const taskRoutes = require("./routes/tasks");
const mainRoutes = require("./routes/main");
const path = require("path");

const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"public")));

app.use("/tasks", taskRoutes);

app.use(mainRoutes);

app.use((req, res, next) => {
  res.status(404).send("<h1>404 page not found</h1>");
});

app.listen(port, () => {
  console.log(`app started on port ${port}`);
});
