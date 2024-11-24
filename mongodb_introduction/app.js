const express = require("express");
const app = express();

// const taskRoutes = require("./routes/tasks");
const mainRoutes = require("./routes/main");
const errorController = require("./controllers/errorController");
const path = require("path");
const mongoConnect = require("./helpers/database");
// const Task = require("./models/task");
// const User = require("./models/user");

const port = 3000;

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// app.use((req, res, next) => {
//   User.findByPk(1)
//     .then((user) => {
//       req.user = user;
//       next();
//     })
//     .catch((err) => console.log(err));
// });

// app.use("/tasks", taskRoutes);

app.use(mainRoutes);

app.use(errorController.showErrorPage);

mongoConnect()
  .then(()=>{
    app.listen(port, () => {
      console.log(`app started on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
