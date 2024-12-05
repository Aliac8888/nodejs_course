exports.getLoginPage = (req, res, next) => {
  console.log(req.session.loggedIn);
  res.render("pages/auth/login", {
    title: "LOGIN PAGE",
    path: "/login",
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
