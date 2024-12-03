exports.getLoginPage = (req, res, next) => {
  // const isAuthenticated = req.headers.cookie.split("=")[1];
  res.render("pages/auth/login", {
    title: "LOGIN PAGE",
    path: "/login",
  });
};

exports.postLogin = (req, res, next) => {
  res.cookie("isLoggedIn", "true", { httpOnly: true });
  res.redirect("/");
};
