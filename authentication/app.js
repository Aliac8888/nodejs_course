const express = require("express");
const app = express();

const taskRoutes = require("./routes/tasks");
const mainRoutes = require("./routes/main");
const authRoutes = require("./routes/auth");
const errorController = require("./controllers/errorController");
const path = require("path");
const mongoose = require("mongoose");
const User = require("./models/user");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const MONGO_URI = "mongodb://127.0.0.1:27017/myTaskManager";
const port = 3000;

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "my_secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: MONGO_URI,
      collectionName: "sessions",
    }),
  })
);

app.use((req, res, next) => {
  User.findById("67493df749767ca2c8b3679a")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/tasks", taskRoutes);

app.use(mainRoutes);

app.use(authRoutes);

app.use(errorController.showErrorPage);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`app started on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
