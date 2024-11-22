const express = require("express");
const app = express();

const taskRoutes = require("./routes/tasks");
const mainRoutes = require("./routes/main");
const errorController = require("./controllers/errorController");
const path = require("path");
const sequelize = require("./helpers/database");
const Task = require("./models/task");
const User = require("./models/user");

const port = 3000;

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/tasks", taskRoutes);

app.use(mainRoutes);

app.use(errorController.showErrorPage);

Task.belongsTo(User, { constraints: true, onDelete: "cascade" });
User.hasMany(Task);

sequelize
  .sync()
  .then(() => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "john doe", email: "johndoe@gmail.com" });
    }
    return user;
  })
  .then((user) => {
    app.listen(port, () => {
      console.log(`app started on port ${port}`);
    });
  })
  .catch((err) => console.log(err));
