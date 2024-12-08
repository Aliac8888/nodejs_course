//app.js:
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

const cookieParser = require("cookie-parser");
const { generateToken } = require("./helpers/csrfConfig");

const MONGO_URI = "mongodb://127.0.0.1:27017/myTaskManager";
const port = 3000;
const COOKIES_SECRET = "super_cookie_secret";

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

app.use(cookieParser(COOKIES_SECRET));

app.use((req, res, next) => {
  res.locals.isLoggedIn = req.session.loggedIn;
  res.locals.token = generateToken(req, res);
  next();
});

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
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
//================================================================
//tasks.js (route):
const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const isAuth = require("../middlewares/isAuth");
const csrfConfig = require("../helpers/csrfConfig");

router.get("/", taskController.getTasksPage);

router.get("/add-task-page", isAuth, taskController.getAddTaskPage);

router.post(
  "/add-task",
  isAuth,
  csrfConfig.doubleCsrfProtection,
  csrfConfig.csrfErrorHandler,
  taskController.postAddTask
);

router.get("/edit/:taskId", isAuth, taskController.getEditTaskPage);

router.post("/edit-task/:taskId", isAuth, taskController.postEditTask);

router.post("/delete", isAuth, taskController.postDeleteTask);

module.exports = router;
//============================================================================
// csrfConfig.js:
const { doubleCsrf } = require("csrf-csrf");

const CSRF_SECRET = "super_csrf_secret";
const COOKIES_SECRET = "super_cookie_secret";
const CSRF_COOKIE_NAME = "x-csrf-token";
const { invalidCsrfTokenError, generateToken, doubleCsrfProtection } =
  doubleCsrf({
    getSecret: () => CSRF_SECRET,
    cookieName: CSRF_COOKIE_NAME,
    cookieOptions: { sameSite: false, secure: false },
    getTokenFromRequest: (req) => {
      return req.body._csrf;
    },
  });


// Error handling, validation error interception
const csrfErrorHandler = (error, req, res, next) => {
  if (error == invalidCsrfTokenError) {
    res.status(403).json({
      error: "csrf validation error",
    });
  } else {
    next();
  }
};

module.exports = {
  generateToken,
  csrfErrorHandler,
  doubleCsrfProtection,
};
//====================================================
//taskController.js:

const Task = require("../models/task");
const {generateToken} = require("../csrfConfig");

exports.getTasksPage = (req, res, next) => {
  Task.find()
    .then((tasks) => {
      res.render("pages/tasks", {
        title: "TASKS PAGE",
        path: "/tasks",
        tasks,
        isLoggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => console.log(err));
};

exports.getAddTaskPage = (req, res, next) => {
  res.render("pages/add-task", {
    title: "ADD TASK PAGE",
    path: "/tasks/add-task-page",
    isLoggedIn: req.session.loggedIn,
    token: generateToken(req,res),
  });
};

exports.postAddTask = (req, res, next) => {
  const { title, imageUrl, description } = req.body;
  const task = new Task({
    title: title,
    imageUrl: imageUrl,
    description: description,
    userId: req.user._id,
  });
  task
    .save()
    .then(() => res.redirect("/tasks"))
    .catch((err) => console.log(err));
};

exports.getEditTaskPage = (req, res, next) => {
  const taskId = req.params.taskId;
  Task.findById(taskId)
    .then((task) => {
      res.render("pages/edit-task", {
        title: "EDIT TASK PAGE",
        path: "",
        task: task,
        isLoggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => console.log(err));
};

exports.postEditTask = (req, res, next) => {
  const taskId = req.params.taskId;

  Task.findByIdAndUpdate(taskId, {
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    userId: req.user._id,
  })
    .then(() => res.redirect("/tasks"))
    .catch((err) => console.log(err));
};

exports.postDeleteTask = (req, res, next) => {
  const taskId = req.body.taskId;
  Task.findByIdAndDelete(taskId)
    .then(() => res.redirect("/tasks"))
    .catch((err) => console.log(err));
};
//=================================================================
// add-task.ejs:
<!DOCTYPE html>
<html lang="en">
<%- include("../includes/head.ejs") %>
<link rel="stylesheet" href="/css/add-task.css">
</head>
<body>
    <%- include("../includes/header.ejs") %>
    <main>
        <div class="form-container">
            <h2>Add a New Task</h2>
            <form action='/tasks/add-task' method='POST'>
                <input type="hidden" name="_csrf" value="<%= token %>">
                <label for="title">Task Title</label>
                <input type='text' name='title' id='title' required placeholder="Enter task title">
    
                <label for="description">Description</label>
                <textarea name="description" id="description" rows="4" placeholder="Enter task description"></textarea>
    
                <label for="imageUrl">Image URL</label>
                <input type='url' name='imageUrl' id='imageUrl' placeholder="Enter image URL (optional)">
    
                <button type='submit' id="task-submit">ADD TASK</button>
            </form>
        </div>
    </main>
</body>

</html>
//====================================================
// authController.js:
const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.getLoginPage = (req, res, next) => {
  res.render("pages/auth/login", {
    title: "LOGIN PAGE",
    path: "/login",
  });
};

exports.getSignupPage = (req, res, next) => {
  res.render("pages/auth/signup", {
    title: "Signup PAGE",
    path: "/signup",
  });
};

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.redirect("/login");
  }
  const userMatched = await bcrypt.compare(password, user.password);
  if (userMatched) {
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
  }
  return res.redirect("/login");
};

exports.postSignup = async (req, res, next) => {
  const { name, email, password, confirm } = req.body;
  if (password !== confirm) {
    return res.redirect("/signup");
  }
  const hashedPass = await bcrypt.hash(password, 12);
  const userExists = await User.findOne({ email: email });
  if (userExists) {
    return res.redirect("/signup");
  }
  const result = await User.create({ name, email, password: hashedPass });
  return res.redirect("/login");
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
