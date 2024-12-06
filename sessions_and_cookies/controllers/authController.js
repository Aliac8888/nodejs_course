exports.getLoginPage = (req, res, next) => {
  res.render("pages/auth/login", {
    title: "LOGIN PAGE",
    path: "/login",
    isLoggedIn: req.session.loggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  req.session.loggedIn = true;
  res.redirect("/");
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
